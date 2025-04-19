'use client'

import { Button } from '@/components/ui'
import { formatCurrency } from '@/lib/formatter'
import { cn } from '@/lib/utils'
import { Transaction, TransactionType, TransactionTypeKey } from '@/types/transaction'
import { TableColumn } from '@/types/ui'
import { Pencil, Trash } from 'lucide-react'
import Table from '../Table/Table'

interface TransactionTableProps {
  transactions: Transaction[]
  pageSize?: number
  onEdit?: (data: Transaction) => void
  onDelete?: (data: Transaction) => void
}

export default ({
  transactions,
  pageSize = 10,
  onEdit,
  onDelete,
}: TransactionTableProps) => {
  // Define render to type
  const renderType = (key: TransactionTypeKey) => TransactionType[key]

  // Define render to value
  const renderValue = (value: number) => {
    return (
      <span className={cn('font-semibold', value < 0 ? 'text-red' : 'text-green')}>
        {value < 0 ? '- ' : ''}
        {formatCurrency(Math.abs(value))}
      </span>
    )
  }

  // Define the render to actions
  const renderActions = (data: Transaction) => {
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
  const columns: TableColumn<Transaction>[] = [
    {
      label: 'Data',
      accessor: 'date',
    },
    {
      label: 'Alias',
      accessor: 'alias',
    },
    {
      label: 'Tipo',
      accessor: 'type',
      render: (type) => renderType(type),
    },
    {
      label: 'Valor',
      accessor: 'value',
      render: (value) => renderValue(value),
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
