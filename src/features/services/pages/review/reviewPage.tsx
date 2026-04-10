import { useState } from 'react';
import { Star, Loader2, ThumbsUp, BadgeCheck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId?: string;
  requestTitle?: string;
  providerName?: string;
  providerImage?: string;
  providerId?: string;
  providerProfession?: string;
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

const LABELS: Record<number, string> = {
  1: 'سيء جداً',
  2: 'سيء',
  3: 'مقبول',
  4: 'جيد',
  5: 'ممتاز',
};

interface StarRatingProps {
  value: number;
  onChange: (v: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div className="flex flex-col items-center gap-3 ">
      <div className="flex items-center gap-2" >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110 active:scale-95"
            aria-label={`${star} نجوم`}
          >
            <Star
              className={cn(
                'w-10 h-10 transition-colors duration-150',
                star <= active
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground/50',
              )}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <span
        className={cn(
          'text-sm font-black transition-all duration-200',
          active ? 'text-primary opacity-100' : 'text-muted-foreground opacity-0',
        )}
      >
        {active ? LABELS[active] : '—'}
      </span>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

const ReviewDialog = ({
  open,
  onOpenChange,
  requestId,
  requestTitle,
  providerName,
  providerImage,
  providerId,
  providerProfession,   
}: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = (value: boolean) => {
    if (!value) {
      // reset on close
      setTimeout(() => {
        setRating(0);
        setComment('');
        setSubmitted(false);
      }, 300);
    }
    onOpenChange(value);
  };

  const handleSubmit = async () => {
    if (!rating) return;
    setIsPending(true);
    // TODO: call your review mutation here, e.g. submitReview({ requestId, rating, comment })
    await new Promise((r) => setTimeout(r, 1000)); // simulated delay
    setIsPending(false);
    setSubmitted(true);
    setTimeout(() => handleClose(false), 1500);
    console.log(requestId, rating, comment);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="bg-card mx-auto w-full max-w-md! gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-2xl"
        aria-describedby="review-desc"
      >
        {/* ── Header ── */}
        {!submitted && <DialogHeader className="border-border/50 bg-card  gap-y-2 px-6 pt-4">
          <DialogTitle className="text-foreground flex flex-col items-center justify-center gap-1 ">
            <span className='text-xl font-bold'>تقييم الخدمة</span>
            <span className="text-sm text-muted-foreground ">رأيك يساعدنا في تحسين جودة الخدمات المقدمة</span>
          </DialogTitle>
          <DialogDescription >
                <div className="bg-secondary/80  rounded-2xl w-full px-2">
            <div className="p-2 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-[60px] h-[60px] rounded-[18px] overflow-hidden">
                  {providerImage ? (
                    <img src={providerImage} alt={providerName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xl font-black">{providerName?.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
                  <BadgeCheck  className="w-4 h-4 text-white bg-primary " />
                </div>
              </div>
              <div className="flex flex-col flex-1 items-start text-right">
                <h3 className="text-base font-bold text-foreground">{providerName}</h3>
                <p className="text-sm text-muted-foreground  mt-0.5">{providerProfession}</p>
              </div>
            </div>
          </div>
          </DialogDescription>
          
      
        </DialogHeader>}

        {/* ── Body ── */}
        <div className="space-y-6 px-6 py-2">
          {submitted ? (
            /* ── Success State ── */
            <div className="flex flex-col items-center gap-1 py-2 text-center animate-in fade-in zoom-in-90">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-primary animate-bounce" />
              </div>
              <p className="text-base font-black text-primary">شكراً على تقييمك!</p>
              <p className="text-sm text-slate-400 font-bold">
                رأيك يساعدنا على تحسين جودة الخدمات
              </p>
            </div>
          ) : (
            <>
              {/* ── Stars ── */}
              <div className="flex flex-col items-center gap-2 py-2 mb-0">
                <p className="text-sm text-muted-foreground">
                 ما هو تقييمك العام؟
                </p>
                <StarRating value={rating} onChange={setRating} />
              </div>

              {/* ── Comment ── */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground block text-right">
                 أضف تعليقك...
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="شاركنا تجربتك بالتفصيل، هل كنت راضياً عن جودة العمل وسرعة التنفيذ؟"
                  rows={5}
                  className="min-h-[100px] placeholder:text-muted-foreground/60 bg-secondary/80 resize-none border-0 px-4 py-3 text-sm shadow-none focus-visible:ring-0"
                />
              </div>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        {!submitted && (
          <div className="bg-muted/30 border-border/50 flex items-center justify-between border-t px-6 py-4 gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-full border-slate-200 text-slate-500 font-bold"
              onClick={() => handleClose(false)}
              disabled={isPending}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              variant="gradient"
              disabled={!rating || isPending}
              onClick={handleSubmit}
              className="flex-[2] shadow-primary-gradient rounded-full disabled:opacity-40 disabled:shadow-none"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                'إرسال التقييم'
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;