import { Loader2, ClipboardList, MapPin, Zap, RefreshCw } from "lucide-react";
import { useGetAvailableRequests } from "../hooks/useGetAvailableRequests";
import { useGetServices } from "../hooks/useGetServices";
import type { AvailableRequestItem } from "../types/providerOfferTypes";
import { cn } from "@/lib/utils";

type Step1AvailableRequestsProps = {
    onSelectRequest: (request: AvailableRequestItem) => void;
    selectedRequestId?: number | null;
};

export default function Step1AvailableRequests({
    onSelectRequest,
    selectedRequestId,
}: Step1AvailableRequestsProps) {
    const { data: services } = useGetServices();

    const { data: raw, isFetching, refetch } = useGetAvailableRequests(
        services ?? [],
        { refetchInterval: 15000 }
    );

    const requests: AvailableRequestItem[] = Array.isArray(raw) ? raw : [];

    return (
        <div className="flex flex-col gap-6 px-4 py-4 sm:px-5 pb-8 h-full relative" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-foreground text-xl font-black">الطلبات المتاحة</h2>
                <button
                    onClick={() => refetch()}
                    className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-xl hover:bg-primary/10"
                    disabled={isFetching}
                >
                    <RefreshCw className={cn("h-4 w-4", isFetching && "animate-spin text-primary")} />
                </button>
            </div>

            {/* Info bar */}
            <div className="bg-primary/5 rounded-2xl px-5 py-4 flex items-center gap-4">
                <RefreshCw className="h-5 w-5 text-primary shrink-0" />
                <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
                    يتم التحديث تلقائياً كل 15 ثانية. اضغط على طلب لتقديم عرضك.
                </p>
            </div>

            {/* Content */}
            {isFetching && requests.length === 0 ? (
                <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-2 py-12 text-sm font-bold">
                    <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    جاري تحميل الطلبات...
                </div>
            ) : requests.length === 0 ? (
                <div className="flex flex-col items-center flex-1 justify-center text-center py-6">
                    <div className="relative mb-8">
                        <div className="h-32 w-32 bg-primary/5 rounded-full outline outline-12 outline-primary/5 flex items-center justify-center">
                            <ClipboardList className="h-14 w-14 text-primary/40" />
                        </div>
                        <div className="absolute top-1 right-1 h-6 w-6 bg-primary/10 rounded-full border-[3px] border-background flex items-center justify-center shadow-sm">
                            <Zap className="h-3 w-3 text-primary fill-current" />
                        </div>
                    </div>
                    <h3 className="text-foreground text-xl font-black">لا توجد طلبات متاحة</h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed mt-3 max-w-[280px]">
                        لا توجد طلبات في منطقتك حالياً. سنعلمك فور وصول طلب جديد.
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 -mr-1">
                    {requests.map((req) => (
                        <RequestCard
                            key={req.id}
                            request={req}
                            isSelected={selectedRequestId === req.id}
                            onSelect={() => onSelectRequest(req)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}


function RequestCard({
    request,
    isSelected,
    onSelect,
}: {
    request: AvailableRequestItem;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const createdAt = request.createdAt
        ? new Date(request.createdAt).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;
    const { data: services } = useGetServices();
    const serviceName = services?.find((s) => s.id === request.serviceId)?.name
        ?? "";
    const images = request.imageUrls ?? [];
    return (
        <li>
            <button
                onClick={onSelect}
                className={cn(
                    "w-full text-right rounded-2xl border-2 overflow-hidden transition-all",
                    isSelected
                        ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                        : "border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02]"
                )}
            >
                <div className="p-4 space-y-3">
                    {/* Client row */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 border border-border shrink-0 flex items-center justify-center">
                            {request.clientPictureUrl ? (
                                <img
                                    src={request.clientPictureUrl}
                                    alt={request.clientName ?? ""}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-sm font-black text-primary">
                                    {request.clientName?.charAt(0) ?? ""}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 flex items-center justify-between min-w-0">
                            <p className="text-sm font-extrabold text-foreground truncate">
                                {request.clientName ?? ""}
                            </p>
                            {createdAt && (
                                <span className="text-[11px] text-muted-foreground shrink-0 mr-2">
                                    {createdAt}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-1 min-w-0">
                            <p className="text-sm font-bold text-primary truncate">
                                {serviceName}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {request.description || "لا يوجد وصف"}
                            </p>
                            {request.serviceRequestLocation && (
                                <span className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {request.serviceRequestLocation.latitude.toFixed(3)},{" "}
                                    {request.serviceRequestLocation.longitude.toFixed(3)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Images */}
                    {images.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-1 px-1">
                            {images.map((url, i) => (
                                <div
                                    key={i}
                                    className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-border"
                                >
                                    <img
                                        src={url}
                                        alt={`صورة ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </button>
        </li>
    );
}