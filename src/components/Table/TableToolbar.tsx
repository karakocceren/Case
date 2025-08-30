import React from "react";
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

type TableToolbarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const TableToolbar: React.FC<TableToolbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="table-actions">
      <div className="search-box">
        <MagnifyingGlassIcon className="icon" />
        <input
          type="text"
          placeholder="Search…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="table-icons">
        <button title="Filter">
          <FunnelIcon className="icon" />
        </button>
        <button title="Download">
          <ArrowDownTrayIcon className="icon" />
        </button>
        <button title="View Options">
          <DotsHorizontalIcon className="icon" />
        </button>
      </div>
    </div>
  );
};

export default TableToolbar;
