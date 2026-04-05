import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { UpdateClientProfileFormValues } from '../schema/profile.schema';
import defaultAvatar from '@/assets/images/profileImage.png';
import { getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ClientAvatarUploadProps {
  control: Control<UpdateClientProfileFormValues>;
  currentPictureUrl?: string | null;
}

const ClientAvatarUpload = ({
  control,
  currentPictureUrl,
}: ClientAvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    getImageUrl(currentPictureUrl) ?? null,
  );

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ control, name: 'Picture' });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <FormItem>
      <FormLabel>صورة الملف الشخصي</FormLabel>
      <div className="flex items-center gap-6">
        {/* Avatar preview */}
        <div className="relative inline-block">
          <div className="ring-secondary bg-muted border-secondary flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-0 shadow-md ring-4 select-none">
            <img
              src={preview ?? defaultAvatar}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Camera trigger */}
          <Button
            type="button"
            variant="gradient"
            onClick={() => inputRef.current?.click()}
            className="absolute right-0 bottom-0 size-7 rounded-full"
            aria-label="تغيير صورة الملف الشخصي"
          >
            <Camera className="h-3.5 w-3.5" />
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleFile}
          />
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs leading-relaxed">
            يفضل استخدام صورة مربعة بحجم 400×400 بكسل على الأقل
          </p>
        </div>
      </div>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default ClientAvatarUpload;
