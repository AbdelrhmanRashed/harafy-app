import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import defaultAvatar from '@/assets/images/profileImage.png'; // default avatar image

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileAvatar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // For demo purposes, we use a global avatar state; in a real app this would be handled by the ProfileForm and saved to the server

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
  }

  return (
    <CardContent className="flex flex-row items-center gap-6">
      {/* Avatar */}
      <div className="relative inline-block">
        <div className="ring-background bg-muted flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white/55 shadow-md ring-4 select-none">
          <img
            src={defaultAvatar}
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Camera button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md transition-colors focus:outline-none"
          aria-label="تغيير صورة الملف الشخصي"
        >
          <Camera className="h-3.5 w-3.5" />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {/* Name + badge */}
      <div className="space-y-1">
        <p className="text-foreground text-base font-semibold">
          صورة الملف الشخصي
        </p>
        {/* Hint */}
        <p className="text-muted-foreground max-w-xs text-center text-xs leading-relaxed">
          يفضل استخدام صورة مربعة بحجم 400x400 بكسل على الأقل
        </p>
      </div>
    </CardContent>
  );
};
export default ProfileAvatar;
