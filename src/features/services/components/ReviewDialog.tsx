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
      rating: 0,
      message: '',
    },
  });

  const rating = form.watch('rating');

  const onSubmit = (data: ReviewInput) => {
    mutate(
      {
        ServiceRequestId: requestId,
        Rating: data.rating,
        Message: data.message,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            قيّم الخدمة ⭐
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* ⭐ Stars */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 cursor-pointer transition ${
                  star <= (hover || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => form.setValue('rating', star)}
              />
            ))}
          </div>

          {/* ❌ error */}
          {form.formState.errors.rating && (
            <p className="text-center text-sm text-red-500">
              {form.formState.errors.rating.message}
            </p>
          )}

          {/* 💬 textarea */}
          <textarea
            placeholder="اكتب رأيك..."
            {...form.register('message')}
            className="border-border w-full rounded-xl border p-3 text-sm outline-none"
          />

          {form.formState.errors.message && (
            <p className="text-sm text-red-500">
              {form.formState.errors.message.message}
            </p>
          )}

          {/* 🚀 submit */}
          <Button
            type="submit"
            className="w-full rounded-2xl text-lg font-bold"
            disabled={isPending}
          >
            {isPending ? 'جارى الإرسال...' : 'إرسال التقييم'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
