import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flag, Check, X } from 'lucide-react';

const flagged = [
  { id: '1', type: 'Post', reason: 'Inappropriate language', author: 'Anon123' },
  { id: '2', type: 'Comment', reason: 'Spam', author: 'User456' },
];

const ContentModerationPage = () => {
  const [items, setItems] = useState(flagged);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Content Moderation</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Flagged Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map(i => (
              <div key={i.id} className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-warning"/>
                  <div>
                    <h3 className="font-semibold">{i.type}</h3>
                    <p className="text-sm text-muted-foreground">{i.reason} • by {i.author}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" onClick={() => setItems(items.filter(x => x.id !== i.id))}><Check className="h-4 w-4 mr-1"/>Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => setItems(items.filter(x => x.id !== i.id))}><X className="h-4 w-4 mr-1"/>Remove</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentModerationPage;


