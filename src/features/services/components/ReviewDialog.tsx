import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, type ReviewInput } from '../schemas/review.schema';
import { useCreateReview } from '../hooks/useCreateReview';

type Props = {
  open: boolean;
  onClose: () => void;
  requestId: number;
};

const ReviewDialog = ({ open, onClose, requestId }: Props) => {
  const [hover, setHover] = useState(0);
  const { mutate, isPending } = useCreateReview();

  const form = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: undefined as any,
      message: '',
    },
  });

  const rating = form.watch('rating');

  const onSubmit = (data: ReviewInput) => {
    mutate(
      {
        ServiceRequestId: requestId,
        Rating: Number(data.rating),
        Message: data.message,
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <DialogContent
        className="max-w-[400px] rounded-3xl p-8 sm:rounded-3xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-black">
            ما رأيك في الخدمة؟
          </DialogTitle>
          <p className="text-muted-foreground text-center text-sm">
            تقييمك يساعدنا على تحسين تجربتك القادمة
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* ⭐ Modern Stars Selector */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-all duration-200 hover:scale-125 active:scale-95"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() =>
                    form.setValue('rating', star, { shouldValidate: true })
                  }
                >
                  <Star
                    size={36}
                    strokeWidth={1.5}
                    className={`transition-colors duration-300 ${
                      star <= (hover || rating)
                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {form.formState.errors.rating && (
              <span className="text-destructive animate-in fade-in slide-in-from-top-1 text-xs font-medium">
                {form.formState.errors.rating.message}
              </span>
            )}
          </div>

          {/*  Modern Textarea */}
          <div className="space-y-2">
            <label className="text-muted-foreground mr-1 text-sm font-semibold">
              ملاحظاتك (اختياري)
            </label>
            <textarea
              placeholder="أخبرنا المزيد عن تجربتك..."
              {...form.register('message')}
              className="focus:border-primary/30 focus:ring-primary/5 border-card bg-card focus:bg-secondary bg-secondary mt-2 min-h-[120px] w-full resize-none rounded-2xl border-2 p-4 text-sm transition-all focus:ring-4 focus:outline-none"
            />
            {form.formState.errors.message && (
              <p className="text-destructive text-xs">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          {/*  Submit Button */}
          <Button
            type="submit"
            variant="gradient"
            disabled={isPending}
            className="shadow-primary/20 h-14 w-full rounded-2xl text-lg font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                جارٍ الإرسال...
              </span>
            ) : (
              'إرسال التقييم'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
