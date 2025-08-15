import 'react';
import PropTypes from 'prop-types';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const DisplayTable = ({ data = [], columns, isLoading }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto scrollbarCustom">
        <table className='w-full min-w-[600px] border-collapse'>
          <thead className='bg-slate-100'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th className='p-3 font-semibold text-left text-slate-600'>Sr.No</th>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='p-3 font-semibold text-left text-slate-600 whitespace-nowrap'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-6 text-center">
                  <div className="text-slate-500">Loading...</div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-6 text-center">
                  <div className="text-slate-500">No data available.</div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className='p-3 text-slate-700'>{index + 1}</td>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='p-3 text-slate-700 whitespace-nowrap'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Define PropTypes for the component
DisplayTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default DisplayTable;
