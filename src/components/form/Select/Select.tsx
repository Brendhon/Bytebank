'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils/utils';
import {
  Field,
  Label,
  Select as HeadlessSelect,
  SelectProps as HeadlessSelectProps,
} from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

/**
 * Option type for Select component
 */
export interface SelectOption {
  /** Value of the option */
  value: string;
  /** Display label of the option */
  label: string;
}

/**
 * Props for the Select component
 * @interface SelectProps
 * @extends {HeadlessSelectProps} Extends Headless UI Select props
 */
export interface SelectProps extends HeadlessSelectProps {
  /** Label text displayed above the select */
  label: string;
  /** Error message to display below the select */
  error?: string;
  /** Placeholder text for the default disabled option */
  placeholder?: string;
  /** Array of options to display in the select */
  options?: SelectOption[];
}

/**
 * Accessible select component with label, options and error state support
 * Built on top of Headless UI for accessibility
 * 
 * @param {SelectProps} props - Component props
 * @returns {JSX.Element} Rendered select component
 * 
 * @example
 * ```tsx
 * <Select 
 *   label="Transfer Type" 
 *   placeholder="Select a type"
 *   options={[
 *     { value: 'pix', label: 'PIX' },
 *     { value: 'ted', label: 'TED' }
 *   ]}
 *   error={errors.type}
 * />
 * ```
 */
export const Select = ({
  label,
  error,
  className,
  options,
  placeholder,
  ...props
}: SelectProps) => {
  const id = useId();
  const errorId = `${id}-error`;

  const selectClass = cn(
    styles.select,
    error && styles.selectError,
    className
  );

  return (
    <div className={styles.container}>
      <Field className={styles.field}>
        <Label className={styles.label}>{label}</Label>

        <div className={styles.selectWrapper}>
          <HeadlessSelect
            defaultValue=""
            className={selectClass}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>

            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </HeadlessSelect>

          <ChevronDownIcon
            className={styles.chevronIcon}
            aria-hidden="true"
          />
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
  selectWrapper: 'relative',
  select: 'block w-full appearance-none rounded-sm bg-white border border-gray px-4 py-1.5 text-sm/6 text-dark focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 focus:ring-1 focus:ring-green text-14 disabled:cursor-not-allowed disabled:opacity-70',
  selectError: 'border-red focus:ring-red focus:border-red',
  chevronIcon: 'pointer-events-none absolute top-3 right-2 size-4 stroke-gray-400',
  error: 'text-14 text-red',
} as const;
