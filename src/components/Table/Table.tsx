import React, { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type VisibilityState,
  type Row,
} from "@tanstack/react-table";
import TableFilter from "./TableFilter";
import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import "./Table.css";

export type Column = {
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

export type Filter = {
  column: string;
  operator: string;
  value: string;
};

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    Object.fromEntries(columns.map((c) => [c.name, c.options.display]))
  );
  const [newFilter, setNewFilter] = useState<Filter>({
    column: columns.length > 0 ? columns[0].name : "",
    operator: "contains",
    value: "",
  });
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);

  const rowsPerPage = 5;

  const customFilterFn = (row: Row<TableRow>, columnId: string, filterValue: Filter) => {
    const rowValue = row.getValue(columnId)?.toString() ?? "";
    const { operator, value } = filterValue;

    switch (operator) {
      case "equals":
        return rowValue === value;
      case "contains":
        return rowValue.toLowerCase().includes(value.toLowerCase());
      case "startsWith":
        return rowValue.toLowerCase().startsWith(value.toLowerCase());
      case "endsWith":
        return rowValue.toLowerCase().endsWith(value.toLowerCase());
      default:
        return true;
    }
  };

  const tableColumns = useMemo<ColumnDef<TableRow>[]>(
    () =>
      columns
        .filter((col) => col.options.display)
        .map((col, i) => ({
          id: col.name,
          header: col.label,
          accessorFn: (row: TableRow) => row[i],
          enableColumnFilter: col.options.filter,
          filterFn: customFilterFn,
        })),
    [columns]
  );

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: {
      globalFilter: searchQuery,
      columnFilters,
      columnVisibility,
    },
    onGlobalFilterChange: setSearchQuery,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    filterFns: {
      customFilter: customFilterFn,
    },
  });

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = table.getRowModel().rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleFilterPopup = () => setFilterPopupOpen((prev) => !prev);

  const addFilter = () => {
    if (newFilter.value.trim() !== "") {
      setFilters([...filters, newFilter]);
      setColumnFilters((prev) => [
        ...prev,
        { id: newFilter.column, value: newFilter },
      ]);
      setNewFilter({
        ...newFilter,
        value: "",
      });
    }
  };

  const removeFilter = (index: number) => {
    const filterToRemove = filters[index];
    setFilters(filters.filter((_, i) => i !== index));
    setColumnFilters((prev) => prev.filter((f) => f.id !== filterToRemove.column));
  };

  const removeAllFilters = () => {
    setFilters([]);
    setColumnFilters([]);
  };

  return (
    <div className="table-container">
      <TableToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterClick={toggleFilterPopup}
        onViewOptionsClick={() => {}}
        columns={columns.map((c) => c.label)}
        rows={rows}
        filterPopupOpen={filterPopupOpen}
      >
        <TableFilter
          columns={columns}
          newFilter={newFilter}
          setNewFilter={setNewFilter}
          filters={filters}
          addFilter={addFilter}
          removeFilter={removeFilter}
          removeAllFilters={removeAllFilters}
        />
      </TableToolbar>

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
                    {{ asc: " ▲", desc: " ▼" }[header.column.getIsSorted() as string] ?? null}
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
