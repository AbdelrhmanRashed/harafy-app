import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Settings, User } from "lucide-react";
type Props = {
  userImage?: string;
};
const ProfileCard = ({ userImage }: Props) => {
  return (
    <Card className="rounded-2xl bg-background w-full ">
      <CardContent className="p-6 space-y-4">
        <div className="relative flex justify-center">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/5 flex items-center justify-center shadow-md">
            {userImage ? (
              <img
                src={userImage}
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-primary/60" />
            )}
          </div>
          <span className="absolute bottom-1 left-[45%] lg:left-[35%] w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>
        {/* Name */}
        <div className="text-center">
          <p className="font-bold text-md">تامر الجيار</p>
          <p className="text-xs text-gray-400">عميل جديد</p>
        </div>
        {/* Divider */}
        <div className="border-t" />
        {/* Stats */}
        <div className="flex justify-between text-sm px-4">
          <div className="text-center">
            <p className="text-gray-400 text-xs">المنشورات</p>
            <p className="font-semibold text-primary">12</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-xs">المتابعين</p>
            <p className="font-semibold text-primary">850</p>
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
          <Progress value={96} id="progress-upload" className="rtl:rotate-180" />
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
