import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HelpCenterPage = () => {
  const faqs = [
    { q: 'How do I find a mentor?', a: 'Use the Mentor Matching page to browse and request.' },
    { q: 'How do I book a session?', a: 'Go to Session Booking and pick a time.' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Help Center</h1>
        {faqs.map((f, idx) => (
          <Card key={f.q} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
            <CardHeader>
              <CardTitle>{f.q}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{f.a}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HelpCenterPage;


