// User types
export * from "./user"

// Video types
export * from "./video"

// ML/AI types
export * from "./ml"

// API types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: PaginationInfo
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface SearchFilters {
  query?: string
  position?: string[]
  ageRange?: [number, number]
  region?: string[]
  skillLevel?: string[]
  club?: string[]
  sortBy?: "relevance" | "date" | "rating" | "views"
  sortOrder?: "asc" | "desc"
}

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
