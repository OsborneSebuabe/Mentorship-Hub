import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Gift, MessageSquare, Briefcase, Award, TrendingUp } from 'lucide-react';
import AlumniTopNav from '@/components/AlumniTopNav';

const AlumniDashboard = () => {
  const stats = [
    { label: 'Micro-mentorships', value: 6, icon: Users, color: 'text-primary' },
    { label: 'Sessions', value: 14, icon: Calendar, color: 'text-success' },
    { label: 'Donations', value: 'GHS 1.2k', icon: Gift, color: 'text-warning' },
    { label: 'Impact Score', value: 92, icon: TrendingUp, color: 'text-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <AlumniTopNav />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Alumni Dashboard</h1>
          <div className="space-x-2">
            <Button asChild>
              <a href="/alumni/opportunities"><Briefcase className="h-4 w-4 mr-1"/>Post Opportunity</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/alumni/community"><MessageSquare className="h-4 w-4 mr-1"/>Start Q&A</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Card key={s.label} className="card-hover animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-muted ${s.color}`}>
                    <s.icon className="h-6 w-6"/>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="card-hover animate-fade-in-left lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Q&A Threads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="p-3 border rounded-md">How to prepare for data science interviews?</div>
              <div className="p-3 border rounded-md">Advice for first internship applications</div>
              <div className="p-3 border rounded-md">Transitioning from academia to industry</div>
            </CardContent>
          </Card>
          <Card className="card-hover animate-fade-in-right">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between"><span>Top Mentor</span><Award className="h-5 w-5 text-warning"/></div>
              <div className="flex items-center justify-between"><span>Community Builder</span><Award className="h-5 w-5 text-accent"/></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;



