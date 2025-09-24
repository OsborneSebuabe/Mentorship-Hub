import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const items = [
  { name: 'Top Mentor: Dr. Asante', score: 150 },
  { name: 'Top Mentee: John Doe', score: 130 },
  { name: 'Active Contributor: Ama K.', score: 110 },
];

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Leaderboard</h1>
        <Card className="animate-fade-in">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">Rank</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.name} className="border-b">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{it.name}</td>
                    <td className="p-3">{it.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;


