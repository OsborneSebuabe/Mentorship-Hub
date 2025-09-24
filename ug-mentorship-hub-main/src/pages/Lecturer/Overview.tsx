import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, Calendar, Star } from 'lucide-react';

const LecturerOverview = () => {
  const items = [
    { label: 'Mentees', value: 12, icon: Users, color: 'text-primary' },
    { label: 'Active Sessions', value: 3, icon: Activity, color: 'text-success' },
    { label: 'Upcoming', value: 4, icon: Calendar, color: 'text-warning' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'text-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gradient">Lecturer Overview</h1>
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
      </div>
    </div>
  );
};

export default LecturerOverview;


