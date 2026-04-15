import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import type { Request } from "../../types/request";

type Props = {
  data: Request;
};

export default function DirectRequestCard({ data }: Props) {
    return (
        <Card className="rounded-xl border-r-4 border-primary">
            <CardContent className="px-4 space-y-3">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <Badge className="text-xs bg-muted px-2 py-2 text-primary">
                        طلب مباشر
                    </Badge>
                    <Badge className="text-xs text-muted-foreground bg-muted-foreground/10 px-2 py-2">
                        {data.time}
                    </Badge>
                </div>

                {/* User */}
                <div className="flex items-center gap-3">
                   <Avatar className="w-10 h-10">
  <AvatarImage src={data.user.avatar} alt={data.user.name} />

  <AvatarFallback className="bg-muted text-primary font-bold">
    {data.user.name?.charAt(0)}
  </AvatarFallback>
</Avatar>
                    <div>
                        <p className="font-medium text-sm">{data.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {data.user.country}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button className="flex-1 rounded-2xl py-2 font-bold">
                        قبول الطلب
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex-1 rounded-2xl py-2 text-primary font-bold"
                    >
                        رفض
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}