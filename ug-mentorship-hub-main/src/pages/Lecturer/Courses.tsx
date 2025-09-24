import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';

const courses = [
  { code: 'CSCD 201', title: 'Data Structures', students: 120 },
  { code: 'CSCD 301', title: 'Algorithms', students: 98 },
];

const LecturerCourses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Courses</h1>
          <Button><Plus className="h-4 w-4 mr-1"/>Add Course</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((c, idx) => (
            <Card key={c.code} className="card-hover animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{c.code} • {c.title}</span>
                  <BookOpen className="h-5 w-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {c.students} students enrolled
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturerCourses;


