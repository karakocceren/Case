export type NetworkKey =
  | "search"
  | "search_partners"
  | "content"
  | "youtube"
  | "mixed";

export type MetricValues = Record<NetworkKey, number>;

export const NETWORK_META: Record<
  NetworkKey,
  { label: string; color: string }
> = {
  search: { label: "Google search", color: "#4285F4" },
  search_partners: { label: "Search partners", color: "#9B59B6" },
  content: { label: "Content", color: "#F39C12" },
  youtube: { label: "YouTube", color: "#E74C3C" },
  mixed: { label: "Cross-network", color: "#27AE60" },
};

export const getNetworkMeta = (key: NetworkKey) => NETWORK_META[key];