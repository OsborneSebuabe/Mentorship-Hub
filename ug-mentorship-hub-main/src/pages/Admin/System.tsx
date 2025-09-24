import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, HardDriveDownload, RefreshCcw } from 'lucide-react';

const AdminSystem = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">System</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="animate-fade-in-left">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Server className="h-5 w-5 text-success"/>
                <span>Uptime: 99.9% • Response: 245ms • Errors: 0.01%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in-right">
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-x-2">
              <Button variant="outline"><RefreshCcw className="h-4 w-4 mr-1"/>Clear Cache</Button>
              <Button variant="outline"><HardDriveDownload className="h-4 w-4 mr-1"/>Backup</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSystem;


