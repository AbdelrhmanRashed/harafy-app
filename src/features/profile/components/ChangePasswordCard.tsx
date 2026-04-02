import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  passwordSchema,
  type PasswordFormValues,
} from '../schema/profile.schema';
import FormFieldInput from '@/components/shared/form/FormFieldInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChangePassword } from '../hooks/useChangePassword';

const ChangePasswordCard = () => {
  const { mutate: changePassword, isPending } = useChangePassword();
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = (data: { oldPassword: string; newPassword: string }) => {
    const passData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    changePassword(passData, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-end gap-2 text-sm">
          تغيير كلمة المرور
          <span className="bg-primary/10 rounded-lg p-1.5">
            <Lock className="text-primary h-4 w-4" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <FormFieldInput
              control={form.control}
              name="oldPassword"
              label="كلمة المرور الحالية"
              placeholder="••••••••"
              icon={Lock}
              type="password"
            />
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
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
                className="shadow-primary-gradient h-10 w-full md:w-auto"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري تغيير كلمة المرور...
                  </>
                ) : (
                  'تغيير كلمة المرور'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordCard;
