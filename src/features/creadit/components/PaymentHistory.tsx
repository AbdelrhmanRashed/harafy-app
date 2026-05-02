import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle2, XCircle, Coins, TrendingDown,
  ChevronRight, ChevronLeft, Loader2, ReceiptText,
  ChevronDown, ChevronUp, MapPin, FileText, CreditCard,
} from 'lucide-react';
import { useGetCreditTransactions } from '../hooks/useGetCreditTransactions';
import { getPaymentByIntent } from '../api/getPaymentByIntent';
import { getRequestByReference } from '../api/getRequestByReference';
import type { CreditTransaction } from '../api/getCreditTransactions';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 10;

const PAYMENT_STATUS: Record<number, { label: string; className: string }> = {
  0: { label: 'معلّق',      className: 'text-amber-600 bg-amber-500/10' },
  1: { label: 'قيد المعالجة', className: 'text-blue-600 bg-blue-500/10' },
  2: { label: 'مكتمل',      className: 'text-emerald-600 bg-emerald-500/10' },
  3: { label: 'فشل',        className: 'text-rose-600 bg-rose-500/10' },
  4: { label: 'ملغي',       className: 'text-slate-500 bg-slate-500/10' },
  5: { label: 'مُسترد',     className: 'text-violet-600 bg-violet-500/10' },
};

/* ─── Detail panel for type=0 (purchase) ─── */
function PurchaseDetail({ referenceId }: { referenceId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['payment-intent', referenceId],
    queryFn: () => getPaymentByIntent(referenceId),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div className="flex justify-center py-3"><Loader2 className="text-primary h-4 w-4 animate-spin" /></div>;
  if (!data) return null;

  const ps = PAYMENT_STATUS[data.status] ?? PAYMENT_STATUS[0];
  return (
    <div className="bg-muted/30 mt-1 grid grid-cols-2 gap-3 rounded-2xl p-4 text-right sm:grid-cols-3" dir="rtl">
      <div>
        <p className="text-muted-foreground text-[10px] font-semibold">النقاط</p>
        <p className="text-foreground text-sm font-black">{data.credits} نقطة</p>
      </div>
      <div>
        <p className="text-muted-foreground text-[10px] font-semibold">المبلغ المدفوع</p>
        <p className="text-foreground text-sm font-black">{Number(data.amount).toLocaleString('ar-EG')} ج.م</p>
      </div>
      <div>
        <p className="text-muted-foreground text-[10px] font-semibold">الحالة</p>
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold', ps.className)}>
          {ps.label}
        </span>
      </div>
      <div className="col-span-2 sm:col-span-3">
        <p className="text-muted-foreground text-[10px] font-semibold">رقم العملية</p>
        <p className="text-foreground truncate font-mono text-[10px]">{referenceId}</p>
      </div>
    </div>
  );
}

/* ─── Detail panel for type=1 (deduction) ─── */
function DeductionDetail({ referenceId }: { referenceId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['request-by-ref', referenceId],
    queryFn: () => getRequestByReference(referenceId),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div className="flex justify-center py-3"><Loader2 className="text-primary h-4 w-4 animate-spin" /></div>;
  if (!data) return null;

  return (
    <div className="bg-muted/30 mt-1 flex flex-col gap-2 rounded-2xl p-4 text-right" dir="rtl">
      {data.description && (
        <div className="flex items-start gap-2">
          <FileText className="text-muted-foreground mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p className="text-muted-foreground text-xs leading-relaxed">{data.description}</p>
        </div>
      )}
      {data.serviceRequestLocation && (
        <div className="flex items-center gap-2">
          <MapPin className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
          <p className="text-muted-foreground text-xs">
            {data.serviceRequestLocation.address ??
              `${data.serviceRequestLocation.latitude.toFixed(3)}, ${data.serviceRequestLocation.longitude.toFixed(3)}`}
          </p>
        </div>
      )}
      <div className="flex items-center gap-2">
        <CreditCard className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
        <p className="text-muted-foreground text-[11px]">
          <span className="text-foreground font-semibold"> رقم الطلب : </span>#{data.id}
        </p>
      </div>
    </div>
  );
}

/* ─── Single row ─── */
function TransactionRow({ tx }: { tx: CreditTransaction }) {
  const [open, setOpen] = useState(false);
  const isCredit = tx.type === 0;
  const hasRef = !!tx.referenceId;

  const date = new Date(tx.createdAt).toLocaleString('ar-EG', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="border-border/50 border-b last:border-0">
      {/* Main row */}
      <button
        onClick={() => hasRef && setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center gap-4 px-5 py-4 text-right transition-colors',
          hasRef ? 'cursor-pointer hover:bg-muted/20' : 'cursor-default',
        )}
      >
        {/* Icon */}
        <div className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
          isCredit ? 'bg-emerald-500/10' : 'bg-rose-500/10',
        )}>
          {isCredit
            ? <Coins className="h-5 w-5 text-emerald-600" />
            : <TrendingDown className="h-5 w-5 text-rose-500" />}
        </div>

        {/* Label + date */}
        <div className="min-w-0 flex-1 text-right">
          <p className="text-foreground text-sm font-bold">
            {isCredit ? 'شحن رصيد' : 'استهلاك نقاط - خدمة مكتملة'}
          </p>
          <p className="text-muted-foreground mt-0.5 truncate text-[11px]">{date}</p>
        </div>

        {/* Amount + chevron */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="text-right">
            <p className={cn('text-sm font-black', isCredit ? 'text-emerald-600' : 'text-rose-500')}>
              {isCredit ? '+' : '−'}{Math.abs(tx.amount)} نقطة
            </p>
            <span className={cn(
              'mt-0.5 flex items-center justify-end gap-1 text-[10px] font-bold',
              isCredit ? 'text-emerald-600' : 'text-rose-500',
            )}>
              {isCredit ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
              {isCredit ? 'مكتمل' : 'مستهلك'}
            </span>
          </div>
          {hasRef && (
            <div className="text-muted-foreground">
              {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {open && tx.referenceId && (
        <div className="px-5 pb-4">
          {isCredit
            ? <PurchaseDetail referenceId={tx.referenceId} />
            : <DeductionDetail referenceId={tx.referenceId} />}
        </div>
      )}
    </div>
  );
}

/* ─── Main exported component ─── */
export function PaymentHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetCreditTransactions(page, PAGE_SIZE);
  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 1;

  if (isLoading) return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
    </div>
  );

  if (isError || !data) return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <XCircle className="text-muted-foreground/30 mb-3 h-12 w-12" />
      <p className="text-muted-foreground text-sm">تعذّر تحميل سجل المعاملات</p>
    </div>
  );

  if (data.data.length === 0) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-secondary/50 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <ReceiptText className="text-muted-foreground/40 h-10 w-10" />
      </div>
      <p className="text-foreground text-base font-bold">لا توجد معاملات بعد</p>
      <p className="text-muted-foreground mt-1 text-sm">
        سجل عمليات شحن واستخدام النقاط سيظهر هنا.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col">
      {data.data.map((tx) => <TransactionRow key={tx.id} tx={tx} />)}

      {totalPages > 1 && (
        <div className="border-border/50 flex items-center justify-between border-t px-5 py-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-8 w-8 items-center justify-center rounded-xl transition-colors disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="text-muted-foreground text-xs font-semibold">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-8 w-8 items-center justify-center rounded-xl transition-colors disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
