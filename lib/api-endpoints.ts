export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  SYSTEM: {
    METRICS: "/system/metrics",
    LOGS: "/system/logs",
  },
  
  // Thêm các nhóm khác tại đây
} as const;

export type ApiEndpoints = typeof ENDPOINTS;