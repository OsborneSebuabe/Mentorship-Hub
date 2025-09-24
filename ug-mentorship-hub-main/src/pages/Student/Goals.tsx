import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, CheckCircle2 } from 'lucide-react';

interface Goal { id: string; title: string; progress: number; }

const StudentGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Finish capstone proposal', progress: 60 },
    { id: '2', title: 'Apply for internship', progress: 30 },
  ]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([{ id: Date.now().toString(), title: newGoal.trim(), progress: 0 }, ...goals]);
    setNewGoal('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient flex items-center"><Target className="h-7 w-7 mr-2"/>Goals</h1>
          <div className="flex space-x-2">
            <Input value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Add a new goal" className="w-64" />
            <Button onClick={addGoal}><Plus className="h-4 w-4 mr-1"/>Add</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {goals.map((g, idx) => (
            <Card key={g.id} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{g.title}</span>
                  <Badge variant="outline">{g.progress}%</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${g.progress}%` }}></div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setGoals(goals.map(x => x.id === g.id ? { ...x, progress: Math.min(100, x.progress + 10) } : x))}>+10%</Button>
                  <Button variant="default" size="sm" onClick={() => setGoals(goals.map(x => x.id === g.id ? { ...x, progress: 100 } : x))}><CheckCircle2 className="h-4 w-4 mr-1"/>Complete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentGoals;


