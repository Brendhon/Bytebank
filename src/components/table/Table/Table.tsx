'use client'

import { cn } from '@/lib/utils'
import { TableColumn } from '@/types/ui'
import { useMemo, useState } from 'react'
import Paginator from '../Paginator/Paginator'

type GenericTableProps<T> = {
  data: T[]
  columns: TableColumn<T>[]
  pageSize?: number // default: 10 - If omitted, no pagination
}

export default <T,>({
  data,
  columns,
  pageSize = 10,
}: GenericTableProps<T>) => {
  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the total number of pages
  const totalPages = pageSize ? Math.ceil(data.length / pageSize) : 1

  // Memoize the paginated data - to avoid unnecessary recalculations on every render
  const pagedData = useMemo(() => {
    // If pageSize is not defined, return all data
    if (!pageSize) return data;

    // Calculate the start index for slicing the data
    const start = (currentPage - 1) * pageSize

    // Slice the data array to get the current page data
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize])

  // Default className for the cell
  const cellClassName = 'px-8 w-[200px] h-[50px] text-dark text-left'

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto bg-white border border-gray rounded-sm">
        <table className="w-full">
          <thead className="bg-light-green border-b border-gray">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn(cellClassName, "text-16-semi h-[40px]")}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* If no data is available, show a message */}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <span className="text-gray">
                    Nenhum dado encontrado
                  </span>
                </td>
              </tr>
            )}

            {/* Render the rows */}
            {pagedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:opacity-70 transition-opacity duration-200"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn(cellClassName, "text-14")}
                  >
                    {col.render
                      ? col.render(row[col.accessor], row, rowIndex)
                      : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the paginator only if pageSize is defined and totalPages > 1 */}
      {pageSize && totalPages > 1 && (
        <div className="flex justify-end">
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