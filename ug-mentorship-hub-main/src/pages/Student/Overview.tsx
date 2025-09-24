import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';

const StudentOverview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient mb-2">Student Overview</h1>
          <p className="text-muted-foreground">Your mentorship snapshot at a glance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{ label: 'Active Mentors', value: 2, icon: Users, color: 'text-primary' }, { label: 'Goals', value: 5, icon: Target, color: 'text-accent' }, { label: 'Completed Tasks', value: 18, icon: CheckCircle2, color: 'text-success' }, { label: 'Upcoming Sessions', value: 1, icon: Calendar, color: 'text-warning' }].map((item, idx) => (
            <Card key={item.label} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-muted ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Keep your momentum going</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {['Complete profile', 'Book a session', 'Explore resources'].map((step) => (
              <Button key={step} variant="outline" className="justify-between">
                <span>{step}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentOverview;


