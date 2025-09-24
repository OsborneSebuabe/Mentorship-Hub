import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, User, RotateCcw, X } from 'lucide-react';

const initialUpcoming = [
  { id: '1', title: 'AI/ML Guidance', mentor: 'Dr. Asante', date: '2025-09-20', time: '14:00', type: 'video' },
];
const initialPast = [
  { id: '2', title: 'Career Roadmap', mentor: 'Mrs. Mensah', date: '2025-09-10', time: '10:00', type: 'in-person' },
];

const MySessionsPage = () => {
  const [upcoming, setUpcoming] = useState(initialUpcoming);
  const [past, setPast] = useState(initialPast);
  const [rescheduling, setRescheduling] = useState<Record<string, boolean>>({});
  const [newTime, setNewTime] = useState<Record<string, string>>({});
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">My Sessions</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="animate-fade-in-left">
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.map(s => (
                <div key={s.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{s.title}</h3>
                      <Badge variant="outline">{s.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">With {s.mentor} • {s.date} at {s.time}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    {rescheduling[s.id] ? (
                      <>
                        <input type="time" className="h-9 border rounded-md px-2 bg-background" value={newTime[s.id] || ''} onChange={(e) => setNewTime({ ...newTime, [s.id]: e.target.value })} />
                        <Button size="sm" variant="default" onClick={() => { setUpcoming(upcoming.map(u => u.id === s.id ? { ...u, time: newTime[s.id] || s.time } : u)); setRescheduling({ ...rescheduling, [s.id]: false }); }}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setRescheduling({ ...rescheduling, [s.id]: false })}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setRescheduling({ ...rescheduling, [s.id]: true })}><RotateCcw className="h-4 w-4 mr-1"/>Reschedule</Button>
                        <Button size="sm" variant="destructive" onClick={() => setUpcoming(upcoming.filter(u => u.id !== s.id))}><X className="h-4 w-4 mr-1"/>Cancel</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="animate-fade-in-right">
            <CardHeader>
              <CardTitle>Past</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {past.map(s => (
                <div key={s.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{s.title}</h3>
                      <Badge variant="outline">{s.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">With {s.mentor} • {s.date} at {s.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Notes</Button>
                    <Button size="sm">Book Again</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MySessionsPage;


