'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils/utils';
import { InputTypes } from '@/types/ui';
import {
  Button,
  Field,
  Input as HeadlessInput,
  InputProps as HeadlessInputProps,
  Label,
} from '@headlessui/react';
import { InputMask } from '@react-input/mask';
import { Eye, EyeOff } from 'lucide-react';
import { cloneElement, isValidElement, ReactElement, ReactNode, useState } from 'react';

/**
 * Props for the Input component
 * @interface InputProps
 * @extends {HeadlessInputProps} Extends Headless UI Input props
 */
export interface InputProps extends HeadlessInputProps {
  /** Label text displayed above the input */
  label: string;
  /** Error message to display below the input */
  error?: string;
  /** Custom icon to display on the right side of the input */
  icon?: ReactNode;
  /** Input type (text, email, password, number, date) */
  type?: InputTypes;
  /** Callback function when the icon is clicked */
  onIconClick?: () => void;
}

/**
 * Accessible input component with label, icon, mask, password toggle and error state support
 * Built on top of Headless UI for accessibility
 * 
 * Features:
 * - Password visibility toggle
 * - Date mask (dd/mm/yyyy)
 * - Custom icon support
 * - Error state handling
 * 
 * @param {InputProps} props - Component props
 * @returns {JSX.Element} Rendered input component
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Email" 
 *   type="email"
 *   placeholder="you@example.com"
 *   error={errors.email}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Password" 
 *   type="password"
 *   placeholder="••••••••"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Birth Date" 
 *   type="date"
 *   placeholder="dd/mm/yyyy"
 * />
 * ```
 */
export const Input = ({
  label,
  error,
  className,
  icon,
  type,
  onIconClick,
  ...props
}: InputProps) => {
  const id = useId();
  const errorId = `${id}-error`;

  const isPassword = type === 'password';
  const isDate = type === 'date';
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const iconClass = cn(
    styles.icon,
    (onIconClick || isPassword) && styles.iconInteractive
  );

  const inputClass = cn(
    styles.input,
    error && styles.inputError,
    (icon || isPassword) && styles.inputWithIcon,
    className
  );

  return (
    <div className={styles.container}>
      <Field className={styles.field}>
        <Label className={styles.label}>{label}</Label>

        <div className={styles.inputWrapper}>
          {isDate ? (
            <InputMask
              mask="dd/mm/yyyy"
              className={inputClass}
              replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
              showMask={false}
              separate={true}
              component="input"
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              {...props}
            />
          ) : (
            <HeadlessInput
              type={inputType}
              className={inputClass}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              {...props}
            />
          )}

          {icon && !isPassword && (
            <Button
              className={styles.iconButton}
              onClick={onIconClick}
              type="button"
            >
              {isValidElement(icon)
                ? cloneElement(icon as ReactElement<{ className?: string }>, { className: iconClass })
                : icon}
            </Button>
          )}

          {isPassword && (
            <Button
              className={styles.iconButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              type="button"
            >
              {showPassword ? <EyeOff className={iconClass} /> : <Eye className={iconClass} />}
            </Button>
          )}
        </div>
      </Field>

      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

const styles = {
  container: 'flex flex-col gap-1',
  field: 'flex flex-col',
  label: 'text-16-semi text-dark-gray mb-3',
  inputWrapper: 'relative flex items-center w-full',
  input: 'rounded-sm w-full bg-white border border-gray px-4 py-2 text-dark outline-none transition-all focus:border-green focus:ring-1 focus:ring-green text-14 disabled:cursor-not-allowed disabled:opacity-70',
  inputError: 'border-red focus:ring-red focus:border-red',
  inputWithIcon: 'pr-10',
  iconButton: 'absolute right-2',
  icon: 'size-5 text-blue',
  iconInteractive: 'cursor-pointer hover:text-dark',
  error: 'text-14 text-red',
} as const;
