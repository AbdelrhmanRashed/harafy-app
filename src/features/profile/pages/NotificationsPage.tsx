import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, Mail, Smartphone } from 'lucide-react';
import { useState } from 'react';
import NotificationRow from '../components/NotificationRow';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState({
    inApp: true,
    email: true,
    sms: false,
    offers: true,
    updates: true,
  });
  return (
    <main className="space-y-8">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-end gap-2 text-sm">
            قنوات الإشعار
            <span className="bg-primary/10 rounded-lg p-1.5">
              <Bell className="text-primary h-4 w-4" />
            </span>
          </CardTitle>
          <CardDescription className="text-right text-xs">
            اختر الطريقة التي تريد استقبال الإشعارات منها
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-border space-y-0 divide-y">
          <NotificationRow
            id="inApp"
            label="إشعارات داخل التطبيق"
            description="تظهر في قائمة الإشعارات"
            icon={<Bell className="h-4 w-4" />}
            checked={notifications.inApp}
            onCheckedChange={(v) =>
              setNotifications((p) => ({ ...p, inApp: v }))
            }
          />
          <NotificationRow
            id="email"
            label="إشعارات البريد الإلكتروني"
            description="ترسل لبريدك الإلكتروني"
            icon={<Mail className="h-4 w-4" />}
            checked={notifications.email}
            onCheckedChange={(v) =>
              setNotifications((p) => ({ ...p, email: v }))
            }
          />
          <NotificationRow
            id="sms"
            label="إشعارات SMS"
            description="رسائل نصية على هاتفك"
            icon={<Smartphone className="h-4 w-4" />}
            checked={notifications.sms}
            onCheckedChange={(v) => setNotifications((p) => ({ ...p, sms: v }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-end gap-2 text-sm">
            نوع الإشعارات
            <span className="bg-primary/10 rounded-lg p-1.5">
              <Bell className="text-primary h-4 w-4" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-border space-y-0 divide-y">
          <NotificationRow
            id="offers"
            label="العروض الواردة"
            description="عند وصول عرض جديد على طلبك"
            icon={<Bell className="h-4 w-4" />}
            checked={notifications.offers}
            onCheckedChange={(v) =>
              setNotifications((p) => ({ ...p, offers: v }))
            }
          />
          <NotificationRow
            id="updates"
            label="تحديثات حالة الطلب"
            description="عند تغيير حالة طلبك"
            icon={<Bell className="h-4 w-4" />}
            checked={notifications.updates}
            onCheckedChange={(v) =>
              setNotifications((p) => ({ ...p, updates: v }))
            }
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default NotificationsPage;
