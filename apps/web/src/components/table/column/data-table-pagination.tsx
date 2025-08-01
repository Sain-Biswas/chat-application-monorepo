import { cn } from "@/web/lib/utils";
import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  showSelected?: boolean;
}

export function DataTablePagination<TData>({
  table,
  showSelected = false,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {showSelected && (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length}
          {" "}
          of
          {" "}
          {table.getFilteredRowModel().rows.length}
          {" "}
          row(s) selected.
        </div>
      )}
      <div className={cn("flex items-center space-x-6 lg:space-x-8", !showSelected && "w-full justify-between")}>
        <div className="flex items-center space-x-2">
          <p className="sm:text-sm text-xs font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex w-[100px] items-center justify-center sm:text-sm text-xs font-medium">
            Page
            {" "}
            {table.getState().pagination.pageIndex + 1}
            {" "}
            of
            {" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
