export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: UserRole
  profileImage?: string
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  preferences: UserPreferences
}

export type UserRole = "athlete" | "scout" | "coach" | "federation" | "admin"

export interface UserPreferences {
  language: string
  notifications: NotificationSettings
  privacy: PrivacySettings
  theme: "light" | "dark" | "system"
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
}

export interface PrivacySettings {
  profileVisibility: "public" | "scouts_only" | "private"
  showLocation: boolean
  allowDataSharing: boolean
  allowAnalytics: boolean
}

export interface AthleteProfile extends User {
  role: "athlete"
  dateOfBirth: Date
  position: string
  club?: string
  region: string
  height?: number
  weight?: number
  dominantFoot: "left" | "right" | "both"
  experience: ExperienceLevel
  stats: AthleteStats
}

export interface ScoutProfile extends User {
  role: "scout"
  organization: string
  licenseNumber?: string
  specializations: string[]
  regions: string[]
  subscription: SubscriptionTier
}

export type ExperienceLevel = "beginner" | "amateur" | "semi_pro" | "professional"
export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise"

export interface AthleteStats {
  totalVideos: number
  totalViews: number
  totalLikes: number
  skillRating: number
  xpPoints: number
  level: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: Date
  rarity: "common" | "rare" | "epic" | "legendary"
}
