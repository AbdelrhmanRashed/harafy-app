import { useState } from 'react';
import { useGetAllReports } from '../hooks/useGetAllReports';
import ReportDetailDialog from '../components/ReportDetailDialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShieldAlert,
  RefreshCcw,
  AlertCircle,
  Eye,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Flag,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getImageUrl } from '@/lib/utils';
import type { IReport } from '../types/report.types';

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ReportsTableSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} className="h-16 w-full rounded-xl" />
    ))}
  </div>
);

// ─── User Cell ────────────────────────────────────────────────────────────────
const UserCell = ({
  name,
  pictureUrl,
}: {
  name: string;
  pictureUrl: string | null;
}) => (
  <div className="flex items-center gap-2">
    <Avatar className="h-7 w-7 shrink-0 rounded-full sm:h-8 sm:w-8">
      <AvatarImage src={getImageUrl(pictureUrl ?? '')} alt={name} />
      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">
        {name
          .split(' ')
          .map((n) => n.charAt(0))
          .join('')
          .slice(0, 2)}
      </AvatarFallback>
    </Avatar>
    {/* ✅ max-w بدل w ثابت عشان يتكيف مع الشاشة */}
    <span className="text-foreground max-w-[80px] truncate text-xs font-semibold sm:max-w-[120px] sm:text-sm md:max-w-[150px]">
      {name}
    </span>
  </div>
);

