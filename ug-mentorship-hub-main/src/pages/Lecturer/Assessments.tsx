import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload } from 'lucide-react';

const items = [
  { title: 'Assignment 1 - Arrays', course: 'CSCD 201', submissions: 112 },
  { title: 'Mid-Sem Exam', course: 'CSCD 201', submissions: 118 },
];

const LecturerAssessments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Assessments</h1>
          <Button><Upload className="h-4 w-4 mr-1"/>Upload</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((it, idx) => (
            <Card key={it.title} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{it.title}</h3>
                    <p className="text-sm text-muted-foreground">{it.course}</p>
                  </div>
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{it.submissions} submissions</p>
                <div className="pt-3">
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturerAssessments;


