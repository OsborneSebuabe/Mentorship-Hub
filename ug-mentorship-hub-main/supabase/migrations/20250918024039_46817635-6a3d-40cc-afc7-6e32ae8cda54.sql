-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('student', 'lecturer', 'alumni', 'admin');

-- Create enum for session status
CREATE TYPE public.session_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create enum for match status
CREATE TYPE public.match_status AS ENUM ('pending', 'accepted', 'rejected', 'active', 'completed');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL,
    department TEXT,
    year_of_study TEXT,
    interests TEXT,
    bio TEXT,
    avatar_url TEXT,
    university_id TEXT,
    linkedin_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create mentorship_matches table
CREATE TABLE public.mentorship_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    mentor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status match_status DEFAULT 'pending',
    match_reason TEXT, -- Why they were matched
    matched_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT different_users CHECK (mentee_id != mentor_id)
);

-- Create mentorship_sessions table
CREATE TABLE public.mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES public.mentorship_matches(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    meeting_type TEXT CHECK (meeting_type IN ('online', 'in-person', 'hybrid')) DEFAULT 'online',
    meeting_link TEXT,
    meeting_location TEXT,
    status session_status DEFAULT 'pending',
    session_notes TEXT,
    mentor_feedback TEXT,
    mentee_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create resources table
CREATE TABLE public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    content_type TEXT CHECK (content_type IN ('pdf', 'link', 'video', 'document')) NOT NULL,
    resource_url TEXT,
    file_path TEXT,
    category TEXT NOT NULL, -- Career, Research, Life Skills, Networking
    tags TEXT[],
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_public BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create session_feedback table
CREATE TABLE public.session_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.mentorship_sessions(id) ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    feedback_text TEXT,
    improvement_areas TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_achievements table for gamification
CREATE TABLE public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    achievement_type TEXT NOT NULL, -- mentor_badge, mentee_badge, resource_contributor, etc.
    achievement_name TEXT NOT NULL,
    achievement_description TEXT,
    points_earned INTEGER DEFAULT 0,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for mentorship_matches
CREATE POLICY "Users can view their own matches" ON public.mentorship_matches
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND (p.id = mentee_id OR p.id = mentor_id)
        )
    );

CREATE POLICY "Mentees can create match requests" ON public.mentorship_matches
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.id = mentee_id
            AND p.role = 'student'
        )
    );

CREATE POLICY "Mentors can update match status" ON public.mentorship_matches
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.id = mentor_id
        )
    );

-- Create RLS policies for sessions
CREATE POLICY "Users can view their own sessions" ON public.mentorship_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.mentorship_matches m
            JOIN public.profiles p ON (p.id = m.mentee_id OR p.id = m.mentor_id)
            WHERE m.id = match_id AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Match participants can manage sessions" ON public.mentorship_sessions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.mentorship_matches m
            JOIN public.profiles p ON (p.id = m.mentee_id OR p.id = m.mentor_id)
            WHERE m.id = match_id AND p.user_id = auth.uid()
        )
    );

-- Create RLS policies for resources
CREATE POLICY "Anyone can view public resources" ON public.resources
    FOR SELECT USING (is_public = true OR EXISTS (
        SELECT 1 FROM public.profiles p 
        WHERE p.user_id = auth.uid() 
        AND p.id = uploaded_by
    ));

CREATE POLICY "Authenticated users can upload resources" ON public.resources
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.id = uploaded_by
        )
    );

CREATE POLICY "Users can update their own resources" ON public.resources
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.id = uploaded_by
        )
    );

-- Create RLS policies for feedback
CREATE POLICY "Users can view feedback for their sessions" ON public.session_feedback
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.mentorship_sessions s
            JOIN public.mentorship_matches m ON s.match_id = m.id
            JOIN public.profiles p ON (p.id = m.mentee_id OR p.id = m.mentor_id)
            WHERE s.id = session_id AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Session participants can create feedback" ON public.session_feedback
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.mentorship_sessions s
            JOIN public.mentorship_matches m ON s.match_id = m.id
            JOIN public.profiles p ON (p.id = m.mentee_id OR p.id = m.mentor_id)
            WHERE s.id = session_id AND p.user_id = auth.uid() AND p.id = reviewer_id
        )
    );

-- Create RLS policies for achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.user_id = auth.uid() 
            AND p.id = user_id
        )
    );

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        user_id, 
        full_name, 
        role, 
        department, 
        year_of_study, 
        interests
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'),
        NEW.raw_user_meta_data->>'department',
        NEW.raw_user_meta_data->>'year_of_study',
        NEW.raw_user_meta_data->>'interests'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_matches_updated_at
    BEFORE UPDATE ON public.mentorship_matches
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON public.mentorship_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_matches_mentee_id ON public.mentorship_matches(mentee_id);
CREATE INDEX idx_matches_mentor_id ON public.mentorship_matches(mentor_id);
CREATE INDEX idx_matches_status ON public.mentorship_matches(status);
CREATE INDEX idx_sessions_match_id ON public.mentorship_sessions(match_id);
CREATE INDEX idx_sessions_scheduled_at ON public.mentorship_sessions(scheduled_at);
CREATE INDEX idx_resources_category ON public.resources(category);
CREATE INDEX idx_resources_is_public ON public.resources(is_public);