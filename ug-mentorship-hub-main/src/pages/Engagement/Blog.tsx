import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const posts = [
  { title: 'My Mentorship Journey', author: 'Ama K.', excerpt: 'How mentorship shaped my career...' },
  { title: 'Preparing for Tech Interviews', author: 'Yaw M.', excerpt: 'Tips and strategies to succeed...' },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Blog & Articles</h1>
        <div className="space-y-4">
          {posts.map((p, idx) => (
            <Card key={p.title} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">By {p.author} • {p.excerpt}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;


