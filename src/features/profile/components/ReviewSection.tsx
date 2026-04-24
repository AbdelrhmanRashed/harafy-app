import {
  Star,
  Quote,
  CheckCircle2,
  MessageSquareQuote,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn, getImageUrl, getTimeAgo } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useGetProviderReviews } from '../hooks/useGetProviderReviews';
import { Skeleton } from '@/components/ui/skeleton';

interface ReviewSectionProps {
  providerId?: string;
  type?: 'client' | 'provider';
}
const ReviewSection = ({ providerId, type }: ReviewSectionProps) => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetProviderReviews(providerId, type);

  if (isLoading) {
    return (
      <section className="mb-4">
        <div className="border-border mt-12 mb-6 flex items-center gap-3 border-b pb-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Card className="bg-card/50 border-border/50 overflow-hidden">
          <CardContent className="mt-2 space-y-8 p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-6">
                <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-24 w-full rounded-2xl rounded-tr-none" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mb-4">
        <div className="border-border mt-12 mb-6 flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-destructive/10 ring-destructive/20 rounded-lg p-3 shadow-inner ring-1 transition-colors">
              <MessageSquareQuote className="text-destructive h-6 w-6" />
            </div>
            <h2 className="text-foreground text-2xl font-bold">آراء العملاء</h2>
          </div>
        </div>

        <Card className="bg-destructive/5 overflow-hidden shadow-md">
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
            <div className="bg-destructive/10 ring-destructive/20 mb-2 rounded-full p-6 shadow-inner ring-1 transition-transform duration-500 hover:scale-110">
              <AlertCircle className="text-destructive/80 h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <div className="space-y-1">
              <p className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                تعذر تحميل التقييمات
              </p>
              <p className="text-muted-foreground font-medium">
                حدث خطأ أثناء محاولة جلب آراء العملاء. يرجى المحاولة مرة أخرى
                لاحقاً.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-4">
      <div className="border-border mt-12 mb-6 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 ring-primary/20 rounded-lg p-3 shadow-inner ring-1">
            <MessageSquareQuote className="text-primary h-6 w-6" />
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-foreground text-2xl font-bold">آراء العملاء</h2>
            {reviews && reviews.length > 0 && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-0.5 text-sm shadow-sm transition-colors"
              >
                {reviews.length} تقييم
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Card className="bg-card/50 overflow-hidden shadow-md">
        <CardContent className="p-0">
          {reviews && reviews.length > 0 ? (
            <div className="custom-scrollbar max-h-[600px] overflow-y-auto p-4 sm:p-6">
              <div className="flex flex-col gap-6">
                {reviews.map((review: any, index: number) => (
                  <div
                    key={review.id}
                    className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="group relative z-0">
                      <div className="text-primary/5 group-hover:text-primary/10 absolute top-0 left-0 -z-10 transition-transform duration-500 group-hover:scale-110">
                        <Quote size={80} className="rotate-180" />
                      </div>
                      <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                        <div className="shrink-0">
                          <Avatar className="ring-background shadow-primary/10 h-14 w-14 border-2 shadow-lg ring-4 transition-transform duration-300 group-hover:scale-105">
                            <AvatarImage
                              src={getImageUrl(review.clientPictureUrl)}
                              alt={review.clientName}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-primary-gradient text-primary-foreground text-xl font-bold">
                              {review.clientName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="w-full flex-1 space-y-4">
                          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                                  {review.clientName}
                                </h3>
                                {review.createdAt && (
                                  <span className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
                                    <span className="text-border/60 text-[10px]">
                                      <Clock className="h-3 w-3" />
                                    </span>
                                    منذ {getTimeAgo(new Date(review.createdAt))}
                                  </span>
                                )}
                              </div>
                              <div className="bg-background/80 border-border/50 mt-1.5 flex w-fit items-center gap-1 rounded-full border px-3 py-1 backdrop-blur-sm">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={cn(
                                      'h-4 w-4 drop-shadow-sm transition-transform duration-300 group-hover:scale-110',
                                      star <= review.rating
                                        ? 'fill-amber-400 text-amber-500'
                                        : 'text-muted/30 fill-muted/50',
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20 flex shrink-0 items-center gap-1.5 px-3 py-1 font-bold"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              تقييم موثق
                            </Badge>
                          </div>
                          <div className="bg-primary-foreground/50 dark:bg-primary-foreground/5 border-border/40 hover:border-primary/30 relative rounded-2xl rounded-tr-none border p-5 transition-all duration-300">
                            <p className="text-muted-foreground relative z-10 text-justify text-[15px] leading-relaxed font-medium sm:text-base">
                              "{review.message || 'لا يوجد تعليق'}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < reviews.length - 1 && (
                      <Separator className="bg-border/60 mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card/30 flex flex-col items-center justify-center space-y-4 p-16 text-center">
              <div className="bg-primary/5 ring-primary/20 mb-3 rounded-full p-6 shadow-inner ring-1 transition-transform duration-500 hover:scale-110">
                <MessageSquareQuote className="text-primary/40 h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                  لا توجد تقييمات حتى الآن
                </p>
                <p className="text-muted-foreground font-medium">
                  كن أول من يقيم خدمات هذا الحرفي!
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ReviewSection;
