import { useState, useEffect } from 'react';
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
  Briefcase,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { useLocationCustom } from '../hooks/useLocation';
import type { Provider } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useDirectRequest } from '../hooks/useDirectReqest';
import { useActiveRequest } from '@/hooks/useActiveRequest';
interface DirectRequestFormProps {
  provider: Provider;
  onClose: (data?: any) => void;
}

export function DirectRequestForm({
  provider,
  onClose,
}: DirectRequestFormProps) {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const {
    position: customerPos,
    setPosition: setCustomerPos,
    address,
    locating,
    detect,
    searchAddress,
  } = useLocationCustom();
  const [manualAddress, setManualAddress] = useState(address);
  const navigate = useNavigate();
  const mutation = useDirectRequest();
  const { request: activeRequest, isLoading: isLoadingActiveRequest } = useActiveRequest();

  useEffect(() => {
    setManualAddress(address);
  }, [address]);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchAddress(manualAddress);
    }
  };
  if (!provider) return null;

  function handleSubmit() {
    const customerLat = customerPos?.lat ?? 0;
    const customerLng = customerPos?.lng ?? 0;

    // Create FormData object
    const formData = new FormData();
    formData.append('description', description);
    formData.append('customerLat', customerLat.toString());
    formData.append('customerLng', customerLng.toString());
    formData.append('providerLat', provider.baseLocation.latitude.toString());
    formData.append('providerLng', provider.baseLocation.longitude.toString());
    formData.append('address', manualAddress);
    formData.append('serviceId', provider.services[0]?.id.toString() || '');

    // Add images
    images.forEach((image) => {
      formData.append('images', image);
    });

    console.log('📋 Direct Request values:', {
      description,
      customerLat,
      customerLng,
      providerLat: provider.baseLocation.latitude,
      providerLng: provider.baseLocation.longitude,
      address: manualAddress,
      serviceId: provider.services[0]?.id,
      imagesCount: images.length,
    });

    // Call the mutation
    mutation.mutate({ formData, providerId: provider.id.toString() }, {
      onSuccess: (data) => {
        const newRequestId = data?.id || data?.requestId;

        // Prepare payload for navigation state
        const payload = {
          providerName: provider.name,
          profession: provider.services[0]?.name || 'خدمة',
          providerImage: provider.pictureUrl,
          providerAvatar: provider.name.charAt(0),
          description,
          images: images.map((img) => URL.createObjectURL(img)),
          location: {
            customer: { lat: customerLat, lng: customerLng },
            provider: {
              lat: provider.baseLocation.latitude,
              lng: provider.baseLocation.longitude,
            },
          },
          address: manualAddress,
        };

        console.log('✅ Direct request created:', { requestId: newRequestId, payload });

        // Close drawer and reset state
        onClose();
        setDescription('');
        setImages([]);
        localStorage.setItem('activeRequestId', newRequestId);

        // Navigate to pending page with request data
        navigate(`/app/services/requests/${newRequestId}/pending`, {
          state: { payload },
        });
      },
      onError: (err: any) => {
        console.error('❌ Direct request failed:', err?.message ?? err);
      },
    });
  }

