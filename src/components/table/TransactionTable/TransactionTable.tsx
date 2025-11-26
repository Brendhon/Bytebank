'use client'

import { useMemo } from 'react'
import { ITransaction } from '@/types/transaction'
import { TableColumn } from '@/types/ui'
import { Table } from '../Table/Table'
import { useTransactionRenderers } from '@/hooks'
import { TRANSACTION_TABLE_LABELS } from '@/lib/constants'

/**
 * Column labels configuration for TransactionTable
 * Allows customization for internationalization (i18n)
 */
export interface TransactionTableColumnLabels {
  date?: string
  alias?: string
  description?: string
  value?: string
  actions?: string
}

/**
 * Props for TransactionTable component
 * 
 * @interface TransactionTableProps
 * @property {ITransaction[]} transactions - Array of transaction objects to display
 * @property {number} [pageSize=10] - Number of transactions per page (default: 10)
 * @property {(data: ITransaction) => void} [onEdit] - Optional callback fired when edit button is clicked
 * @property {(data: ITransaction) => void} [onDelete] - Optional callback fired when delete button is clicked
 * @property {TransactionTableColumnLabels} [columnLabels] - Optional custom labels for table columns (for i18n)
 */
export interface TransactionTableProps {
  transactions: ITransaction[]
  pageSize?: number
  onEdit?: (data: ITransaction) => void
  onDelete?: (data: ITransaction) => void
  columnLabels?: TransactionTableColumnLabels
}

/**
 * Specialized Table component for displaying financial transactions
 * 
 * Displays transaction date, alias, description, formatted value with color coding,
 * and optional edit/delete action buttons.
 * 
 * Features:
 * - Color-coded values (green for inflow, red for outflow)
 * - Formatted currency display
 * - Optional action buttons (edit/delete)
 * - Configurable column labels for i18n
 * - Pagination support
 * 
 * @param props - TransactionTable component props
 * @returns A specialized table component for financial transactions
 * 
 * @example
 * ```tsx
 * <TransactionTable
 *   transactions={transactions}
 *   pageSize={20}
 *   onEdit={(transaction) => handleEdit(transaction)}
 *   onDelete={(transaction) => handleDelete(transaction)}
 *   columnLabels={{
 *     date: 'Date',
 *     alias: 'Alias',
 *     description: 'Description',
 *     value: 'Amount',
 *     actions: 'Actions',
 *   }}
 * />
 * ```
 */
export const TransactionTable = ({
  transactions,
  pageSize = 10,
  onEdit,
  onDelete,
  columnLabels,
}: TransactionTableProps) => {
  const { renderType, renderValue, renderActions } = useTransactionRenderers({
    onEdit,
    onDelete,
  })

  const labels = useMemo(
    () => ({
      date: columnLabels?.date ?? TRANSACTION_TABLE_LABELS.date,
      alias: columnLabels?.alias ?? TRANSACTION_TABLE_LABELS.alias,
      description: columnLabels?.description ?? TRANSACTION_TABLE_LABELS.description,
      value: columnLabels?.value ?? TRANSACTION_TABLE_LABELS.value,
      actions: columnLabels?.actions ?? TRANSACTION_TABLE_LABELS.actions,
    }),
    [columnLabels]
  )

  const columns: TableColumn<ITransaction>[] = useMemo(() => {
    const baseColumns: TableColumn<ITransaction>[] = [
      {
        label: labels.date,
        accessor: 'date',
      },
      {
        label: labels.alias,
        accessor: 'alias',
      },
      {
        label: labels.description,
        accessor: 'desc',
        render: (type) => renderType(type),
      },
      {
        label: labels.value,
        accessor: 'value',
        render: (_v, _row) => renderValue(_row),
      },
    ]

    if (onEdit || onDelete) {
      baseColumns.push({
        label: labels.actions,
        accessor: '_id' as keyof ITransaction,
        render: (_v, _row) => renderActions(_row),
      })
    }

    return baseColumns
  }, [labels, renderType, renderValue, renderActions, onEdit, onDelete])

  return (
    <Table
      data={transactions}
      columns={columns}
      pageSize={pageSize}
    />
  )
}
