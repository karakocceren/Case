import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, Filter, LayoutThreeColumns } from "react-bootstrap-icons";
import TableDownload from "./TableDownload";
import "./Table.css";

type TableToolbarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onFilterClick: () => void;
  onViewOptionsClick: () => void;
  columns: string[];
  rows: (string | number)[][];
  filterPopupOpen: boolean;
  columnOptionsOpen?: boolean;
  children?: React.ReactNode;
};

const TableToolbar: React.FC<TableToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  onFilterClick,
  onViewOptionsClick,
  columns,
  rows,
  filterPopupOpen,
  columnOptionsOpen,
  children,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const columnButtonRef = useRef<HTMLButtonElement>(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  const calculatePopupPosition = (
    buttonRef: React.RefObject<HTMLButtonElement | null>
  ) => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    const rect = buttonRef.current.getBoundingClientRect();
    return { top: rect.bottom + window.scrollY, left: rect.right + window.scrollX };
  };

  useEffect(() => {
    if (filterPopupOpen) {
      setPopupPos(calculatePopupPosition(filterButtonRef));
    } else if (columnOptionsOpen) {
      setPopupPos(calculatePopupPosition(columnButtonRef));
    }
  }, [filterPopupOpen, columnOptionsOpen]);

  return (
    <div className="table-actions">
      <div className="filter-container">
        <button className="filter-btn" ref={filterButtonRef} onClick={onFilterClick}>
          <Filter className="icon" />
          <span>Filter</span>
        </button>
      </div>

      <div style={{ width: "1rem" }}></div>

      <div className="toolbar-icons">
        <div className="search-container">
          <button
            className="icon-btn"
            onClick={() => setShowSearch(!showSearch)}
            title="Search"
          >
            <Search className="icon" />
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          )}
        </div>

        <TableDownload columns={columns} rows={rows} />

        <button
          className="icon-btn"
          title="Layout Options"
          ref={columnButtonRef}
          onClick={onViewOptionsClick}
        >
          <LayoutThreeColumns className="icon" />
        </button>
      </div>

      {(filterPopupOpen || columnOptionsOpen) && children &&
        createPortal(
          <div
            className={filterPopupOpen ? "filter-popup" : "column-options-popup"}
            style={{
              position: "absolute",
              top: popupPos.top,
              left: window.innerWidth <= 768
                ? "50%"
                : popupPos.left,
              transform: window.innerWidth <= 768
                ? "translateX(-50%)"
                : "translateX(-100%)",
              zIndex: 1000,
              maxHeight: "80vh",
              overflowY: "auto",
              width: filterPopupOpen ? "320px" : "250px",
            }}
          >
            {children}
          </div>,
          document.body
        )
      }
    </div>
  );
};

export default TableToolbar;
