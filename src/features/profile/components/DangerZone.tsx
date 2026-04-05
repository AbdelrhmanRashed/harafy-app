import { AlertTriangle, Shield, Trash2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';

const DangerZone = () => {
  return (
    <Card className="border-destructive/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-destructive flex items-center justify-end gap-2 text-sm">
          منطقة الخطر
          <span className="bg-destructive/10 rounded-lg p-1.5">
            <AlertTriangle className="text-destructive h-4 w-4" />
          </span>
        </CardTitle>
        <CardDescription className="text-right text-xs">
          هذه الإجراءات لا يمكن التراجع عنها. تأكد قبل المتابعة.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Separator />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="text-right">
            <p className="text-foreground text-sm font-medium">
              تعطيل الحساب مؤقتاً
            </p>
            <p className="text-muted-foreground text-xs">
              لن يظهر حسابك للآخرين
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-destructive/40 text-destructive hover:bg-destructive/5 gap-2"
          >
            <Shield className="h-4 w-4" />
            تعطيل
          </Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="text-right">
            <p className="text-destructive text-sm font-medium">
              حذف الحساب نهائياً
            </p>
            <p className="text-muted-foreground text-xs">
              سيتم حذف جميع بياناتك بشكل دائم
            </p>
          </div>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" />
            حذف الحساب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
