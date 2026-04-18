import { Button } from '@/components/ui/button';
import { Bell, Moon, Sun, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileMenuTrigger from '../components/ProfileMenuTrigger';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';

const ProviderActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const variant: Record<string, string> = {
    '/provider/home': 'إضافة خدمة',
    '/provider/services': 'إضافة خدمة',
    '/provider/community': 'إنشاء منشور',
  };

  const handleButtonClick = () => {
    const action = variant[location.pathname];

    if (action === 'إضافة خدمة') {
      navigate('/provider/services/create');
    }

    if (action === 'إنشاء منشور') {
      navigate('/provider/community', { state: { openCreatePost: true } });
    }
  };

  return (
    <>
      {/* Action Button */}
      {variant[location.pathname] && (
        <Button
          variant="gradient"
          className="bg-primary-gradient shadow-primary-gradient rounded-full px-6 flex items-center gap-2"
          onClick={handleButtonClick}
        >
          <Plus className="h-4 w-4" />
          {variant[location.pathname]}
        </Button>
      )}

      {/* Theme Toggle */}
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

      {/* Notifications */}
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

      {/* Profile */}
      <ProfileMenuTrigger />
    </>
  );
};

export default ProviderActions;