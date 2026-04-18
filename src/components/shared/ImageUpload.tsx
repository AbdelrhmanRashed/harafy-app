import { useState } from 'react';
import { CameraIcon, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
  label?: string;
  description?: string;
}

export function ImageUpload({
  onImagesChange,
  maxImages = 5,
  label = 'الصور التوضيحية',
  description = 'PNG, JPG (حتى 5 صور)',
}: ImageUploadProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageDrop = (files: File[]) => {
    if (!files.length) return;

    const previews = files.map((f) => URL.createObjectURL(f));
    const newFiles = [...imageFiles, ...files].slice(0, maxImages);
    const newPreviews = [...imagePreviews, ...previews].slice(0, maxImages);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    onImagesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    disabled: imagePreviews.length >= maxImages,
  });

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((prev, i) => {
      if (i === index) URL.revokeObjectURL(prev);
      return i !== index;
    });

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    onImagesChange(newFiles);
  };

  return (
    <div className="space-y-2">
      <label className="text-foreground block text-xs font-bold sm:text-sm">
        {label}{' '}
        {maxImages > 0 && (
          <span className="text-muted-foreground">(اختياري)</span>
        )}
      </label>

      {/* Previews */}
      {imagePreviews.length > 0 && (
        <div className="mb-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {imagePreviews.map((src, i) => (
            <div
              key={i}
              className="border-border group relative overflow-hidden rounded-xl border"
            >
              <img
                src={src}
                alt={`uploaded ${i}`}
                className="h-20 w-full object-cover transition-transform group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="hover:bg-destructive/90 absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {imagePreviews.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-border/60 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 py-6 transition-colors sm:rounded-2xl sm:py-8 ${
            isDragActive
              ? 'bg-primary/5 border-primary border-dashed'
              : 'bg-muted/30 hover:bg-muted/50 border-dashed'
          }`}
        >
          <input {...getInputProps()} />
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl">
            <CameraIcon className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-foreground text-xs font-bold sm:text-sm">
            {isDragActive ? 'أفلت الصور هنا...' : 'رفع صور توضيحية'}
          </span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      )}
    </div>
  );
}
