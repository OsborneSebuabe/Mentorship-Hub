import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  Settings,
  MessageSquare,
  Calendar,
  Award,
  Target,
  Activity,
  UserCheck,
  UserX,
  Eye,
  Edit,
  Trash2,
  Bell,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminTopNav from '@/components/AdminTopNav';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 2547,
    activeMatches: 189,
    completedSessions: 1234,
    pendingApprovals: 12,
    averageRating: 4.8,
    monthlyGrowth: 15.3
  };

  const recentActivity = [
    {
      id: '1',
      type: 'new_user',
      message: 'New student registration: John Doe (Engineering)',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'mentor_approval',
      message: 'Mentor application approved: Dr. Sarah Johnson',
      timestamp: '15 minutes ago',
      status: 'info'
    },
    {
      id: '3',
      type: 'session_completed',
      message: 'Mentoring session completed: AI/ML Discussion',
      timestamp: '1 hour ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'alert',
      message: 'High volume of match requests in Computer Science',
      timestamp: '2 hours ago',
      status: 'warning'
    }
  ];

  const pendingApprovals = [
    {
      id: '1',
      name: 'Prof. Kwame Asante',
      email: 'k.asante@ug.edu.gh',
      type: 'Faculty',
      department: 'Computer Science',
      experience: '15 years',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Sarah Mensah',
      email: 's.mensah@gmail.com',
      type: 'Alumni',
      department: 'Business',
      company: 'Tech Corp Ghana',
      status: 'pending'
    }
  ];

  const systemMetrics = [
    { label: 'Server Uptime', value: '99.9%', status: 'success' },
    { label: 'Response Time', value: '245ms', status: 'success' },
    { label: 'Active Sessions', value: '157', status: 'info' },
    { label: 'Error Rate', value: '0.01%', status: 'success' }
  ];

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? 'Approved' : 'Rejected',
      description: `Mentor application has been ${action}d.`,
    });
  };

  const handleExport = (type: string) => {
    toast({
      title: 'Export Started',
      description: `${type} data export has been initiated.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto">
        <AdminTopNav />
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl font-bold text-gradient truncate">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage and monitor the UG Mentorship Hub platform</p>
            </div>
            <div className="flex items-center gap-3 w-full max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users, sessions, reports..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('All')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="default" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="card-hover animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Matches</p>
                  <p className="text-2xl font-bold text-success">{stats.activeMatches}</p>
                </div>
                <UserCheck className="h-8 w-8 text-success opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                  <p className="text-2xl font-bold text-accent">{stats.completedSessions}</p>
                </div>
                <BookOpen className="h-8 w-8 text-accent opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">{stats.pendingApprovals}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-warning opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold text-primary">{stats.averageRating}</p>
                </div>
                <Award className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth</p>
                  <p className="text-2xl font-bold text-success">+{stats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'User Management', icon: Users, href: '/admin/users', desc: 'Add, edit, and manage users' },
            { label: 'Approvals', icon: UserCheck, href: '/admin/overview#approvals', desc: 'Review pending mentors' },
            { label: 'Reports', icon: BarChart3, href: '/admin/analytics-reports', desc: 'Export analytics & KPIs' },
            { label: 'System Settings', icon: Settings, href: '/admin/system-settings', desc: 'Configure platform' },
          ].map((item, idx) => (
            <Card key={item.label} className="card-hover animate-scale-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon className="h-5 w-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm"><a href={item.href}>Open</a></Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="card-hover animate-fade-in-left">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Filter activity..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline" size="sm">
                          <Bell className="h-4 w-4 mr-2" />
                          Notify
                        </Button>
                      </div>
                      {recentActivity
                        .filter(a => a.message.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === 'success' ? 'bg-success' :
                            activity.status === 'warning' ? 'bg-warning' : 'bg-primary'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card className="card-hover animate-fade-in-right">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Admin
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Send Notification
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Users Snapshot */}
            <Card className="card-hover animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Users Snapshot</span>
                </CardTitle>
                <CardDescription>Recently active users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'John Doe', role: 'student', status: 'Active' },
                      { name: 'Dr. Sarah Johnson', role: 'lecturer', status: 'Pending' },
                      { name: 'Nana Ama', role: 'alumni', status: 'Active' },
                    ].map((u) => (
                      <TableRow key={u.name}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell className="capitalize">{u.role}</TableCell>
                        <TableCell>{u.status}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4 mr-1" /> Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card className="card-hover animate-fade-in">
              <CardHeader>
                <CardTitle>Pending Mentor Approvals</CardTitle>
                <CardDescription>
                  Review and approve mentor applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{application.name}</h3>
                          <Badge variant="outline">{application.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{application.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {application.department} • {application.experience || application.company}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="default" onClick={() => handleApproval(application.id, 'approve')}>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleApproval(application.id, 'reject')}>
                          <UserX className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-hover animate-scale-in">
                <CardHeader className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-success">+{stats.monthlyGrowth}%</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="text-center">
                  <PieChart className="h-12 w-12 mx-auto text-accent mb-2" />
                  <CardTitle>Match Success</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-success">94.2%</p>
                  <p className="text-sm text-muted-foreground">Success rate</p>
                </CardContent>
              </Card>

              <Card className="card-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="text-center">
                  <LineChart className="h-12 w-12 mx-auto text-warning mb-2" />
                  <CardTitle>Engagement</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-primary">87.5%</p>
                  <p className="text-sm text-muted-foreground">Active users</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-hover animate-fade-in-left">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metric.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{metric.value}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            metric.status === 'success' ? 'bg-success' :
                            metric.status === 'warning' ? 'bg-warning' : 'bg-primary'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover animate-fade-in-right">
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    Clear Cache
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    Update Database
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    Backup System
                  </Button>
                  <Button className="w-full justify-start" variant="destructive">
                    Maintenance Mode
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="card-hover animate-fade-in">
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>
                  Export detailed reports for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col" variant="outline" onClick={() => handleExport('Users')}>
                    <Users className="h-6 w-6 mb-2" />
                    User Report
                  </Button>
                  <Button className="h-20 flex-col" variant="outline" onClick={() => handleExport('Sessions')}>
                    <BookOpen className="h-6 w-6 mb-2" />
                    Session Report
                  </Button>
                  <Button className="h-20 flex-col" variant="outline" onClick={() => handleExport('Analytics')}>
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Analytics Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;