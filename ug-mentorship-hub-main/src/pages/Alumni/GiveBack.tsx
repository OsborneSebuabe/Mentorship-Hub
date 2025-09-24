import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Users } from 'lucide-react';

const AlumniGiveBack = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Give Back</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2"><Gift className="h-5 w-5"/><span>Support UG Mentorship</span></CardTitle>
          </CardHeader>
          <CardContent className="space-x-2">
            <Button variant="outline">Donate</Button>
            <Button>Offer Mentorship</Button>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2"><Users className="h-5 w-5"/><span>Volunteer</span></CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Participate in events, talks, and student mentorship drives.</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlumniGiveBack;


