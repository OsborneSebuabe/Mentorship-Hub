import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

const ForumsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Discussion Forums</h1>
        <div className="flex gap-2">
          <Input placeholder="Start a topic..." />
          <Button><MessageSquarePlus className="h-4 w-4 mr-1"/>Post</Button>
        </div>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Topics and threads will appear here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForumsPage;


