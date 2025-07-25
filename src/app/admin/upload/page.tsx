
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, CheckCircle, AlertCircle, Loader, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setStatus('idle');
      setUploadedUrl(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'Файл не вибрано',
        description: 'Будь ласка, виберіть файл для завантаження.',
        variant: 'destructive',
      });
      return;
    }

    setStatus('uploading');
    setUploadedUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Щось пішло не так');
      }
      
      setUploadedUrl(result.url);
      setStatus('success');
      toast({
        title: 'Успішно завантажено!',
        description: `Файл ${file.name} успішно завантажено.`,
      });
    } catch (error: any) {
      setStatus('error');
      toast({
        title: 'Помилка завантаження',
        description: error.message || 'Не вдалося завантажити файл.',
        variant: 'destructive',
      });
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadedUrl(null);
    setStatus('idle');
  }

  return (
    <main className="container flex-grow py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Завантажити зображення</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              {...getRootProps()}
              className={`relative flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/70'}`}
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 font-semibold text-foreground">
                  {isDragActive ? 'Відпустіть файл тут...' : 'Перетягніть файл або клацніть для вибору'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, WEBP</p>
              </div>
            </div>

            {file && (
              <div className="p-4 border rounded-lg flex items-center justify-between gap-4 bg-muted/50">
                  <div className="flex items-center gap-4">
                     <ImageIcon className="h-6 w-6 text-primary" />
                     <span className="font-medium text-sm truncate">{file.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={removeFile} className="h-7 w-7">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Видалити файл</span>
                  </Button>
              </div>
            )}

            <Button onClick={handleUpload} disabled={!file || status === 'uploading'} className="w-full">
              {status === 'uploading' && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {status === 'uploading' ? 'Завантаження...' : 'Завантажити файл'}
            </Button>

            {status === 'success' && uploadedUrl && (
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                            <h3 className="font-semibold text-green-800">Файл успішно завантажено</h3>
                        </div>
                        <p className="text-sm text-green-700">URL вашого зображення:</p>
                        <Input readOnly value={uploadedUrl} className="bg-white" />
                         <div className="relative aspect-video w-full max-w-sm mx-auto mt-4 rounded-md overflow-hidden border">
                           <Image src={uploadedUrl} alt="Завантажене зображення" layout="fill" objectFit="contain" />
                         </div>
                    </CardContent>
                </Card>
            )}
             {status === 'error' && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">Не вдалося завантажити файл. Спробуйте ще раз.</p>
                </div>
            )}

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
