import axios from "axios";

const getBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/$/, "");
  }
  return "http://localhost:8000/api";
};

export const axiosClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  // Normalize double /api/ if user supplies /api/design-spec or design-spec
  if (config.url) {
    const base = getBaseUrl();
    config.baseURL = base;
    if (config.url.startsWith("/api/")) {
      config.url = config.url.replace(/^\/api/, "");
    }
  }
  return config;
});

export default axiosClient;
