import { cn } from '@/lib/utils';

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn('relative h-16 w-16', className)}>
      <div className="border-primary/20 absolute inset-0 rounded-full border-4" />

      <div className="border-t-primary absolute inset-0 animate-spin rounded-full border-4 border-transparent" />

      <div className="bg-primary absolute inset-[35%] animate-ping rounded-full opacity-75" />

      <div className="border-b-primary/50 absolute inset-2 animate-[spin_2s_linear_infinite_reverse] rounded-full border-2 border-transparent" />
    </div>
  );
};

export default LoadingSpinner;
