import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  icon?: LucideIcon;
  type?: string;
  dir?: 'rtl' | 'ltr';
}

const FormFieldInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon,
  type = 'text',
  dir = 'rtl',
}: FormInputProps<T>) => {
  const Icon = icon;
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputGroup className={'rounded-lg px-3 py-5'}>
              <InputGroupInput
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                type={type === 'password' ? (show ? 'text' : 'password') : type}
                autoComplete={type}
                {...field}
                dir={dir}
              />
              {Icon && (
                <InputGroupAddon align="inline-start">
                  <Icon className="text-muted-foreground" />
                </InputGroupAddon>
              )}
              {type === 'password' && (
                <InputGroupButton
                  size={'icon-sm'}
                  className="cursor-pointer"
                  onClick={() => setShow(!show)}
                  aria-label={show ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  type="button"
                >
                  {show ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </InputGroupButton>
              )}
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInput;
