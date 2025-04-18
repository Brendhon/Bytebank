import { cn } from '@/lib/utils';
import { Checkbox, CheckboxProps, Field, Label } from '@headlessui/react';
import { Check } from 'lucide-react';
interface Props extends CheckboxProps {
  label: string;
  error?: string;
  checked?: boolean;
};

export default ({ label, error, className, ...props }: Props) => {
  // Custom class for checkbox
  const checkboxClass = cn(
    'flex justify-center items-center size-5 rounded-sm bg-white border-2 border-green text-green hover:bg-green hover:text-white transition-all duration-200 ease-in-out',
    error && 'border-red focus:ring-red focus:border-red text-red hover:bg-red hover:text-white',
    className
  );

  // Custom class for checkbox icon
  const iconClass = cn(
    'w-5',
    props.checked ? 'visible' : 'invisible',
  );

  return (
    <div className="flex flex-col gap-1">
      <Field className="flex items-center gap-2">
        <Checkbox
          className={checkboxClass}
          {...props}
        >
          <Check className={iconClass} />
        </Checkbox>
        
        <Label className="text-14">{label}</Label>
      </Field>
      {/* Error */}
      {error && <span className="text-14 text-red">{error}</span>}
    </div>
  )
}