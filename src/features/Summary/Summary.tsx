import React from "react";
import MetricBar from "./MetricBar";
import networkData from "../../data/performing_networks.json";
import NetworkChip from "./NetworkChip";
import { type NetworkKey, type MetricValues } from "./ColorScheme";
import "./styles.css";

const Summary: React.FC = () => {
  const metrics: Record<string, MetricValues> =
    networkData.data[0].networkMetrics;

  const legendKeys: NetworkKey[] = [
    "search",
    "search_partners",
    "content",
    "youtube",
    "mixed",
  ];

  return (
    <div className="white-container">
      <h2 className="summary-title">
        Summary of how your ads are performing on these networks
      </h2>

      <div className="legend-row">
        {legendKeys.map((k) => (
          <NetworkChip key={k} network={k} variant="legend" />
        ))}
      </div>

      <div className="metrics-list">
        {Object.entries(metrics).map(([metricName, values]) => (
          <MetricBar key={metricName} title={metricName} values={values} />
        ))}
      </div>
    </div>
  );
};

export default Summary;