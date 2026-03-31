
import React, { useRef } from "react";
import { Camera } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import defaultAvatar from "@/assets/images/profileImage.png"; // default avatar image
import { useUserStore } from "@/store/useUserStore";

// ─── Types ────────────────────────────────────────────────────────────────────



// ─── Component ────────────────────────────────────────────────────────────────

const ProfileAvatar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { name} = useUserStore();

  

  // For demo purposes, we use a global avatar state; in a real app this would be handled by the ProfileForm and saved to the server
  const { avatar, setAvatar } = useUserStore();


  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatar(file);
  }

  return (
      <CardContent className="flex flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full border-4 border-white/55  overflow-hidden ring-4 ring-background shadow-md bg-muted flex items-center justify-center select-none">
            <img
              src={avatar || defaultAvatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Camera button */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 border-2 border-white rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors focus:outline-none"
            aria-label="تغيير صورة الملف الشخصي"
          >
            <Camera className="w-3.5 h-3.5 " />
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
          <p className="font-semibold text-foreground text-base">صورة الملف الشخصي</p>
          {/* Hint */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-xs">
            يفضل استخدام صورة مربعة بحجم 400x400 بكسل على الأقل
          </p>
        </div>


      </CardContent>
  );
}
export default ProfileAvatar;