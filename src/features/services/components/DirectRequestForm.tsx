import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  Send,
  X,
  SplinePointer,
  LocateFixed,
  Loader2,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { useLocationCustom } from '../hooks/useLocation';
import type { Provider } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useDirectRequest } from '../hooks/useDirectRequest';
import { useActiveRequest } from '@/hooks/useActiveRequest';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getImageUrl } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

// ─── Schema ───────────────────────────────────────────────────────────────────
const schema = z.object({
  description: z
    .string()
    .min(10, 'اكتب وصفاً أكثر تفصيلاً (10 أحرف على الأقل)'),
  address: z.string().min(1, 'حدد موقعك'),
  images: z.array(z.instanceof(File)).optional(),
});

type FormValues = z.infer<typeof schema>;

// ─── Props ────────────────────────────────────────────────────────────────────
interface DirectRequestFormProps {
  provider: Provider;
  onClose: (data?: any) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function DirectRequestForm({
  provider,
  onClose,
}: DirectRequestFormProps) {
  const navigate = useNavigate();
  const mutation = useDirectRequest();
  const { request: activeRequest, isLoading: isLoadingActiveRequest } =
    useActiveRequest();

  const {
    position: customerPos,
    address,
    locating,
    detect,
    searchAddress,
  } = useLocationCustom();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      address: '',
      images: [],
    },
    mode: 'onTouched',
  });

  // ── Sync address from location hook ──────────────────────────────────────
  useEffect(() => {
    if (address) form.setValue('address', address, { shouldValidate: true });
  }, [address]);

  if (!provider) return null;

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = (values: FormValues) => {
    const customerLat = customerPos?.lat ?? 0;
    const customerLng = customerPos?.lng ?? 0;
    const formData = new FormData();
    formData.append('description', values.description);
    formData.append('latitude', customerLat.toString());
    formData.append('longitude', customerLng.toString());
    values.images?.forEach((img) => formData.append('images', img));
    if (!customerPos || customerPos.lat === 0 || customerPos.lng === 0) {
      form.setError('address', {
        message: 'حدد موقعك الأول',
      });
      return;
    }
    mutation.mutate(
      { formData, providerId: provider.id.toString() },

      {
        onSuccess: (data: any) => {
          const newRequestId = data?.id || data?.requestId;

          form.reset();
          onClose();
          localStorage.setItem('activeRequestId', newRequestId);
          localStorage.setItem('requestType', 'direct');
          navigate(`/app/services/requests/${newRequestId}/pending`);
        },
      },
    );
  };
  console.log(provider);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-background flex h-full flex-col">
      {/* ── Header ── */}
      <DrawerHeader className="border-border bg-background flex shrink-0 justify-between border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              className="hover:bg-muted flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
            >
              <X className="text-muted-foreground h-4 w-4" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="text-foreground text-lg font-bold">
            {activeRequest && !isLoadingActiveRequest
              ? 'طلب معلق'
              : 'طلب خدمة جديد'}
          </DrawerTitle>
        </div>
        <span className="text-primary bg-primary/10 w-fit rounded-full px-3 py-1 text-xs font-semibold">
          {activeRequest && !isLoadingActiveRequest ? 'قيد الانتظار' : 'مباشر'}
        </span>
      </DrawerHeader>

      {/* ── Active Request State ── */}
      {activeRequest && !isLoadingActiveRequest ? (
        <>
          <DrawerDescription className="text-muted-foreground mt-1 px-5 pt-2 text-sm">
            لديك طلب معلق قيد الانتظار. يرجى انتظار استجابة مقدم الخدمة.
          </DrawerDescription>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <Card className="border-border/40 rounded-3xl shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 py-8">
                <div className="space-y-3 text-center">
                  <h3 className="text-foreground text-xl font-bold">
                    الطلب رقم {activeRequest?.id}#
                  </h3>
                  <p className="text-muted-foreground">
                    {activeRequest?.description}
                  </p>
                  <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
                    <span className="bg-primary inline-block h-2 w-2 animate-pulse rounded-full" />
                    قيد المعالجة...
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DrawerFooter className="border-border shrink-0 space-y-3 border-t px-5 py-4">
            <Button
              variant="gradient"
              className="h-14 w-full gap-2 rounded-2xl text-base font-bold"
              onClick={() => {
                navigate(`/app/services/requests/${activeRequest?.id}`);
                onClose();
              }}
            >
              عرض تفاصيل الطلب
            </Button>
            <Button
              variant="ghost"
              className="h-14 w-full rounded-2xl text-base font-bold"
              onClick={onClose}
            >
              إغلاق
            </Button>
          </DrawerFooter>
        </>
      ) : (
        /* ── New Request Form ── */
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <DrawerDescription className="text-muted-foreground mt-1 px-5 pt-2 text-sm">
              أدخل تفاصيل طلبك لإرساله إلى الفني المختص.
            </DrawerDescription>

            {/* ── Body ── */}
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {/* Provider Card */}
              <Card
                size="sm"
                className="border-border/40 overflow-hidden rounded-3xl shadow-sm"
              >
                <CardContent className="space-y-2 px-5 py-2">
                  <div className="flex items-start justify-between">
                    <div className="relative flex justify-start gap-2">
                      <div className="bg-secondary border-border/50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border text-2xl font-bold">
                        {provider.pictureUrl ? (
                          <img
                            src={getImageUrl(provider.pictureUrl)}
                            alt={provider.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-primary">
                            {provider.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex flex-row-reverse items-center gap-1.5">
                          <h4 className="text-foreground text-lg font-black">
                            {provider.name}
                          </h4>
                          <ShieldCheck className="h-4 w-4 fill-blue-500/10 text-blue-500" />
                        </div>
                        <p className="text-muted-foreground text-sm font-bold">
                          {provider.services
                            .map((service) => service.name)
                            .join(', ')}
                        </p>
                      </div>
                      <div className="border-card absolute -right-1.5 -bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full border-3 bg-green-500">
                        <div className="h-1 w-1 animate-pulse rounded-full bg-white" />
                      </div>
                    </div>
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[11px] font-black tracking-wider text-green-600 uppercase">
                      متاح الآن
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-end gap-4">
                      <div className="flex items-center gap-1 rounded-lg bg-yellow-500/10 px-2.5 py-1 text-xs font-black text-yellow-700">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {(provider.rating || 0).toFixed(1)}
                      </div>
                    </div>
                    <div className="text-muted-foreground flex w-full items-center gap-1 text-xs font-bold">
                      <MapPin className="text-primary/60 h-3 w-3" />
                      {provider?.baseLocation?.addressText || 'بلا عنوان'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-bold">
                      تفاصيل الطلب
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="اشرح تفاصيل الخدمة التي تحتاجها..."
                        className="bg-muted/50 border-border/30 focus:ring-primary/20 placeholder:text-muted-foreground w-full resize-none rounded-2xl border px-4 py-3 text-right text-sm focus:ring-2 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-bold">
                      موقع العمل
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <input
                          {...field}
                          type="text"
                          placeholder={
                            locating
                              ? 'جاري تحديد الموقع...'
                              : 'العنوان الحالي أو تلقائي'
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              searchAddress(field.value);
                            }
                          }}
                          className="bg-muted focus:ring-primary/20 placeholder:text-muted-foreground/90 h-12 w-full rounded-full border-none pr-3 pl-4 text-sm outline-none focus:ring-2"
                        />
                        <button
                          type="button"
                          onClick={detect}
                          disabled={locating}
                          className="bg-primary/10 hover:bg-primary/20 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors disabled:opacity-50"
                        >
                          {locating ? (
                            <SplinePointer className="text-primary h-5 w-5 animate-spin" />
                          ) : (
                            <LocateFixed className="text-primary h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Images */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        onImagesChange={(files) => field.onChange(files)}
                        maxImages={5}
                        label="الصور التوضيحية"
                        description="يمكنك رفع حتى 5 صور (PNG, JPG)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Footer ── */}
            <DrawerFooter className="border-border shrink-0 space-y-3 border-t px-5 py-4">
              <Button
                type="submit"
                variant="gradient"
                disabled={mutation.isPending}
                className="h-14 w-full gap-2 rounded-2xl text-base font-bold"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> إرسال الطلب
                  </>
                )}
              </Button>
              <p className="text-muted-foreground text-center text-xs">
                بإرسال هذا الطلب، فإنك توافق على{' '}
                <a href="#" className="text-primary hover:underline">
                  شروط الخدمة
                </a>{' '}
                و{' '}
                <a href="#" className="text-primary hover:underline">
                  سياسة الخصوصية
                </a>
                .
              </p>
            </DrawerFooter>
          </form>
        </Form>
      )}
    </div>
  );
}
