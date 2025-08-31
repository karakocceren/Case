import React, { useState } from "react";
import { CloudArrowDownFill } from "react-bootstrap-icons";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./Table.css";

type TableDownloadProps = {
  columns: string[];
  rows: (string | number)[][];
};

const TableDownload: React.FC<TableDownloadProps> = ({ columns, rows }) => {
  const [showMenu, setShowMenu] = useState(false);

  const downloadCSV = () => {
    const delimiter = ";";

    const csvRows = [
      columns.join(delimiter),
      ...rows.map((row) =>
        row
          .map((cell) => {
            if (typeof cell === "number" && cell % 1 !== 0) {
              return `" ${cell}"`;
            }
            return `"${cell}"`;
          })
          .join(delimiter)
      ),
    ].join("\r\n");

    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "table-data.csv";
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };


  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns],
      body: rows.map((r) => r.map((c) => String(c))),
      startY: 10,
    });
    doc.save("table-data.pdf");
    setShowMenu(false);
  };

  return (
    <div className="download-container" style={{ position: "relative" }}>
      <button
        className="icon-btn"
        onClick={() => setShowMenu(!showMenu)}
        title="Download"
      >
        <CloudArrowDownFill className="icon" />
      </button>
      {showMenu && (
        <div className="download-menu">
          <button onClick={downloadPDF}>PDF</button>
          <button onClick={downloadCSV}>CSV</button>
        </div>
      )}
    </div>
  );
};

export default TableDownload;
