import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Megaphone, Settings, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActionsCard = () => {
  const navigate = useNavigate();
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>إجراءات سريعة</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Primary Button */}
        <Button className="h-12 w-full cursor-pointer justify-start gap-2 rounded-lg shadow-md">
          <Megaphone className="h-4 w-4" />
          إنشاء عرض جديد
        </Button>

        {/* Secondary Buttons */}
        <Button
          variant="secondary"
          className="h-12 w-full cursor-pointer justify-start gap-2 rounded-lg"
          onClick={() => navigate('/admin/craftsmen')}
        >
          <Settings className="h-4 w-4" />
          إدارة الحرفيين
        </Button>

        <Button
          variant="secondary"
          className="h-12 w-full cursor-pointer justify-start gap-2 rounded-lg"
        >
          <Mail className="h-4 w-4" />
          إرسال إشعار جماعي
        </Button>
      </CardContent>
    </Card>
  );
};
export default QuickActionsCard;
