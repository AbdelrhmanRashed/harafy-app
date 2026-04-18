import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Zap,
  ChevronDown,
  Send,
  LocateFixed,
  SplinePointer,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/shared/ImageUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useCreateServiceReq } from '../hooks/useCreateServiceReq';
import {
  type CreateServiceReqInput,
  createServiceReqSchema,
} from '../schemas/serviceReq.schema';
import { useServices } from '@/features/onboarding/hooks/useServices';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RequestFormProps {
  address: string;
  position: { lat: number; lng: number };
  locating: boolean;
  onDetect: () => void;
  onAddressSearch: (query: string) => void;
  initialService?: string;
  initialCategory?: string;
  navigateOnSuccess?: boolean;
  onSend?: (id: number | string) => void;
  onServiceChange?: (id: number) => void;
  serviceIdAI?: number;
  descriptionAI?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RequestForm({
  address,
  position,
  locating,
  onDetect,
  onAddressSearch,
  serviceIdAI,
  descriptionAI,
  navigateOnSuccess = true,
  onSend,
  onServiceChange,
}: RequestFormProps) {
  const [manualAddress, setManualAddress] = useState(address);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const { mutate: createServiceReq, isPending } = useCreateServiceReq();

  const { data: services, isLoading: isLoadingServices } = useServices();

  const navigate = useNavigate();
  // ── Form (must be declared before useEffects that call form.setValue) ──────
  const form = useForm<CreateServiceReqInput>({
    resolver: zodResolver(createServiceReqSchema),
    defaultValues: {
      Description: '',
      ServiceId: 0,
      Latitude: 0,
      Longitude: 0,
      Images: [],
    },
    mode: 'onTouched',
  });

  // ── Sync address prop ──────────────────────────────────────────────────────
  useEffect(() => {
    setManualAddress(address);
  }, [address]);

  // AI data
  useEffect(() => {
    if (typeof serviceIdAI === 'number' && serviceIdAI > 0) {
      form.setValue('ServiceId', serviceIdAI, { shouldValidate: true });
      onServiceChange?.(serviceIdAI);
    }
    if (typeof descriptionAI === 'string') {
      form.setValue('Description', descriptionAI, { shouldValidate: true });
    }
  }, [form, serviceIdAI, descriptionAI, onServiceChange]);

  // ── Sync lat/lng from map position into form fields ───────────────────────
  useEffect(() => {
    form.setValue('Latitude', position.lat, { shouldValidate: true });
    form.setValue('Longitude', position.lng, { shouldValidate: true });
  }, [position.lat, position.lng]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (values: CreateServiceReqInput) => {
    // Log the validated values before the API call
    console.log('📋 Form values:', {
      Description: values.Description,
      ServiceId: values.ServiceId,
      Latitude: values.Latitude,
      Longitude: values.Longitude,
      Images: imageFiles.map((f) => f.name),
    });

    const formData = new FormData();
    formData.append('Description', values.Description);
    formData.append('ServiceId', String(values.ServiceId));
    formData.append('Latitude', String(values.Latitude));
    formData.append('Longitude', String(values.Longitude));
    imageFiles.forEach((file) => formData.append('Images', file));

    createServiceReq(formData as any, {
      onSuccess: (data) => {
        const newRequestId = data?.id || data?.requestId; // Handle both possibilities
        form.reset();
        setImageFiles([]);

        // Let the parent component know the request was sent (we will handle the nearby providers next time)
        onSend?.(newRequestId);

        if (navigateOnSuccess) {
          navigate(`/app/services/requests/${newRequestId}/instant`, {
            state: {
              serviceName: services?.find((s: any) => s.id === values.ServiceId)
                ?.name,
              description: values.Description,
              address: manualAddress,
              position,
              tags: ['فوري'],
              requestId: newRequestId,
            },
          });
        }
      },
      onError: (err: any) => {
        console.error('❌ Request failed:', err?.message ?? err);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddressSearch(manualAddress);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="">
      {/* Header */}
      <div className="px-4 pt-4 sm:px-5 sm:pt-6">
        <h1 className="text-foreground mb-1 text-2xl font-black sm:mb-2 sm:text-3xl">
          طلب فوري
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          أخبرنا بما تحتاجه، وسنقوم بربطك بأفضل الحرفيين المتاحين فوراً في
          منطقتك.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-background mx-2 mt-3 mb-4 space-y-3 rounded-2xl px-4 py-3 sm:mx-3 sm:mt-4 sm:mb-6 sm:rounded-3xl sm:px-5 sm:py-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10">
            <Zap className="text-primary h-4 w-4 sm:h-5 sm:w-4" />
          </div>
          <span className="text-foreground text-base font-bold sm:text-lg">
            تفاصيل الطلب السريع
          </span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            noValidate
            className="space-y-3"
          >
            {/* ── Service select ── */}
            <FormField
              control={form.control}
              name="ServiceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs font-semibold sm:text-sm">
                    نوع الخدمة
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <select
                        value={field.value}
                        onChange={(e) => {
                          const id = Number(e.target.value);
                          field.onChange(id);
                          onServiceChange?.(id);
                        }}
                        disabled={isLoadingServices}
                        className={`bg-muted focus:ring-primary/20 h-11 w-full appearance-none rounded-2xl pr-3 pl-8 text-right text-sm focus:ring-2 focus:outline-none disabled:opacity-60 sm:h-12 sm:rounded-3xl ${form.formState.errors.ServiceId ? 'ring-destructive/70 ring-2' : ''} transition-all duration-300 ease-in-out`}
                      >
                        <option value={0} disabled>
                          {isLoadingServices
                            ? 'جاري التحميل...'
                            : 'اختر نوع الخدمة'}
                        </option>
                        {Array.isArray(services) &&
                          services.map((s: any) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                      </select>
                      <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Address + hidden lat/lng fields ── */}
            <FormField
              control={form.control}
              name="Latitude"
              render={() => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs font-semibold sm:text-sm">
                    الموقع
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center gap-2">
                      <input
                        type="text"
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="العنوان الحالي أو تلقائي"
                        className="bg-muted focus:ring-primary/20 placeholder:text-muted-foreground/90 h-11 w-full rounded-full border-none pr-3 pl-4 text-sm outline-none focus:ring-2 sm:h-12"
                      />
                      <button
                        type="button"
                        onClick={onDetect}
                        disabled={locating}
                        className="bg-primary/10 hover:bg-primary/20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors disabled:opacity-50 sm:h-12 sm:w-12"
                        title="تحديد موقعي تلقائياً"
                      >
                        {locating ? (
                          <SplinePointer className="text-primary h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                        ) : (
                          <LocateFixed className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Description ── */}
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs font-semibold sm:text-sm">
                    وصف المشكلة
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value}
                      placeholder="اشرح لنا ما تحتاجه باختصار لضمان عروض دقيقة..."
                      rows={3}
                      dir="rtl"
                      onChange={(e) => field.onChange(e.target.value)}
                      className={`bg-muted focus:ring-primary/20 placeholder:text-muted-foreground w-full resize-none rounded-2xl px-3 py-2 text-right text-sm transition-all duration-300 ease-in-out focus:ring-2 focus:outline-none sm:rounded-3xl ${
                        form.formState.errors.Description
                          ? 'ring-destructive/70 ring-2'
                          : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ── Image upload ── */}
            <ImageUpload
              onImagesChange={setImageFiles}
              maxImages={5}
              label="صور توضيحية"
              description="PNG, JPG (حتى 5 صور)"
            />

            {/* ── Submit ── */}
            <Button
              type="submit"
              variant="gradient"
              disabled={isPending}
              className="mt-6 h-10 w-full gap-2 rounded-lg text-xs font-bold sm:h-11 sm:rounded-xl sm:text-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  إرسال الطلب الآن
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
