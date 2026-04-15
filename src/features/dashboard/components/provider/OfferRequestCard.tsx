// components/OfferRequestCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Offer from "./Offer";
import type { Request } from "../../types/request";

type Props = {
  data: Request;
};

export default function OfferRequestCard({ data }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="rounded-xl border-r-4 border-primary">
        <CardContent className="px-4 space-y-3">

          {/* Header */}
          <div className="flex justify-between">
            <Badge className="bg-primary/10 text-primary">
              عرض سعر
            </Badge>

            <Badge variant="secondary">{data.time}</Badge>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user.avatar} />
              <AvatarFallback>
                {data.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">{data.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {data.user.country}
              </p>
            </div>
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground">
            {data.description}
          </p>

          {/* Button */}
          <Button
            className="w-full"
            onClick={() => setOpen(true)}
          >
            تقديم عرض
          </Button>

        </CardContent>
      </Card>

      <Offer
        open={open}
        onClose={() => setOpen(false)}
        request={data}
      />
    </>
  );
}