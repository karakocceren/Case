import React, { useState } from "react";
import { getNetworkMeta, type MetricValues, type NetworkKey } from "./ColorScheme";
import NetworkChip from "./NetworkChip";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import "./styles.css";

type MetricBarProps = {
  title: string;
  values: MetricValues;
};

const NETWORK_ORDER: NetworkKey[] = [
  "search",
  "search_partners",
  "content",
  "youtube",
  "mixed",
];

const MIN_WIDTH_PERCENT = 1;

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const MetricBar: React.FC<MetricBarProps> = ({ title, values }) => {
  const [open, setOpen] = useState(true);

  const networks = Object.entries(values) as [NetworkKey, number][];
  networks.sort(
    ([a], [b]) => NETWORK_ORDER.indexOf(a) - NETWORK_ORDER.indexOf(b)
  );

  const normalized = networks.map(([network, raw]) => ({
    network,
    raw,
  }));

  return (
    <div className="metric-bar">
      <div className="metric-header" onClick={() => setOpen((p) => !p)}>
        <span className="metric-title">{capitalizeFirstLetter(title)}</span>
        {open ? (
          <ChevronDownIcon className="arrow-icon" />
        ) : (
          <ChevronUpIcon className="arrow-icon" />
        )}
      </div>

      {open && (
        <div className="metric-content">
          <div className="bar" role="img" aria-label={`${title} distribution`}>
            {normalized.map(({ network, raw }) => {
              if (raw <= 0) return null;
              const meta = getNetworkMeta(network);
              return (
                <div
                  key={network}
                  className="bar-segment"
                  style={{
                    width: `${Math.max(raw, MIN_WIDTH_PERCENT)}%`,
                    backgroundColor: meta.color,
                  }}
                  title={`${meta.label}: ${raw}`}
                />
              );
            })}
          </div>

          <div className="chips-row">
            {normalized.map(({ network, raw }) => (
              <NetworkChip key={network} network={network} value={raw} variant="bar" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricBar;