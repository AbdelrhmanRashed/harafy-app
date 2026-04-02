import {
  AlertDialog,
  AlertDialogAction,
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
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {variant === 'delete' && (
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive size-12">
              <Trash2Icon className="size-6" />
            </AlertDialogMedia>
          )}
          {variant === 'logout' && (
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive size-12">
              <LogOutIcon className="size-6" />
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {cancelButton}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="cursor-pointer"
            variant={
              variant === 'delete' || variant === 'logout'
                ? 'destructive'
                : variant
            }
          >
            {confirmButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
