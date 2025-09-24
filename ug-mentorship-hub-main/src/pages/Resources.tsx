import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Download, 
  Eye, 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink,
  Filter,
  Plus,
  TrendingUp,
  Star
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Resource {
  id: string;
  title: string;
  description: string;
  content_type: string;
  resource_url?: string;
  file_path?: string;
  category: string;
  tags: string[];
  download_count: number;
  uploaded_by?: {
    full_name: string;
    role: string;
  };
  created_at: string;
}

const Resources = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Resources', count: 0 },
    { id: 'Career', name: 'Career Planning', count: 0 },
    { id: 'Research', name: 'Research Methods', count: 0 },
    { id: 'Life Skills', name: 'Life Skills', count: 0 },
    { id: 'Networking', name: 'Networking', count: 0 },
  ];

  const mockResources: Resource[] = [
    {
      id: '1',
      title: 'Complete Career Planning Guide',
      description: 'A comprehensive guide to planning your career path from university to professional success.',
      content_type: 'pdf',
      resource_url: '#',
      category: 'Career',
      tags: ['career', 'planning', 'guidance'],
      download_count: 234,
      uploaded_by: { full_name: 'Dr. Kwame Asante', role: 'lecturer' },
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Research Methodology Fundamentals',
      description: 'Essential research methods and techniques for academic excellence.',
      content_type: 'video',
      resource_url: '#',
      category: 'Research',
      tags: ['research', 'methodology', 'academic'],
      download_count: 189,
      uploaded_by: { full_name: 'Prof. Ama Serwaa', role: 'lecturer' },
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      title: 'Interview Preparation Toolkit',
      description: 'Everything you need to ace your next job interview.',
      content_type: 'document',
      resource_url: '#',
      category: 'Career',
      tags: ['interview', 'preparation', 'job'],
      download_count: 156,
      uploaded_by: { full_name: 'John Mensah', role: 'alumni' },
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: '4',
      title: 'Networking for Students',
      description: 'Build meaningful professional relationships during your university years.',
      content_type: 'link',
      resource_url: '#',
      category: 'Networking',
      tags: ['networking', 'professional', 'relationships'],
      download_count: 98,
      uploaded_by: { full_name: 'Sarah Osei', role: 'alumni' },
      created_at: new Date(Date.now() - 259200000).toISOString(),
    },
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      // For now, use mock data
      setResources(mockResources);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast({
        title: 'Error',
        description: 'Failed to load resources',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleDownload = async (resource: Resource) => {
    // Simulate download
    toast({
      title: 'Download Started',
      description: `Downloading "${resource.title}"`,
    });
    
    // In a real app, increment download count
    setResources(prev => 
      prev.map(r => 
        r.id === resource.id 
          ? { ...r, download_count: r.download_count + 1 }
          : r
      )
    );
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="h-5 w-5 text-destructive" />;
      case 'video':
        return <Video className="h-5 w-5 text-primary" />;
      case 'link':
        return <ExternalLink className="h-5 w-5 text-success" />;
      default:
        return <BookOpen className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.download_count - a.download_count;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-muted-foreground">Loading resources...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Resource Library</h1>
              <p className="text-muted-foreground mt-2">
                Discover learning materials, career guides, and research resources
              </p>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Back to Dashboard
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: BookOpen, label: 'Total Resources', value: resources.length, color: 'text-primary' },
            { icon: Download, label: 'Total Downloads', value: resources.reduce((sum, r) => sum + r.download_count, 0), color: 'text-success' },
            { icon: TrendingUp, label: 'This Month', value: '23', color: 'text-warning' },
            { icon: Star, label: 'Featured', value: '8', color: 'text-destructive' }
          ].map((stat, index) => (
            <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map((resource, index) => (
            <Card key={resource.id} className="group hover:shadow-medium transition-all duration-300 animate-fade-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start space-x-3">
                  {getResourceIcon(resource.content_type)}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {resource.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>{resource.download_count} downloads</span>
                    </div>
                    <Badge variant="outline">
                      {resource.category}
                    </Badge>
                  </div>

                  {/* Author */}
                  {resource.uploaded_by && (
                    <div className="text-sm text-muted-foreground">
                      by {resource.uploaded_by.full_name} • {resource.uploaded_by.role}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="hero"
                      onClick={() => handleDownload(resource)}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Resources will appear here once they are uploaded'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;