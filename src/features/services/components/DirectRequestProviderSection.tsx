import {
  Star,
  MapPin,
  Briefcase,
  User,
  ShieldCheck,
  Info,
  X,
  Phone,
} from 'lucide-react';
import type { DirectRequestDetails } from '../types/directRequest';
import { useGetProviderData } from '../hooks/useGetProviderData';
import { getImageUrl } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

const DirectRequestProviderSection = ({
  requestDetails,
}: {
  requestDetails: DirectRequestDetails;
}) => {
  const { data: providerProfile, isLoading } = useGetProviderData(
    String(requestDetails.providerId),
  );
  // ─── Provider Data ────────────────────────────────────────────────────────
  const name = providerProfile?.name || 'جاري التحميل...';
  const nickname = providerProfile?.nickname;
  const jobsCount = providerProfile?.jobsCount || 0;
  const rating = providerProfile?.rating
    ? providerProfile.rating.toFixed(1)
    : 'جديد';
  const reviewsCount = providerProfile?.reviewsCount || 0;
  const addressText =
    providerProfile?.baseLocation?.addressText ||
    providerProfile?.addressText ||
    'الموقع غير محدد';
  const avatar = providerProfile?.pictureUrl
    ? getImageUrl(providerProfile.pictureUrl)
    : null;

  const providerPhones = providerProfile?.phoneNumbers;

  return (
    <div className="space-y-8 lg:col-span-2">
      {/* ─── Provider Card ──────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-foreground flex items-center justify-start gap-2 text-xl font-extrabold">
          <User className="text-primary h-6 w-6" />
          الحرفي المطلوب
        </h2>

        {isLoading ? (
          <div className="bg-card border-border/50 flex flex-col items-center gap-6 rounded-3xl border p-6 md:flex-row md:items-start">
            <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
            <div className="w-full flex-1 space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ) : (
          <div className="bg-card border-border/50 relative overflow-hidden rounded-3xl border">
            {/* Background Accent */}
            <div className="bg-primary/5 absolute top-0 right-0 left-0 h-16" />

            <div className="relative flex flex-col items-center gap-6 p-6 md:flex-row md:items-start md:p-8">
              {/* Avatar */}
              <div className="border-background relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 shadow-xl">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center text-4xl font-bold uppercase">
                    {(nickname || name)?.charAt(0)}
                  </div>
                )}
                {/* Verified Badge */}
                <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-0.5">
                  <ShieldCheck className="h-6 w-6 fill-green-500 text-white" />
                </div>
              </div>

              {/* Provider Info */}
              <div className="flex-1 space-y-4 text-center md:mt-2 md:text-right">
                <div>
                  <Link
                    to={`/app/profile/provider/${providerProfile?.id}`}
                    className="text-foreground hover:text-primary text-2xl font-black transition-colors"
                  >
                    {name}
                  </Link>

                  {nickname && (
                    <p className="text-muted-foreground mt-1 text-sm font-bold">
                      يعرف بـ: {nickname}
                    </p>
                  )}
                </div>

                {/* Stats Badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-4 py-1.5 text-sm font-bold text-yellow-700">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{rating}</span>
                    <span className="text-xs font-semibold text-yellow-700/60">
                      ({reviewsCount} تقييم)
                    </span>
                  </div>

                  <div className="text-primary bg-primary/10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold">
                    <Briefcase className="h-4 w-4" />
                    {jobsCount} عملية منفذة
                  </div>
                </div>

                {/* Location */}
                <div className="text-muted-foreground mx-auto flex max-w-lg items-start justify-center gap-2 text-sm font-semibold md:mx-0 md:justify-start">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500/80" />
                  <p className="leading-relaxed">{addressText}</p>
                </div>

                {/* Contact Phone (Only visible when Accepted or Completed) */}
                {(requestDetails.requestStatus === 2 ||
                  requestDetails.requestStatus === 3) &&
                  providerPhones.length > 0 && (
                    <div className="mx-auto flex items-start justify-center gap-2 pt-2 md:mx-0 md:justify-start">
                      <p className="text-muted-foreground mt-1 text-sm font-bold">
                        للتواصل مع الحرفي:
                      </p>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                        {providerPhones.map((phone: string) => (
                          <a
                            key={phone}
                            href={`tel:${phone}`}
                            className="bg-primary/10 hover:bg-primary/20 text-primary flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-colors"
                            dir="ltr"
                          >
                            <Phone className="h-4 w-4 shrink-0" />
                            <span>{phone}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── Provider Response Status ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-foreground flex items-center justify-start gap-2 text-xl font-extrabold">
          <Info className="text-primary h-6 w-6" />
          حالة رد الحرفي
        </h2>

        {/* Pending / Open / Assigned State */}
        {requestDetails.requestStatus === 0 ||
        requestDetails.requestStatus === 1 ? (
          <div className="bg-card/50 border-primary/20 flex min-h-[350px] flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center">
            <div className="bg-primary/5 relative mb-6 flex h-24 w-24 items-center justify-center rounded-full">
              <Info className="text-primary h-10 w-10" />
              <div className="border-background absolute top-0 right-0 h-6 w-6 animate-pulse rounded-full border-4 bg-amber-400" />
            </div>
            <h3 className="text-foreground mb-3 text-2xl font-black">
              بانتظار موافقة الحرفي
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md text-base leading-relaxed">
              سيقوم <strong>{name}</strong> بمراجعة تفاصيل طلبك ليقوم بقبوله
              وبدء التنفيذ أو الرفض قريباً. سيصلك إشعار فوراً.
            </p>

            <div className="bg-background border-border pointer-events-none w-full max-w-sm rounded-2xl border p-5 opacity-60 shadow-sm grayscale filter transition-all duration-300">
              <div className="mb-4 flex flex-row-reverse items-center gap-3">
                <div className="bg-muted h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-1 text-right">
                  <div className="bg-muted ml-auto h-3 w-20 rounded-full" />
                  <div className="bg-muted ml-auto h-2 w-16 rounded-full" />
                </div>
              </div>
              <div className="bg-muted h-16 w-full rounded-xl" />
            </div>
          </div>
        ) : requestDetails.requestStatus === 2 ? (
          /* Accepted & In Progress State */
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border-2 border-green-500/20 bg-green-500/10 p-10 text-center">
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 shadow-lg shadow-green-500/20">
              <ShieldCheck className="h-10 w-10 text-green-600" />
              <div className="border-background absolute top-0 right-0 h-6 w-6 animate-pulse rounded-full border-4 bg-green-500" />
            </div>
            <h3 className="mb-3 text-2xl font-black text-green-700">
              تم قبول الطلب!
            </h3>
            <p className="mb-8 max-w-md text-base leading-relaxed font-semibold text-green-700/80">
              لقد وافق <strong>{name}</strong> على طلبك. الطلب الآن قيد التنفيذ،
              يرجى التنسيق معه لإتمام العمل.
            </p>
          </div>
        ) : requestDetails.requestStatus === 4 ? (
          /* Cancelled / Rejected State */
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border-2 border-red-500/20 bg-red-500/10 p-10 text-center">
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20 shadow-lg shadow-red-500/20">
              <X className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="mb-3 text-2xl font-black text-red-700">
              تم الرفض أو الإلغاء
            </h3>
            <p className="mb-8 max-w-md text-base leading-relaxed font-semibold text-red-700/80">
              تم رفض الطلب من قبل الحرفي أو أنه مُلغى. بإمكانك البحث عن حرفيين
              آخرين في منصتنا وإرسال طلب جديد.
            </p>
          </div>
        ) : (
          /* Completed State */
          <div className="bg-primary/10 border-primary/20 flex min-h-[350px] flex-col items-center justify-center rounded-3xl border-2 p-10 text-center">
            <div className="bg-primary/20 shadow-primary/20 relative mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-lg">
              <ShieldCheck className="text-primary h-10 w-10" />
            </div>
            <h3 className="text-primary/90 mb-3 text-2xl font-black">
              الطلب مكتمل بنجاح
            </h3>
            <p className="text-primary/70 mb-8 max-w-md text-base leading-relaxed font-semibold">
              لقد تم إنجاز هذا الطلب مع <strong>{name}</strong>. نأمل أن تكون
              تجربتك مميزة! لا تنسَ تقديم تقييم للحرفي.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DirectRequestProviderSection;
