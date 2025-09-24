import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Users,
  BookOpen,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message sent!',
      description: 'We\'ll get back to you within 24 hours.',
    });
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'mentorship@ug.edu.gh',
      details: 'Response within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: '+233 302 500 270',
      details: 'Mon - Fri, 8AM - 5PM'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'University of Ghana, Legon',
      details: 'Student Affairs Building, Room 201'
    }
  ];

  const faqItems = [
    {
      question: 'How do I become a mentor?',
      answer: 'Alumni and faculty can apply through our registration portal. We verify credentials and match based on expertise.',
      category: 'mentorship'
    },
    {
      question: 'Is the service free for students?',
      answer: 'Yes! All mentorship services are completely free for University of Ghana students.',
      category: 'general'
    },
    {
      question: 'How are mentors matched with students?',
      answer: 'Our AI-powered system matches based on academic interests, career goals, and mentor expertise.',
      category: 'matching'
    },
    {
      question: 'Can I change my mentor?',
      answer: 'Yes, you can request a mentor change at any time through your dashboard.',
      category: 'mentorship'
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Mentors', value: '250+', description: 'Faculty & Alumni' },
    { icon: BookOpen, label: 'Sessions Completed', value: '1,200+', description: 'This semester' },
    { icon: MessageSquare, label: 'Messages Sent', value: '15,000+', description: 'Platform activity' },
    { icon: Star, label: 'Average Rating', value: '4.8/5', description: 'Student feedback' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navigation isScrolled={true} />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our mentorship program? We're here to help you connect, 
              learn, and grow in your academic journey.
            </p>
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="card-hover animate-fade-in-left">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="h-5 w-5 text-primary" />
                    <span>Send us a message</span>
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll respond as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name *</label>
                        <Input
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="your.email@ug.edu.gh"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <select
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="mentorship">Mentorship Questions</option>
                        <option value="technical">Technical Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject *</label>
                      <Input
                        placeholder="Brief subject of your message"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message *</label>
                      <Textarea
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full btn-hero">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in-right">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-foreground font-medium">{info.description}</p>
                        <p className="text-sm text-muted-foreground">{info.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-success/10">
                      <Clock className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 8:00 AM - 5:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">Platform Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="card-hover text-center animate-bounce-in" 
                      style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-1">{stat.value}</h3>
                    <p className="font-medium mb-1">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((faq, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <Badge variant="secondary" className="ml-2">
                        {faq.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;