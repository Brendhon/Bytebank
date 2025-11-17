'use client'

import { Modal } from '@/components/layout'
import { Illustration } from '@/components/ui'
import { TransactionFormData, transactionSchema } from '@/schemas'
import { GeneralModalProps } from '@/types/modal'
import { ITransaction, TransactionDesc, TransactionDescKey, TransactionType, TransactionTypeKey } from '@/types/transaction'
import { Fieldset, Legend } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, PiggyBank } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../Input/Input'
import { Select } from '../Select/Select'

const defaultTransaction: ITransaction = {
  desc: 'deposit',
  alias: '',
  value: 0,
  type: 'inflow',
  date: new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
}

// Map transaction description to type
const descToTypeMap: Record<TransactionDescKey, TransactionTypeKey> = {
  deposit: 'inflow',
  transfer: 'outflow',
  withdrawal: 'outflow',
  payment: 'outflow',
};

export default ({ isOpen, onClose, onSubmit, defaultValues }: GeneralModalProps<TransactionFormData>) => {
  // Check if defaultValues are provided
  // If not, set isEditing to false
  const isEditing = !!defaultValues

  // Initialize the form with react-hook-form
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      ...defaultTransaction,
      ...defaultValues,
    },
  })

  // Observe the selected description
  const selectedDesc = watch('desc') as TransactionDescKey;

  // Automatically set the type based on the selected description
  useEffect(() => {
    if (selectedDesc in descToTypeMap) setValue('type', descToTypeMap[selectedDesc]);
  }, [selectedDesc, setValue]);

  // Sync value if defaultValues change (useful if props are updated externally)
  useEffect(() => {
    const values = defaultValues || defaultTransaction;
    Object.entries(values).forEach(([key, val]) => setValue(key as keyof TransactionFormData, val))
  }, [defaultValues, setValue])

  // Form type options by enum
  const descOptions = Object.entries(TransactionDesc).map(([key, value]) => ({ label: value, value: key }))
  const typeOptions = Object.entries(TransactionType).map(([key, value]) => ({ label: value, value: key }))

  // Class to row container
  const rowClassName = 'grid gap-4 grid-cols-1 md:grid-cols-2'

  // Render the form
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="max-w-[700px] w-full"
        onSubmit={handleSubmit(onSubmit)}
        btnTextSubmit='Salvar'
        btnVariantSubmit='blue'>

        <Fieldset className="flex flex-col gap-6">
          <Legend className="text-20-bold text-dark text-left">
            {isEditing ? 'Editar transação' : 'Nova transação'}
          </Legend>

          <Input
            label="Alias (opcional)"
            placeholder="Digite um apelido para a transação"
            type="email"
            {...register('alias')}
            error={errors.alias?.message}
          />

          <div className={rowClassName}>
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

          <div className={rowClassName}>
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

          <Illustration src='transaction.svg' width={300} />

        </Fieldset>
      </Modal>
    </>
  )
}
