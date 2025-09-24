import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, Trash2 } from 'lucide-react';

const ResourceUploadPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [resources, setResources] = useState<{ name: string; category: string }[]>([
    { name: 'Academic Writing Guide.pdf', category: 'Writing' },
    { name: 'Interview Prep Kit.pdf', category: 'Career' },
  ]);
  const [category, setCategory] = useState('General');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient">Upload Resources</h1>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Upload a file</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input ref={inputRef} type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
              <Button onClick={() => inputRef.current?.click()}><Upload className="h-4 w-4 mr-1"/>Choose File</Button>
              {fileName && <div className="text-sm text-muted-foreground mt-2">Selected: {fileName}</div>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Category (e.g., Career)" value={category} onChange={(e) => setCategory(e.target.value)} />
              <Button disabled={!fileName} onClick={() => { if (fileName) { setResources([{ name: fileName, category }, ...resources]); setFileName(null); } }}>Submit</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Your Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resources.map((r, idx) => (
              <div key={idx} className="p-3 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.category}</div>
                  </div>
                </div>
                <Button size="sm" variant="destructive" onClick={() => setResources(resources.filter((_, i) => i!==idx))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceUploadPage;


