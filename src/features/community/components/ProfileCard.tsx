import { Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImageUrl, getRoleName } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import type { ClientProfile } from '@/features/profile/types/client-profile.types';
import { getFullName } from '@/lib/utils';

const ProfileCard = ({
  clientProfile,
  roles,
}: {
  clientProfile: ClientProfile | undefined;
  roles: string[] | undefined;
}) => {
  const navigate = useNavigate();
  return (
    <Card className="group bg-card w-full max-w-sm overflow-hidden rounded-xl border-none">
      <CardContent className="p-6">
        {/* Header Section with Avatar */}
        <div className="relative mb-6 flex flex-col items-center">
          <div className="relative">
            <Avatar className="border-background h-20 w-20 border-4 shadow-md">
              <AvatarImage
                src={getImageUrl(clientProfile?.pictureUrl)}
                alt={getFullName(
                  clientProfile?.firstName,
                  clientProfile?.lastName,
                )}
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <User size={32} />
              </AvatarFallback>
            </Avatar>

            <span className="absolute right-1 bottom-1 flex h-4 w-4">
              <span className="border-background relative inline-flex h-4 w-4 rounded-full border-2 bg-green-500"></span>
            </span>
          </div>

          <div className="mt-3 text-center">
            <h3 className="text-foreground text-lg font-bold">
              {getFullName(clientProfile?.firstName, clientProfile?.lastName)}
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              {getRoleName(roles)}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-muted/50 grid grid-cols-2 gap-4 rounded-2xl px-2 py-3">
          <div className="text-center">
            <p className="text-muted-foreground text-[10px] tracking-wider uppercase">
              المنشورات
            </p>
            <p className="text-md text-primary font-bold">12</p>
          </div>
          <div className="border-border border-r text-center">
            <p className="text-muted-foreground text-[10px] tracking-wider uppercase">
              المتابعين
            </p>
            <p className="text-md text-primary font-bold">850</p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-foreground text-xs font-semibold">
              مستوى التقييم
            </span>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-bold">
              4.8 / 5
            </span>
          </div>
          <Progress value={96} className="h-2 rtl:rotate-180" />
        </div>

        {/* Action Button */}
        <Button
          variant="gradient"
          className="shadow-primary-gradient mt-6 w-full cursor-pointer gap-2 rounded-xl py-6 font-bold transition-transform active:scale-95"
          onClick={() => navigate('/app/settings/info')}
        >
          <Settings size={18} className="animate-spin-slow" />
          إعدادات الحساب
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
