'use client';

import { cn } from '@/lib/utils/utils';
import {
  Field,
  Checkbox as HeadlessCheckbox,
  CheckboxProps as HeadlessCheckboxProps,
  Label
} from '@headlessui/react';
import { Check } from 'lucide-react';

/**
 * Props for the Checkbox component
 * @interface CheckboxProps
 * @extends {HeadlessCheckboxProps} Extends Headless UI Checkbox props
 */
export interface CheckboxProps extends HeadlessCheckboxProps {
  /** Label text displayed next to the checkbox */
  label: string;
  /** Error message to display below the checkbox */
  error?: string;
  /** Controlled checked state */
  checked?: boolean;
}

/**
 * Accessible checkbox component with label and error state support
 * Built on top of Headless UI for accessibility
 * 
 * @param {CheckboxProps} props - Component props
 * @returns {JSX.Element} Rendered checkbox component
 * 
 * @example
 * ```tsx
 * <Checkbox 
 *   label="Accept terms" 
 *   checked={accepted}
 *   onChange={setAccepted}
 *   error={errors.terms}
 * />
 * ```
 */
export const Checkbox = ({ label, error, className, checked, ...props }: CheckboxProps) => {
  const checkboxClass = cn(
    styles.checkbox,
    error && styles.checkboxError,
    className
  );

  return (
    <div className={styles.container}>
      <Field className={styles.field}>
        <HeadlessCheckbox
          className={checkboxClass}
          aria-invalid={!!error}
          checked={checked}
          {...props}
        >
          {checked && <Check className={styles.icon} />}
        </HeadlessCheckbox>

        <Label className={styles.label}>{label}</Label>
      </Field>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

const styles = {
  container: 'flex flex-col gap-1',
  field: 'flex items-center gap-2',
  checkbox: 'flex justify-center items-center w-7 h-6 rounded-sm bg-white border-2 border-green text-green hover:bg-green hover:text-white transition-all duration-200 ease-in-out',
  checkboxError: 'border-red focus:ring-red focus:border-red text-red hover:bg-red hover:text-white',
  label: 'text-14',
  icon: 'w-4 h-5',
  error: 'text-14 text-red',
} as const;