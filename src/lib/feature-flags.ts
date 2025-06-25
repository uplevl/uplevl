const FEATURE_FLAGS = {
  DASHBOARD_ACCESS: "dashboard-access",
} as const;

export type FeatureFlag = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];

export default FEATURE_FLAGS;
