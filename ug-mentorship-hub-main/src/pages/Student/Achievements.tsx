import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Trophy } from 'lucide-react';

const badges = [
  { title: 'First Session', desc: 'Completed your first mentoring session', icon: Award },
  { title: 'Goal Setter', desc: 'Created 5 learning goals', icon: Trophy },
  { title: 'Resource Guru', desc: 'Downloaded 10 learning resources', icon: Award },
  { title: 'Interview Ready', desc: 'Finished interview prep checklist', icon: Trophy },
  { title: 'Consistency', desc: 'Attended 4 sessions in a month', icon: Award },
];

const AchievementsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Achievements & Badges</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b, idx) => (
            <Card key={b.title} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <b.icon className="h-8 w-8 text-warning" />
                  <Badge variant="outline">Badge</Badge>
                </div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;


