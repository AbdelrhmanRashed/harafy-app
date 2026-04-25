import { useState } from "react";
import { ArrowRight, Loader2, MapPin, SendHorizonal, Zap, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateOffer } from "../hooks/useCreateOffer";
import type { AvailableRequestItem, SubmittedOffer } from "../types/providerOfferTypes";
import { useGetServices } from "../hooks/useGetServices";

type Step2CreateOfferProps = {
    request: AvailableRequestItem;
    onBack: () => void;
    onOfferCreated: (offer: SubmittedOffer) => void;
};

export default function Step2CreateOffer({
    request,
    onBack,
    onOfferCreated,
}: Step2CreateOfferProps) {
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false); // ← NEW

    const { mutate: create, isPending } = useCreateOffer();

    const handleSubmitConfirmed = () => {
        const numPrice = Number(price);
        if (!numPrice || numPrice <= 0) return;
        setShowConfirm(false);
        create(
            { serviceRequestId: request.id, price: numPrice, message: message.trim() || undefined },
            {
                onSuccess: (data) => {
                    onOfferCreated({
                        offerId: data?.id ?? data?.offerId ?? 0,
                        serviceRequestId: request.id,
                        price: numPrice,
                        message: message.trim() || undefined,
                    });
                },
            }
        );
    };

    const createdAt = request.createdAt
        ? new Date(request.createdAt).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;
    const { data: services } = useGetServices();
    const serviceName = services?.find((s) => s.id === request.serviceId)?.name ?? "";
    const images = request.imageUrls ?? [];
    const [lightbox, setLightbox] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-5 px-4 py-4 sm:px-5 pb-8 h-full" dir="rtl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                    <ArrowRight className="h-5 w-5" />
                </button>
                <h2 className="text-foreground text-xl font-black">تقديم عرض</h2>
            </div>

            {/* Request summary card */}
            <div className="rounded-2xl border-2 border-border overflow-hidden bg-card">
                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 border border-border shrink-0 flex items-center justify-center">
                            {request.clientPictureUrl ? (
                                <img src={request.clientPictureUrl} alt={request.clientName ?? "عميل"} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm font-black text-primary">{request.clientName?.charAt(0) ?? "ع"}</span>
                            )}
                        </div>
                        <div className="flex-1 flex items-center justify-between min-w-0">
                            <p className="text-sm font-extrabold text-foreground truncate">{request.clientName ?? "عميل"}</p>
                            <div className="flex items-center gap-2 shrink-0">
                                {createdAt && <span className="text-[11px] text-muted-foreground">{createdAt}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                            <p className="text-sm font-bold text-primary truncate">{serviceName}</p>
                            {request.description && (
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{request.description}</p>
                            )}
                            {request.serviceRequestLocation && (
                                <span className="flex items-center gap-1 text-[11px] text-muted-foreground pt-0.5">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {request.serviceRequestLocation.latitude.toFixed(3)},{" "}
                                    {request.serviceRequestLocation.longitude.toFixed(3)}
                                </span>
                            )}
                        </div>
                    </div>

                    {images.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-1 px-1">
                            {images.map((url, i) => (
                                <div key={i} className="w-30 h-30 rounded-xl overflow-hidden shrink-0 border border-border">
                                    <img src={url} alt={`صورة ${i + 1}`} className="w-full h-full object-cover" onClick={() => setLightbox(url)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">
                        السعر المقترح (جنيه) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min={1}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-base font-bold text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-bold">ج.م</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground">رسالة للعميل</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="اكتب رسالة توضيحية للعميل عن خدمتك..."
                        rows={4}
                        className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                </div>
            </div>

            {/* Submit */}
            <div className="mt-auto pt-2">
                <Button
                    onClick={() => setShowConfirm(true)} // ← opens dialog instead of submitting directly
                    disabled={isPending || !price || Number(price) <= 0}
                    className="w-full h-14 rounded-2xl font-bold text-base gap-2"
                    variant="gradient"
                >
                    {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
                    {isPending ? "جاري الإرسال..." : "إرسال العرض"}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground mt-2 leading-relaxed px-2">
                    سيصل عرضك للعميل فوراً وسيتمكن من قبوله أو رفضه.
                </p>
            </div>

            {/* ── Confirmation Dialog ── */}
            {showConfirm && (
                <div
                    className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 px-4 pb-6 sm:pb-0"
                    onClick={() => setShowConfirm(false)}
                >
                    <div
                        className="w-full max-w-sm bg-card rounded-3xl border-2 border-border p-6 flex flex-col gap-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Icon + text */}
                        <div className="flex flex-col items-center gap-3 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10  flex items-center justify-center">
                                <Wallet className="h-6 w-6 text-primary"/>
                            </div>
                            <div className="space-y-1">
                                <p className="text-base font-black text-foreground">تأكيد إرسال العرض</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    سيتم خصم{" "}
                                    <span className="font-black text-primary">25 جنيه</span>{" "}
                                    من رصيدك عند  أكتمال الطلب
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 h-12 rounded-2xl border-2 border-border bg-background text-sm font-bold text-foreground "
                            >
                                إلغاء
                            </Button>
                            <Button

                                onClick={handleSubmitConfirmed}
                                className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-bold"
                            >
                                تأكيد الإرسال
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90" onClick={() => setLightbox(null)}>
                    <button
                        className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                        onClick={() => setLightbox(null)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <img
                        src={lightbox}
                        alt="صورة مكبرة"
                        className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}