import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageCircle, Calendar, Award } from 'lucide-react';

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    role: string;
    department: string;
    expertise: string[];
    rating: number;
    sessionsCompleted: number;
    avatar?: string;
    isOnline: boolean;
  };
  onMessage: (mentorId: string) => void;
  onBookSession: (mentorId: string) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor, onMessage, onBookSession }) => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={mentor.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {mentor.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-success rounded-full border-2 border-background"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {mentor.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {mentor.department} • {mentor.role}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-warning fill-warning" />
                <span className="text-sm font-medium">{mentor.rating}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {mentor.expertise.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {mentor.expertise.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{mentor.expertise.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Award className="h-3 w-3" />
                <span>{mentor.sessionsCompleted} sessions</span>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => onMessage(mentor.id)}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="hero" onClick={() => onBookSession(mentor.id)}>
                  <Calendar className="h-4 w-4 mr-1" />
                  Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};