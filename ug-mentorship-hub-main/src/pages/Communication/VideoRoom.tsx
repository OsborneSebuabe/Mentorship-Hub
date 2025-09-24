import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Mic, MicOff, PhoneOff } from 'lucide-react';

const VideoRoomPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Session Room</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Live Session (mock)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="w-full h-80 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
              <Video className="h-10 w-10 mr-2"/> Video Stream Placeholder
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><Mic className="h-4 w-4"/></Button>
              <Button variant="outline"><MicOff className="h-4 w-4"/></Button>
              <Button variant="destructive"><PhoneOff className="h-4 w-4"/></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoRoomPage;


