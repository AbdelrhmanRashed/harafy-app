import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Phone,
  MapPin,
  Star,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useGetProviderProfile } from '../hooks/useGetProviderProfile';
import { getImageUrl, cn } from '@/lib/utils';
import ProviderProfileSkeleton from '../components/ProviderProfileSkeleton';
import { useEffect } from 'react';

const ProviderProfilePage = () => {
  const { providerId } = useParams();
  const { data, isLoading } = useGetProviderProfile(providerId!);
  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [providerId]);

  if (isLoading) return <ProviderProfileSkeleton />;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* HERO SECTION - REFINED */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,var(--primary)/0.1,var(--primary)/0)]" />
        <div className="relative px-4 pt-12 pb-32">
          <div className="container mx-auto max-w-6xl">
            {/* Profile Header Card */}
            <div className="grid items-start gap-8 md:grid-cols-[auto,1fr,auto]">
              {/* Profile Avatar */}
              <div className="group relative">
                <div className="bg-primary-gradient absolute -inset-2 rounded-2xl opacity-10 blur-lg transition-opacity group-hover:opacity-20" />
                <Avatar className="border-card ring-primary/10 relative h-48 w-48 border-4 shadow-2xl ring-1">
                  <AvatarImage
                    src={getImageUrl(data?.pictureUrl)}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-secondary text-primary text-5xl font-black">
                    {data?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-primary-gradient ring-card absolute -right-1 bottom-3 rounded-full p-3 shadow-xl ring-4">
                  <ShieldCheck className="text-primary-foreground h-6 w-6" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h1 className="text-foreground text-4xl font-black tracking-tight text-balance md:text-5xl">
                      {data?.name}
                    </h1>
                    <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 border">
                      <Sparkles className="mr-1 h-3 w-3" />
                      حرفى معتمد
                    </Badge>
                  </div>
                  <p className="text-primary mb-4 text-lg font-semibold">
                    {data?.nickname}
                  </p>
                  <p className="text-muted-foreground max-w-xl leading-relaxed">
                    {data?.bio}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          color="oklch(85.2% 0.199 91.936)"
                          key={s}
                          className={cn(
                            'h-5 w-5',
                            s <= (data?.rating || 0)
                              ? 'fill-yellow-400 text-amber-400'
                              : 'text-muted',
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-foreground text-lg font-bold">
                      {data?.rating || '0.0'}/5.0
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="text-primary h-5 w-5" />
                    <span className="font-medium">
                      {data?.baseLocation?.addressText}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col gap-2">
                <Button
                  size="lg"
                  variant="gradient"
                  className="shadow-primary-gradient hover:shadow-primary-gradient text-primary-foreground h-14 border-0 px-8 text-lg font-bold transition-all active:scale-95"
                >
                  طلب خدمه
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* LEFT COLUMN */}
            <div className="space-y-8 lg:col-span-2">
              {/* ABOUT SECTION */}
              <section className="group">
                <div className="border-border mb-6 flex items-center gap-3 border-b pb-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Briefcase className="text-primary h-6 w-6" />
                  </div>
                  <h2 className="text-foreground text-2xl font-bold">
                    نبذة تعريفية
                  </h2>
                </div>
                <Card className="bg-card/50 hover:bg-card/70 shadow-md backdrop-blur">
                  <CardContent className="p-8">
                    <p className="text-muted-foreground text-justify text-lg leading-relaxed whitespace-pre-line">
                      {data?.bio || 'لا يوجد وصف حالياً.'}
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* SERVICES SECTION */}
              <section>
                <div className="border-border mb-6 flex items-center gap-3 border-b pb-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <CheckCircle2 className="text-primary h-6 w-6" />
                  </div>
                  <h2 className="text-foreground text-2xl font-bold">
                    الخدمات المتاحة
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {data?.services.map((service: any) => (
                    <Card
                      key={service.id}
                      className="bg-card/50 hover:bg-card/80 group overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                      <CardContent className="relative p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="bg-primary-gradient mt-1 rounded-lg p-2">
                              <Sparkles className="text-primary-foreground h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="text-foreground text-lg font-bold">
                                {service.name}
                              </h3>
                              <p className="text-muted-foreground mt-1 text-sm">
                                خدمة موثوقة
                              </p>
                            </div>
                          </div>
                          <CheckCircle2 className="h-6 w-6 shrink-0 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {/* CONTACT CARD */}
              <Card className="bg-card/50 shadow-md">
                <CardContent className="p-8">
                  <h3 className="text-foreground mb-6 flex items-center gap-2 text-xl font-bold">
                    <Phone className="text-primary h-5 w-5" />
                    بيانات الاتصال
                  </h3>
                  <div className="space-y-3">
                    {data?.phoneNumbers.length === 0 && (
                      <div className="text-muted-foreground text-justify text-lg leading-relaxed whitespace-pre-line">
                        لا يوجد ارقام متاحه
                      </div>
                    )}
                    {data?.phoneNumbers.map((phone: string, i: number) => (
                      <a
                        key={i}
                        href={`tel:${phone}`}
                        className="group/phone bg-primary/5 hover:bg-primary/15 border-primary/10 hover:border-primary/30 flex items-center justify-between rounded-xl border p-4 transition-all duration-300"
                      >
                        <span className="text-foreground font-mono text-lg font-semibold">
                          {phone}
                        </span>
                        <Phone className="text-primary h-5 w-5 transition-transform group-hover/phone:scale-110" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* STATS CARD */}
              <Card className="bg-card/50 shadow-md backdrop-blur transition-all hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="border-border mb-6 flex items-center gap-2 border-b pb-4">
                    <TrendingUp className="text-primary h-5 w-5" />
                    <h3 className="text-foreground text-lg font-bold">
                      الإحصائيات
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        وقت الاستجابة
                      </span>
                      <Badge className="border border-green-500/30 bg-green-500/20 text-green-700 dark:text-green-400">
                        سريع جداً
                      </Badge>
                    </div>

                    <Separator className="bg-border" />

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="group/stat bg-primary/5 hover:bg-primary/10 rounded-lg p-4 transition-all">
                        <p className="text-foreground text-3xl font-black">
                          120+
                        </p>
                        <p className="text-muted-foreground mt-2 text-xs font-bold uppercase">
                          عميل سعيد
                        </p>
                      </div>
                      <div className="group/stat bg-primary/5 hover:bg-primary/10 rounded-lg p-4 transition-all">
                        <p className="text-primary text-3xl font-black">4.9</p>
                        <p className="text-muted-foreground mt-2 text-xs font-bold uppercase">
                          متوسط التقييم
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* VERIFICATION CARD */}
              <Card className="bg-card/50 shadow-md backdrop-blur">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 p-2">
                      <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-foreground font-bold">معتمد وموثوق</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    هذا الحرفى قد تم التحقق من بيانات الهوية والخبرة بواسطة
                    فريقنا المتخصص
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
