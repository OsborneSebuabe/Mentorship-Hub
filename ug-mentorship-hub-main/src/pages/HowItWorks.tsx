import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserPlus,
  Search,
  MessageCircle,
  Calendar,
  Target,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Clock,
  Zap,
  TrendingUp,
  Lightbulb,
  Star,
  ChevronDown,
  ChevronRight,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const studentSteps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up with your UG student credentials and complete your academic profile.',
      details: [
        'Verify your student status with your ID number',
        'Add your academic interests and career goals',
        'Upload your photo and write a brief bio',
        'Specify your preferred mentorship areas'
      ],
      duration: '5 minutes'
    },
    {
      icon: Search,
      title: 'Get Matched',
      description: 'Our AI system finds the perfect mentors based on your goals and interests.',
      details: [
        'AI analyzes your profile and preferences',
        'System considers mentor expertise and availability',
        'Compatibility scoring ensures good matches',
        'You can browse and request specific mentors'
      ],
      duration: 'Instant'
    },
    {
      icon: MessageCircle,
      title: 'Connect & Chat',
      description: 'Start conversations with your matched mentors through our platform.',
      details: [
        'Send introduction messages to mentors',
        'Use real-time chat for quick questions',
        'Share documents and resources easily',
        'Get notifications for important updates'
      ],
      duration: 'Ongoing'
    },
    {
      icon: Calendar,
      title: 'Schedule Sessions',
      description: 'Book one-on-one mentoring sessions at convenient times.',
      details: [
        'View mentor availability in real-time',
        'Choose between virtual or in-person meetings',
        'Set session goals and agendas',
        'Receive calendar invitations and reminders'
      ],
      duration: '15-60 minutes'
    },
    {
      icon: Target,
      title: 'Track Progress',
      description: 'Monitor your growth and achieve your academic and career goals.',
      details: [
        'Set SMART goals with your mentor',
        'Track milestones and achievements',
        'Get feedback and recommendations',
        'Celebrate successes along the way'
      ],
      duration: 'Continuous'
    }
  ];

  const mentorSteps = [
    {
      icon: UserPlus,
      title: 'Apply to Mentor',
      description: 'Submit your application with credentials and areas of expertise.',
      details: [
        'Verify your alumni/faculty status',
        'Highlight your professional experience',
        'Specify your mentoring preferences',
        'Complete background verification'
      ],
      duration: '10 minutes'
    },
    {
      icon: CheckCircle,
      title: 'Get Approved',
      description: 'Our team reviews your application and approves qualified mentors.',
      details: [
        'Application reviewed within 3-5 business days',
        'Reference checks and credential verification',
        'Interview with mentorship program staff',
        'Onboarding and platform training'
      ],
      duration: '3-5 days'
    },
    {
      icon: Users,
      title: 'Receive Matches',
      description: 'Get matched with students who align with your expertise.',
      details: [
        'AI suggests compatible students',
        'Review student profiles and goals',
        'Accept or decline match requests',
        'Set your availability and preferences'
      ],
      duration: 'Ongoing'
    },
    {
      icon: BookOpen,
      title: 'Guide & Support',
      description: 'Provide guidance, share experiences, and help students grow.',
      details: [
        'Conduct regular mentoring sessions',
        'Share industry insights and experiences',
        'Provide career guidance and advice',
        'Support academic and personal development'
      ],
      duration: 'Flexible'
    },
    {
      icon: Award,
      title: 'Make an Impact',
      description: 'See the positive impact of your mentorship on student success.',
      details: [
        'Track student progress and achievements',
        'Receive feedback and recognition',
        'Join mentor community events',
        'Build lasting professional relationships'
      ],
      duration: 'Long-term'
    }
  ];

  const benefits = {
    students: [
      {
        icon: TrendingUp,
        title: 'Academic Excellence',
        description: 'Improved grades and study strategies from experienced mentors.'
      },
      {
        icon: Target,
        title: 'Career Clarity',
        description: 'Clear career paths and professional development guidance.'
      },
      {
        icon: Users,
        title: 'Network Building',
        description: 'Connect with alumni and professionals in your field.'
      },
      {
        icon: Lightbulb,
        title: 'Skill Development',
        description: 'Learn practical skills and industry best practices.'
      }
    ],
    mentors: [
      {
        icon: Heart,
        title: 'Give Back',
        description: 'Make a meaningful impact on the next generation.'
      },
      {
        icon: Users,
        title: 'Leadership Growth',
        description: 'Develop coaching and leadership skills.'
      },
      {
        icon: BookOpen,
        title: 'Stay Current',
        description: 'Keep up with academic trends and student perspectives.'
      },
      {
        icon: Award,
        title: 'Recognition',
        description: 'Gain recognition for your contributions to education.'
      }
    ]
  };

  const faqs = [
    {
      question: 'How long does the matching process take?',
      answer: 'Our AI-powered matching system works instantly, but finding the perfect mentor may take 1-3 days as we ensure quality matches based on availability and compatibility.'
    },
    {
      question: 'Can I have multiple mentors?',
      answer: 'Yes! Students can work with multiple mentors for different aspects of their development - academic, career, personal growth, etc.'
    },
    {
      question: 'What if I don\'t connect well with my mentor?',
      answer: 'No problem! You can request a new mentor at any time. We encourage trying to work through minor differences, but your comfort is our priority.'
    },
    {
      question: 'Are there any costs involved?',
      answer: 'The UG Mentorship Hub is completely free for all University of Ghana students. Our alumni and faculty volunteer their time to support student success.'
    },
    {
      question: 'How often should I meet with my mentor?',
      answer: 'This varies based on your needs and mentor availability. Most successful mentoring relationships involve 1-2 sessions per month, plus ongoing communication.'
    },
    {
      question: 'Can mentoring sessions be virtual?',
      answer: 'Absolutely! We support both virtual and in-person meetings. Virtual sessions make it easier to connect with mentors regardless of location.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navigation isScrolled={true} />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our mentorship platform connects students with experienced mentors 
              to accelerate academic and professional growth.
            </p>
          </div>

          {/* Process Overview */}
          <div className="mb-16">
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="students" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>For Students</span>
                </TabsTrigger>
                <TabsTrigger value="mentors" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>For Mentors</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="students">
                <div className="space-y-8">
                  {studentSteps.map((step, index) => (
                    <Card key={index} className={`card-hover animate-fade-in ${
                      activeStep === index ? 'ring-2 ring-primary' : ''
                    }`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                                  <step.icon className="h-5 w-5 text-primary" />
                                  <span>{step.title}</span>
                                </h3>
                                <p className="text-muted-foreground mb-4">{step.description}</p>
                              </div>
                              <Badge variant="outline" className="ml-4">
                                <Clock className="h-3 w-3 mr-1" />
                                {step.duration}
                              </Badge>
                            </div>
                            <ul className="space-y-2">
                              {step.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mentors">
                <div className="space-y-8">
                  {mentorSteps.map((step, index) => (
                    <Card key={index} className="card-hover animate-fade-in" 
                          style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-6">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                                  <step.icon className="h-5 w-5 text-accent" />
                                  <span>{step.title}</span>
                                </h3>
                                <p className="text-muted-foreground mb-4">{step.description}</p>
                              </div>
                              <Badge variant="secondary" className="ml-4">
                                <Clock className="h-3 w-3 mr-1" />
                                {step.duration}
                              </Badge>
                            </div>
                            <ul className="space-y-2">
                              {step.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-start space-x-2">
                                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Benefits Section */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Platform?</h2>
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="students">Student Benefits</TabsTrigger>
                <TabsTrigger value="mentors">Mentor Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="students">
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.students.map((benefit, index) => (
                    <Card key={index} className="card-hover animate-scale-in" 
                          style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <benefit.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mentors">
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.mentors.map((benefit, index) => (
                    <Card key={index} className="card-hover animate-scale-in" 
                          style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-lg bg-accent/10">
                            <benefit.icon className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* FAQ Section */}
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                        <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-fade-in">
            <Card className="card-hover bg-gradient-hero text-white">
              <CardContent className="p-12">
                <Zap className="h-12 w-12 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join our thriving community of mentors and students. Your journey to 
                  success starts with a single step.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth?mode=signup">
                    <Button variant="secondary" size="lg" className="text-primary">
                      <BookOpen className="h-5 w-5 mr-2" />
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

export default HowItWorks;