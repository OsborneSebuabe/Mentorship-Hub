import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Eye } from 'lucide-react';

const sessions = [
  { id: '1', title: 'AI/ML Guidance', student: 'John', mentor: 'Dr. Asante', time: '2025-09-20 14:00' },
  { id: '2', title: 'Career Roadmap', student: 'Jane', mentor: 'Mrs. Mensah', time: '2025-09-22 10:00' },
];

const SessionManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Session Management</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>All Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary"/>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.student} • {s.mentor} • {s.time}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-1"/>View</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionManagementPage;


