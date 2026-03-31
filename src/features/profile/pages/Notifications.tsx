import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell, Mail, Smartphone } from 'lucide-react'
import React, { useState } from 'react'
import NotifRow from '../components/NotifRow'

export default function Notifications() {
      
    const [notifs, setNotifs] = useState({
        inApp: true,
        email: true,
        sms: false,
        offers: true,
        updates: true,
    });
  return (
     <>
                                {/* قنوات الإشعار */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm flex items-center justify-end gap-2">
                                            قنوات الإشعار
                                            <span className="p-1.5 rounded-lg bg-primary/10">
                                                <Bell className="h-4 w-4 text-primary" />
                                            </span>
                                        </CardTitle>
                                        <CardDescription className="text-right text-xs">
                                            اختر الطريقة التي تريد استقبال الإشعارات منها
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="divide-y divide-border space-y-0">
                                        <NotifRow
                                            id="inApp"
                                            label="إشعارات داخل التطبيق"
                                            description="تظهر في قائمة الإشعارات"
                                            icon={<Bell className="h-4 w-4" />}
                                            checked={notifs.inApp}
                                            onCheckedChange={(v) => setNotifs((p) => ({ ...p, inApp: v }))}
                                        />
                                        <NotifRow
                                            id="email"
                                            label="إشعارات البريد الإلكتروني"
                                            description="ترسل لبريدك الإلكتروني"
                                            icon={<Mail className="h-4 w-4" />}
                                            checked={notifs.email}
                                            onCheckedChange={(v) => setNotifs((p) => ({ ...p, email: v }))}
                                        />
                                        <NotifRow
                                            id="sms"
                                            label="إشعارات SMS"
                                            description="رسائل نصية على هاتفك"
                                            icon={<Smartphone className="h-4 w-4" />}
                                            checked={notifs.sms}
                                            onCheckedChange={(v) => setNotifs((p) => ({ ...p, sms: v }))}
                                        />
                                    </CardContent>
                                </Card>

                                {/* نوع الإشعارات */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm flex items-center justify-end gap-2">
                                            نوع الإشعارات
                                            <span className="p-1.5 rounded-lg bg-primary/10">
                                                <Bell className="h-4 w-4 text-primary" />
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="divide-y divide-border space-y-0">
                                        <NotifRow
                                            id="offers"
                                            label="العروض الواردة"
                                            description="عند وصول عرض جديد على طلبك"
                                            icon={<Bell className="h-4 w-4" />}
                                            checked={notifs.offers}
                                            onCheckedChange={(v) => setNotifs((p) => ({ ...p, offers: v }))}
                                        />
                                        <NotifRow
                                            id="updates"
                                            label="تحديثات حالة الطلب"
                                            description="عند تغيير حالة طلبك"
                                            icon={<Bell className="h-4 w-4" />}
                                            checked={notifs.updates}
                                            onCheckedChange={(v) => setNotifs((p) => ({ ...p, updates: v }))}
                                        />
                                    </CardContent>
                                </Card>
                            </>
  )
}
