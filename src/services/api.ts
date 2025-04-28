
import { toast } from "@/hooks/use-toast";

// Update this with your actual backend URL
const API_BASE_URL = "https://se2group6-backend-1.onrender.com";

// Generic fetch function with error handling
async function fetchFromAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    // Make sure endpoint starts with a slash if it doesn't already
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${formattedEndpoint}`;
    
    console.log(`Fetching from: ${url}`);
    
    // Default headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    
    // Include auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Something went wrong",
      variant: "destructive",
    });
    throw error;
  }
}

// API services for different entities
export const franchiseService = {
  getAllFranchises: () => fetchFromAPI<any[]>("/franchises"),
  getFranchiseById: (id: string) => fetchFromAPI<any>(`/franchises/${id}`),
};

export const salesService = {
  getSalesData: (params?: { timeFrame?: string; location?: string }) => {
    const queryParams = params ? new URLSearchParams(params as any).toString() : "";
    return fetchFromAPI<any>(`/sales${queryParams ? `?${queryParams}` : ""}`);
  },
  getFranchisePerformance: () => fetchFromAPI<any[]>("/sales/franchise-performance"),
};

export const bookingsService = {
  getRecentBookings: () => fetchFromAPI<any[]>("/bookings/recent"),
  getTicketStats: () => fetchFromAPI<any>("/bookings/ticket-stats"),
};

export const notificationsService = {
  getAllNotifications: () => fetchFromAPI<any[]>("/notifications"),
  createNotification: (data: any) => fetchFromAPI<any>("/notifications", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateNotification: (id: string, data: any) => fetchFromAPI<any>(`/notifications/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  deleteNotification: (id: string) => fetchFromAPI<void>(`/notifications/${id}`, {
    method: "DELETE",
  }),
};

export const authService = {
  login: (credentials: { email: string; password: string }) => 
    fetchFromAPI<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  },
  getCurrentUser: () => fetchFromAPI<any>("/auth/me"),
};
