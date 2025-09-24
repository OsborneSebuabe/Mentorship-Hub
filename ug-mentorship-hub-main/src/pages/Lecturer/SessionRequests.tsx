import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { UserPlus, Check, X, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const initialRequests = [
  { id: '1', student: 'John Doe', topic: 'AI/ML', time: '2025-09-21 14:00', status: 'pending' },
  { id: '2', student: 'Jane Smith', topic: 'Data Science', time: '2025-09-22 10:00', status: 'pending' },
  { id: '3', student: 'Michael Johnson', topic: 'Cybersecurity', time: '2025-09-23 09:00', status: 'pending' },
];

const SessionRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected' | 'all'>('pending');

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return requests.filter(r =>
      (topic==='all' || r.topic === topic) &&
      (status==='all' || r.status === status) &&
      (r.student.toLowerCase().includes(q) || r.topic.toLowerCase().includes(q))
    );
  }, [requests, query, topic, status]);

  const updateStatus = (id: string, status: 'accepted' | 'rejected') => {
    setRequests(prev => prev.map(r => r.id===id ? { ...r, status } : r));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient flex items-center"><UserPlus className="h-7 w-7 mr-2"/>Session Requests</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or topic" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Topic" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All topics</SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs value={status} onValueChange={(v) => setStatus(v as any)}>
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-3">
                {visible.length === 0 && <div className="text-sm text-muted-foreground">No pending requests.</div>}
                {visible.map(r => (
                  <div key={r.id} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{r.student}</h3>
                        <Badge variant="outline">{r.topic}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" onClick={() => updateStatus(r.id, 'accepted')}><Check className="h-4 w-4 mr-1"/>Accept</Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(r.id, 'rejected')}><X className="h-4 w-4 mr-1"/>Reject</Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="accepted" className="space-y-3">
                {visible.length === 0 && <div className="text-sm text-muted-foreground">No accepted requests.</div>}
                {visible.map(r => (
                  <div key={r.id} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{r.student}</h3>
                        <Badge variant="outline">{r.topic}</Badge>
                        <Badge variant="secondary">Accepted</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.time}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-3">
                {visible.length === 0 && <div className="text-sm text-muted-foreground">No rejected requests.</div>}
                {visible.map(r => (
                  <div key={r.id} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{r.student}</h3>
                        <Badge variant="outline">{r.topic}</Badge>
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.time}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-3">
                {visible.length === 0 && <div className="text-sm text-muted-foreground">No requests.</div>}
                {visible.map(r => (
                  <div key={r.id} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{r.student}</h3>
                        <Badge variant="outline">{r.topic}</Badge>
                        <Badge variant={r.status==='accepted' ? 'secondary' : r.status==='rejected' ? 'destructive' : 'outline'} className="capitalize">{r.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.time}</p>
                    </div>
                    {r.status==='pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" onClick={() => updateStatus(r.id, 'accepted')}><Check className="h-4 w-4 mr-1"/>Accept</Button>
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(r.id, 'rejected')}><X className="h-4 w-4 mr-1"/>Reject</Button>
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionRequests;