// ─── Stats Card ───────────────────────────────────────────────────────────────
const StatsCard = ({
  title,
  value,
  icon,
  highlight = false,
  className = '',
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  highlight?: boolean;
  className?: string;
}) => (
  <Card className={`overflow-hidden ${className}`}>
    {/* ✅ padding أصغر على موبايل */}
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          {/* ✅ text أصغر على موبايل */}
          <p className="text-muted-foreground text-xs font-medium sm:text-sm">
            {title}
          </p>
          {/* ✅ رقم أصغر على موبايل */}
          <h2
            className={`mt-1 text-2xl font-bold sm:text-3xl ${highlight ? 'text-primary' : ''}`}
          >
            {value}
          </h2>
        </div>
        {/* ✅ icon أصغر على موبايل */}
        <div className="bg-accent/20 rounded-full p-2 sm:p-3">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const ReportsPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedReport, setSelectedReport] = useState<IReport | null>(null);

  const { data, isLoading, isError, refetch, isRefetching, isFetching } =
    useGetAllReports(pageIndex, PAGE_SIZE);

  const reports: IReport[] = data?.data ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="container mx-auto space-y-8 px-4 py-8" dir="rtl">
        {/* ✅ grid-cols-2 على موبايل */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className={`h-24 rounded-xl sm:h-28 ${i === 3 ? 'col-span-2 md:col-span-1' : ''}`}
            />
          ))}
        </div>
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="pt-6">
            <ReportsTableSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="container mx-auto p-4 sm:p-8" dir="rtl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ في تحميل البيانات</AlertTitle>
          <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>
              تعذر جلب بيانات البلاغات حالياً. يرجى المحاولة مرة أخرى.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="w-fit"
            >
              إعادة المحاولة
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto space-y-6 px-4 py-6 sm:space-y-8 sm:py-8"
      dir="rtl"
    >
      {/* ── Header ── */}
      <header className="flex flex-col gap-3 border-b pb-5 sm:gap-4 sm:pb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-right">
          {/* ✅ عنوان أصغر على موبايل */}
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            إدارة البلاغات
          </h1>
          {/* ✅ الوصف مخفي على xs */}
          <p className="text-muted-foreground hidden text-base sm:block sm:text-lg">
            مراجعة ومعالجة البلاغات المُقدَّمة من المستخدمين
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isRefetching}
          className="w-fit gap-2 self-end shadow-sm md:self-auto"
        >
          <RefreshCcw
            className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`}
          />
          {/* ✅ نص الزرار مخفي على xs */}
          <span className="hidden sm:inline">تحديث البيانات</span>
        </Button>
      </header>

      {/* ── Stats ── */}
      {/* ✅ grid-cols-2 على موبايل، الكارت التالت بياخد عرض كامل */}
      <section className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        <StatsCard
          title="إجمالي البلاغات"
          value={totalCount}
          icon={<Flag className="text-slate-500" size={18} />}
        />
        <StatsCard
          title="هذه الصفحة"
          value={reports.length}
          icon={<Clock className="text-amber-500" size={18} />}
          highlight
        />
        {/* ✅ الكارت التالت بياخد سطر كامل على موبايل */}
        <StatsCard
          title="عدد الصفحات"
          value={totalPages}
          icon={<CheckCircle2 className="text-emerald-500" size={18} />}
          className="col-span-2 md:col-span-1"
        />
      </section>

      {/* ── Table Card ── */}
      {reports.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-2 border-dashed p-8 text-center sm:p-12">
          <div className="mb-4 rounded-full p-4">
            <ShieldAlert className="text-muted-foreground h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <CardTitle className="mb-2 text-base sm:text-lg">
            لا توجد بلاغات
          </CardTitle>
          <CardDescription className="mx-auto max-w-[250px] text-sm">
            لم يتم تقديم أي بلاغات بعد. ستظهر هنا عند وصول بلاغات جديدة.
          </CardDescription>
        </Card>
      ) : (
        <Card
          className={`border-none shadow-lg ring-1 transition-opacity ${isFetching ? 'opacity-70' : ''}`}
        >
          <CardHeader className="border-b px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-xl">
                  قائمة البلاغات
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  إجمالي البلاغات: {totalCount}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <div className="overflow-hidden rounded-xl border">
              <Table>
                <TableHeader className="bg-accent/30">
                  <TableRow>
                    <TableHead className="px-3 py-3 text-right font-bold sm:px-4 sm:py-4">
                      الرقم
                    </TableHead>
                    <TableHead className="px-3 py-3 text-right font-bold sm:px-4 sm:py-4">
                      المُبلِّغ
                    </TableHead>
                    {/* ✅ المُبلَّغ عنه يظهر من sm بدل hidden على xs فقط */}
                    <TableHead className="hidden px-3 py-3 text-right font-bold sm:table-cell sm:px-4 sm:py-4">
                      المُبلَّغ عنه
                    </TableHead>
                    <TableHead className="hidden px-3 py-3 text-right font-bold sm:px-4 sm:py-4 md:table-cell">
                      رقم الطلب
                    </TableHead>
                    <TableHead className="hidden px-3 py-3 text-right font-bold lg:table-cell">
                      السبب
                    </TableHead>
                    <TableHead className="hidden px-3 py-3 text-right font-bold xl:table-cell">
                      آخر تحديث
                    </TableHead>
                    <TableHead className="px-3 py-3 text-right font-bold sm:px-4 sm:py-4">
                      الإجراء
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report: IReport) => (
                    <TableRow
                      key={report.id}
                      className="hover:bg-accent/20 cursor-pointer transition-colors"
                      onClick={() => setSelectedReport(report)}
                    >
                      {/* ID */}
                      <TableCell className="px-3 py-3 text-right font-semibold sm:px-4 sm:py-4">
                        <span className="text-xs sm:text-sm">#{report.id}</span>
                      </TableCell>

                      {/* Reporter */}
                      <TableCell className="px-3 py-3 text-right sm:px-4 sm:py-4">
                        <UserCell
                          name={report.reporterName}
                          pictureUrl={report.reporterPictureUrl}
                        />
                      </TableCell>

                      {/* Target — hidden on xs */}
                      <TableCell className="hidden px-3 py-3 text-right sm:table-cell sm:px-4 sm:py-4">
                        <UserCell
                          name={report.targetUserName}
                          pictureUrl={report.targetUserPictureUrl}
                        />
                      </TableCell>

                      {/* Request ID — hidden below md */}
                      <TableCell className="hidden px-3 py-3 text-right sm:px-4 sm:py-4 md:table-cell">
                        <span className="text-primary text-xs font-bold sm:text-sm">
                          #{report.serviceRequestId}
                        </span>
                      </TableCell>

                      {/* Reason — hidden below lg */}
                      <TableCell className="text-muted-foreground hidden px-3 py-3 text-right text-sm lg:table-cell">
                        {report.reason ? (
                          <span
                            className="block max-w-[160px] truncate"
                            title={report.reason}
                          >
                            {report.reason}
                          </span>
                        ) : (
                          <span className="italic opacity-60">لم يُذكر</span>
                        )}
                      </TableCell>

                      {/* Last Update — hidden below xl */}
                      <TableCell className="text-muted-foreground hidden px-3 py-3 text-right text-sm xl:table-cell">
                        {new Date(report.lastUpdate).toLocaleDateString(
                          'ar-EG',
                        )}
                      </TableCell>

                      {/* Action */}
                      <TableCell className="px-3 py-3 text-right sm:px-4 sm:py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReport(report);
                          }}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">عرض</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* ── Pagination ── */}
            <div className="mt-4 flex items-center justify-between px-1 sm:px-2">
              {/* ✅ النص مخفي على xs */}
              <p className="text-muted-foreground hidden text-sm sm:block">
                الصفحة {pageIndex} من {totalPages}
              </p>

              {/* ✅ على موبايل: أزرار تاخد العرض كامل مع رقم الصفحة في النص */}
              <div className="flex w-full items-center justify-between sm:w-auto sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
                  disabled={pageIndex <= 1 || isFetching}
                  className="gap-1"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="hidden sm:inline">السابق</span>
                </Button>

                {/* ✅ رقم الصفحة بيظهر على xs بس */}
                <span className="text-muted-foreground text-sm sm:hidden">
                  {pageIndex} / {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPageIndex((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={pageIndex >= totalPages || isFetching}
                  className="gap-1"
                >
                  <span className="hidden sm:inline">التالي</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Detail Dialog ── */}
      <ReportDetailDialog
        open={selectedReport !== null}
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
    </div>
  );
};

export default ReportsPage;
