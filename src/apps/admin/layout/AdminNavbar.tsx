import { Bell, MessageSquare, Moon, Sun } from 'lucide-react';
import { SidebarTrigger } from '../../../components/ui/sidebar';
import SearchInputField from '@/components/layout/navbar/components/SearchInputField';
import { Button } from '../../../components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';

const AdminNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-sidebar sticky top-0 z-10 flex h-14.5 items-center border-b px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        <div className="bg-border hidden h-6 w-px sm:block" />
        <p className="text-muted-foreground hidden text-sm font-semibold tracking-tight md:block">
          لوحة التحكم
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <SearchInputField />
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted cursor-pointer rounded-lg transition-all"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted cursor-pointer rounded-lg transition-all"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>الرسائل</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted relative cursor-pointer rounded-lg transition-all"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="bg-sidebar-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="border-background bg-sidebar-primary relative inline-flex h-2 w-2 rounded-full border"></span>
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>الإشعارات</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default AdminNavbar;
