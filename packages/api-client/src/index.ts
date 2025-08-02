import { ApiClient } from "./base"
import { AuthApi } from "./auth"
import { VideosApi } from "./videos"

export * from "./base"
export * from "./auth"
export * from "./videos"

export class SportsApi {
  public auth: AuthApi
  public videos: VideosApi

  constructor(baseUrl: string) {
    const client = new ApiClient({ baseUrl })

    this.auth = new AuthApi(client)
    this.videos = new VideosApi(client)
  }

  setAuthToken(token: string): void {
    // Set token for all API clients
    ;(this.auth as any).client.setAuthToken(token)
    ;(this.videos as any).client.setAuthToken(token)
  }

  removeAuthToken(): void {
    ;(this.auth as any).client.removeAuthToken()
    ;(this.videos as any).client.removeAuthToken()
  }
}

// Default instance
export const api = new SportsApi(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api")
