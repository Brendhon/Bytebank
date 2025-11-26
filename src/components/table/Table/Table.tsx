'use client'

import { cn } from '@/lib/utils/utils'
import { TableColumn } from '@/types/ui'
import { useMemo, useState } from 'react'
import { Paginator } from '../Paginator/Paginator'

/**
 * Props for the Table component
 * @template T - Type of data objects to display in the table
 */
export interface TableProps<T> {
  /** Array of data objects to display in the table */
  data: T[]
  /** Column definitions with labels and accessors */
  columns: TableColumn<T>[]
  /** Number of items per page. If omitted or undefined, no pagination is applied */
  pageSize?: number
  /** Message to display when data is empty. Defaults to "No data available" */
  emptyMessage?: string
  /** Unique key for each row. Can be a property name or a function that returns a unique identifier */
  rowKey?: keyof T | ((row: T, index: number) => string | number)
  /** Optional custom class name for the table container */
  className?: string
  /** Optional custom class name for the table element */
  tableClassName?: string
  /** Optional aria-label for the table */
  ariaLabel?: string
}

/**
 * Generic table component with pagination support
 * 
 * @template T - Type of data objects to display
 * 
 * @example
 * ```tsx
 * const columns: TableColumn<User>[] = [
 *   { label: 'Name', accessor: 'name' },
 *   { label: 'Email', accessor: 'email' }
 * ];
 * 
 * <Table
 *   data={users}
 *   columns={columns}
 *   pageSize={10}
 *   rowKey="id"
 *   emptyMessage="Nenhum usuário encontrado"
 * />
 * ```
 */
export const Table = <T,>({
  data,
  columns,
  pageSize,
  emptyMessage = 'Nenhum dado disponível',
  rowKey,
  className,
  tableClassName,
  ariaLabel = 'Data table',
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = pageSize ? Math.ceil(data.length / pageSize) : 1

  const pagedData = useMemo(() => {
    if (!pageSize) return data

    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize])

  const getRowKey = (row: T, index: number): string | number => {
    if (rowKey) {
      if (typeof rowKey === 'function') {
        return rowKey(row, index)
      }
      const keyValue = row[rowKey]
      if (keyValue !== undefined && keyValue !== null) {
        return String(keyValue)
      }
    }
    return index
  }

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.tableWrapper}>
        <table
          className={cn(styles.table, tableClassName)}
          role="table"
          aria-label={ariaLabel}
        >
          <caption className="sr-only">
            Table displaying {data.length} {data.length === 1 ? 'item' : 'items'}
          </caption>
          <thead className={styles.thead}>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={cn(styles.cell, styles.headerCell)}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className={styles.emptyCell}>
                  <span className="text-gray">{emptyMessage}</span>
                </td>
              </tr>
            )}

            {pagedData.map((row, rowIndex) => {
              const key = getRowKey(row, rowIndex)
              return (
                <tr key={key} className={styles.row}>
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(styles.cell, styles.bodyCell)}
                    >
                      {col.render
                        ? col.render(row[col.accessor], row, rowIndex)
                        : String(row[col.accessor])}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {pageSize && totalPages > 1 && (
        <div className={styles.paginatorWrapper}>
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

const styles = {
  container: `flex flex-col gap-4`,
  tableWrapper: `overflow-x-auto bg-white border border-gray rounded-sm`,
  table: `w-full`,
  thead: `bg-light-green border-b border-gray`,
  cell: `px-8 w-[200px] h-[50px] text-dark text-left`,
  headerCell: `text-16-semi h-[40px]`,
  bodyCell: `text-14`,
  row: `hover:opacity-70 transition-opacity duration-200`,
  emptyCell: `text-center py-4`,
  paginatorWrapper: `flex justify-end`,
} as const