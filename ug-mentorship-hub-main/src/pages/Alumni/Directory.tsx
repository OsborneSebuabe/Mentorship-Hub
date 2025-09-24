import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Alumni = { id: string; name: string; year: number; field: string; skills: string[] };
const DATA: Alumni[] = [
  { id: '1', name: 'Ama Kofi', year: 2019, field: 'AI/ML', skills: ['Python', 'ML'] },
  { id: '2', name: 'Yaw Mensah', year: 2017, field: 'Product', skills: ['PM', 'Agile'] },
];

const AlumniDirectoryPage = () => {
  const [query, setQuery] = useState('');
  const results = useMemo(() => DATA.filter(a => (
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.field.toLowerCase().includes(query.toLowerCase()) ||
    a.year.toString().includes(query)
  )), [query]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Alumni Directory</h1>
        <Input placeholder="Search by name, field, or year" value={query} onChange={(e) => setQuery(e.target.value)} className="w-80" />
        <div className="grid md:grid-cols-2 gap-4">
          {results.map(a => (
            <Card key={a.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{a.name}</h3>
                    <p className="text-sm text-muted-foreground">Class of {a.year} • {a.field}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {a.skills.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                    </div>
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

export default AlumniDirectoryPage;


