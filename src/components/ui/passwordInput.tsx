import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordInput = ({ field, placeholder, ...props }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        {...field}
        {...props}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className="border-input focus:ring-ring h-12 pr-10 pl-10"
      />
      <Lock className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="text-muted-foreground hover:text-primary absolute top-1/2 left-3 -translate-y-1/2 transition-colors"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};
