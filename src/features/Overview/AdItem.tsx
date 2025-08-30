import React from "react";
import "./styles.css";

type AdData = {
  dateStart: string;
  dateStop: string;
  spend: string;
  adName: string;
  impressions: string;
};

const AdItem: React.FC<{ ad: AdData }> = ({ ad }) => {
  return (
    <div className="ad-item">
      <strong>{ad.adName}</strong>
      <div className="content">
        <p>Impressions: {Number(ad.impressions).toLocaleString()}</p>
        <p>Spend: {Number(ad.spend).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default AdItem;
