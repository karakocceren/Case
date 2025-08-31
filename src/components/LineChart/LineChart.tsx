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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type LineChartProps = {
  subtitle?: string;
  labels: string[];
  datasets: {
    label: string;
    data: { x: string; y: number; original: number }[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

const LineChart: React.FC<LineChartProps> = ({ subtitle, labels, datasets }) => {
  const data: ChartData<"line", { x: string; y: number; original: number }[]> = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      tension: 0,
      pointRadius: 2,
      pointHoverRadius: 4,
      borderWidth: 2,
      fill: false,
    })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      tooltip: {
        callbacks: {
          label: function (context) {
            const raw = context.raw as { x: string; y: number; original: number };
            return `${context.dataset.label}: ${raw.original}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            if (Number(value) % 10 === 0) {
              return value;
            }
          },
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      {subtitle && <div className="line-chart-subtitle">{subtitle}</div>}
      <Line
        data={data}
        options={options}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default LineChart;
