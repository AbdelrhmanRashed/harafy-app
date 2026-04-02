import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LogOutIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface ConfirmDialogProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'gradient' | 'destructive' | 'delete' | 'logout';
  confirmButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
  size?: 'sm' | 'default';
}

const ConfirmDialog = ({
  title,
  description,
  onConfirm,
  children,
  isLoading,
  variant = 'gradient',
  confirmButton = 'تأكيد',
  cancelButton = 'إلغاء',
  size = 'default',
}: ConfirmDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await onConfirm();
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {variant === 'delete' && (
            <AlertDialogMedia className="bg-destructive/10 text-destructive size-12">
              <Trash2Icon className="size-6" />
            </AlertDialogMedia>
          )}

          {variant === 'logout' && (
            <AlertDialogMedia className="bg-destructive/10 text-destructive size-12">
              <LogOutIcon className="size-6" />
            </AlertDialogMedia>
          )}

          <AlertDialogTitle>{title}</AlertDialogTitle>

          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {cancelButton}
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="cursor-pointer"
            variant={
              variant === 'delete' || variant === 'logout'
                ? 'destructive'
                : variant
            }
          >
            {confirmButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
