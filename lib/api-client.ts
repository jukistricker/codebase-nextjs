// lib/api-client.ts
const BASE_URL = "https://localhost:7226";

export const api = {
  async post(endpoint: string, body: any) {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    return response;
  },

  // Hàm này để dùng cho các trang Dashboard sau này
  async get(endpoint: string) {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });
    if (response.status === 401) {
       localStorage.removeItem("access_token");
       window.location.href = "/login";
    }
    return response.json();
  }
};