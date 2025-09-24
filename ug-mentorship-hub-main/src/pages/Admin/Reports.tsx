import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3, Users, BookOpen } from 'lucide-react';

const AdminReports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Reports</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>Export detailed analytics</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {[{icon: Users, label: 'User Report'}, {icon: BookOpen, label: 'Session Report'}, {icon: BarChart3, label: 'Analytics Report'}].map((r) => (
              <Button key={r.label} className="h-20 flex-col" variant="outline">
                <r.icon className="h-6 w-6 mb-2" />
                {r.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;


