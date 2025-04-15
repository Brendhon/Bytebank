'use client';

import { cn } from '@/lib/utils';
import { InputTypes } from '@/types/ui';
import { Field, Input, InputProps, Label, } from '@headlessui/react';
import { Eye, EyeOff } from 'lucide-react';
import { cloneElement, isValidElement, ReactElement, ReactNode, useState } from 'react';

interface Props extends InputProps {
  label: string;
  error?: string;
  icon?: ReactNode;
  type?: InputTypes;
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
}: Props) => {
  // Check if the input is a password
  const isPassword = type === 'password';

  // State to show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Set input type
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Default icon class
  const iconClass = cn(
    'size-5 text-blue',
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
              'rounded-sm w-full bg-white border border-gray px-4 py-2 text-dark outline-none transition-all focus:border-green focus:ring-1 focus:ring-green text-14',
              error && 'border-red focus:ring-red focus:border-red',
              (icon || isPassword) && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Custom Icon */}
          {icon && !isPassword && (
            <span
              className="absolute right-2"
              onClick={onIconClick}
            >
              {
                // Add default icon class
                isValidElement(icon)
                  ? cloneElement(icon as ReactElement<{ className?: string }>, { className: iconClass })
                  : icon
              }
            </span>
          )}

          {/* Password eye toggle */}
          {isPassword && (
            <span
              className="absolute right-2"
              onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff className={iconClass} /> : <Eye className={iconClass} />}
            </span>
          )}
        </div>
      </Field>

      {/* Error */}
      {error && <span className="text-14 text-red">{error}</span>}
    </div>

  );
};
