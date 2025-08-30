import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./LineChart.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type LineChartProps = {
  title: string;
  subtitle?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

const LineChart: React.FC<LineChartProps> = ({ title, subtitle, labels, datasets }) => {
  const data: ChartData<"line"> = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      fill: false,
    })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      <div className="line-chart-header">
        <h2 className="line-chart-title">{title}</h2>
        {subtitle && <p className="line-chart-subtitle">{subtitle}</p>}
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
