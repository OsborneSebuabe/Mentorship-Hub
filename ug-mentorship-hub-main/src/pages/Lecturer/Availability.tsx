import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AvailabilityPage = () => {
  const { toast } = useToast();
  const [slots, setSlots] = useState<{ date: Date; start: string; end: string }[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [start, setStart] = useState('14:00');
  const [end, setEnd] = useState('16:00');

  const formattedSlots = useMemo(() => slots.sort((a, b) => a.date.getTime() - b.date.getTime()), [slots]);

  const addSlot = () => {
    if (!date) return;
    setSlots(prev => [{ date, start, end }, ...prev]);
    toast({ title: 'Slot added', description: `${date.toDateString()} • ${start}-${end}` });
  };

  const removeSlot = (idx: number) => {
    setSlots(prev => prev.filter((_, i) => i !== idx));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient flex items-center"><CalendarIcon className="h-7 w-7 mr-2"/>Availability</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Add Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="grid grid-cols-2 gap-3">
              <Select value={start} onValueChange={setStart}>
                <SelectTrigger><SelectValue placeholder="Start" /></SelectTrigger>
                <SelectContent>
                  {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={end} onValueChange={setEnd}>
                <SelectTrigger><SelectValue placeholder="End" /></SelectTrigger>
                <SelectContent>
                  {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button onClick={addSlot}><Plus className="h-4 w-4 mr-1"/>Add Slot</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Upcoming Office Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {formattedSlots.length === 0 ? (
              <div className="text-sm text-muted-foreground">No slots yet. Add your availability above.</div>
            ) : (
              formattedSlots.map((s, i) => (
                <div key={i} className="p-3 border rounded-lg flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">{s.date.toDateString()}</div>
                    <div className="text-muted-foreground">{s.start} - {s.end}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Open</Badge>
                    <Button size="sm" variant="destructive" onClick={() => removeSlot(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvailabilityPage;


