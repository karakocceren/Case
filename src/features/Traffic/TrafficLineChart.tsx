import React from "react";
import LineChart from "../../components/LineChart/LineChart";
import trafficData from "../../data/Traffic_acquisition.json";

const COLORS = ["turquoise", "purple", "pink", "green", "yellow"];

const TrafficLineChart: React.FC = () => {
  const metrics = trafficData.data.trafficDateMetrics;

  const allDates = Array.from(
    new Set(
      metrics.flatMap((m) =>
        m.metricValue.map((v: { date: string }) =>
          new Date(v.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        )
      )
    )
  ).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const globalMax = Math.max(
    ...metrics.flatMap((m) => m.metricValue.map((v: { value: number }) => v.value))
  );

  const datasets = metrics.map((dimension, idx) => ({
    label: dimension.dimensionValue,
    data: allDates.map((dateLabel) => {
      const found = dimension.metricValue.find(
        (m: { date: string; value: number }) =>
          new Date(m.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }) === dateLabel
      );
      return found ? (found.value / globalMax) * 100 : 0;
    }),
    borderColor: COLORS[idx % COLORS.length],
    backgroundColor: COLORS[idx % COLORS.length],
  }));

  return (
    <LineChart
      title="Traffic acquisition: Session default channel group"
      subtitle="Users by Session default channel group over time"
      labels={allDates}
      datasets={datasets}
    />
  );
};

export default TrafficLineChart;
