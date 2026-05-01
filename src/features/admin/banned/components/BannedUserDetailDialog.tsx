import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, UserCheck, ShieldOff, Loader2 } from 'lucide-react';
import { useReinstateProvider } from '../hooks/useReinstateProvider';

interface IBannedUser {
  name: string;
  pictureUrl: string;
  providerId: number;
  startedAt: string;
}

interface BannedUserDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: IBannedUser | null;
}

export default function BannedUserDetailDialog({
  open,
  onClose,
  user,
}: BannedUserDetailDialogProps) {
  const { mutate: reinstateProvider, isPending } = useReinstateProvider();

  if (!user) return null;

  const handleReinstate = () => {
    reinstateProvider(user.providerId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md overflow-hidden p-0 sm:max-w-lg"
        dir="rtl"
      >
        <DialogHeader className="border-b p-6 pb-0">
          <DialogTitle className="ms-8 mb-4 flex items-center gap-2 text-xl font-bold">
            <ShieldOff className="text-destructive h-5 w-5" />
            تفاصيل الحظر
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* User Info */}
          <div className="bg-muted/30 flex items-center gap-4 rounded-xl border p-4">
            <Avatar className="border-background h-16 w-16 border-2 shadow-sm">
              <AvatarImage src={getImageUrl(user.pictureUrl)} alt={user.name} />
              <AvatarFallback className="text-xl">
                {user.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                <span>رقم المزود:</span>
                <span className="text-foreground font-semibold">
                  #{user.providerId}
                </span>
              </p>
            </div>
          </div>

          {/* Ban Info */}
          <div className="bg-destructive/5 border-destructive/20 space-y-3 rounded-xl border p-4">
            <h4 className="text-destructive flex items-center gap-2 font-semibold">
              <Calendar className="h-4 w-4" />
              تاريخ بدء الحظر
            </h4>
            <p className="text-sm">
              {new Date(user.startedAt).toLocaleString('ar-EG', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </p>
          </div>
        </div>

        <DialogFooter className="bg-muted/10 space-x-2 border-t p-6 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="cursor-pointer"
          >
            إغلاق
          </Button>
          <Button
            onClick={handleReinstate}
            disabled={isPending}
            className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري رفع الحظر...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                رفع الحظر
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
