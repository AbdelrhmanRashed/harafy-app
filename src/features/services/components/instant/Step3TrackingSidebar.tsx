import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetServiceReqById } from "../../hooks/useGetServiceReqById";
import { useSetReqCompleted } from "../../hooks/useSetReqCompleted";

const REQUEST_STATUS_LABEL: Record<number, string> = {
  0: "طلب مرسل — في انتظار عروض",
  1: "تم اختيار حرفي",
  2: "قيد التنفيذ",
  3: "مكتمل",
};

type Step3TrackingSidebarProps = {
  requestId: string;
  onCompleteSuccess: () => void;
};

export default function Step3TrackingSidebar({
  requestId,
  onCompleteSuccess,
}: Step3TrackingSidebarProps) {
  const { data, isFetching } = useGetServiceReqById(requestId, {
    enabled: !!requestId,
  });
  const { mutate: completeMutate, isPending: completing } =
    useSetReqCompleted();

  const req = data as Record<string, unknown> | undefined;
  const requestStatus = req?.requestStatus as number | undefined;
  const providerName =
    (req?.providerName as string) ||
    (typeof req?.providerId === "number"
      ? `محترف #${req.providerId}`
      : "—");
  const finalPrice = req?.finalPrice as number | null | undefined;

  const handleComplete = () => {
    completeMutate(requestId, {
      onSuccess: () => {
        onCompleteSuccess();
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
      <div className="text-right">
        <h2 className="text-foreground text-lg font-black">متابعة الطلب</h2>
        <p className="text-muted-foreground mt-1 text-xs">طلب #{requestId}</p>
      </div>

      {isFetching && !req ? (
        <div className="text-muted-foreground flex items-center justify-center gap-2 py-10 text-sm">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
          جاري تحميل التفاصيل...
        </div>
      ) : (
        <>
          {requestStatus !== undefined && (
            <p className="text-primary text-sm font-bold">
              الحالة:{" "}
              {REQUEST_STATUS_LABEL[requestStatus] ?? `رمز ${requestStatus}`}
            </p>
          )}

          <div className="border-border bg-card rounded-2xl border p-4 text-right">
            <p className="text-muted-foreground text-xs">المحترف</p>
            <p className="text-foreground text-lg font-extrabold">
              {providerName}
            </p>
            <p className="text-muted-foreground mt-3 text-xs">السعر</p>
            <p className="text-primary text-base font-bold">
              {finalPrice != null ? `${finalPrice} ج.م` : "—"}
            </p>
          </div>

          <p className="text-muted-foreground text-xs leading-relaxed">
            يمكنك إتمام الخدمة من هنا عند الانتهاء. الخريطة تعرض موقعك؛ موقع
            الحرفي يظهر عند توفره من الخادم.
          </p>

          <Button
            type="button"
            variant="default"
            className="w-full rounded-xl font-bold"
            disabled={completing || requestStatus === 3}
            onClick={handleComplete}
          >
            {completing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري الإتمام...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                إتمام الخدمة
              </>
            )}
          </Button>

          {requestStatus === 3 && (
            <p className="text-center text-sm font-bold text-green-700">
              الطلب مكتمل.
            </p>
          )}
        </>
      )}
    </div>
  );
}
