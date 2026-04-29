import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useReportRequest } from '../hooks/useReportRequest';
import { REPORT_TYPES } from '../constants/reportTypes';


// ─── Props ─────────────────────────────────────────────────────────────────────
type Props = {
  open: boolean;
  onClose: () => void;
  serviceRequestId: number;
};

// ─── Component ────────────────────────────────────────────────────────────────
const ReportDialog = ({ open, onClose, serviceRequestId }: Props) => {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [reason, setReason] = useState('');

  const { mutate: report, isPending } = useReportRequest();

  const handleClose = () => {
    setSelectedType(null);
    setReason('');
    onClose();
  };

  const handleSubmit = () => {
    if (selectedType === null) return;

    report(
      {
        ServiceRequestId: serviceRequestId,
        ReportType: selectedType,
        Reason: reason.trim() || null,
      },
      { onSuccess: handleClose },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) handleClose();
      }}
    >
      <DialogContent
        className="max-h-[92dvh] w-full max-w-[520px] overflow-y-auto rounded-3xl p-0 sm:rounded-3xl"
        dir="rtl"
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 rounded-t-3xl bg-linear-to-r from-rose-600 to-red-700 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <DialogHeader className="flex-1 text-right">
              <DialogTitle className="text-xl font-black text-white">
                الإبلاغ عن الطلب
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-white/80">
                ساعدنا في الحفاظ على بيئة آمنة وموثوقة للجميع
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="space-y-6 px-8 py-6">
          {/* Type selection */}
          <div className="space-y-3">
            <label className="text-foreground text-sm font-bold">
              سبب الإبلاغ <span className="text-destructive">*</span>
            </label>

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {REPORT_TYPES.map((rt) => {
                const isSelected = selectedType === rt.value;
                return (
                  <button
                    key={rt.value}
                    type="button"
                    onClick={() => setSelectedType(rt.value)}
                    className={`group relative flex flex-col items-start gap-0.5 rounded-2xl border-2 p-4 text-right transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50 shadow-md shadow-rose-100 dark:bg-rose-950/30 dark:shadow-rose-900/20'
                        : 'border-border bg-secondary hover:border-rose-200 hover:bg-rose-50/40 dark:hover:bg-rose-950/10'
                    }`}
                  >
                    {/* Selected indicator */}
                    <span
                      className={`absolute top-3 left-3 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-rose-500 bg-rose-500'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>

                    <span
                      className={`text-sm font-bold transition-colors ${
                        isSelected
                          ? 'text-rose-700 dark:text-rose-400'
                          : 'text-foreground'
                      }`}
                    >
                      {rt.labelAr}
                    </span>
                    <span className="text-muted-foreground text-xs leading-snug">
                      {rt.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedType === null && (
              <p className="text-muted-foreground text-xs">
                يرجى اختيار سبب الإبلاغ للمتابعة
              </p>
            )}
          </div>

          {/* Reason textarea (optional) */}
          <div className="space-y-2">
            <label className="text-foreground mb= text-sm font-bold">
              تفاصيل إضافية{' '}
              <span className="text-muted-foreground font-normal">
                (اختياري)
              </span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="أخبرنا بمزيد من التفاصيل حول المشكلة التي واجهتها..."
              rows={4}
              maxLength={500}
              className="border-border bg-secondary mt-2 w-full resize-none rounded-2xl border-2 p-4 text-sm transition-all focus:border-rose-400/50 focus:ring-4 focus:ring-rose-100 focus:outline-none dark:focus:ring-rose-900/20"
            />
            <p className="text-muted-foreground text-right text-xs">
              {reason.length} / 500
            </p>
          </div>

          {/* Warning note */}
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/20">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-xs leading-relaxed font-medium text-amber-700 dark:text-amber-400">
              تأكد من صحة المعلومات المُبلَّغ عنها. يُعدّ تقديم بلاغات كيدية
              مخالفاً لسياسة المنصة.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="h-12 flex-1 cursor-pointer rounded-2xl font-bold"
            >
              إلغاء
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || selectedType === null}
              className="h-12 flex-1 cursor-pointer rounded-2xl bg-rose-600 font-bold text-white hover:bg-rose-700 disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  جارٍ الإرسال...
                </span>
              ) : (
                'إرسال البلاغ'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
