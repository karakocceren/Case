import React from 'react'
import BarChart from '../../components/BarChart/BarChart';
import trafficData from "../../data/Traffic_acquisition.json";

const TrafficBarChart: React.FC = () => {
  return (
    <BarChart
      title="Users by Session default channel group"
      subtitle="Clipped at 500"
      data={trafficData.data.trafficBarMetrics}
      maxValue={500}
    />
  )
}

export default TrafficBarChart