import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ClipboardList, Zap,  UserSearch } from "lucide-react";

const QuickLinks = () => {
  return (
    <Card className="rounded-2xl bg-white shadow-sm w-full">
      <CardContent className="p-5 space-y-4">

        {/* Header */}
        <div className="flex items-center gap-2 text-md font-bold">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Star color="white" className="text-white w-4 h-4" />
          </div>
          <span>إجراءات سريعة</span>
        </div>

        {/* Buttons */}
        <div className="space-y-3">

          <Button
            variant="gradient"
            className="w-full flex justify-start px-5 py-3 rounded-full ">
            <ClipboardList size={18} />
            <span className="font-medium">طلباتي</span>
          </Button>

          <Button
            variant="secondary"
            className="w-full flex justify-start px-5 py-3 rounded-full">
            <Zap size={18} className="text-primary" />
            <span className="font-medium">طلب خدمة فورية</span>
          </Button>

          <Button
            variant="secondary"
            className="w-full flex  justify-start px-5 py-3 rounded-full">
            <UserSearch size={18} className="text-primary" />
            <span className="font-medium">طلب خدمة مباشر</span>
          </Button>

        </div>

      </CardContent>
    </Card>
  );
};

export default QuickLinks;