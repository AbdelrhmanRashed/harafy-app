import { Button } from '@/components/ui/button';
import { Bell, Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileMenuTrigger from '../components/ProfileMenuTrigger';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';

const ClientActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const variant: Record<string, string> = {
    '/app/home': 'إنشاء منشور',
    '/app/services': 'طلب فورى',
    '/app/community': 'إنشاء منشور',
    '/app/services/instant': 'طلب خدمه مباشره',
    '/app/services/direct': 'طلب فورى',
  };

  const handleButtonClick = () => {
    if (variant[location.pathname] === 'إنشاء منشور') {
      navigate('/app/community', { state: { openCreatePost: true } });
    }
    if (variant[location.pathname] === 'طلب فورى') {
      navigate('/app/services/instant');
    }
    if (variant[location.pathname] === 'طلب خدمه مباشره') {
      navigate('/app/services');
    }
  };

  return (
    <>
      {variant[location.pathname] && (
        <Button
          variant="gradient"
          className="bg-primary-gradient shadow-primary-gradient rounded-full px-6"
          onClick={handleButtonClick}
        >
          {variant[location.pathname]}
        </Button>
      )}

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

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative cursor-pointer rounded-full"
          >
            <Bell className="h-5 w-5" />
            <span className="ring-background absolute top-1.5 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>الإشعارات</p>
        </TooltipContent>
      </Tooltip>

      <ProfileMenuTrigger />
    </>
  );
};

export default ClientActions;
