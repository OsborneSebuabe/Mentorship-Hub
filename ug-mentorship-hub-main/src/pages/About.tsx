import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap,
  Users,
  Target,
  Award,
  BookOpen,
  Lightbulb,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ugLogo from '@/assets/ug-logo.png';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Student-Centered',
      description: 'Every decision we make prioritizes student success and well-being.',
      color: 'text-destructive'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace technology to create meaningful mentorship connections.',
      color: 'text-warning'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building bridges between students, faculty, and alumni for collective growth.',
      color: 'text-primary'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to the highest standards in academic and professional development.',
      color: 'text-success'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Program Launch',
      description: 'UG Mentorship Hub was established to connect students with experienced mentors.',
      achievement: '50 initial mentors'
    },
    {
      year: '2021',
      title: 'Platform Development',
      description: 'Launched our digital platform to streamline mentor-student matching.',
      achievement: '500+ active users'
    },
    {
      year: '2022',
      title: 'Alumni Network',
      description: 'Expanded to include successful UG alumni as mentors across various industries.',
      achievement: '1,000+ connections made'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Implemented AI-powered matching system for better mentor-student compatibility.',
      achievement: '95% satisfaction rate'
    },
    {
      year: '2024',
      title: 'Excellence Recognition',
      description: 'Recognized as Best University Mentorship Program in West Africa.',
      achievement: '2,500+ active members'
    }
  ];

  const teamMembers = [
    {
      name: 'Prof. Kwame Asante',
      role: 'Program Director',
      department: 'Student Affairs',
      image: '/placeholder.svg',
      bio: '15+ years in student development and academic leadership.'
    },
    {
      name: 'Dr. Ama Serwaa',
      role: 'Academic Coordinator',
      department: 'Faculty Development',
      image: '/placeholder.svg',
      bio: 'Expert in mentorship best practices and curriculum development.'
    },
    {
      name: 'John Mensah',
      role: 'Alumni Relations',
      department: 'External Affairs',
      image: '/placeholder.svg',
      bio: 'Connecting successful alumni with current students since 2018.'
    },
    {
      name: 'Sarah Osei',
      role: 'Student Success Manager',
      department: 'Student Services',
      image: '/placeholder.svg',
      bio: 'Passionate about student achievement and career development.'
    }
  ];

  const features = [
    'AI-powered mentor matching based on academic interests and career goals',
    'Real-time communication platform for seamless interactions',
    'Progress tracking and goal-setting tools for structured development',
    'Resource library with academic and career development materials',
    'Virtual and in-person meeting coordination',
    'Performance analytics and feedback systems',
    'Achievement tracking and recognition programs',
    'Community forums for peer-to-peer learning'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navigation isScrolled={true} />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <img src={ugLogo} alt="University of Ghana" className="h-16 w-16 mr-4" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  About UG Mentorship Hub
                </h1>
                <p className="text-lg text-muted-foreground">
                  Empowering students through meaningful connections
                </p>
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The University of Ghana Mentorship Hub is a comprehensive platform designed to 
              connect students with experienced faculty members and successful alumni. Our mission 
              is to foster academic excellence, professional development, and personal growth 
              through structured mentorship relationships.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="card-hover animate-fade-in-left">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-primary" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a thriving ecosystem where students can access personalized guidance, 
                  develop professional skills, and build lasting relationships that will support 
                  their academic journey and future career success. We believe every student 
                  deserves access to quality mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover animate-fade-in-right">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-warning" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading university mentorship platform in Africa, recognized for 
                  innovation, impact, and inclusivity. We envision a future where every student 
                  has access to the guidance and support they need to achieve their full potential 
                  and contribute meaningfully to society.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="card-hover text-center animate-scale-in" 
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className={`p-4 rounded-full w-fit mx-auto mb-4 bg-muted ${value.color}`}>
                      <value.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Platform Features */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}>
                    <Card className={`card-hover w-full max-w-md ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    } animate-fade-in-${index % 2 === 0 ? 'left' : 'right'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-primary border-primary">
                            {milestone.year}
                          </Badge>
                          <Badge variant="secondary">
                            {milestone.achievement}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="card-hover text-center animate-slide-up" 
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-3">{member.department}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-fade-in">
            <Card className="card-hover bg-gradient-primary text-white">
              <CardContent className="p-12">
                <Star className="h-12 w-12 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of students who have transformed their academic and professional 
                  lives through our mentorship platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth?mode=signup">
                    <Button variant="secondary" size="lg" className="text-primary">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Join as Student
                    </Button>
                  </Link>
                  <Link to="/auth?mode=mentor">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                      <Users className="h-5 w-5 mr-2" />
                      Become a Mentor
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;