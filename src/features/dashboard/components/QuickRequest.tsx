import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

const QuickRequest = () => {
  return (
    <Card className="flex-[2.5] relative overflow-hidden p-8 bg-primary border-none  rounded-2xl text-white flex flex-col justify-between">
      <div className="relative z-10 flex flex-col  text-right">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="fill-white text-white w-8 h-8" />
          <h3 className="text-3xl font-bold">طلب فوري</h3>
        </div>
        <p className="text-purple-100 text-lg max-w-md mb-8">
          احصل على محترف الآن بأسرع وقت ممكن للمهام
          العاجلة والطارئة.
        </p>
      </div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 -mr-10 -mt-10 rotate-45 pointer-events-none" />

      <div className="relative z-10 flex ">
        <Button
          variant="outline"
          className="font-bold px-10 py-6 text-lg rounded-xl text-primary  ">
          ابدأ الطلب الفوري
        </Button>
      </div>
    </Card>
  )
}

export default QuickRequest;
