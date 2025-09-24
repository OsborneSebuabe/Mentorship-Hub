import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Star, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Mentor = { id: string; name: string; department: string; tags: string[]; rating: number };

const MENTORS: Mentor[] = [
  { id: '1', name: 'Dr. Kwame Asante', department: 'Computer Science', tags: ['AI/ML', 'Research'], rating: 4.9 },
  { id: '2', name: 'Mrs. Akua Mensah', department: 'Business', tags: ['Entrepreneurship', 'Product'], rating: 4.7 },
  { id: '3', name: 'Mr. Boateng Owusu', department: 'Engineering', tags: ['Embedded', 'IoT'], rating: 4.6 },
  { id: '4', name: 'Dr. Sarah Johnson', department: 'Computer Science', tags: ['Data Science', 'Python'], rating: 4.8 },
  { id: '5', name: 'Mr. James Tetteh', department: 'Mathematics', tags: ['Statistics', 'Data Analysis'], rating: 4.5 },
];

const MentorMatchingPage = () => {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [requested, setRequested] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const allTags = useMemo(() => Array.from(new Set(MENTORS.flatMap(m => m.tags))), []);
  const results = useMemo(() => MENTORS.filter(m => (
    (!tag || m.tags.includes(tag)) &&
    (m.name.toLowerCase().includes(query.toLowerCase()) || m.department.toLowerCase().includes(query.toLowerCase()))
  )), [query, tag]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient flex items-center"><Users className="h-7 w-7 mr-2"/>Mentor Matching</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Search mentors or department..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-72" />
            </div>
            <select className="border rounded-md h-10 px-3 bg-background" value={tag ?? ''} onChange={(e) => setTag(e.target.value || null)}>
              <option value="">All Tags</option>
              {allTags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <Button variant="outline"><Filter className="h-4 w-4 mr-1"/>Filters</Button>
            <Button><Sparkles className="h-4 w-4 mr-1"/>AI Recommend</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((m, idx) => (
            <Card key={m.id} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">{m.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{m.department}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {m.tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-warning mr-1"/> {m.rating}
                  </div>
                  {requested[m.id] ? (
                    <span className="text-sm text-success flex items-center"><CheckCircle2 className="h-4 w-4 mr-1"/>Requested</span>
                  ) : (
                    <Button size="sm" onClick={() => {
                      setRequested({ ...requested, [m.id]: true });
                      toast({ title: 'Match Requested', description: `We notified ${m.name}. You'll get a response soon.` });
                    }}>Request Match</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorMatchingPage;


