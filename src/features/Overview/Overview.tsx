import React, { useState, useMemo } from "react";
import AdItem from "./AdItem";
import adsData from "../../data/ads_overview.json";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import "./styles.css";

const Overview: React.FC = () => {
  const [interval, setInterval] = useState("30");

  const filteredAds = useMemo(() => {
    const days = parseInt(interval, 10);
    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() - days);

    return adsData.data.data.filter((ad) => {
      const start = new Date(ad.dateStart);
      const stop = new Date(ad.dateStop);

      return start <= today && stop >= cutoff;
    });
  }, [interval]);

  return (
    <div className="white-container">
      <h2 className="overview-title">Ads Overview</h2>

      <div className="select-wrapper">
        <select
          className="select"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
        <ChevronDownIcon className="chevron-icon" />
      </div>

      <div className="item-list">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad, idx) => <AdItem key={idx} ad={ad} />)
        ) : (
          <p>No data for selected interval.</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
