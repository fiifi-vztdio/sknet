import type { MLAnalysisResult, UserRole } from "./someModule" // Assuming these are imported from another module

export interface Video {
  id: string
  title: string
  description?: string
  url: string
  thumbnailUrl: string
  duration: number
  uploaderId: string
  uploaderType: "athlete" | "scout" | "coach"
  createdAt: Date
  updatedAt: Date
  status: VideoStatus
  visibility: VideoVisibility
  metadata: VideoMetadata
  analytics: VideoAnalytics
  mlResults?: MLAnalysisResult
}

export type VideoStatus = "uploading" | "processing" | "ready" | "failed" | "archived"
export type VideoVisibility = "public" | "unlisted" | "private" | "scouts_only"

export interface VideoMetadata {
  fileSize: number
  resolution: string
  fps: number
  codec: string
  bitrate: number
  location?: GeoLocation
  tags: string[]
  skills: SkillTag[]
  equipment?: string
  weather?: WeatherCondition
}

export interface VideoAnalytics {
  views: number
  likes: number
  comments: number
  shares: number
  watchTime: number
  engagement: number
  demographics: ViewerDemographics
}

export interface ViewerDemographics {
  ageGroups: Record<string, number>
  regions: Record<string, number>
  userTypes: Record<UserRole, number>
}

export interface SkillTag {
  skill: string
  confidence: number
  timestamp: number
  boundingBox?: BoundingBox
}

export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface GeoLocation {
  latitude: number
  longitude: number
  city?: string
  country: string
}

export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "windy" | "indoor"
