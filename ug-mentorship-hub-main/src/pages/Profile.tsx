import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  Edit3,
  Save,
  Camera,
  ArrowLeft,
  Star,
  Trophy,
  Clock,
  MessageCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  full_name: string;
  role: string;
  department?: string;
  year_of_study?: string;
  interests?: string;
  bio?: string;
  avatar_url?: string;
  university_id?: string;
  linkedin_url?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

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
      console.error('Profile fetch failed:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          bio: profile.bio,
          interests: profile.interests,
          linkedin_url: profile.linkedin_url,
        })
        .eq('user_id', session.user.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update profile',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const mockAchievements = [
    { icon: Trophy, name: 'Active Mentee', description: 'Completed 5+ mentorship sessions', date: '2024-03-15' },
    { icon: Star, name: 'Resource Contributor', description: 'Shared valuable resources', date: '2024-02-20' },
    { icon: Users, name: 'Community Member', description: 'Active participant for 6+ months', date: '2024-01-10' },
  ];

  const mockSessions = [
    { id: 1, mentor: 'Dr. Kwame Asante', topic: 'Career Planning', date: '2024-03-20', status: 'completed' },
    { id: 2, mentor: 'Prof. Ama Serwaa', topic: 'Research Methods', date: '2024-03-25', status: 'upcoming' },
    { id: 3, mentor: 'John Mensah', topic: 'Interview Prep', date: '2024-03-18', status: 'completed' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-muted-foreground">Loading profile...</h2>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">Profile not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gradient">Profile</h1>
            <Button 
              variant={isEditing ? "hero" : "outline"} 
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={saving}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profile.avatar_url} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {profile.full_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        placeholder="Full Name"
                      />
                      <Textarea
                        value={profile.bio || ''}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                      <Badge variant="outline" className="mt-2 capitalize">
                        {profile.role}
                      </Badge>
                      {profile.bio && (
                        <p className="text-muted-foreground mt-3 text-sm">{profile.bio}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>student@ug.edu.gh</span>
                    </div>
                    {profile.department && (
                      <div className="flex items-center space-x-3 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.department}</span>
                      </div>
                    )}
                    {profile.year_of_study && (
                      <div className="flex items-center space-x-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Year {profile.year_of_study}</span>
                      </div>
                    )}
                    {isEditing ? (
                      <Input
                        value={profile.linkedin_url || ''}
                        onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                        placeholder="LinkedIn URL"
                        className="text-sm"
                      />
                    ) : profile.linkedin_url && (
                      <div className="flex items-center space-x-3 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" 
                           className="text-primary hover:underline">
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Sessions</span>
                    </div>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-success" />
                      <span className="text-sm">Achievements</span>
                    </div>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-warning" />
                      <span className="text-sm">Hours Mentored</span>
                    </div>
                    <span className="font-semibold">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="animate-fade-in-right">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="interests">Interests & Skills</Label>
                          <Textarea
                            id="interests"
                            value={profile.interests || ''}
                            onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                            placeholder="Enter your interests, skills, and areas of expertise..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Interests & Skills</h4>
                          {profile.interests ? (
                            <div className="flex flex-wrap gap-2">
                              {profile.interests.split(',').map((interest, index) => (
                                <Badge key={index} variant="secondary">
                                  {interest.trim()}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">No interests specified</p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid gap-4">
                  {mockAchievements.map((achievement, index) => (
                    <Card key={achievement.name} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <achievement.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.name}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-6">
                <div className="space-y-4">
                  {mockSessions.map((session, index) => (
                    <Card key={session.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{session.topic}</h4>
                            <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(session.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                            {session.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;