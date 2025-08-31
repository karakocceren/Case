import React, { useEffect, useMemo, useRef, useState } from "react";
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
  type CellContext,
} from "@tanstack/react-table";
import TableFilter from "./TableFilter";
import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import ColumnOptions from "./ColumnOptions";
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
  operator: "equals" | "contains" | "startsWith" | "endsWith";
  value: string;
};

const formatEngagementTime = (minutesDecimal: number): string => {
  if (!isFinite(minutesDecimal) || minutesDecimal <= 0) return "0 mins, 0 secs";
  const totalSeconds = Math.round(minutesDecimal * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins} mins, ${secs} secs`;
};

const formatPercentage = (value: number): string => {
  if (!isFinite(value)) return "";
  return `${value}%`;
};

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const [filterPopupOpen, setFilterPopupOpen] = useState<boolean>(false);
  const [columnOptionsOpen, setColumnOptionsOpen] = useState<boolean>(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const columnOptionsRef = useRef<HTMLDivElement>(null);

  const rowsPerPage = 5;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterPopupOpen(false);
      }
    };
    if (filterPopupOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [filterPopupOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        columnOptionsRef.current &&
        !columnOptionsRef.current.contains(event.target as Node)
      ) {
        setColumnOptionsOpen(false);
      }
    };
    if (columnOptionsOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [columnOptionsOpen]);

  const customFilterFn = (
    row: Row<TableRow>,
    columnId: string,
    filterValue: Filter
  ): boolean => {
    const raw = row.getValue(columnId);
    const rowValue = (raw ?? "").toString();
    const needle = filterValue.value;

    switch (filterValue.operator) {
      case "equals":
        return rowValue === needle;
      case "contains":
        return rowValue.toLowerCase().includes(needle.toLowerCase());
      case "startsWith":
        return rowValue.toLowerCase().startsWith(needle.toLowerCase());
      case "endsWith":
        return rowValue.toLowerCase().endsWith(needle.toLowerCase());
      default:
        return true;
    }
  };

  const tableColumns = useMemo<ColumnDef<TableRow>[]>(
    () =>
      columns
        .filter((col) => columnVisibility[col.name])
        .map((col, index): ColumnDef<TableRow> => {
          let cell:
            | ((ctx: CellContext<TableRow, unknown>) => React.ReactNode)
            | undefined;

          if (col.name === "Average Engagement Time Per Session") {
            cell = (ctx) => formatEngagementTime(Number(ctx.getValue()));
          } else if (col.name === "Engagement Rate") {
            cell = (ctx) => formatPercentage(Number(ctx.getValue()));
          } else {
            cell = (ctx) => ctx.getValue() as React.ReactNode;
          }

          return {
            id: col.name,
            header: col.label,
            accessorFn: (row) => row[index],
            enableColumnFilter: col.options.filter,
            enableSorting: col.options.sort,
            filterFn: customFilterFn,
            cell,
          };
        }),
    [columns, columnVisibility]
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
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: { customFilter: customFilterFn },
  });

  const allRows = table.getRowModel().rows;
  const totalPages = Math.max(1, Math.ceil(allRows.length / rowsPerPage));
  const paginatedRows = allRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleFilterPopup = () => setFilterPopupOpen((prev) => !prev);

  const downloadRows = allRows.map((row) =>
    tableColumns.map((col, index) => {
      const rawValue = row.original[index];
      if (col.id === "Average Engagement Time Per Session") {
        return formatEngagementTime(Number(rawValue));
      } else if (col.id === "Engagement Rate") {
        return formatPercentage(Number(rawValue));
      }
      return rawValue ?? "";
    })
  );

  return (
    <div className="table-container">
      <TableToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterClick={toggleFilterPopup}
        onViewOptionsClick={() => setColumnOptionsOpen((prev) => !prev)}
        columns={columns.map((c) => c.label)}
        rows={downloadRows}
        filterPopupOpen={filterPopupOpen}
        columnOptionsOpen={columnOptionsOpen}
      >
        {filterPopupOpen && (
          <div ref={filterRef}>
            <TableFilter
              columns={columns}
              newFilter={newFilter}
              setNewFilter={setNewFilter}
              filters={filters}
              addFilter={() => {
                if (newFilter.value.trim() !== "") {
                  setFilters((prev) => [...prev, newFilter]);
                  setColumnFilters((prev) => [
                    ...prev,
                    { id: newFilter.column, value: newFilter },
                  ]);
                  setNewFilter({ ...newFilter, value: "" });
                  setCurrentPage(1);
                }
              }}
              removeFilter={(index: number) => {
                const toRemove = filters[index];
                setFilters((prev) => prev.filter((_, i) => i !== index));
                setColumnFilters((prev) =>
                  prev.filter((f) => f.id !== toRemove.column)
                );
                setCurrentPage(1);
              }}
              removeAllFilters={() => {
                setFilters([]);
                setColumnFilters([]);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        {columnOptionsOpen && (
          <div ref={columnOptionsRef}>
            <ColumnOptions
              columns={columns}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
            />
          </div>
        )}
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length}
                  style={{ textAlign: "center" }}
                >
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
        totalRows={allRows.length}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default Table;
