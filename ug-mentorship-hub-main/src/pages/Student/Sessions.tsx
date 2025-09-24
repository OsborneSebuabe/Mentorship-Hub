import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, User, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const sample = [
  { id: '1', title: 'AI/ML Guidance', mentor: 'Dr. Asante', date: '2025-09-20', time: '14:00', type: 'video' },
  { id: '2', title: 'Career Roadmap', mentor: 'Mrs. Mensah', date: '2025-09-22', time: '10:00', type: 'in-person' },
];

const StudentSessions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient flex items-center"><Calendar className="h-7 w-7 mr-2"/>Sessions</h1>
          <Button><Plus className="h-4 w-4 mr-1"/>Book Session</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {sample.map((s, idx) => (
            <Card key={s.id} className="card-hover animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{s.title}</span>
                  <Badge variant="outline">{s.type}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    {s.type === 'video' ? <Video className="h-4 w-4"/> : <User className="h-4 w-4"/>}
                    <span>With {s.mentor}</span>
                  </div>
                  <div>{s.date} • {s.time}</div>
                </div>
                <div className="pt-3">
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSessions;


