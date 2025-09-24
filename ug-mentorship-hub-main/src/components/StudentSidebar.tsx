import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Settings,
  User,
  Trophy,
  Bell,
  FileText,
  Target,
  TrendingUp
} from 'lucide-react';

const studentMenuItems = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: Home,
    description: "Overview and quick actions"
  },
  { 
    title: "Find Mentors", 
    url: "/mentors", 
    icon: Users,
    description: "Browse and connect with mentors"
  },
  { 
    title: "My Sessions", 
    url: "/sessions", 
    icon: Calendar,
    description: "Scheduled and past sessions"
  },
  { 
    title: "Messages", 
    url: "/messages", 
    icon: MessageSquare,
    description: "Chat with mentors",
    badge: "3"
  },
  { 
    title: "Resources", 
    url: "/resources", 
    icon: BookOpen,
    description: "Study materials and guides"
  },
  { 
    title: "Goals & Progress", 
    url: "/goals", 
    icon: Target,
    description: "Track your development"
  },
  { 
    title: "Achievements", 
    url: "/achievements", 
    icon: Trophy,
    description: "Your accomplishments"
  }
];

const quickStats = [
  { label: "Active Mentors", value: "3", color: "text-primary" },
  { label: "Sessions This Month", value: "8", color: "text-success" },
  { label: "Goals Completed", value: "12", color: "text-warning" }
];

export function StudentSidebar() {
  const sidebar = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  // Mock user data
  const user = {
    name: "John Doe",
    avatar: "/placeholder.svg",
    level: "Advanced",
    progress: 78
  };

  return (
    <Sidebar className="w-72" collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="px-3">
        {/* User Profile Section */}
        {(
          <Card className="mb-6 bg-gradient-primary text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-white/20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-white/20 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{user.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {user.level} Student
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-90">Progress</span>
                  <span className="font-medium">{user.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${user.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentMenuItems.map((item) => {
                const isItemActive = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`group relative ${
                        isItemActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <Link to={item.url} className="flex items-center space-x-3 px-3 py-2">
                        <item.icon className={`h-5 w-5 ${
                          isItemActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        }`} />
                        {!collapsed && (
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{item.title}</span>
                              {item.badge && (
                                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        {!collapsed && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30">
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                    <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Account Actions */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/profile" className="flex items-center space-x-3 px-3 py-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    {!collapsed && <span className="text-sm">Profile</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className="flex items-center space-x-3 px-3 py-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    {!collapsed && <span className="text-sm">Settings</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}