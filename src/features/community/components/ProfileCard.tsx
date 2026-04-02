import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Settings, User } from 'lucide-react';
type Props = {
  userImage?: string;
};
const ProfileCard = ({ userImage }: Props) => {
  return (
    <Card className="bg-background w-full rounded-2xl">
      <CardContent className="space-y-4 p-6">
        <div className="relative flex justify-center">
          <div className="bg-primary/5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full shadow-md">
            {userImage ? (
              <img
                src={userImage}
                alt="user"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="text-primary/60 h-8 w-8" />
            )}
          </div>
          <span className="absolute bottom-1 left-[45%] h-3 w-3 rounded-full border-2 border-white bg-green-500 lg:left-[35%]" />
        </div>
        {/* Name */}
        <div className="text-center">
          <p className="text-md font-bold">تامر الجيار</p>
          <p className="text-xs text-gray-400">عميل جديد</p>
        </div>
        {/* Divider */}
        <div className="border-t" />
        {/* Stats */}
        <div className="flex justify-between px-4 text-sm">
          <div className="text-center">
            <p className="text-xs text-gray-400">المنشورات</p>
            <p className="text-primary font-semibold">12</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">المتابعين</p>
            <p className="text-primary font-semibold">850</p>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t" />
        {/* Rating */}
        <div className="space-y-2 px-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>التقييم</span>
            <span className="text-primary font-medium">4.8</span>
          </div>
          <Progress
            value={96}
            id="progress-upload"
            className="rtl:rotate-180"
          />
        </div>
        <Button variant="secondary" className="w-full rounded-full">
          <Settings size={16} />
          إعدادات الحساب
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
