import { Card, CardContent } from "@/components/ui/card";
import DirectRequestCard from "./DirectRequestCard";

const requests = [
  {
    id: 1,
    user: {
      name: "داليا أنور",
      country: "مصر",
      avatar: "",
    },
    description: "أبحث عن مطور React لبناء موقع احترافي...",
    time: "منذ 3 دقائق",
  },
  {
    id: 2,
    user: {
      name: "محمد أحمد",
      country: "السعودية",
      avatar: "",
    },
    description: "محتاج حد يعمل landing page سريع...",
    time: "منذ 10 دقائق",
  },
];

export default function DirectRequestsList() {
  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <Card className="rounded-xl  bg-muted border-r-4 border-muted-foreground" >
          <CardContent className="p-10">
            <p className="text-center text-muted-foreground text-lg py-10">
              لا يوجد طلبات مباشرة
            </p>
          </CardContent>
        </Card>
      ) : (
        requests.map((req) => (
          <DirectRequestCard key={req.id} data={req} />
        ))
      )}
    </div>
  );
}