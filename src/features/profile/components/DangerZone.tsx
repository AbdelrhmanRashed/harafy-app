import { AlertTriangle, Shield, Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { useAuthStore } from '@/store/useAuthStore';
import { useDeleteAccount } from '../hooks/useDeleteAccount';

const DangerZone = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const navigate = useNavigate();
  const { removeUser } = useAuthStore();

  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        removeUser();
        navigate('/auth/login');
      },
    });
  };

  const CONFIRMATION_TEXT = 'حذف الحساب';

  return (
    <>
      <Card className="border-destructive/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-destructive flex items-center justify-end gap-2 text-sm">
            منطقة الخطر
            <span className="bg-destructive/10 rounded-lg p-1.5">
              <AlertTriangle className="text-destructive h-4 w-4" />
            </span>
          </CardTitle>
          <CardDescription className="text-right text-xs">
            هذه الإجراءات لا يمكن التراجع عنها. تأكد قبل المتابعة.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Separator />
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="text-right">
              <p className="text-foreground text-sm font-medium">
                تعطيل الحساب مؤقتاً
              </p>
              <p className="text-muted-foreground text-xs">
                لن يظهر حسابك للآخرين
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/40 text-destructive hover:bg-destructive/5 cursor-pointer gap-2"
            >
              <Shield className="h-4 w-4" />
              تعطيل
            </Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="text-right">
              <p className="text-destructive text-sm font-medium">
                حذف الحساب نهائياً
              </p>
              <p className="text-muted-foreground text-xs">
                سيتم حذف جميع بياناتك بشكل دائم
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="cursor-pointer gap-2"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              حذف الحساب
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2 ps-8 text-xl font-black">
              <AlertTriangle className="h-5 w-5" />
              هل أنت متأكد تماماً؟
            </DialogTitle>
            <DialogDescription className="pt-2 text-right font-medium">
              هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف حسابك نهائياً
              وإزالة بياناتك من منصه حرفى.
              <br />
              <br />
              يرجى كتابة{' '}
              <strong className="text-foreground select-none">
                {CONFIRMATION_TEXT}
              </strong>{' '}
              للتأكيد.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="اكتب هنا..."
              className="text-right font-medium"
              dir="rtl"
            />
          </div>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeleteConfirmation('');
              }}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="cursor-pointer"
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== CONFIRMATION_TEXT || isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="ml-2 h-4 w-4" />
              )}
              حذف حسابي نهائياً
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DangerZone;
