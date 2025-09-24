import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Calendar, Gift, MessageSquare, Briefcase, ArrowRight } from 'lucide-react';

const AlumniOverview = () => {
  const items = [
    { label: 'Mentorships', value: 6, icon: Users, color: 'text-primary' },
    { label: 'Sessions', value: 14, icon: Calendar, color: 'text-success' },
    { label: 'Donations', value: 'GHS 1.2k', icon: Gift, color: 'text-warning' },
    { label: 'Awards', value: 3, icon: Trophy, color: 'text-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h1 className="text-3xl font-bold text-gradient truncate">Alumni Overview</h1>
            <p className="text-muted-foreground">Share expertise, post opportunities, and support the next generation.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild><a href="/alumni/opportunities"><Briefcase className="h-4 w-4 mr-1"/>Post Opportunity</a></Button>
            <Button variant="outline" asChild><a href="/alumni/community"><MessageSquare className="h-4 w-4 mr-1"/>Start Q&A</a></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <Card key={it.label} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-muted ${it.color}`}>
                    <it.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{it.value}</p>
                    <p className="text-sm text-muted-foreground">{it.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity and Tips */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 card-hover animate-fade-in-left">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>What’s happening in your alumni hub</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 border rounded-md">You answered a Q&A about interview prep <span className="text-muted-foreground">• 2h ago</span></div>
              <div className="p-3 border rounded-md">3 students applied to your posted internship <span className="text-muted-foreground">• 1d ago</span></div>
              <div className="p-3 border rounded-md">New community thread: Transitioning to industry <span className="text-muted-foreground">• 2d ago</span></div>
            </CardContent>
          </Card>
          <Card className="card-hover animate-fade-in-right">
            <CardHeader>
              <CardTitle>Get Involved</CardTitle>
              <CardDescription>Quick ways to contribute</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <a className="flex items-center justify-between hover:underline" href="/alumni/opportunities"><span>Post a role or project</span><ArrowRight className="h-4 w-4"/></a>
              <a className="flex items-center justify-between hover:underline" href="/alumni/community"><span>Answer student questions</span><ArrowRight className="h-4 w-4"/></a>
              <a className="flex items-center justify-between hover:underline" href="/alumni/leaderboard"><span>View impact leaderboard</span><ArrowRight className="h-4 w-4"/></a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlumniOverview;


