import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  buildProfileSchema,
  type ProfileFormValues,
} from '@/features/profile/schema/profile.schema';
import ProviderForm from './ProviderForm';
import ProfileForm from './ProfileForm';
import PreferenceCard from './PreferenceCard';

interface ProfileFormProps {
  onSubmit: (values: ProfileFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const ProfileFormSettings = ({ onSubmit, onCancel }: ProfileFormProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(buildProfileSchema('provider')),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      language: '',
      profession: '',
      serviceArea: '',
      bio: '',
    },
    mode: 'onTouched',
  });

  function handleSubmit(values: ProfileFormValues) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className="space-y-8"
      >
        {/* ── Card 1: المعلومات الشخصية ── */}
        <ProfileForm control={form.control} />

        {/* ── Card 2: بيانات المهنة — Provider only ── */}
        {false && <ProviderForm control={form.control} />}

        {/* ── Card 3: التفضيلات ── */}
        <PreferenceCard />

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-1">
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground h-11 min-w-36 cursor-pointer"
            onClick={onCancel}
          >
            إلغاء التعديلات
          </Button>
          <Button
            type="submit"
            variant="gradient"
            className="shadow-primary-gradient h-11 min-w-36"
            disabled={form.formState.isSubmitting}
          >
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileFormSettings;
