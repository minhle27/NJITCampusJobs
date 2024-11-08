import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter?: React.ReactNode;
  pageCount: number;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filter,
  pageCount,
  pagination,
  setPagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: pageCount,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center py-4">{filter}</div>

      <div className="rounded-md border max-h-[500px] overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-4 mt-5 ml-auto">
        <div className="flex items-center gap-2">
          <Label htmlFor="pageSize" className="text-gray-700 font-medium">
            Rows per page:
          </Label>
          <select
            id="pageSize"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="outline">
            Previous
          </Button>

          <span className="text-gray-700 font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {pageCount}
          </span>

          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
