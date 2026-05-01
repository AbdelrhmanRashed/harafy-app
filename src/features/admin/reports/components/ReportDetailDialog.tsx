import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Hash,
  CalendarDays,
  StickyNote,
  Loader2,
  AlertTriangle,
  Ban,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUpdateReport } from '../hooks/useUpdateReport';
import { getImageUrl } from '@/lib/utils';
import { REPORT_TYPES } from '@/features/reports/constants/reportTypes';
import type { IReport } from '../types/report.types';

// ─── Status config ─────────────────────────────────────────────────────────────
// 0 = UnderReview (initial, read-only)
// 1 = Resolved    (provider will be BANNED)
// 2 = Rejected    (report is invalid, no action)
const STATUS_CONFIG: Record<
  number,
  { labelAr: string; className: string; icon: React.ReactNode }
> = {
  0: {
    labelAr: 'قيد المراجعة',
    className:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  1: {
    labelAr: 'تم الحل',
    className:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  2: {
    labelAr: 'مرفوض',
    className:
      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800',
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const UserAvatar = ({
  name,
  pictureUrl,
  label,
}: {
  name: string;
  pictureUrl: string | null;
  label: string;
}) => (
  <div className="bg-secondary flex items-center gap-3 rounded-2xl p-3">
    <Avatar className="h-9 w-9 shrink-0 rounded-full">
      <AvatarImage src={getImageUrl(pictureUrl ?? '')} alt={name} />
      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
        {name
          .split(' ')
          .map((n) => n.charAt(0))
          .join('')
          .slice(0, 2)}
      </AvatarFallback>
    </Avatar>
    <div className="min-w-0">
      <p className="text-muted-foreground text-xs font-semibold">{label}</p>
      <p className="text-foreground truncate text-sm font-bold">{name}</p>
    </div>
  </div>
);

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-secondary flex items-start gap-3 rounded-2xl p-3">
    <span className="text-muted-foreground mt-0.5">{icon}</span>
    <div>
      <p className="text-muted-foreground text-xs font-semibold">{label}</p>
      <p className="text-foreground text-sm font-bold">{value}</p>
    </div>
  </div>
);

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  open: boolean;
  onClose: () => void;
  report: IReport | null;
};

// ─── Component ────────────────────────────────────────────────────────────────
const ReportDetailDialog = ({ open, onClose, report }: Props) => {
  // status 0 = already under review, admin picks 1 or 2
  const currentStatus = (report?.status as number | undefined) ?? 0;
  const isAlreadyActioned = currentStatus === 1 || currentStatus === 2;

  const [selectedStatus, setSelectedStatus] = useState<1 | 2 | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const { mutate: updateReport, isPending } = useUpdateReport();

  // Reset whenever dialog opens with a new report
  useEffect(() => {
    if (open) {
      setSelectedStatus(null);
      setAdminNote('');
    }
  }, [open, report?.id]);

  const handleClose = () => {
    setSelectedStatus(null);
    setAdminNote('');
    onClose();
  };

  const handleSave = () => {
    if (!report || selectedStatus === null) return;
    console.log(report?.id, selectedStatus, adminNote);
    updateReport(
      {
        id: report.id,
        Status: selectedStatus,
        AdminNote: adminNote.trim() || null,
      },
      { onSuccess: handleClose },
    );
  };

  const currentCfg = STATUS_CONFIG[currentStatus];
  console.log(report);
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent
        className="max-h-[92dvh] w-full max-w-[560px] overflow-y-auto rounded-3xl p-0 sm:rounded-3xl"
        dir="rtl"
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 rounded-t-3xl bg-linear-to-r from-slate-700 to-slate-900 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <DialogHeader className="flex-1 text-right">
              <DialogTitle className="text-xl font-black text-white">
                تفاصيل البلاغ
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-white/70">
                {report ? `رقم البلاغ: #${report.id}` : ''}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* ── Body ── */}
        {report && (
          <div className="space-y-6 px-8 py-6">
            {/* ── Meta info ── */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoRow
                icon={<Hash className="h-4 w-4" />}
                label="رقم الطلب"
                value={`#${report.serviceRequestId}`}
              />
              <InfoRow
                icon={<CalendarDays className="h-4 w-4" />}
                label="آخر تحديث"
                value={new Date(report.lastUpdate).toLocaleDateString('ar-EG')}
              />
            </div>

            {/* ── Report Type ── */}
            {report.reportType !== undefined &&
              (() => {
                const rt = REPORT_TYPES.find(
                  (t) => t.value === report.reportType,
                );
                return rt ? (
                  <div className="bg-secondary flex items-start gap-3 rounded-2xl p-4">
                    <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                      <ShieldAlert className="text-primary h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-semibold">
                        نوع البلاغ
                      </p>
                      <p className="text-foreground text-sm font-bold">
                        {rt.labelAr}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {rt.description}
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}

            {/* ── Reporter & Target ── */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <UserAvatar
                name={report.reporterName}
                pictureUrl={report.reporterPictureUrl}
                label="المُبلِّغ"
              />
              <UserAvatar
                name={report.targetUserName}
                pictureUrl={report.targetUserPictureUrl}
                label="المُبلَّغ عنه"
              />
            </div>

            {/* ── Reason ── */}
            <div className="bg-secondary space-y-1 rounded-2xl p-4">
              <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                سبب البلاغ
              </p>
              <p className="text-foreground text-sm leading-relaxed">
                {report.reason ?? (
                  <span className="italic opacity-60">لم يُذكر سبب</span>
                )}
              </p>
            </div>

            {/* ── Current status badge ── */}
            <div className="flex items-center justify-between">
              <span className="text-foreground text-sm font-bold">
                الحالة الحالية
              </span>
              {currentCfg && (
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${currentCfg.className}`}
                >
                  {currentCfg.icon}
                  {currentCfg.labelAr}
                </Badge>
              )}
            </div>

            {/* ── Action section (only if still under review) ── */}
            {isAlreadyActioned ? (
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/30">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  تم اتخاذ قرار بشأن هذا البلاغ مسبقاً ولا يمكن تغييره.
                </p>
              </div>
            ) : (
              <>
                {/* ── Status picker ── */}
                <div className="space-y-3">
                  <label className="text-foreground text-sm font-bold">
                    اتخاذ قرار <span className="text-destructive">*</span>
                  </label>

                  <div className="mt-2 flex gap-3">
                    {/* Resolved */}
                    <button
                      type="button"
                      onClick={() => setSelectedStatus(1)}
                      className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl border-2 px-4 py-4 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                        selectedStatus === 1
                          ? 'border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-emerald-900/30'
                          : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30'
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span>تم الحل</span>
                      <span className="text-[10px] font-normal opacity-75">
                        البلاغ صحيح
                      </span>
                    </button>

                    {/* Rejected */}
                    <button
                      type="button"
                      onClick={() => setSelectedStatus(2)}
                      className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl border-2 px-4 py-4 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                        selectedStatus === 2
                          ? 'border-rose-500 bg-rose-600 text-white shadow-md shadow-rose-200 dark:shadow-rose-900/30'
                          : 'border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/30'
                      }`}
                    >
                      <XCircle className="h-5 w-5" />
                      <span>مرفوض</span>
                      <span className="text-[10px] font-normal opacity-75">
                        البلاغ غير صحيح
                      </span>
                    </button>
                  </div>

                  {/* Ban warning */}
                  {selectedStatus === 1 && (
                    <div className="flex items-start gap-3 rounded-2xl bg-rose-50 p-4 dark:bg-rose-950/20">
                      <Ban className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <p className="text-xs leading-relaxed font-medium text-rose-700 dark:text-rose-400">
                        <strong>تحذير:</strong> سيؤدي هذا الإجراء إلى{' '}
                        <strong>حظر مقدم الخدمة</strong> "
                        {report.targetUserName}" بشكل فوري من المنصة.
                      </p>
                    </div>
                  )}

                  {selectedStatus === 2 && (
                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/30">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      <p className="text-xs leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                        سيتم رفض البلاغ دون اتخاذ أي إجراء ضد مقدم الخدمة.
                      </p>
                    </div>
                  )}
                </div>

                {/* ── Admin Note ── */}
                <div className="space-y-2">
                  <label className="text-foreground flex items-center gap-2 text-sm font-bold">
                    <StickyNote className="text-muted-foreground h-4 w-4" />
                    ملاحظة الإدارة <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="أضف ملاحظة توضيحية للقرار..."
                    rows={3}
                    maxLength={500}
                    className="border-border bg-secondary mt-1 w-full resize-none rounded-2xl border-2 p-4 text-sm transition-all focus:border-slate-400/50 focus:ring-4 focus:ring-slate-100 focus:outline-none dark:focus:ring-slate-900/20"
                  />
                  <p className="text-muted-foreground text-right text-xs">
                    {adminNote.length} / 500
                  </p>
                </div>

                {/* ── Actions ── */}
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
                    onClick={handleSave}
                    disabled={isPending || selectedStatus === null || !adminNote.trim()}
                    className="h-12 flex-1 cursor-pointer rounded-2xl bg-slate-800 font-bold text-white hover:bg-slate-900 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-600"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        جارٍ الحفظ...
                      </span>
                    ) : (
                      'تأكيد القرار'
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailDialog;
