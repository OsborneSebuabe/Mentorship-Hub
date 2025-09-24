import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MentorCard } from '@/components/MentorCard';
import { 
  Search, 
  Filter, 
  ArrowLeft,
  Users,
  Star,
  Award,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Mentor {
  id: string;
  name: string;
  role: string;
  department: string;
  expertise: string[];
  rating: number;
  sessionsCompleted: number;
  avatar?: string;
  isOnline: boolean;
  bio: string;
}

const MentorDirectory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const departments = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Psychology',
    'Medicine',
    'Law',
    'Agriculture'
  ];

  const mockMentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Kwame Asante',
      role: 'Senior Lecturer',
      department: 'Computer Science',
      expertise: ['AI/ML', 'Research', 'Career Development', 'Software Engineering'],
      rating: 4.9,
      sessionsCompleted: 127,
      isOnline: true,
      bio: 'Experienced researcher in artificial intelligence with 15+ years in academia.'
    },
    {
      id: '2',
      name: 'Prof. Ama Serwaa',
      role: 'Professor',
      department: 'Business Administration',
      expertise: ['Entrepreneurship', 'Leadership', 'Strategy', 'Finance'],
      rating: 4.8,
      sessionsCompleted: 89,
      isOnline: false,
      bio: 'Former CEO turned academic, specializing in entrepreneurship and leadership.'
    },
    {
      id: '3',
      name: 'John Mensah',
      role: 'Alumni',
      department: 'Engineering',
      expertise: ['Project Management', 'Career Transition', 'Industry Insights'],
      rating: 4.7,
      sessionsCompleted: 45,
      isOnline: true,
      bio: 'Senior project manager at multinational corporation with engineering background.'
    },
    {
      id: '4',
      name: 'Sarah Osei',
      role: 'Alumni',
      department: 'Computer Science',
      expertise: ['Tech Startups', 'Product Management', 'Networking'],
      rating: 4.6,
      sessionsCompleted: 32,
      isOnline: true,
      bio: 'Tech entrepreneur and product manager with successful startup exits.'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchMentors = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMentors(mockMentors);
      setLoading(false);
    };

    fetchMentors();
  }, []);

  const handleMessage = (mentorId: string) => {
    toast({
      title: 'Message sent',
      description: 'Your message has been sent to the mentor.',
    });
  };

  const handleBookSession = (mentorId: string) => {
    toast({
      title: 'Session booking',
      description: 'Redirecting to session booking page.',
    });
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         mentor.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || mentor.department === selectedDepartment;
    const matchesRole = selectedRole === 'all' || mentor.role.toLowerCase().includes(selectedRole.toLowerCase());
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'sessions':
        return b.sessionsCompleted - a.sessionsCompleted;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-muted-foreground">Loading mentors...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Mentor Directory</h1>
              <p className="text-muted-foreground mt-2">
                Find and connect with experienced mentors across all departments
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors, skills, or departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="sessions">Most Experienced</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            <Button 
              variant={selectedRole === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedRole('all')}
            >
              All Mentors ({mentors.length})
            </Button>
            <Button 
              variant={selectedRole === 'lecturer' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedRole('lecturer')}
            >
              Faculty ({mentors.filter(m => m.role.includes('Lecturer') || m.role.includes('Professor')).length})
            </Button>
            <Button 
              variant={selectedRole === 'alumni' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedRole('alumni')}
            >
              Alumni ({mentors.filter(m => m.role === 'Alumni').length})
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Available Mentors', value: mentors.filter(m => m.isOnline).length, color: 'text-primary' },
            { icon: Star, label: 'Avg Rating', value: '4.8', color: 'text-warning' },
            { icon: Award, label: 'Total Sessions', value: mentors.reduce((sum, m) => sum + m.sessionsCompleted, 0), color: 'text-success' },
            { icon: BookOpen, label: 'Departments', value: departments.length, color: 'text-destructive' }
          ].map((stat, index) => (
            <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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

        {/* Mentors Grid */}
        {sortedMentors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMentors.map((mentor, index) => (
              <div key={mentor.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <MentorCard
                  mentor={mentor}
                  onMessage={handleMessage}
                  onBookSession={handleBookSession}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDirectory;