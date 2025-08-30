import React from "react";
import { getNetworkMeta, type NetworkKey } from "./ColorScheme";
import "./styles.css";

type Props = {
  network: NetworkKey;
  value?: number;
  variant?: "legend" | "bar";
};

const NetworkChip: React.FC<Props> = ({
  network,
  value = 0,
  variant = "bar",
}) => {
  const meta = getNetworkMeta(network);

  return (
    <div className={`chip ${variant === "legend" ? "legend" : "equal"}`}>
      <span
        className="chip-color"
        style={{ backgroundColor: meta.color }}
        aria-hidden
      />
      {variant === "legend" ? (
        <span className="chip-label">{meta.label}</span>
      ) : (
        <span className="chip-value">
          {value}
        </span>
      )}
    </div>
  );
};

export default NetworkChip;
