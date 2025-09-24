import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Video, User, Check } from 'lucide-react';

const SessionBookingPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'online'|'in-person'>('online');
  const [confirmed, setConfirmed] = useState(false);

  const canBook = date && time;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Book a Session</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center"><Calendar className="h-5 w-5 mr-2"/>Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <div className="flex items-center gap-2">
              <Button variant={type==='online'?'default':'outline'} onClick={() => setType('online')}><Video className="h-4 w-4 mr-1"/>Online</Button>
              <Button variant={type==='in-person'?'default':'outline'} onClick={() => setType('in-person')}><User className="h-4 w-4 mr-1"/>In-person</Button>
            </div>
            <Button disabled={!canBook} onClick={() => setConfirmed(true)}>Confirm</Button>
          </CardContent>
        </Card>
        {confirmed && (
          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4 flex items-center text-success">
              <Check className="h-5 w-5 mr-2"/> Session confirmed on {date} at {time} ({type})
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SessionBookingPage;


