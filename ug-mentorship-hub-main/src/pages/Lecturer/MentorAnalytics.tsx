import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Star, Clock, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MentorAnalyticsPage = () => {
  const items = [
    { label: 'Student Progress', value: '+23%', icon: TrendingUp, color: 'text-success' },
    { label: 'Average Rating', value: '4.9', icon: Star, color: 'text-warning' },
    { label: 'Mentoring Hours', value: '24h', icon: Clock, color: 'text-primary' },
    { label: 'Goal Achievement', value: '92%', icon: Target, color: 'text-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Mentor Analytics</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <Card key={it.label} className="card-hover text-center animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardContent className="p-6">
                <it.icon className={`h-12 w-12 mx-auto mb-3 ${it.color}`} />
                <h3 className="text-2xl font-bold">{it.value}</h3>
                <p className="text-sm text-muted-foreground">{it.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="card-hover animate-fade-in-left">
            <CardHeader>
              <CardTitle>Session Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>On time</span><span>86%</span></div>
                  <Progress value={86} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Rescheduled</span><span>9%</span></div>
                  <Progress value={9} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Cancelled</span><span>5%</span></div>
                  <Progress value={5} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in-right">
            <CardHeader>
              <CardTitle>Top Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between"><span>AI/ML</span><span>34 sessions</span></div>
              <div className="flex items-center justify-between"><span>Data Science</span><span>28 sessions</span></div>
              <div className="flex items-center justify-between"><span>Cybersecurity</span><span>18 sessions</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorAnalyticsPage;


