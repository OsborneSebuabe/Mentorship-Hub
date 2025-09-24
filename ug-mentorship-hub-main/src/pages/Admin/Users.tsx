import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, UserPlus } from 'lucide-react';

const AdminUsers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Users</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10 w-72" />
            </div>
            <Button variant="outline"><Filter className="h-4 w-4 mr-1"/>Filter</Button>
            <Button><UserPlus className="h-4 w-4 mr-1"/>Add</Button>
          </div>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Directory</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Listing table goes here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;


