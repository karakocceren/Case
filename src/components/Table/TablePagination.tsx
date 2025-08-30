import React from "react";

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  totalRows: number;
  rowsPerPage: number;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalRows,
  rowsPerPage,
}) => {
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  return (
    <div className="pagination">
      <span>
        Jump to Page:
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </span>
      <span>
        {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, totalRows)} of {totalRows}
      </span>
    </div>
  );
};

export default TablePagination;
