import { ProfileForm } from "@/features/profile/components/ProfileForm";
import type { ProfileFormValues } from "@/features/profile/schema/profile.schema";
import { useUserStore } from "@/store/useUserStore";

export default function ProfilePage() {
  const {setUser} = useUserStore();

  function handleSubmit(values: ProfileFormValues) {
    setUser(values);
    // TODO: API call
  }

  return (
    <div dir="rtl" className="min-h-screen bg-muted p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-start">
          <main className="flex-1 min-w-0 space-y-4">

            <div className="text-right p-2">
              <h1 className="text-3xl font-extrabold text-foreground">
                إعدادات الملف الشخصي
              </h1>
              <p className="text-muted-foreground mt-1">
                قم بإدارة معلوماتك الشخصية وتفضيلات حسابك بكل سهولة
              </p>
            </div>

            <ProfileForm
              onSubmit={handleSubmit}
              onCancel={() => console.log("cancelled")}
            />

          </main>
        </div>
      </div>
    </div>
  );
}