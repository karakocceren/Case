import React from "react";
import type { Column, Filter } from "./Table";
import { PlusLg, TrashFill, XLg } from "react-bootstrap-icons";
import "./TableFilter.css";

type TableFilterProps = {
  columns: Column[];
  newFilter: Filter;
  setNewFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filters: Filter[];
  addFilter: () => void;
  removeFilter: (index: number) => void;
  removeAllFilters: () => void;
};

const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  newFilter,
  setNewFilter,
  filters,
  addFilter,
  removeFilter,
  removeAllFilters,
}) => {
  const operatorOptions: Filter["operator"][] = [
    "equals",
    "contains",
    "startsWith",
    "endsWith",
  ];

  const capitalizeWords = (str: string) => {
    const withSpaces = str.replace(/([A-Z])/g, " $1").trim();
    return withSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="table-filter-popup">
      <div className="inputs-row">
        <div>
          <label>Column</label>
          <select
            value={newFilter.column}
            onChange={(e) =>
              setNewFilter({ ...newFilter, column: e.target.value })
            }
          >
            {columns.map((col, i) => (
              <option key={i} value={col.name}>
                {col.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Operator</label>
          <select
            value={newFilter.operator}
            onChange={(e) =>
              setNewFilter({
                ...newFilter,
                operator: e.target.value as Filter["operator"],
              })
            }
          >
            {operatorOptions.map((op) => (
              <option key={op} value={op}>
                {capitalizeWords(op)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Value</label>
          <input
            type="text"
            value={newFilter.value}
            onChange={(e) =>
              setNewFilter({ ...newFilter, value: e.target.value })
            }
            placeholder="Enter value"
          />
        </div>
      </div>

      <div className="active-filters">
        {filters.length === 0 ? (
          <p>No filters applied</p>
        ) : (
          filters.map((filter, i) => (
            <div key={i} className="filter-row">
              <button onClick={() => removeFilter(i)}>
                <XLg />
              </button>
              <select disabled>
                <option>{filter.column}</option>
              </select>
              <select disabled>
                <option>{capitalizeWords(filter.operator)}</option>
              </select>
              <input disabled value={filter.value} />
            </div>
          ))
        )}
      </div>

      <hr />

      <div className="buttons-row">
        <button onClick={addFilter}>
          <PlusLg /> ADD FILTER
        </button>
        <button onClick={removeAllFilters}>
          <TrashFill /> REMOVE ALL
        </button>
      </div>
    </div>
  );
};

export default TableFilter;
