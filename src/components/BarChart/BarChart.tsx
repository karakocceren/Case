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
  subtitle?: string;
  data: { dimensionValue: string; metricValue: number }[];
  maxValue?: number;
};

const BarChart: React.FC<BarChartProps> = ({
  title,
  subtitle,
  data,
  maxValue = 500,
}) => {
  const labels = data.map((d) => d.dimensionValue);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Traffic",
        data: data.map((d) => Math.min(d.metricValue, maxValue)),
        backgroundColor: "turquoise",
        borderRadius: { topRight: 10, bottomRight: 10 },
        borderSkipped: "start",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: maxValue,
        ticks: { stepSize: 100 },
      },
      y: {
        ticks: { color: "#333" },
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-header">
        <h2 className="bar-chart-title">{title}</h2>
        {subtitle && <p className="bar-chart-subtitle">{subtitle}</p>}
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart