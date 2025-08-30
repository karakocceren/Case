import React, { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import "./Table.css";

type Column = {
  name: string;
  label: string;
  options: {
    filter: boolean;
    sort: boolean;
    display: boolean;
  };
};

type TableProps = {
  columns: Column[];
  rows: (string | number)[][];
};

type TableRow = (string | number)[];

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const tableColumns = useMemo<ColumnDef<TableRow>[]>(
    () =>
      columns
        .filter((col) => col.options.display)
        .map((col, i) => ({
          header: col.label,
          accessorFn: (row: TableRow) => row[i],
        })),
    [columns]
  );

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: {
      globalFilter: searchQuery,
    },
    onGlobalFilterChange: setSearchQuery,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = table.getRowModel().rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="table-container">
      <TableToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " ▲",
                      desc: " ▼",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalRows={rows.length}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default Table;
