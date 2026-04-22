import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';

const GuestActions = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="cursor-pointer rounded-full"
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

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="cursor-pointer rounded-xl px-5 font-bold"
          onClick={() => navigate('/auth/login')}
        >
          تسجيل الدخول
        </Button>
        <Button
          className="bg-primary-gradient cursor-pointer rounded-xl px-5 font-bold"
          onClick={() => navigate('/auth/register')}
        >
          حساب جديد
        </Button>
      </div>
    </>
  );
};

export default GuestActions;
