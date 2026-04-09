import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, PencilIcon, TrashIcon } from 'lucide-react';

const ActionsDropdown = ({
  onDelete,
  isDeleting,
  children,
  open,
  setOpen,
}: {
  onDelete: () => void;
  isDeleting: boolean;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <PencilIcon />
            تعديل
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <TrashIcon />
            )}
            حذف
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
