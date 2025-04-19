import { TableColumn } from "@/types/ui";

type GenericTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
};

export default <T,>({ data, columns }: GenericTableProps<T>) => (
  <div className="overflow-x-auto bg-white border-1 border-gray rounded-sm min-w-[600px]">
    <table className="w-full">
      <thead className="bg-light-green border-b border-gray">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="text-16-semi py-3 px-5 text-dark text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:opacity-70 transition-opacity duration-200">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="py-3 px-5 text-14 text-dark">
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
);
