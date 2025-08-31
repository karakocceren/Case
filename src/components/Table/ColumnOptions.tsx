import React from "react";
import type { Column } from "./Table";
import "./ColumnOptions.css";

type ColumnOptionsProps = {
  columns: Column[];
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

const ColumnOptions: React.FC<ColumnOptionsProps> = ({
  columns,
  columnVisibility,
  setColumnVisibility,
}) => {
  const toggleColumn = (columnName: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  return (
    <>
      {columns.map((col) => (
        <div key={col.name} className="column-option-row">
          <label>
            <input
              type="checkbox"
              checked={columnVisibility[col.name]}
              onChange={() => toggleColumn(col.name)}
            />
            {col.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ColumnOptions;
