import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, FileText, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accept?: Record<string, string[]>;
  isImage?: boolean;
  onChange?: (file: File | undefined) => void;
  errorMessage?: string;
}

const FileUploadCard = ({
  title,
  description,
  icon: Icon,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg'],
    'application/pdf': ['.pdf'],
  },
  isImage = true,
  onChange,
  errorMessage,
}: FileUploadCardProps) => {
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setError('');
      setCurrentFile(file);

      if (file.type === 'application/pdf') {
        setPreview(file.name);
      } else {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }

      onChange?.(file);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDropRejected: (fileRejections) => {
      const errorCode = fileRejections[0].errors[0].code;
      if (errorCode === 'file-too-large')
        setError('حجم الملف كبير جداً (الأقصى 5MB)');
      else if (errorCode === 'file-invalid-type')
        setError('نوع الملف غير مدعوم');
      else setError('حدث خطأ في رفع الملف');
    },
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    setError('');
    setCurrentFile(null);
    onChange?.(undefined as unknown as File);
  };

  return (
    <div className="w-full space-y-2">
      <Card
        {...getRootProps()}
        className={cn(
          'relative flex min-h-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-6 text-center shadow-none ring-0 transition-all duration-200',

          isDragActive
            ? 'border-primary bg-primary/5 ring-primary/10 scale-[1.01]'
            : 'border-border bg-card hover:border-primary/50 hover:bg-accent/5',

          error || errorMessage
            ? 'border-destructive bg-destructive/5'
            : preview
              ? 'border-primary bg-primary/5 shadow-sm'
              : '',
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="animate-in fade-in zoom-in-95 relative duration-300">
            <div className="flex flex-col items-center space-y-4">
              {isImage && !currentFile?.name.endsWith('.pdf') ? (
                <div className="border-border relative h-72 max-w-72 overflow-hidden rounded-lg border shadow-md">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl shadow-inner">
                  <FileText className="text-primary h-10 w-10" />
                </div>
              )}

              <div className="max-w-full px-2">
                <p className="text-foreground truncate text-sm font-semibold">
                  {currentFile?.name || preview}
                </p>
                {currentFile && (
                  <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                    {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>

            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
              className="absolute -top-4 -right-2 h-8 w-8 cursor-pointer rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 py-2">
            <div className="bg-secondary text-primary flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110">
              <Icon size={24} />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-foreground text-sm font-bold tracking-tight">
                {isDragActive ? 'أفلت الملف هنا الآن' : title}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {description}
              </p>
            </div>

            <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium shadow-sm transition-colors">
              استعراض الملفات
            </div>
          </div>
        )}
      </Card>

      {(error || errorMessage) && (
        <p className="animate-in slide-in-from-top-1 text-destructive flex items-center gap-1.5 text-sm">
          {error || errorMessage}
        </p>
      )}
    </div>
  );
};

export default FileUploadCard;
