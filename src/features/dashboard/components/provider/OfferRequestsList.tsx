import { Card, CardContent } from "@/components/ui/card";
import OfferRequestCard from "./OfferRequestCard";

const offers = [
  {
    id: 1,
    user: {
      name: "محمد الشافعي",
      country: "السعودية",
      avatar: "",
    },
    description: "يمكنني تنفيذ المشروع خلال 3 أيام...",
    time: "منذ ساعة",
  },
  {
    id: 2,
    user: {
      name: "أحمد علي",
      country: "الإمارات",
      avatar: "",
    },
    description: "خبرة 5 سنوات في React وNext.js...",
    time: "منذ 30 دقيقة",
    images: [

    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  ],
  },
    {
    id: 3,
    user: {
      name: "أحمد علي",
      country: "الإمارات",
      avatar: "",
    },
    description: "خبرة 5 سنوات في React وNext.js...",
    time: "منذ 30 دقيقة",
    images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  ],
  },
];

export default function OfferRequestsList() {
  return (
    <div className="space-y-4">
      {offers.length === 0 ? (
        <Card className="rounded-xl bg-muted border-r-4 border-muted-foreground">
          <CardContent className="p-10">
            <p className="text-center text-muted-foreground text-lg py-10">
              لا يوجد عروض حالياً
            </p>
          </CardContent>
        </Card>
      ) : (
        offers.map((offer) => (
          <OfferRequestCard
            key={offer.id}
            data={offer}
          />
        ))
      )}
    </div>
  );
}