import type { VideoMetadata } from "@sports-talent/types"

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export const formatFileSize = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB"]
  if (bytes === 0) return "0 Bytes"

  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}

export const getVideoQuality = (metadata: VideoMetadata): "low" | "medium" | "high" | "ultra" => {
  const [width, height] = metadata.resolution.split("x").map(Number)
  const pixels = width * height

  if (pixels >= 1920 * 1080) return "ultra"
  if (pixels >= 1280 * 720) return "high"
  if (pixels >= 854 * 480) return "medium"
  return "low"
}

export const generateThumbnailUrl = (videoUrl: string, timestamp = 0): string => {
  // This would integrate with your video processing service
  const baseUrl = videoUrl.replace(/\.[^/.]+$/, "")
  return `${baseUrl}_thumb_${timestamp}.jpg`
}

export const validateVideoFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 100 * 1024 * 1024 // 100MB
  const allowedTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"]

  if (file.size > maxSize) {
    return { valid: false, error: "File size exceeds 100MB limit" }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Invalid file type. Please upload MP4, MOV, or AVI files." }
  }

  return { valid: true }
}
