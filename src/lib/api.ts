/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

// Base API URL from environment variable
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://jsonplaceholder.typicode.com";

// API Endpoints
export const API_ENDPOINTS = {
  USERS: {
    LIST: `${API_BASE_URL}/users`,
    DETAIL: (id: string | number) => `${API_BASE_URL}/users/${id}`,
  },
  // Future endpoints can be added here
  POSTS: {
    LIST: `${API_BASE_URL}/posts`,
    DETAIL: (id: string | number) => `${API_BASE_URL}/posts/${id}`,
  },
} as const;

// API Configuration
export const API_CONFIG = {
  // Default cache revalidation time (5 minutes)
  REVALIDATE_TIME: 300,
  // Request timeout
  TIMEOUT: 10000,
  // Default headers
  HEADERS: {
    "Content-Type": "application/json",
  },
} as const;

// Fetcher function for SWR with error handling
export const fetcher = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw new Error(`Failed to fetch: ${error.message}`);
    }

    throw new Error("An unknown error occurred");
  }
};

// Server-side fetcher for Server Components
export const serverFetcher = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      headers: API_CONFIG.HEADERS,
      next: { revalidate: API_CONFIG.REVALIDATE_TIME },
      ...options,
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Server fetch error:", error);
    return null;
  }
};
