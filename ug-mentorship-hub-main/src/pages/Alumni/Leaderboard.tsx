import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const items = [
  { name: 'Ama Kofi', points: 120 },
  { name: 'Yaw Mensah', points: 95 },
  { name: 'Kojo Boateng', points: 80 },
];

const AlumniLeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Alumni Leaderboard</h1>
        <Card className="animate-fade-in">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">Rank</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Points</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.name} className="border-b">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{it.name}</td>
                    <td className="p-3">{it.points}</td>
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

export default AlumniLeaderboardPage;


