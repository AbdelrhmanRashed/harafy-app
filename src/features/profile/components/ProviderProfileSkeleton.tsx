import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ProviderProfileSkeleton = () => {
  return (
    <div className="bg-background min-h-screen animate-pulse pb-20">
      {/* HERO SECTION SKELETON */}
      <div className="relative overflow-hidden">
        <div className="relative px-4 pt-12 pb-32">
          <div className="container mx-auto max-w-6xl">
            <div className="grid items-start gap-8 md:grid-cols-[auto,1fr,auto]">
              {/* Avatar Skeleton */}
              <div className="relative">
                <Skeleton className="h-48 w-48 rounded-full" />
                <Skeleton className="border-background absolute -right-1 bottom-3 h-10 w-10 rounded-full border-4" />
              </div>

              {/* Profile Info Skeleton */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-64" /> {/* Name */}
                    <Skeleton className="h-6 w-24 rounded-full" /> {/* Badge */}
                  </div>
                  <Skeleton className="h-6 w-40" /> {/* Nickname */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full max-w-xl" />
                    <Skeleton className="h-4 w-3/4 max-w-xl" />
                  </div>
                </div>

                {/* Stats Row Skeleton */}
                <div className="flex flex-wrap gap-6">
                  <Skeleton className="h-6 w-32" /> {/* Rating */}
                  <Skeleton className="h-6 w-48" /> {/* Location */}
                </div>
              </div>

              {/* CTA Skeleton */}
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SKELETON */}
      <div className="relative -mt-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* LEFT COLUMN */}
            <div className="space-y-8 lg:col-span-2">
              {/* About Section */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" /> {/* Title */}
                <Card>
                  <CardContent className="p-8">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Services Section */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardContent className="flex items-center gap-4 p-6">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {/* Contact Card Skeleton */}
              <Card>
                <CardContent className="space-y-4 p-8">
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                </CardContent>
              </Card>

              {/* Stats Card Skeleton */}
              <Card>
                <CardContent className="space-y-6 p-8">
                  <Skeleton className="h-6 w-1/2" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfileSkeleton;
