/**
 * Type Definitions
 * Centralized type definitions for the application
 */

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Sort configuration
export type SortDirection = "asc" | "desc";

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

// Filter types
export interface FilterConfig {
  search?: string;
  [key: string]: string | number | boolean | undefined;
}

// Component props types
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface LoadingStateProps {
  rows?: number;
  columns?: number;
}

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}
