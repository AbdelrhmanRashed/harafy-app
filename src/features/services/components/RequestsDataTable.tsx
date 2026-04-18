import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  Funnel,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ServiceStatus } from '@/constants/service-status';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { getImageUrl } from '@/lib/utils';

// Smart Semantic Status System
const getStatusDetails = (status: number) => {
  switch (status) {
    case ServiceStatus.OPEN:
      return {
        label: 'قيد الانتظار',
        bg: 'bg-amber-50/80 dark:bg-amber-500/10 backdrop-blur-sm',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200/50 dark:border-amber-500/20',
        dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
      };
    case ServiceStatus.ASSIGNED:
      return {
        label: 'في انتظار الحرفي',
        bg: 'bg-blue-50/80 dark:bg-blue-500/10 backdrop-blur-sm',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200/50 dark:border-blue-500/20',
        dot: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]',
      };
    case ServiceStatus.IN_PROGRESS:
      return {
        label: 'قيد التنفيذ',
        bg: 'bg-indigo-50/80 dark:bg-indigo-500/10 backdrop-blur-sm',
        text: 'text-indigo-700 dark:text-indigo-400',
        border: 'border-indigo-200/50 dark:border-indigo-500/20',
        dot: 'bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]',
      };
    case ServiceStatus.COMPLETED:
      return {
        label: 'مكتمل بنجاح',
        bg: 'bg-emerald-50/80 dark:bg-emerald-500/10 backdrop-blur-sm',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200/50 dark:border-emerald-500/20',
        dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
      };
    case ServiceStatus.CANCELLED:
      return {
        label: 'ملغي / مرفوض',
        bg: 'bg-rose-50/80 dark:bg-rose-500/10 backdrop-blur-sm',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200/50 dark:border-rose-500/20',
        dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]',
      };
    default:
      return {
        label: 'غير معروف',
        bg: 'bg-slate-50/80 dark:bg-slate-500/10 backdrop-blur-sm',
        text: 'text-slate-700 dark:text-slate-400',
        border: 'border-slate-200/50 dark:border-slate-500/20',
        dot: 'bg-slate-500',
      };
  }
};

interface RequestsDataTableProps {
  requests: any[];
  services: any[];
}

