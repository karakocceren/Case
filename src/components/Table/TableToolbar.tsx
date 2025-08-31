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
  children,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (filterButtonRef.current && filterPopupOpen) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.bottom + 4, left: rect.left });
    }
  }, [filterPopupOpen]);

  return (
    <div className="table-actions">
      <div className="filter-container">
        <button
          className="filter-btn"
          ref={filterButtonRef}
          onClick={onFilterClick}
        >
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
          onClick={onViewOptionsClick}
        >
          <LayoutThreeColumns className="icon" />
        </button>
      </div>

      {filterPopupOpen && children &&
        createPortal(
          <div
            className="filter-popup"
            ref={popupRef}
            style={{
              position: "fixed",
              top: popupPos.top,
              left:
                window.innerWidth <= 768
                  ? "50%"
                  : popupPos.left -
                    (popupRef.current?.offsetWidth ?? 320) +
                    filterButtonRef.current!.offsetWidth,
              transform:
                window.innerWidth <= 768 ? "translateX(-50%)" : "none",
              zIndex: 1000,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};

export default TableToolbar;
