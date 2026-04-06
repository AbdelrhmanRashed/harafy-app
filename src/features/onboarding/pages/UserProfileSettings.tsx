import ProfileFormSettings from '@/features/profile/components/ProfileFormSettings';

const UserProfileSettings = () => {
  return (
    <div className="min-w-0 flex-1 space-y-4">
      <div className="pb-4 text-right">
        <h1 className="text-foreground text-3xl font-extrabold">
          إعدادات الملف الشخصي
        </h1>
        <p className="text-muted-foreground mt-1">
          أكمل معلوماتك الشخصية لتجربة أفضل
        </p>
      </div>

      <ProfileFormSettings />
    </div>
  );
};

export default UserProfileSettings;
