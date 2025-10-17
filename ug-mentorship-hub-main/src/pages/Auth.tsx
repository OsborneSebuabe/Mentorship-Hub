import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Lock, User, GraduationCap, Users, Award, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ugLogo from '@/assets/ug-logo.png';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'signin');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    department: '',
    yearOfStudy: '',
    interests: '',
  });

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  const userRoles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Find mentors, access resources, and grow your career',
      icon: GraduationCap,
      color: 'bg-primary',
    },
    {
      id: 'lecturer',
      title: 'Lecturer/Mentor',
      description: 'Guide students and share your expertise',
      icon: Users,
      color: 'bg-success',
    },
    {
      id: 'alumni',
      title: 'Alumni',
      description: 'Give back and offer micro-mentorship',
      icon: Award,
      color: 'bg-warning',
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage platform and user experience',
      icon: Shield,
      color: 'bg-destructive',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: 'Error',
            description: 'Passwords do not match',
            variant: 'destructive',
          });
          return;
        }

        if (!selectedRole) {
          toast({
            title: 'Error',
            description: 'Please select your role',
            variant: 'destructive',
          });
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: formData.fullName,
              role: selectedRole,
              department: formData.department,
              year_of_study: formData.yearOfStudy,
              interests: formData.interests,
            }
          }
        });

        if (error) {
          toast({
            title: 'Sign Up Failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Success!',
            description: 'Please check your email to confirm your account.',
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          toast({
            title: 'Sign In Failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'Successfully signed in.',
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-muted-foreground group-hover:text-primary transition-colors">Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={ugLogo} alt="University of Ghana" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold text-gradient">UG Mentorship Hub</h1>
              <p className="text-sm text-muted-foreground">Connect • Learn • Grow</p>
            </div>
          </div>
        </div>

        {mode === 'signup' && !selectedRole ? (
          /* Role Selection */
          <div className="animate-fade-in">
            <Card className="max-w-4xl mx-auto shadow-strong">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Choose Your Role</CardTitle>
                <CardDescription className="text-lg">
                  Select how you'd like to participate in the UG Mentorship Hub
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {userRoles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className="group p-6 border-2 border-border rounded-xl cursor-pointer hover:border-primary hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 ${role.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                          <role.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {role.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {role.description}
                          </p>
                          <Badge variant="outline" className="group-hover:border-primary group-hover:text-primary transition-colors">
                            Select Role
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Auth Form */
          <div className="grid lg:grid-cols-2 gap-12 items-center animate-scale-in">
            {/* Left Column - Form */}
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                </CardTitle>
                <CardDescription>
                  {mode === 'signup' 
                    ? 'Join the UG Mentorship community today' 
                    : 'Sign in to your account to continue'
                  }
                </CardDescription>
                {selectedRole && (
                  <Badge variant="outline" className="ml-2 capitalize">
                    {selectedRole}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {mode === 'signup' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {selectedRole === 'student' && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                              id="department"
                              name="department"
                              type="text"
                              placeholder="e.g., Computer Science"
                              value={formData.department}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="yearOfStudy">Year of Study</Label>
                            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, yearOfStudy: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1st Year</SelectItem>
                                <SelectItem value="2">2nd Year</SelectItem>
                                <SelectItem value="3">3rd Year</SelectItem>
                                <SelectItem value="4">4th Year</SelectItem>
                                <SelectItem value="graduate">Graduate Student</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="interests">Interests/Specialization</Label>
                        <Input
                          id="interests"
                          name="interests"
                          type="text"
                          placeholder="e.g., AI, Business, Research"
                          value={formData.interests}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setMode(mode === 'signup' ? 'signin' : 'signup');
                        setSelectedRole('');
                      }}
                      className="text-primary hover:underline"
                    >
                      {mode === 'signup' 
                        ? 'Already have an account? Sign in' 
                        : "Don't have an account? Sign up"}
                    </button>
                  </div>

                  {/* Look Around buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <Button
                      type="button"
                      className="bg-black text-white hover:bg-black/90"
                      onClick={() => navigate('/student/overview')}
                    >
                      Look Around (Student)
                    </Button>
                    <Button
                      type="button"
                      className="bg-black text-white hover:bg-black/90"
                      onClick={() => navigate('/lecturer/overview')}
                    >
                      Look Around (Lecturer)
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Right Column - Benefits */}
            <div className="hidden lg:block space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Join the Future of Mentorship
                </h2>
                <p className="text-lg text-muted-foreground">
                  Connect with Ghana's brightest minds and accelerate your academic and career journey.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: 'Expert Mentors',
                    description: 'Connect with experienced lecturers and successful alumni'
                  },
                  {
                    icon: GraduationCap,
                    title: 'Academic Excellence',
                    description: 'Get personalized guidance to improve your academic performance'
                  },
                  {
                    icon: Award,
                    title: 'Career Growth',
                    description: 'Access internships, job opportunities, and career advice'
                  }
                ].map((benefit, index) => (
                  <div key={benefit.title} className="flex items-start space-x-4 animate-fade-in-left" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;