'use client'

import { Modal } from '@/components/layout'
import { Illustration } from '@/components/ui'
import { DESC_TO_TYPE_MAP, DEFAULT_TRANSACTION } from '@/lib/constants'
import { TransactionFormData, transactionSchema } from '@/schemas'
import { GeneralModalProps } from '@/types/modal'
import { TransactionDesc, TransactionDescKey, TransactionType } from '@/types/transaction'
import { Fieldset, Legend } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, PiggyBank } from 'lucide-react'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../Input/Input'
import { Select } from '../Select/Select'

/**
 * TransactionForm component props
 * @interface TransactionFormProps
 * @extends {GeneralModalProps<TransactionFormData>} Extends general modal props with TransactionFormData
 */
export interface TransactionFormProps extends GeneralModalProps<TransactionFormData> {}

/**
 * Transaction form component that renders a transaction form inside a modal
 * 
 * Uses React Hook Form for form state management and Zod for validation.
 * Automatically maps transaction type based on selected description.
 * Supports both create and edit modes based on defaultValues prop.
 * 
 * Features:
 * - Automatic type mapping: Type is automatically set based on description selection
 * - Form validation: Uses Zod schema for client and server-side validation
 * - Responsive design: Adapts to different screen sizes
 * - Accessibility: Uses Headless UI components for ARIA support
 * 
 * @param {TransactionFormProps} props - TransactionForm component props
 * @param {boolean} props.isOpen - Whether the modal is currently visible
 * @param {() => void} props.onClose - Callback function to close the modal
 * @param {(data: TransactionFormData) => void | Promise<void>} props.onSubmit - Callback function called when the form is submitted with valid data
 * @param {Partial<TransactionFormData>} [props.defaultValues] - Optional default values for form fields. If provided, the form is in edit mode
 * @returns {ReactElement} A transaction form component wrapped in a modal
 * 
 * @example
 * ```tsx
 * <TransactionForm
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onSubmit={handleTransactionSubmit}
 *   defaultValues={{ desc: 'deposit', type: 'inflow', value: 100 }}
 * />
 * ```
 */
export const TransactionForm = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: TransactionFormProps): ReactElement => {
  const isEditing = !!defaultValues

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      ...DEFAULT_TRANSACTION,
      ...defaultValues,
    },
  })

  const selectedDesc = watch('desc') as TransactionDescKey;

  useEffect(() => {
    if (selectedDesc in DESC_TO_TYPE_MAP) {
      setValue('type', DESC_TO_TYPE_MAP[selectedDesc]);
    }
  }, [selectedDesc, setValue]);

  useEffect(() => {
    if (!defaultValues) return;
    Object.entries(defaultValues).forEach(([key, val]) => {
      setValue(key as keyof TransactionFormData, val);
    });
  }, [defaultValues, setValue])

  const descOptions = Object.entries(TransactionDesc).map(([key, value]) => ({ label: value, value: key }))
  const typeOptions = Object.entries(TransactionType).map(([key, value]) => ({ label: value, value: key }))

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modal}
      onSubmit={handleSubmit(onSubmit)}
      btnTextSubmit='Salvar'
      btnVariantSubmit='blue'>

      <Fieldset className={styles.fieldset}>
        <Legend className={styles.legend}>
          {isEditing ? 'Editar transação' : 'Nova transação'}
        </Legend>

        <Input
          label="Alias (opcional)"
          placeholder="Digite um apelido para a transação"
          type="text"
          {...register('alias')}
          error={errors.alias?.message}
        />

        <div className={styles.row}>
          <Select
            label="Descrição"
            placeholder="Descrição"
            error={errors.desc?.message}
            options={descOptions}
            {...register('desc')}
          />

          <Select
            label="Tipo"
            placeholder="Tipo"
            error={errors.type?.message}
            options={typeOptions}
            disabled
            {...register('type')}
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Valor"
            placeholder="Digite o valor da transação"
            error={errors.value?.message}
            icon={<PiggyBank />}
            type="number"
            {...register('value', { valueAsNumber: true })}
          />

          <Input
            label="Data"
            placeholder='dd/mm/yyyy'
            error={errors.date?.message}
            icon={<CalendarIcon />}
            type="date"
            {...register('date')}
          />
        </div>

        <Illustration src='transaction.svg' width={300} alt='Transaction illustration showing financial transaction' />

      </Fieldset>
    </Modal>
  )
}

const styles = {
  modal: 'max-w-[700px] w-full',
  fieldset: 'flex flex-col gap-6',
  legend: 'text-20-bold text-dark text-left',
  row: 'grid gap-4 grid-cols-1 md:grid-cols-2',
} as const;
