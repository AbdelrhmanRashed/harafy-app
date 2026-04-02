import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, Layers, MessageSquare } from "lucide-react";

const WorkSpace = () => {
  return (
    <Card className="rounded-2xl bg-secondary border-0">
      <CardContent className="p-5 space-y-4">

        {/* Title */}
        <h3 className="text-sm text-gray-500 text-right font-medium">
          Workspace
        </h3>
       {/* Items */}
         <div className="space-y-3">

          <Button
            variant="outline"
            className="w-full flex justify-start px-5 py-3 rounded-full ">
            <LayoutGrid size={18} className="text-primary"/>
            <span className="font-medium"> لوحة التحكم</span>
          </Button>

          <Button
            variant="secondary"
            className="w-full flex justify-start px-5 py-3 rounded-full">
            <Layers size={18} className="text-primary" />
            <span className="font-medium">الخدمات</span>
          </Button>

          <Button
            variant="secondary"
            className="w-full flex  justify-start px-5 py-3 rounded-full">
            <MessageSquare size={18} className="text-primary" />
            <span className="font-medium">الرسائل</span>
          </Button>

        </div>

      </CardContent>
    </Card>
  );
};

export default WorkSpace;