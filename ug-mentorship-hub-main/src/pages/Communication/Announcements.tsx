import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnnouncementsPage = () => {
  const items = [
    { id: '1', title: 'Welcome to UG Mentorship Hub', body: 'We are live! Explore mentors and resources.' },
    { id: '2', title: 'Upcoming Webinar', body: 'Join our AI/ML careers webinar next week.' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Announcements</h1>
        {items.map((a, idx) => (
          <Card key={a.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
            <CardHeader>
              <CardTitle>{a.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{a.body}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;


