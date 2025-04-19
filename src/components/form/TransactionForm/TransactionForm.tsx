'use client'

import { Modal } from '@/components/layout'
import { Illustration } from '@/components/ui'
import { TransactionFormData, transactionSchema } from '@/schemas'
import { GeneralModalProps } from '@/types/modal'
import { Fieldset, Legend } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, PiggyBank } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input/Input'

export default ({ isOpen, onClose, onSubmit, defaultValues }: GeneralModalProps<TransactionFormData>) => {
  // Check if defaultValues are provided
  // If not, set isEditing to false
  const isEditing = !!defaultValues

  // Initialize the form with react-hook-form
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: '',
      alias: '',
      value: 0,
      date: '',
      ...defaultValues,
    },
  })

  // Sync value if defaultValues change (useful if props are updated externally)
  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, val]) => {
        setValue(key as keyof TransactionFormData, val as any)
      })
    }
  }, [defaultValues, setValue])

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

          {/* <Input
            label="Nome"
            placeholder="Digite seu nome completo"
            {...register('name')}
            error={errors.name?.message}
          /> */}

          <Input
            label="Alias (opcional)"
            placeholder="Digite um apelido para a transação"
            type="email"
            {...register('alias')}
            error={errors.alias?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Valor"
              placeholder="Digite o valor da transação"
              error={errors.value?.message}
              icon={<PiggyBank />}
              type="number"
              {...register('value')}
            />

            <Input
              label="Data"
              placeholder="Selecione uma data"
              error={errors.date?.message}
              icon={<CalendarIcon />}
              type="text"
              {...register('date')}
            />
          </div>

          <Illustration src='transaction.svg' width={300} />

        </Fieldset>
      </Modal>
    </>
  )
}
