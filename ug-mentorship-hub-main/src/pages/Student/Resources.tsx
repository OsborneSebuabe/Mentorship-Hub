import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const items = [
  { title: 'Research Methodology 101', category: 'Academics', downloads: 120 },
  { title: 'Interview Prep Kit', category: 'Career', downloads: 240 },
  { title: 'CV Templates', category: 'Career', downloads: 98 },
  { title: 'Time Management', category: 'Productivity', downloads: 76 },
];

const StudentResources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Resources</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-10 w-72" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r, idx) => (
            <Card key={r.title} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant="outline">{r.category}</Badge>
                </div>
                <h3 className="font-semibold mb-2">{r.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{r.downloads} downloads</span>
                  <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1"/>Download</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentResources;


