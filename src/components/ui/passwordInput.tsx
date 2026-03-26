import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";

export const PasswordInput = ({ field, placeholder, ...props }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input 
        {...field} 
        {...props}
        type={show ? "text" : "password"} 
        placeholder={placeholder} 
        className="pr-10 pl-10 h-12 border-input focus:ring-ring" 
      />
      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};