console.log('🔍 Active request:', activeRequest, 'Loading:', isLoadingActiveRequest);
  return (
    <div className="bg-background flex h-full flex-col font-[Cairo,sans-serif]">
      {/* ── Header ── */}
      <DrawerHeader className="border-border bg-background flex shrink-0 items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <DrawerClose asChild>
            <button className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full transition-colors">
              <X className="text-muted-foreground h-4 w-4" />
            </button>
          </DrawerClose>
          <DrawerTitle className="text-foreground text-lg font-bold">
            {activeRequest && !isLoadingActiveRequest ? 'طلب معلق' : 'طلب خدمة جديد'}
          </DrawerTitle>
        </div>

        <span className="text-primary bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold">
          {activeRequest && !isLoadingActiveRequest ? 'قيد الانتظار' : 'مباشر'}
        </span>
      </DrawerHeader>

      {/* Check for pending request */}
      {activeRequest && !isLoadingActiveRequest ? (
        <>
          <DrawerDescription className="text-muted-foreground mt-1 px-5 pt-2 text-sm">
            لديك طلب معلق قيد الانتظار. يرجى انتظار استجابة مقدم الخدمة.
          </DrawerDescription>
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            <Card className="border-border/40 rounded-3xl shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 py-8">
                <div className="text-center space-y-3">
                  <h3 className="text-foreground text-xl font-bold">
                    الطلب رقم {activeRequest?.id}#
                  </h3>
                  <p className="text-muted-foreground ">
                    {activeRequest?.description} 
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
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
              className="h-14 w-full gap-2 rounded-2xl text-base font-bold"
              onClick={onClose}
            >
              إغلاق
            </Button>
          </DrawerFooter>
        </>
      ) : (
        <>
          <DrawerDescription className="text-muted-foreground mt-1 px-5 pt-2 text-sm">
            أدخل تفاصيل طلبك لإرساله إلى الفني المختص.
          </DrawerDescription>
          {/* ── Body ── */}
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {/* Provider card */}
            <Card size='sm' className="border-border/40 rounded-3xl shadow-sm overflow-hidden">
              <CardContent className="px-5 py-2 space-y-2">
                {/* Header: Avatar & Status */}
                <div className="flex items-start justify-between">
                  <div className="relative flex justify-start gap-2">
                    {/* Avatar */}
                    <div className=" bg-secondary border-border/50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border text-2xl font-bold">
                      {provider.pictureUrl ? (
                        <img
                          src={provider.pictureUrl}
                          alt={provider.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-primary">
                          {provider.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    {/* Name & Profession */}
                    <div className='flex flex-col justify-center'>
                      <div className="flex flex-row-reverse items-center gap-1.5">
                        <h4 className="text-foreground text-lg font-black">
                          {provider.name}
                        </h4>
                        <ShieldCheck className="h-4 w-4 fill-blue-500/10 text-blue-500" />
                      </div>

                      <p className="text-muted-foreground text-sm font-bold ">
                        {provider.services[0]?.name || 'مقدم خدمة'}
                      </p>
                    </div>

                    {/* Status indicator */}
                    <div className="border-card absolute -right-1.5 -bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full border-3 bg-green-500">
                      <div className="h-1 w-1 animate-pulse rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Availability badge */}
                  <span className="rounded-full px-3 py-1 text-[11px] font-black tracking-wider uppercase border border-green-500/20 bg-green-500/10 text-green-600 shadow-sm">
                    متاح الآن
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 text-right">

                  {/* Stats */}
                  <div className="flex flex-col justify-between gap-3 pt-2">

                    
                        {/* rating and job counting */}
                   <div className="flex flex-row items-center gap-4 justify-end">
                     {/* Rating */}
                    
                      <div className="flex items-center gap-1 rounded-lg bg-yellow-500/10 px-2.5 py-1 text-xs font-black text-yellow-700">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {(provider.rating || 0).toFixed(1)}
                      </div>
                    

                    {/* Jobs Count */}
                    
                      <div className="text-muted-foreground flex items-center gap-1 text-xs font-bold">
                        <Briefcase className="text-primary/60 h-3 w-3" />
                        <span>({provider.jobsCount}) </span>
                      </div>
                   </div>
                    {/* Location */}
                    <div className="text-muted-foreground flex  items-center justify-start gap-1 text-xs font-bold">
                      <MapPin className="text-primary/60 h-3 w-3" />
                      {provider?.baseLocation?.addressText?.slice(0, 35) || 'بلا عنوان'}...
                    </div> 
 
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-foreground block text-sm font-bold">
                تفاصيل الطلب
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اشرح تفاصيل الخدمة التي تحتاجها..."
                rows={4}
                className="bg-muted/50 border-border/30 focus:ring-primary/20 placeholder:text-muted-foreground w-full resize-none rounded-2xl border px-4 py-3 text-right text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            {/* Date/Time */}
            {/* <DataTimeInput date={datetime} setDate={setDatetime} /> */}

            {/* Location */}
            <div className="space-y-2">
              <label className="text-foreground block text-sm font-bold">
                موقع العمل
              </label>
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="العنوان الحالي أو تلقائي"
                  className="bg-muted focus:ring-primary/20 placeholder:text-muted-foreground/90 h-12 w-full rounded-full border-none pr-3 pl-4 text-sm outline-none focus:ring-2"
                />

                {/*button detect */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    detect();
                  }}
                  disabled={locating}
                  className="bg-primary/10 hover:bg-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-50"
                  title="تحديد موقعي تلقائياً"
                >
                  {locating ? (
                    <SplinePointer className="text-primary h-5 w-5" />
                  ) : (
                    <LocateFixed className="text-primary h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Mini map */}
              {/* <div className="relative rounded-2xl overflow-hidden h-36 border border-border/30">
            <MapContainer
              center={[30.0444, 31.2357]}
              zoom={13}
              className="w-full h-full"
              zoomControl={false}
              dragging={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </MapContainer>

          </div> */}
            </div>

            {/* Image upload */}
            <ImageUpload
              onImagesChange={setImages}
              maxImages={5}
              label="الصور التوضيحية"
              description="يمكنك رفع حتى 5 صور (PNG, JPG)"
            />
          </div>

          {/* ── Footer ── */}
          <DrawerFooter className="border-border shrink-0 space-y-3 border-t px-5 py-4">
            <Button
              variant="gradient"
              disabled={mutation.isPending}
              className="h-14 w-full gap-2 rounded-2xl text-base font-bold"
              onClick={handleSubmit}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 rotate-180" />
                  إرسال الطلب
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
              </a>{' '}
              الخاصة بالمنصة.
            </p>
          </DrawerFooter>
        </>
      )}
    </div>
  );
}
