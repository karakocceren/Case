import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import "./Table.css";

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

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <span className="jump-to-page">
        Jump to Page:
        <div className="select-wrapper">
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="page-select"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="chevron-icon" />
        </div>
      </span>

      <span className="page-info">
        {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, totalRows)} of {totalRows}

        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="page-btn"
        >
          <ChevronLeftIcon className="icon" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="page-btn"
        >
          <ChevronRightIcon className="icon" />
        </button>
      </span>
    </div>
  );
};

export default TablePagination;
