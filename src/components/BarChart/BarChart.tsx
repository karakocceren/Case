import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type BarChartProps = {
  title: string;
  data: { dimensionValue: string; metricValue: number }[];
  maxValue?: number;
};

const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  maxValue = 500,
}) => {
  const labels = data.map((d) => d.dimensionValue);

  const rawValues = data.map((d) => d.metricValue);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Traffic",
        data: data.map((d) => Math.min(d.metricValue, maxValue)),
        backgroundColor: "#2ccce4",
        borderRadius: { topRight: 10, bottomRight: 10 },
        borderSkipped: "start",
        categoryPercentage: 0.7,
        barPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const rawValue = rawValues[index];
            return `${context.dataset.label || ""}: ${rawValue}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: maxValue,
        ticks: { stepSize: 50 },
        grid: {
          drawTicks: true,
          drawOnChartArea: true,
          color: "#ddd",
        },
      },
      y: {
        ticks: { color: "#333" },
        grid: {
          drawTicks: false,
          drawOnChartArea: false,
          color: "transparent",
        },
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-header">
        <div className="bar-chart-title">{title}</div>
      </div>
      <Bar
        data={chartData}
        options={options}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default BarChart;
