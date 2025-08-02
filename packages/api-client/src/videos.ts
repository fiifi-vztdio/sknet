import type { Video, SearchFilters, PaginationInfo } from "@sports-talent/types"
import type { ApiClient } from "./base"

export interface VideoUploadData {
  title: string
  description?: string
  tags: string[]
  visibility: "public" | "unlisted" | "private" | "scouts_only"
  file: File
}

export interface VideosResponse {
  videos: Video[]
  pagination: PaginationInfo
}

export class VideosApi {
  constructor(private client: ApiClient) {}

  async getVideos(filters?: SearchFilters & { page?: number; limit?: number }) {
    return this.client.get<VideosResponse>("/videos", filters)
  }

  async getVideo(id: string) {
    return this.client.get<Video>(`/videos/${id}`)
  }

  async uploadVideo(data: VideoUploadData) {
    const formData = new FormData()
    formData.append("file", data.file)
    formData.append("title", data.title)
    if (data.description) formData.append("description", data.description)
    formData.append("tags", JSON.stringify(data.tags))
    formData.append("visibility", data.visibility)

    // Override content type for multipart/form-data
    return this.client.post<{ videoId: string; uploadUrl: string }>("/videos/upload", formData)
  }

  async updateVideo(id: string, updates: Partial<Video>) {
    return this.client.put<Video>(`/videos/${id}`, updates)
  }

  async deleteVideo(id: string) {
    return this.client.delete(`/videos/${id}`)
  }

  async likeVideo(id: string) {
    return this.client.post(`/videos/${id}/like`)
  }

  async unlikeVideo(id: string) {
    return this.client.delete(`/videos/${id}/like`)
  }

  async getVideoComments(id: string, page = 1, limit = 20) {
    return this.client.get(`/videos/${id}/comments`, { page, limit })
  }

  async addComment(videoId: string, content: string) {
    return this.client.post(`/videos/${videoId}/comments`, { content })
  }

  async getTrendingVideos(region?: string) {
    return this.client.get<Video[]>("/videos/trending", region ? { region } : undefined)
  }

  async getRecommendedVideos(userId: string) {
    return this.client.get<Video[]>(`/videos/recommended/${userId}`)
  }
}
