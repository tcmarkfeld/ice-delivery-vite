import React, { useEffect, useState } from 'react';
import '../../index.css';

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
  TableMeta,
} from '@tanstack/react-table';
import { DeliveryData } from './makeData';
import service from '../../services/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: unknown,
      obj: DeliveryData,
    ) => () => void;
  }
}
const myTableMeta: TableMeta<DeliveryData> = {
  updateData:
    (_rowIndex: number, columnId: string, value: unknown, obj: DeliveryData) => async () => {
      const deliveryID = obj.id;
      delete obj.id;
      delete obj.neighborhood_name;
      delete obj.neighborhood_id;

      obj[columnId] = value;

      if (deliveryID) {
        const response = await service.update(deliveryID, obj);
        if (response.status != 200) {
          alert(`Error: Could not update value. ${response.status} ${response.data}`);
        }
      }
    },
};

// Give our default column cell renderer editing
const defaultColumn: Partial<ColumnDef<DeliveryData>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(
        index,
        id,
        value,
        table.getCoreRowModel().rows[index].original,
      );
      myTableMeta.updateData(index, id, value, table.getCoreRowModel().rows[index].original)();
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (value as string) == new Date().toISOString() ? (
      <input
        className='bg-white w-fit pl-2 pb-2 pt-2 focus:w-fit'
        value={value as string}
        type='date'
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    ) : (
      <input
        className='bg-white w-fit pl-2 pb-2 pt-2 focus:w-fit'
        value={value as string}
        type={typeof value == Date() ? 'date' : 'text'}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export default function TableTest() {
  const [data, setData] = useState<DeliveryData[]>([]);

  const getDeliveries = async () => {
    const response = await service.getAll();
    setData(response.data);
  };

  useEffect(() => {
    getDeliveries();
  }, []);

  const confirmDelete = (id: number | undefined) => {
    if (id) {
      let isExecuted = confirm('Are you sure to delete this reservation?');
      if (isExecuted == true) {
        deleteReservation(id);
      }
    }
  };

  const deleteReservation = async (id: number | undefined) => {
    if (id) {
      const response = await service.delete(id);
      if ((response.status = 200)) {
        alert('Delivery successfully deleted.');
        getDeliveries();
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  const columns = React.useMemo<ColumnDef<DeliveryData>[]>(
    () => [
      {
        header: 'All Deliveries',
        footer: (props: { column: { id: any } }) => props.column.id,
        columns: [
          {
            accessorKey: 'start_date',
            header: 'Start Date',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'end_date',
            header: 'End Date',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'customer_name',
            header: 'Customer Name',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'customer_phone',
            header: 'Customer Phone',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'delivery_address',
            header: 'Delivery Address',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'cooler_size',
            header: 'Cooler Size',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'cooler_num',
            header: '# of Coolers',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'neighborhood',
            header: 'Neighborhood',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'ice_type',
            header: 'Ice Type',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'bag_limes',
            header: 'Bags of Limes',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'customer_email',
            header: 'Customer Email',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
          {
            accessorKey: 'special_instructions',
            header: 'Special Instructions',
            footer: (props: { column: { id: any } }) => props.column.id,
          },
        ],
      },
    ],
    [data],
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) => () => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old: DeliveryData[]) =>
          old.map((row: any, index: any) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className='p-4 overflow-x-scroll h-screen bg-lightgrey'>
      <div className='h-2' />
      <table className='text-black'>
        <thead>
          {table.getHeaderGroups().map((headerGroup: { id: React.Key; headers: any[] }) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(
                (header: {
                  id: React.Key;
                  colSpan: number | undefined;
                  isPlaceholder: any;
                  column: { columnDef: { header: any }; getCanFilter: () => any };
                  getContext: () => any;
                }) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            <div>{/* <Filter column={header.column} table={table} /> */}</div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  );
                },
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: { id: React.Key; getVisibleCells: () => any[] }) => {
            return (
              <tr key={row.id}>
                {row
                  .getVisibleCells()
                  .map(
                    (cell: {
                      id: React.Key;
                      column: { columnDef: { cell: any } };
                      getContext: () => any;
                    }) => {
                      return (
                        <td key={cell.id} className='bg-grey-100 w-28'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    },
                  )}
                <button
                  onClick={() =>
                    confirmDelete(
                      table.getCoreRowModel().rows[parseInt(row.id.toString())].original.id,
                    )
                  }
                  className='bg-error-400 rounded-lg px-2 py-1 m-2'
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='h-2' />
      <div className='flex items-center gap-2 text-black'>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className='border p-1 rounded w-16 bg-white'
          />
        </span>
        <select
          className='bg-white'
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className='text-black'>{table.getRowModel().rows.length} Rows</div>
    </div>
  );
}
// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>
//   table: Table<any>
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={e => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="w-36 border shadow rounded"
//     />
//   )
// }
