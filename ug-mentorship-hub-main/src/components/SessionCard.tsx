import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, Video, Users, MessageCircle } from 'lucide-react';

interface SessionCardProps {
  session: {
    id: string;
    title: string;
    mentor: string;
    mentorAvatar?: string;
    date: string;
    time: string;
    duration: number;
    type: 'online' | 'in-person';
    location?: string;
    status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
  };
  onJoin?: (sessionId: string) => void;
  onReschedule?: (sessionId: string) => void;
  onCancel?: (sessionId: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ 
  session, 
  onJoin, 
  onReschedule, 
  onCancel 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'pending': return 'outline';
      default: return 'default';
    }
  };

  const isUpcoming = session.status === 'upcoming';
  const isPending = session.status === 'pending';

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session.mentorAvatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {session.mentor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {session.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  with {session.mentor}
                </p>
              </div>
            </div>
            <Badge variant={getStatusColor(session.status)} className="capitalize">
              {session.status}
            </Badge>
          </div>

          {/* Session Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{session.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{session.time} ({session.duration}m)</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              {session.type === 'online' ? (
                <Video className="h-4 w-4" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              <span className="capitalize">
                {session.type === 'online' ? 'Online Meeting' : session.location || 'In-person'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>1-on-1 Session</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            {isUpcoming && onJoin && (
              <Button size="sm" variant="hero" onClick={() => onJoin(session.id)}>
                <Video className="h-4 w-4 mr-2" />
                Join Session
              </Button>
            )}
            {isPending && (
              <Button size="sm" variant="outline" disabled>
                <Clock className="h-4 w-4 mr-2" />
                Awaiting Confirmation
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => {}}>
              <MessageCircle className="h-4 w-4" />
            </Button>
            {(isUpcoming || isPending) && onReschedule && (
              <Button size="sm" variant="outline" onClick={() => onReschedule(session.id)}>
                Reschedule
              </Button>
            )}
            {(isUpcoming || isPending) && onCancel && (
              <Button size="sm" variant="destructive" onClick={() => onCancel(session.id)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};