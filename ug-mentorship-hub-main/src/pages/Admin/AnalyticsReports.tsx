import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, BookOpen } from 'lucide-react';

const AnalyticsReportsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Analytics & Reports</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="card-hover text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 mx-auto text-primary mb-2"/>
              <h3 className="text-2xl font-bold">2,547</h3>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card className="card-hover text-center">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 mx-auto text-accent mb-2"/>
              <h3 className="text-2xl font-bold">1,234</h3>
              <p className="text-sm text-muted-foreground">Completed Sessions</p>
            </CardContent>
          </Card>
          <Card className="card-hover text-center">
            <CardContent className="p-6">
              <BarChart3 className="h-12 w-12 mx-auto text-success mb-2"/>
              <h3 className="text-2xl font-bold">+15%</h3>
              <p className="text-sm text-muted-foreground">Monthly Growth</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;


