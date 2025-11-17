'use client'

import { Button } from '@/components/ui'
import { formatCurrency } from '@/lib/formatter/formatter'
import { cn } from '@/lib/utils/utils'
import { ITransaction, TransactionDesc, TransactionDescKey } from '@/types/transaction'
import { TableColumn } from '@/types/ui'
import { Pencil, Trash } from 'lucide-react'
import { Table } from '../Table/Table'

interface TransactionTableProps {
  transactions: ITransaction[]
  pageSize?: number
  onEdit?: (data: ITransaction) => void
  onDelete?: (data: ITransaction) => void
}

export default ({
  transactions,
  pageSize = 10,
  onEdit,
  onDelete,
}: TransactionTableProps) => {
  // Define render to type
  const renderType = (key: TransactionDescKey) => TransactionDesc[key]

  // Define render to value
  const renderValue = (data: ITransaction) => {
    // Destructure the data
    const { value, type } = data

    // Check if the type is outflow
    const isOutflow = type === 'outflow'
    
    // Check if the value is negative
    return (
      <span className={cn('font-semibold', isOutflow ? 'text-red' : 'text-green')}>
        {isOutflow ? '- ' : ''}
        {formatCurrency(Math.abs(value))}
      </span>
    )
  }

  // Define the render to actions
  const renderActions = (data: ITransaction) => {
    // Define the className for the buttons
    const buttonClassName = 'w-6 h-6 rounded-full'
    return (
      <div className="flex gap-2">
        <Button
          className={buttonClassName}
          onClick={() => onEdit?.(data)}>
          <Pencil size={12} />
        </Button>
        <Button
          className={buttonClassName}
          onClick={() => onDelete?.(data)}>
          <Trash size={12} />
        </Button>
      </div>
    )
  }

  // Define the columns for the table
  const columns: TableColumn<ITransaction>[] = [
    {
      label: 'Data',
      accessor: 'date',
    },
    {
      label: 'Alias',
      accessor: 'alias',
    },
    {
      label: 'Descrição',
      accessor: 'desc',
      render: (type) => renderType(type),
    },
    {
      label: 'Valor',
      accessor: 'value',
      render: (_v, _row) => renderValue(_row),
    },
    {
      label: 'Ações',
      accessor: 'value', // não importa o campo, pois usamos render
      render: (_v, _row) => renderActions(_row),
    },
  ]

  return (
    <Table
      data={transactions}
      columns={columns}
      pageSize={pageSize}
    />
  )
}
