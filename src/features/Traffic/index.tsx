import React from 'react'
import TrafficLineChart from './TrafficLineChart';
import TrafficBarChart from './TrafficBarChart';
import TrafficTable from './TrafficTable';
import "./styles.css";

const Traffic: React.FC = () => {
  return (
    <div className="white-container">
      <div className="charts-section">
        <TrafficLineChart />
        <TrafficBarChart />
      </div>
      <div className="table-section">
        <TrafficTable />
      </div>
    </div>
  );
}

export default Traffic