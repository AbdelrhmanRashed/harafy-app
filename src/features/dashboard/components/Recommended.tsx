import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";

type Props = {
    name?: string;
    job?: string;
    rating?: number;
    image?: string;
};

const Recommended = ({
    name = "خالد العتيبي",
    job = "خبير في أنظمة النجارة الحديثة والديكور الخشبي بأكثر من 10 سنوات خبرة.",
    rating = 5,
    image,
}: Props) => {
    return (
        <Card className="rounded-2xl bg-background border-0">
            <CardContent className="p-2  space-y-4">

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800">
                    الحرفي المميز
                </h2>
                <div className="flex items-center justify-start gap-4">

                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-primary/5 flex items-center justify-center">
                        {image ? (
                            <img
                                src={image}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-6 h-6 text-primary" />
                        )}
                    </div>

                    <div className="text-right space-y-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {name}
                        </h3>

                        {/* Stars */}
                        <div className="flex items-center justify-end gap-1">
                            {Array.from({ length: rating }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className="text-yellow-400 fill-yellow-400"
                                />
                            ))}
                        </div>
                    </div>

                </div>
                <p className="text-sm text-gray-500 leading-6">
                    {job}
                </p>
                <Button variant="secondary" className="w-full rounded-full text-primary">
                    عرض الملف الشخصي
                </Button>

            </CardContent>
        </Card>
    );
};

export default Recommended;