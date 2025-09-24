import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut,
  Bell,
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  ArrowRight,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NotificationCenter } from '@/components/NotificationCenter';
import { ThemeToggle } from '@/components/ThemeToggle';
import ugLogo from '@/assets/ug-logo.png';
import StudentTopNav from '@/components/StudentTopNav';
import AdminDashboardPage from '@/pages/AdminDashboard';
import AlumniDashboardPage from '@/pages/AlumniDashboard';
import LecturerDashboardPage from '@/pages/LecturerDashboard';

interface Profile {
  id: string;
  full_name: string;
  role: string;
  department?: string;
  year_of_study?: string;
  interests?: string;
  avatar_url?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth');
          return;
        }

        // Fetch user profile
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: 'Error',
            description: 'Failed to load profile data',
            variant: 'destructive',
          });
        } else {
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-muted-foreground">Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">Profile not found</h2>
          <Button onClick={() => navigate('/auth')}>Return to Login</Button>
        </div>
      </div>
    );
  }

  const getDashboardContent = () => {
    switch (profile.role) {
      case 'student':
        return <StudentDashboard profile={profile} />;
      case 'lecturer':
        return <LecturerDashboardPage />;
      case 'alumni':
        return <AlumniDashboardPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <StudentDashboard profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={ugLogo} alt="University of Ghana" className="h-8 w-8" />
              <div>
                <h1 className="text-lg font-bold text-gradient">UG Mentorship Hub</h1>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <NotificationCenter />
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{profile.full_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{profile.role}</p>
                </div>
              </div>

              <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getDashboardContent()}
      </main>
    </div>
  );
};

// Student Dashboard Component
const StudentDashboard: React.FC<{ profile: Profile }> = ({ profile }) => (
  <div className="space-y-8 animate-fade-in">
    <StudentTopNav />
    {/* Welcome Section */}
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gradient mb-2">
        Welcome back, {profile.full_name.split(' ')[0]}!
      </h1>
      <p className="text-muted-foreground">
        Ready to continue your mentorship journey?
      </p>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Find Mentors', href: '/student/mentor-matching', icon: Users },
        { label: 'Book Session', href: '/student/session-booking', icon: Calendar },
        { label: 'My Sessions', href: '/student/my-sessions', icon: Clock },
        { label: 'Resources', href: '/student/resource-library', icon: BookOpen },
      ].map((qa, index) => (
        <Card key={qa.label} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <qa.icon className="h-5 w-5 text-primary" />
              <span className="font-medium">{qa.label}</span>
            </div>
            <Button asChild variant="outline" size="sm">
              <a href={qa.href}>Open</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { icon: Users, label: 'Active Mentors', value: '2', color: 'text-primary' },
        { icon: Calendar, label: 'Sessions This Month', value: '4', color: 'text-success' },
        { icon: Trophy, label: 'Achievements', value: '12', color: 'text-warning' },
        { icon: BookOpen, label: 'Resources Used', value: '8', color: 'text-destructive' }
      ].map((stat, index) => (
        <Card key={stat.label} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Main Content Grid */}
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Mentor Matches */}
        <Card className="animate-fade-in-left">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Your Mentors</span>
            </CardTitle>
            <CardDescription>Connect with your assigned mentors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample Mentor */}
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      DR
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Dr. Kwame Asante</h4>
                    <p className="text-sm text-muted-foreground">Computer Science • Research Mentor</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">AI/ML</Badge>
                      <Badge variant="outline" className="text-xs">Research</Badge>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Looking for more mentors? Our matching system will find perfect fits for you.</p>
                <Button variant="hero" className="mt-4" onClick={() => window.location.href = '/student/mentor-matching'}>
                  Find Mentors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-success" />
              <span>Upcoming Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming sessions scheduled.</p>
              <Button variant="outline" className="mt-4">
                Schedule Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Progress Card */}
        <Card className="animate-fade-in-right">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completion</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Learning Goals</span>
                  <span>3/5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Library */}
        <Card className="animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-warning" />
              <span>Recommended Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'Career Planning Guide',
                'Research Methodology',
                'Interview Preparation'
              ].map((resource, index) => (
                <div key={resource} className="flex items-center justify-between py-2">
                  <span className="text-sm">{resource}</span>
                  <Button size="sm" variant="ghost">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

// Placeholder components for other roles
const MentorDashboard: React.FC<{ profile: Profile }> = ({ profile }) => (
  <div className="text-center py-16">
    <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
    <h1 className="text-2xl font-bold mb-4">Mentor Dashboard</h1>
    <p className="text-muted-foreground mb-8">Welcome, {profile.full_name}! Your mentor dashboard is coming soon.</p>
    <Button variant="hero">Manage Mentees</Button>
  </div>
);

// Alumni and Admin dashboards are rendered using their dedicated pages

export default Dashboard;