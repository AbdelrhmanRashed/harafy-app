import { useState } from 'react';
import { useGetAllBannedUsers } from '../hooks/useGetAllBannedUsers';
import BannedUserDetailDialog from '../components/BannedUserDetailDialog';
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
  UserX,
  ChevronRight,
  ChevronLeft,
  Users,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getImageUrl } from '@/lib/utils';

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface IBannedUser {
  name: string;
  pictureUrl: string;
  providerId: number;
  startedAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const BannedUsersTableSkeleton = () => (
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
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-xs font-medium sm:text-sm">
            {title}
          </p>
          <h2
            className={`mt-1 text-2xl font-bold sm:text-3xl ${highlight ? 'text-primary' : ''}`}
          >
            {value}
          </h2>
        </div>
        <div className="bg-accent/20 rounded-full p-2 sm:p-3">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const BannedUsersPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedUser, setSelectedUser] = useState<IBannedUser | null>(null);

  const {
    data: allBannedUsers,
    isLoading,
    isError,
    refetch,
    isRefetching,
    isFetching,
  } = useGetAllBannedUsers();

  const users: IBannedUser[] = allBannedUsers ?? [];
  const totalCount = users.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // Frontend Pagination
  const startIndex = (pageIndex - 1) * PAGE_SIZE;
  const paginatedUsers = users.slice(startIndex, startIndex + PAGE_SIZE);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="container mx-auto space-y-8 px-4 py-8" dir="rtl">
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
            <BannedUsersTableSkeleton />
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
              تعذر جلب بيانات المستخدمين المحظورين حالياً. يرجى المحاولة مرة
              أخرى.
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
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            <UserX className="text-destructive h-6 w-6 sm:h-8 sm:w-8" />
            المستخدمين المحظورين
          </h1>
          <p className="text-muted-foreground hidden text-base sm:block sm:text-lg">
            إدارة المزودين المحظورين ورفع الحظر عنهم
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
          <span className="hidden sm:inline">تحديث البيانات</span>
        </Button>
      </header>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        <StatsCard
          title="إجمالي المحظورين"
          value={totalCount}
          icon={<Users className="text-slate-500" size={18} />}
        />
        <StatsCard
          title="هذه الصفحة"
          value={paginatedUsers.length}
          icon={<UserX className="text-destructive" size={18} />}
          highlight
        />
        <StatsCard
          title="عدد الصفحات"
          value={totalPages}
          icon={<Clock className="text-amber-500" size={18} />}
          className="col-span-2 md:col-span-1"
        />
      </section>

      {/* ── Table Card ── */}
      {paginatedUsers.length === 0 ? (
        <Card className="flex flex-col items-center justify-center border-2 border-dashed p-8 text-center sm:p-12">
          <div className="bg-destructive/10 mb-4 rounded-full p-4">
            <ShieldAlert className="text-destructive h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <CardTitle className="mb-2 text-base sm:text-lg">
            لا يوجد مستخدمين محظورين
          </CardTitle>
          <CardDescription className="mx-auto max-w-[250px] text-sm">
            جميع الحرفيين بحالة جيدة حالياً.
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
                  قائمة المحظورين
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  إجمالي المحظورين: {totalCount}
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
                      الحرفى
                    </TableHead>
                    <TableHead className="hidden px-3 py-3 text-right font-bold sm:table-cell sm:px-4 sm:py-4">
                      رقم الحرفى
                    </TableHead>
                    <TableHead className="px-3 py-3 text-right font-bold lg:table-cell">
                      تاريخ بدء الحظر
                    </TableHead>
                    <TableHead className="px-3 py-3 text-right font-bold sm:px-4 sm:py-4">
                      الإجراء
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user: IBannedUser) => (
                    <TableRow
                      key={user.providerId}
                      className="hover:bg-accent/20 cursor-pointer transition-colors"
                      onClick={() => setSelectedUser(user)}
                    >
                      {/* Provider */}
                      <TableCell className="px-3 py-3 text-right sm:px-4 sm:py-4">
                        <UserCell
                          name={user.name}
                          pictureUrl={user.pictureUrl}
                        />
                      </TableCell>

                      {/* Provider ID */}
                      <TableCell className="hidden px-3 py-3 text-right sm:table-cell sm:px-4 sm:py-4">
                        <span className="text-primary text-xs font-bold sm:text-sm">
                          #{user.providerId}
                        </span>
                      </TableCell>

                      {/* Started At */}
                      <TableCell className="text-muted-foreground px-3 py-3 text-right text-sm">
                        {new Date(user.startedAt).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>

                      {/* Action */}
                      <TableCell className="px-3 py-3 text-right sm:px-4 sm:py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
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
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between px-1 sm:px-2">
                <p className="text-muted-foreground hidden text-sm sm:block">
                  الصفحة {pageIndex} من {totalPages}
                </p>

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
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Detail Dialog ── */}
      <BannedUserDetailDialog
        open={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
};

export default BannedUsersPage;
