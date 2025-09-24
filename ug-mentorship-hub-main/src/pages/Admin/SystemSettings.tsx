import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SystemSettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [role, setRole] = useState('student');
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">System Settings</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Notifications</span>
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            </div>
            <div className="flex items-center justify-between">
              <span>Default Role</span>
              <select className="border rounded-md px-2 py-1" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="alumni">Alumni</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettingsPage;


