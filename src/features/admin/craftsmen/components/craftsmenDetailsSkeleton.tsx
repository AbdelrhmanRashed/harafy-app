import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CraftsmenDetailsSkeleton = () => {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8" dir="rtl">
      {/* ================= Header Skeleton ================= */}
      <div className="bg-card flex flex-col items-start justify-between gap-4 rounded-xl border p-6 shadow-sm md:flex-row md:items-center">
        <div className="flex w-full items-center gap-4 md:w-auto">
          <Skeleton className="hidden h-10 w-10 shrink-0 rounded-full md:block" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded-lg md:w-[180px]" />
      </div>

      {/* ================= Profile Overview Skeleton ================= */}
      <Card className="border-t-primary overflow-hidden border-t-4 shadow-md">
        <CardContent className="p-0">
          <div className="flex flex-col items-center gap-6 p-6 sm:flex-row">
            <Skeleton className="h-24 w-24 shrink-0 rounded-full" />

            <div className="flex w-full flex-1 flex-col items-center space-y-3 sm:items-start">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-5 w-32" />

              <div className="mt-2 flex flex-wrap justify-center gap-3 sm:justify-start">
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-36 rounded-md" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= Craftsman Details Skeleton ================= */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Info Skeleton */}
        <Card className="border-border/60 shadow-md">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
              <div className="flex w-full flex-col justify-center space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
              <div className="flex w-full flex-col justify-center space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-full max-w-[250px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specialty & Bio Skeleton */}
        <Card className="border-border/60 shadow-md">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 w-36" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <Skeleton className="mb-3 h-4 w-28" />
              <div className="flex flex-wrap gap-2.5">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
            <div className="bg-muted/40 relative rounded-2xl border p-4">
              <Skeleton className="mb-3 h-4 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= Documents Grid Skeleton ================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-7 w-40" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="flex flex-col overflow-hidden border-2 border-gray-100/50 p-0"
            >
              <CardHeader className="bg-muted/30 border-b py-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col p-0">
                <Skeleton className="h-[260px] w-full rounded-none" />

                <div className="bg-background mt-auto flex items-center justify-end gap-3 border-t p-4">
                  <Skeleton className="h-10 flex-1 rounded-md sm:w-[100px] sm:flex-none" />
                  <Skeleton className="h-10 flex-1 rounded-md sm:w-[100px] sm:flex-none" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CraftsmenDetailsSkeleton;
