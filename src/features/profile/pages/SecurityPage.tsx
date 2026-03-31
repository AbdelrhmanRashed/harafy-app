import FormFieldInput from '@/components/shared/form/FormFieldInput'
import {Lock, AlertTriangle,  Shield, Trash2 } from 'lucide-react'
import {  passwordSchema,type PasswordFormValues, } from '../schema/profile.schema'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
export default function SecurityPage() {
  return (
     <>
                                {/* تغيير كلمة المرور */}
                                <PasswordCard />

                                {/* Danger Zone */}
                                <Card className="border-destructive/30">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm flex items-center justify-end gap-2 text-destructive">
                                            منطقة الخطر
                                            <span className="p-1.5 rounded-lg bg-destructive/10">
                                                <AlertTriangle className="h-4 w-4 text-destructive" />
                                            </span>
                                        </CardTitle>
                                        <CardDescription className="text-right text-xs">
                                            هذه الإجراءات لا يمكن التراجع عنها. تأكد قبل المتابعة.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Separator />
                                        <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-foreground">تعطيل الحساب مؤقتاً</p>
                                                <p className="text-xs text-muted-foreground">لن يظهر حسابك للآخرين</p>
                                            </div>
                                            <Button variant="outline" size="sm" className="border-destructive/40 text-destructive hover:bg-destructive/5 gap-2">
                                                <Shield className="h-4 w-4" />
                                                تعطيل
                                            </Button>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-destructive">حذف الحساب نهائياً</p>
                                                <p className="text-xs text-muted-foreground">سيتم حذف جميع بياناتك بشكل دائم</p>
                                            </div>
                                            <Button variant="destructive" size="sm" className="gap-2">
                                                <Trash2 className="h-4 w-4" />
                                                حذف الحساب
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
  )
}
// ─── PasswordCard ─────────────────────────────────────────────────────────────

function PasswordCard() {
    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
        mode: "onTouched",
    });

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-end gap-2">
                    تغيير كلمة المرور
                    <span className="p-1.5 rounded-lg bg-primary/10">
                        <Lock className="h-4 w-4 text-primary" />
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((v) => console.log("password:", v))}
                        noValidate
                        className="space-y-4"
                    >
                        <FormFieldInput
                            control={form.control}
                            name="currentPassword"
                            label="كلمة المرور الحالية"
                            placeholder="••••••••"
                            icon={Lock}
                            type="password"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormFieldInput
                                control={form.control}
                                name="newPassword"
                                label="كلمة المرور الجديدة"
                                placeholder="••••••••"
                                icon={Lock}
                                type="password"
                            />
                            <FormFieldInput
                                control={form.control}
                                name="confirmPassword"
                                label="تأكيد كلمة المرور"
                                placeholder="••••••••"
                                icon={Lock}
                                type="password"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                variant="gradient"
                                className="shadow-primary-gradient"
                                disabled={form.formState.isSubmitting}
                            >
                                حفظ كلمة المرور
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}