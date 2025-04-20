import { cn } from '@/lib/utils';
import { Field, Label, Select, SelectProps } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

// Define the props for the component
interface Props extends SelectProps {
  label: string;
  error?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export default ({
  label,
  error,
  className,
  options,
  placeholder,
  ...props
}: Props) => {
  // Render the input component
  return (
    <div className="flex flex-col gap-1">
      <Field className="flex flex-col">

        {/* Label */}
        <Label className="text-16-semi text-dark-gray mb-3">{label}</Label>

        <div className="relative">
          <Select
            defaultValue={''}
            className={cn(
              'block w-full appearance-none rounded-sm bg-white border border-gray px-4 py-1.5 text-sm/6 text-dark',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 focus:ring-1 focus:ring-green text-14',
              'disabled:cursor-not-allowed disabled:opacity-70',
              error && 'border-red focus:ring-red focus:border-red',
            )}
            {...props}
          >
            {/* Default Option */}
            <option value="" disabled>{placeholder || 'Selecione uma opção'}</option>

            {/* Options */}
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <ChevronDownIcon
            className="group pointer-events-none absolute top-3 right-2 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>


      </Field>

      {/* Error */}
      {error && <span className="text-14 text-red">{error}</span>}
    </div>

  );
};
