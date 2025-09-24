import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SurveysFeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Surveys & Feedback</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Session Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(n => (
                <button key={n} className={`h-8 w-8 rounded-full border ${rating >= n ? 'bg-warning' : ''}`} onClick={() => setRating(n)} />
              ))}
            </div>
            <textarea className="w-full h-28 border rounded-md p-2 bg-background" placeholder="Your comments..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button disabled={!rating}>Submit</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurveysFeedbackPage;


