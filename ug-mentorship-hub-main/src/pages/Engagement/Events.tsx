import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const items = [
  { title: 'Mentorship Kickoff', date: '2025-10-01', location: 'UG Main Hall' },
  { title: 'AI Careers Webinar', date: '2025-10-10', location: 'Online' },
];

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Events</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((e, idx) => (
            <Card key={e.title} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/>{e.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{e.date} • {e.location}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;