export const RequestsDataTable = ({
  requests,
  services,
}: RequestsDataTableProps) => {
  const navigate = useNavigate();

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Minimal columns definition required for headless table filtering & sorting
  const columns: ColumnDef<any>[] = [
    { accessorKey: 'id' },
    {
      accessorKey: 'serviceId',
      filterFn: (row, id, value) => {
        return value === 'all' || String(row.getValue(id)) === String(value);
      },
    },
    { accessorKey: 'createdAt' },
    {
      accessorKey: 'requestStatus',
      filterFn: (row, id, value) => {
        return value === 'all' || String(row.getValue(id)) === String(value);
      },
    },
    {
      accessorKey: 'description',
      enableSorting: false,
      enableHiding: true, // We map this property to global filter only
    },
  ];

  const table = useReactTable({
    data: requests || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: 'auto',
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 9, // Optimal for 3-column grid
      },
    },
  });

  return (
    <div className="space-y-8" dir="rtl">
      {/* Real Search & Filters Toolbar */}
      <div className="border-border/60 bg-card/60 flex flex-col gap-4 rounded-2xl border p-3 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="relative w-full flex-1 md:max-w-md">
          <Search className="text-muted-foreground absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="ابحث برقم الطلب أو الوصف..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="bg-background border-border/50 placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-primary/10 h-12 w-full rounded-xl border py-3.5 pr-12 pl-5 text-sm font-semibold transition-all outline-none focus:ring-4"
          />
        </div>

        <div className="flex h-13 w-full grid-cols-2 items-center gap-3 overflow-x-auto pb-2 md:w-auto md:grid-cols-none md:pb-0">
          <div className="bg-background border-border/50 hidden size-10.5 shrink-0 items-center justify-center rounded-xl border sm:flex">
            <Funnel className="text-muted-foreground h-5 w-5" />
          </div>

          {/* Service Filter dropdown */}
          <Select
            value={
              (table.getColumn('serviceId')?.getFilterValue() as string) ??
              'all'
            }
            onValueChange={(value) =>
              table.getColumn('serviceId')?.setFilterValue(value)
            }
          >
            <SelectTrigger className="border-border/50 bg-background hover:border-primary/30 w-full min-w-[170px] rounded-xl py-5 font-semibold transition-colors">
              <SelectValue placeholder="تصفية عبر الخدمة" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl font-bold">
              <SelectItem value="all">جميع الخدمات المتاحة</SelectItem>
              {services?.map((s: any) => (
                <SelectItem key={s.id} value={String(s.id)}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter dropdown */}
          <Select
            value={
              (table.getColumn('requestStatus')?.getFilterValue() as string) ??
              'all'
            }
            onValueChange={(value) =>
              table.getColumn('requestStatus')?.setFilterValue(value)
            }
          >
            <SelectTrigger className="border-border/50 bg-background hover:border-primary/30 w-full min-w-[150px] rounded-xl py-5 font-semibold transition-colors">
              <SelectValue placeholder="حالة الطلب" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl font-semibold">
              <SelectItem value="all">كل الحالات معاً</SelectItem>
              <SelectItem
                value="0"
                className="text-amber-600 focus:text-amber-700"
              >
                قيد الانتظار
              </SelectItem>
              <SelectItem
                value="1"
                className="text-blue-600 focus:text-blue-700"
              >
                في انتظار الحرفي
              </SelectItem>
              <SelectItem
                value="2"
                className="text-indigo-600 focus:text-indigo-700"
              >
                قيد التنفيذ
              </SelectItem>
              <SelectItem
                value="3"
                className="text-emerald-600 focus:text-emerald-700"
              >
                مكتمل بنجاح
              </SelectItem>
              <SelectItem
                value="4"
                className="text-rose-600 focus:text-rose-700"
              >
                ملغي / مرفوض
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Filter dropdown */}
          <Select
            value={table.getState().sorting[0]?.desc ? 'desc' : 'asc'}
            onValueChange={(value) =>
              table.setSorting([{ id: 'createdAt', desc: value === 'desc' }])
            }
          >
            <SelectTrigger className="border-border/50 bg-background hover:border-primary/30 w-full min-w-[140px] rounded-xl py-5 font-semibold transition-colors">
              <SelectValue placeholder="ترتيب" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl font-semibold">
              <SelectItem value="desc">الأحدث أولاً</SelectItem>
              <SelectItem value="asc">الأقدم أولاً</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Modern Request Cards Grid Area */}
      {table.getRowModel().rows?.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {table.getRowModel().rows.map((row) => {
            const request = row.original;
            const statusDetails = getStatusDetails(request.requestStatus);
            const service = services?.find(
              (s: any) => s.id === request.serviceId,
            );
            const date = new Date(request.createdAt);
            const formattedDate = format(date, 'dd MMMM yyyy - hh:mm a', {
              locale: ar,
            });
            const inProgressOrPending = [0, 1, 2].includes(
              request.requestStatus,
            );
            const image = request.imageUrls?.[0]
              ? getImageUrl(request.imageUrls[0])
              : null;

            return (
              <div
                key={row.id}
                className="bg-card group border-border/60 hover:shadow-primary/5 relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image & Header Overlay */}
                <div className="bg-muted/40 relative h-56 w-full overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt="Request preview"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="bg-secondary/10 relative flex h-full items-center justify-center">
                      {/* Abstract placeholder background */}
                      <div className="from-primary/5 absolute inset-0 via-transparent to-transparent opacity-80" />

                      <ImageIcon
                        className="text-muted-foreground/60 group-hover:text-primary/70 h-10 w-10 transition-colors"
                        strokeWidth={1.5}
                      />
                    </div>
                  )}

                  {/* Subtle Gradient Overlay for text readability */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/60 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 right-4 left-4 flex items-start justify-between">
                    <div className="bg-background/95 text-foreground border-border/50 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-black shadow-sm backdrop-blur-md">
                      <span className="text-muted-foreground">#</span>
                      {request.id}
                    </div>

                    <div
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 shadow-sm backdrop-blur-md ${statusDetails.bg} ${statusDetails.border}`}
                    >
                      <span
                        className={`z-10 h-1.5 w-1.5 rounded-full ${statusDetails.dot} ${inProgressOrPending ? 'animate-pulse' : ''}`}
                      />
                      <span
                        className={`text-[11px] font-black tracking-wide ${statusDetails.text}`}
                      >
                        {statusDetails.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="bg-card relative z-10 flex flex-1 flex-col p-6">
                  <div className="mb-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-foreground bg-secondary/60 ring-border/50 rounded-[10px] px-3 py-1.5 text-xs font-black shadow-sm ring-1">
                        {service?.name || 'خدمه مباشره'}
                      </span>
                    </div>
                    <span className="text-muted-foreground/80 mt-1 flex items-center gap-1.5 text-[11px] font-semibold">
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="text-foreground group-hover:text-primary mb-6 line-clamp-2 text-sm leading-relaxed font-bold transition-colors">
                    {request.description ||
                      'لم يتم تقديم وصف تفصيلي لهذا الطلب.'}
                  </h3>

                  <div className="mt-auto pt-2">
                    <Button
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground bg-background/50 text-foreground group-hover:border-primary/30 h-12 w-full cursor-pointer gap-2 rounded-xl font-bold transition-all"
                      onClick={() =>
                        navigate(`/app/services/requests/${request.id}`)
                      }
                    >
                      <Eye className="h-5 w-5 opacity-70 group-hover:opacity-100" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border-border/60 bg-card/30 flex h-72 flex-col items-center justify-center rounded-3xl border border-dashed text-center opacity-90 backdrop-blur-sm">
          <div className="bg-primary/5 mb-4 rounded-full p-4">
            <Search className="text-primary/60 h-12 w-12" />
          </div>
          <p className="text-foreground text-xl font-black">
            لا توجد نتائج مطابقة لبحثك
          </p>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm font-semibold">
            يرجى التحقق من محددات الفلتر، تغيير ترتيب البحث، أو كتابة جملة بحث
            أقصر.
          </p>
        </div>
      )}

      {/* Advanced Pagination */}
      {table.getRowModel().rows?.length > 0 && (
        <div className="border-border/60 bg-card mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border px-6 py-4 sm:flex-row">
          <div className="text-muted-foreground text-sm font-bold">
            عرض{' '}
            <span className="text-foreground">
              {table.getRowModel().rows.length}
            </span>{' '}
            من أصل{' '}
            <span className="text-foreground border-primary/30 border-b-2 pb-0.5">
              {table.getFilteredRowModel().rows.length}
            </span>{' '}
            طلب
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border-border/80 hover:bg-primary hover:text-primary-foreground hover:border-primary h-10 w-10 cursor-pointer gap-2 rounded-xl p-0 font-bold transition-all disabled:opacity-40 sm:w-auto sm:px-5"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="hidden sm:inline">السابق</span>
            </Button>
            <div className="bg-background border-border/60 flex h-10 w-16 items-center justify-center rounded-xl border text-sm font-bold">
              {table.getState().pagination.pageIndex + 1}{' '}
              <span className="text-muted-foreground/50 mx-1 font-normal">
                /
              </span>{' '}
              {table.getPageCount() || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border-border/80 hover:bg-primary hover:text-primary-foreground hover:border-primary h-10 w-10 cursor-pointer gap-2 rounded-xl p-0 font-bold transition-all disabled:opacity-40 sm:w-auto sm:px-5"
            >
              <span className="hidden sm:inline">التالي</span>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
