import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Search, Eye } from 'lucide-react';

type ResourceItem = {
  id: string;
  title: string;
  category: string;
  path: string; // relative to public
  type: 'pdf' | 'text' | 'link';
};

const RESOURCES: ResourceItem[] = [
  { id: 'guide', title: 'UG Mentorship Guide', category: 'Guides', path: '/resources/guide.txt', type: 'text' },
  { id: 'career', title: 'Career Roadmap', category: 'Career', path: '/resources/career-roadmap.pdf', type: 'pdf' },
  { id: 'interview', title: 'Interview Preparation', category: 'Career', path: '/resources/interview-prep.pdf', type: 'pdf' },
  { id: 'templates', title: 'CV Templates (External)', category: 'Career', path: 'https://www.overleaf.com/gallery/tagged/cv', type: 'link' },
];

const ResourceLibraryPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [viewer, setViewer] = useState<ResourceItem | null>(null);

  const categories = useMemo(() => Array.from(new Set(RESOURCES.map(r => r.category))), []);
  const filtered = useMemo(() => RESOURCES.filter(r =>
    (!category || r.category === category) &&
    (r.title.toLowerCase().includes(query.toLowerCase()))
  ), [query, category]);

  const handleDownload = (item: ResourceItem) => {
    const link = document.createElement('a');
    link.href = item.path;
    link.download = item.path.split('/').pop() || item.id;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-3xl font-bold text-gradient">Resource Library</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search resources..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10 w-72" />
            </div>
            <select className="border rounded-md h-10 px-3 bg-background" value={category ?? ''} onChange={(e) => setCategory(e.target.value || null)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, idx) => (
            <Card key={r.id} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant="outline">{r.category}</Badge>
                </div>
                <h3 className="font-semibold mb-2">{r.title}</h3>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" onClick={() => setViewer(r)}><Eye className="h-4 w-4 mr-1"/>View</Button>
                  <Button size="sm" onClick={() => handleDownload(r)}><Download className="h-4 w-4 mr-1"/>Download</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {viewer && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Preview: {viewer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {viewer.type === 'pdf' ? (
                <iframe src={viewer.path} className="w-full h-[70vh] border rounded-md" />
              ) : viewer.type === 'text' ? (
                <iframe src={viewer.path} className="w-full h-[60vh] border rounded-md bg-card" />
              ) : viewer.type === 'link' ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">This resource opens externally.</p>
                  <a href={viewer.path} target="_blank" rel="noreferrer" className="underline text-primary">Open link</a>
                </div>
              ) : null}
              <div className="pt-3">
                <Button variant="outline" onClick={() => setViewer(null)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourceLibraryPage;


