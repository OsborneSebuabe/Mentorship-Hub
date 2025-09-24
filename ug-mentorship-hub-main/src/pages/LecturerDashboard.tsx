import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  BookOpen, 
  Calendar,
  MessageSquare,
  Star,
  TrendingUp,
  Clock,
  Target,
  Award,
  Activity,
  Search,
  Filter,
  Plus,
  Video,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LecturerTopNav from '@/components/LecturerTopNav';

const LecturerDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for lecturer dashboard
  const lecturerStats = {
    totalMentees: 12,
    activeSessions: 8,
    completedSessions: 45,
    averageRating: 4.9,
    hoursThisMonth: 24,
    upcomingSessions: 3
  };

  const mentees = [
    {
      id: '1',
      name: 'John Doe',
      avatar: '/placeholder.svg',
      department: 'Computer Science',
      year: '3rd Year',
      interests: ['AI/ML', 'Web Development'],
      lastActive: '2 hours ago',
      progress: 85,
      sessions: 8,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: '/placeholder.svg',
      department: 'Computer Science',
      year: '2nd Year',
      interests: ['Data Science', 'Python'],
      lastActive: '1 day ago',
      progress: 72,
      sessions: 5,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Michael Johnson',
      avatar: '/placeholder.svg',
      department: 'Computer Science',
      year: '4th Year',
      interests: ['Cybersecurity', 'Networking'],
      lastActive: '3 hours ago',
      progress: 91,
      sessions: 12,
      rating: 4.9
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      title: 'AI/ML Career Discussion',
      student: 'John Doe',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '60 min',
      type: 'video',
      agenda: 'Discuss career paths in AI/ML and internship opportunities'
    },
    {
      id: '2',
      title: 'Data Science Project Review',
      student: 'Jane Smith',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '45 min',
      type: 'in-person',
      agenda: 'Review final year project proposal and methodology'
    },
    {
      id: '3',
      title: 'Cybersecurity Research Guidance',
      student: 'Michael Johnson',
      date: '2024-01-17',
      time: '3:30 PM',
      duration: '90 min',
      type: 'video',
      agenda: 'Discuss research paper structure and literature review'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'session_completed',
      message: 'Completed mentoring session with John Doe',
      timestamp: '2 hours ago',
      student: 'John Doe'
    },
    {
      id: '2',
      type: 'new_message',
      message: 'New message from Jane Smith about project deadline',
      timestamp: '5 hours ago',
      student: 'Jane Smith'
    },
    {
      id: '3',
      type: 'session_scheduled',
      message: 'New session scheduled with Michael Johnson',
      timestamp: '1 day ago',
      student: 'Michael Johnson'
    },
    {
      id: '4',
      type: 'feedback_received',
      message: 'Received 5-star feedback from John Doe',
      timestamp: '2 days ago',
      student: 'John Doe'
    }
  ];

  const resources = [
    {
      title: 'Academic Writing Guide',
      description: 'Comprehensive guide for academic writing and research',
      downloads: 234,
      category: 'Writing'
    },
    {
      title: 'Career Development Roadmap',
      description: 'Step-by-step career planning for CS students',
      downloads: 189,
      category: 'Career'
    },
    {
      title: 'Interview Preparation Kit',
      description: 'Technical interview questions and best practices',
      downloads: 156,
      category: 'Career'
    }
  ];

  const handleScheduleSession = () => {
    toast({
      title: 'Session Scheduled',
      description: 'New mentoring session has been scheduled successfully.',
    });
  };

  const handleSendMessage = (studentName: string) => {
    toast({
      title: 'Message Sent',
      description: `Message sent to ${studentName}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto">
        <LecturerTopNav />
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Lecturer Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, Dr. Kwame Asante • Computer Science Department
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="card-hover animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">My Mentees</p>
                  <p className="text-2xl font-bold text-primary">{lecturerStats.totalMentees}</p>
                </div>
                <Users className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-2xl font-bold text-success">{lecturerStats.activeSessions}</p>
                </div>
                <Activity className="h-8 w-8 text-success opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-accent">{lecturerStats.completedSessions}</p>
                </div>
                <BookOpen className="h-8 w-8 text-accent opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold text-warning">{lecturerStats.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-warning opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="text-2xl font-bold text-primary">{lecturerStats.hoursThisMonth}</p>
                </div>
                <Clock className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-success">{lecturerStats.upcomingSessions}</p>
                </div>
                <Calendar className="h-8 w-8 text-success opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mentees">My Mentees</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upcoming Sessions */}
              <div className="lg:col-span-2">
                <Card className="card-hover animate-fade-in-left">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Upcoming Sessions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{session.title}</h3>
                              <Badge variant={session.type === 'video' ? 'default' : 'secondary'}>
                                {session.type === 'video' ? <Video className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                                {session.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              With {session.student} • {session.date} at {session.time}
                            </p>
                            <p className="text-xs text-muted-foreground">{session.agenda}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{session.duration}</Badge>
                            <Button size="sm" variant="outline">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card className="card-hover animate-fade-in-right">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'session_completed' ? 'bg-success' :
                            activity.type === 'new_message' ? 'bg-primary' :
                            activity.type === 'session_scheduled' ? 'bg-accent' : 'bg-warning'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mentees" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mentees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentees.map((mentee, index) => (
                <Card key={mentee.id} className="card-hover animate-scale-in" 
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mentee.avatar} />
                        <AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{mentee.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mentee.department} • {mentee.year}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active: {mentee.lastActive}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{mentee.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${mentee.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {mentee.interests.map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>{mentee.sessions} sessions</span>
                          <Star className="h-4 w-4 text-warning" />
                          <span>{mentee.rating}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" onClick={() => handleSendMessage(mentee.name)}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="default" onClick={handleScheduleSession}>
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">My Resources</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="card-hover animate-scale-in" 
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {resource.downloads} downloads
                      </span>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover text-center animate-scale-in">
                <CardContent className="p-6">
                  <TrendingUp className="h-12 w-12 mx-auto text-success mb-3" />
                  <h3 className="text-2xl font-bold text-success">+23%</h3>
                  <p className="text-sm text-muted-foreground">Student Progress</p>
                </CardContent>
              </Card>

              <Card className="card-hover text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6">
                  <Star className="h-12 w-12 mx-auto text-warning mb-3" />
                  <h3 className="text-2xl font-bold text-warning">4.9</h3>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>

              <Card className="card-hover text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <Clock className="h-12 w-12 mx-auto text-primary mb-3" />
                  <h3 className="text-2xl font-bold text-primary">24h</h3>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </CardContent>
              </Card>

              <Card className="card-hover text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6">
                  <Target className="h-12 w-12 mx-auto text-accent mb-3" />
                  <h3 className="text-2xl font-bold text-accent">92%</h3>
                  <p className="text-sm text-muted-foreground">Goal Achievement</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LecturerDashboard;