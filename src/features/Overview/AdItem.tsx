import React from "react";
import "./styles.css";

type AdData = {
  dateStart: string;
  dateStop: string;
  spend: string;
  adName: string;
  impressions: string;
};

function formatNumber(value: number): string {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(2) + "k";
  return value.toFixed(2);
}

const AdItem: React.FC<{ ad: AdData }> = ({ ad }) => {
  const impressions = formatNumber(parseFloat(ad.impressions));
  const spend = formatNumber(parseFloat(ad.spend));

  return (
    <div className="ad-item">
      <strong>{ad.adName}</strong>
      <div className="content">
        <p>Impressions: {impressions}</p>
        <p>Spend: {spend}</p>
      </div>
    </div>
  );
};

export default AdItem;
