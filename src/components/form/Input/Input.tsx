'use client';

import { cn } from '@/lib/utils';
import { Field, Input, Label, } from '@headlessui/react';
import { Eye, EyeOff } from 'lucide-react';
import { InputHTMLAttributes, ReactNode, useState } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: ReactNode;
  type?: ('text' | 'email' | 'password' | 'number');
  onIconClick?: () => void;
};

export default ({
  label,
  error,
  className,
  icon,
  type,
  onIconClick,
  ...props
}: InputProps) => {
  // Check if the input is a password
  const isPassword = type === 'password';

  // State to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Set input type
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Default icon class
  const iconClass = cn(
    'absolute right-2 text-blue',
    (onIconClick || isPassword) && 'cursor-pointer hover:text-dark'
  );

  // Render the input component
  return (
    <div className="flex flex-col gap-1">
      <Field className="flex flex-col">

        {/* Label */}
        <Label className="text-16-semi text-dark-gray mb-3">{label}</Label>

        {/* Input - Container */}
        <div className='relative flex items-center w-full'>

          {/* Input */}
          <Input
            type={inputType}
            className={cn(
              'rounded-sm w-full bg-white border border-gray px-4 py-2 text-[var(--dark)] outline-none transition-all focus:border-[var(--green)] focus:ring-1 focus:ring-[var(--green)] text-14',
              error && 'border-[var(--red)] focus:ring-[var(--red)] focus:border-[var(--red)]',
              (icon || isPassword) && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Custom Icon */}
          {icon && !isPassword && (
            <span
              className={iconClass}
              onClick={onIconClick}
            >
              {icon}
            </span>
          )}

          {/* Password eye toggle */}
          {isPassword && (
            <span
              className={iconClass}
              onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          )}
        </div>
      </Field>

      {/* Error */}
      {error && <span className="text-14 text-[var(--red)]">{error}</span>}
    </div>

  );
};
