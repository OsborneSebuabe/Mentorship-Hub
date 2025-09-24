import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, Plus, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type Opportunity = {
  title: string;
  company: string;
  spots: number;
  location?: string;
  deadline?: string;
  tags?: string[];
};

const AlumniOpportunities = () => {
  const [items, setItems] = useState<Opportunity[]>([
    { title: 'UG Internship Program', company: 'UG IT Services', spots: 5, location: 'Legon, Accra', deadline: '2025-10-15', tags: ['Internship', 'IT'] },
    { title: 'Tech Corp Graduate Program', company: 'Tech Corp Ghana', spots: 12, location: 'Remote', deadline: '2025-11-01', tags: ['Graduate', 'Full-time'] },
  ]);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState<Opportunity>({ title: '', company: '', spots: 1, location: '', deadline: '', tags: [] });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter(it =>
      it.title.toLowerCase().includes(q) ||
      it.company.toLowerCase().includes(q) ||
      (it.location || '').toLowerCase().includes(q) ||
      (it.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }, [items, query]);

  const addOpportunity = () => {
    if (!form.title || !form.company) return;
    setItems(prev => [{ ...form, spots: Number(form.spots) || 1, tags: (form.tags || []).filter(Boolean) }, ...prev]);
    setForm({ title: '', company: '', spots: 1, location: '', deadline: '', tags: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-gradient">Opportunities</h1>
            <p className="text-sm text-muted-foreground mt-1">Discover or post internships, jobs, and projects</p>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by title, company, tag..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-1"/>Post Opportunity</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Post a new opportunity</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3">
                  <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <Input placeholder="Company / Organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                    <Input type="date" placeholder="Deadline" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="number" min={1} placeholder="Spots" value={form.spots} onChange={(e) => setForm({ ...form, spots: Number(e.target.value) })} />
                    <Input placeholder="Tags (comma separated)" value={(form.tags || []).join(', ')} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                  </div>
                  <Textarea placeholder="Short description (optional)" />
                  <div className="flex justify-end">
                    <Button onClick={addOpportunity}>Publish</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((it, idx) => (
            <Card key={it.title} className="card-hover animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{it.title}</span>
                  <Briefcase className="h-5 w-5 text-primary" />
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-xs">
                  <span className="truncate">{it.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {it.location || '—'}</span>
                  {it.deadline && (
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Apply by {it.deadline}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {(it.tags || []).map(t => (
                      <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                  <div className="text-muted-foreground">
                    {it.spots} spots
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniOpportunities;


