import React from "react";
import Table from "../../components/Table/Table";
import trafficData from "../../data/Traffic_acquisition.json";

const TrafficTable: React.FC = () => {
  return (
    <Table
      columns={trafficData.data.reportMetrics.columns}
      rows={trafficData.data.reportMetrics.rows}
    />
  );
};

export default TrafficTable;
