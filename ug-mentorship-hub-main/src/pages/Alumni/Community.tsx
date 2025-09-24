import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Search, TrendingUp, Flame } from 'lucide-react';

type Thread = {
  id: string;
  author: string;
  title: string;
  body: string;
  likes: number;
  replies: number;
  category: 'career' | 'general' | 'mentorship';
};

const initialThreads: Thread[] = [
  { id: '1', author: 'Nana Ama', title: 'Data science interview prep', body: 'What topics should I focus on?', likes: 12, replies: 4, category: 'career' },
  { id: '2', author: 'Kojo Mensah', title: 'Switching from academia to industry', body: 'How to position my research experience?', likes: 9, replies: 6, category: 'mentorship' },
  { id: '3', author: 'Akosua Owusu', title: 'Internship tips', body: 'How to make my application stand out?', likes: 7, replies: 2, category: 'career' },
];

const AlumniCommunity = () => {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [tab, setTab] = useState<'all' | 'trending' | 'new'>('all');
  const [query, setQuery] = useState('');
  const [composer, setComposer] = useState({ title: '', body: '' });

  const visible = useMemo(() => {
    let list = [...threads];
    if (tab === 'trending') list = list.sort((a, b) => b.likes - a.likes);
    if (tab === 'new') list = list.reverse();
    const q = query.toLowerCase();
    return list.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.body.toLowerCase().includes(q) ||
      t.author.toLowerCase().includes(q)
    );
  }, [threads, tab, query]);

  const postThread = () => {
    if (!composer.title || !composer.body) return;
    setThreads(prev => [{ id: Date.now().toString(), author: 'You', title: composer.title, body: composer.body, likes: 0, replies: 0, category: 'general' }, ...prev]);
    setComposer({ title: '', body: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gradient">Alumni Community</h1>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search threads" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trending" className="inline-flex items-center gap-1"><TrendingUp className="h-4 w-4"/>Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {visible.map(t => (
              <Card key={t.id} className="card-hover animate-fade-in">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">{t.author.split(' ').map(n=>n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{t.title}</h3>
                        <div className="text-xs text-muted-foreground flex items-center gap-3">
                          <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3"/>{t.likes}</span>
                          <span>{t.replies} replies</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{t.body}</p>
                      <div className="text-xs text-muted-foreground mt-2">By {t.author}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center"><MessageSquare className="h-5 w-5 mr-2"/>Start a discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Title" value={composer.title} onChange={(e) => setComposer({ ...composer, title: e.target.value })} />
            <Textarea placeholder="Write your post..." value={composer.body} onChange={(e) => setComposer({ ...composer, body: e.target.value })} />
            <div className="flex justify-end">
              <Button onClick={postThread}><Send className="h-4 w-4 mr-1"/>Post</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlumniCommunity;


