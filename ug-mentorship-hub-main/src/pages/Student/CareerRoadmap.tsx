import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const steps = [
  { title: 'Foundations', desc: 'Master data structures, algorithms, OOP, databases, networking basics.' },
  { title: 'Projects', desc: 'Build 3-5 projects; include testing, docs, and deploy to cloud.' },
  { title: 'Internships', desc: 'Apply every semester; tailor CV; get strong references.' },
  { title: 'Interviews', desc: 'Daily DSA practice, system design, behavioral STAR stories.' },
  { title: 'Growth', desc: 'Contribute to OSS, speak at events, mentor juniors, leadership.' },
];

const CareerRoadmapPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Career Roadmap</h1>
          <a href="/resources/career-roadmap.pdf" download className="inline-block">
            <Button><Download className="h-4 w-4 mr-1"/>Download PDF</Button>
          </a>
        </div>
        <div className="space-y-4">
          {steps.map((s, idx) => (
            <Card key={s.title} className="card-hover animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardHeader>
                <CardTitle>{idx + 1}. {s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmapPage;


