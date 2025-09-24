import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send, Search } from 'lucide-react';

type Thread = { id: string; student: string; last: string; unread: number };
const initialThreads: Thread[] = [
  { id: '1', student: 'John Doe', last: 'See you at 2pm', unread: 2 },
  { id: '2', student: 'Jane Smith', last: 'Shared the draft', unread: 0 },
  { id: '3', student: 'Michael Johnson', last: 'Thanks, prof!', unread: 1 },
];

const LecturerMessages = () => {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [active, setActive] = useState<Thread>(threads[0]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return threads.filter(t => t.student.toLowerCase().includes(q));
  }, [threads, query]);

  const send = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Messages</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 animate-fade-in-left">
            <CardHeader>
              <CardTitle className="flex items-center"><MessageSquare className="h-5 w-5 mr-2"/>Inbox</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="space-y-2 max-h-[420px] overflow-auto">
                {visible.map(t => (
                  <button key={t.id} onClick={() => setActive(t)} className={`w-full text-left p-3 border rounded-lg hover:bg-muted/50 ${active.id===t.id?'bg-primary/5':''}`}>
                    <div className="flex items-center gap-3">
                      <Avatar><AvatarFallback>{t.student.split(' ').map(n=>n[0]).join('').toUpperCase()}</AvatarFallback></Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{t.student}</span>
                          {t.unread>0 && <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">{t.unread}</span>}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{t.last}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 animate-fade-in-right">
            <CardHeader>
              <CardTitle>{active.student}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 border rounded-md mb-3 p-3 overflow-auto text-sm">
                <div className="text-muted-foreground">Conversation with {active.student}...</div>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button onClick={send}><Send className="h-4 w-4"/></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LecturerMessages;


