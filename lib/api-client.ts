import { prepareBody } from "./api-utils";

const BASE_URL = process.env.API_URL || "https://localhost:7226";

interface ApiOptions extends RequestInit {
  withAuth?: boolean; // Cờ điều khiển việc gửi Token, mặc định là true
}

export const api = {
  async request(endpoint: string, options: ApiOptions = {}) {
    const { withAuth = true, body, ...fetchOptions } = options;
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    // Sử dụng Util để xử lý Body và Headers liên quan
    const { formattedBody, headers: bodyHeaders } = prepareBody(body);

    const headers = new Headers(fetchOptions.headers);
    headers.set("Accept", "application/json");
    
    // Merge headers từ utility (ví dụ Content-Type)
    Object.entries(bodyHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    if (withAuth && token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      body: formattedBody,
    });

    // Xử lý lỗi 401 tập trung
    if (response.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      // Tránh redirect vòng lặp nếu đang ở trang login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return response;
  },

  get: (url: string, opts?: ApiOptions) => api.request(url, { ...opts, method: "GET" }),
  
  post: (url: string, body: any, opts?: ApiOptions) => 
    api.request(url, { ...opts, method: "POST", body }),
    
  put: (url: string, body: any, opts?: ApiOptions) => 
    api.request(url, { ...opts, method: "PUT", body }),
    
  patch: (url: string, body: any, opts?: ApiOptions) => 
    api.request(url, { ...opts, method: "PATCH", body }),
    
  delete: (url: string, opts?: ApiOptions) => 
    api.request(url, { ...opts, method: "DELETE" }),
};