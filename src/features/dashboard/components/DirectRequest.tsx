import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

const DirectRequest = () => {
    return (
        <Card className=" items-center text-center bg-background border-none shadow-sm rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center ">
                <User className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">طلب مباشر</h3>
            <p className=" text-sm leading-relaxed ">
                اختر المحترف المفضل لديك بناءً على التقييمات
                والأعمال السابقة.
            </p>
            <Button variant="secondary" className="font-bold mt-auto rounded-2xl px-6 py-3 text-primary">
                تصفح المحترفين
            </Button>
        </Card>
    )
}

export default DirectRequest;