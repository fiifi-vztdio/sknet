import type { User, UserRole } from "@sports-talent/types"
import type { ApiClient } from "./base"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
  role: UserRole
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export class AuthApi {
  constructor(private client: ApiClient) {}

  async login(credentials: LoginCredentials) {
    return this.client.post<AuthResponse>("/auth/login", credentials)
  }

  async register(data: RegisterData) {
    return this.client.post<AuthResponse>("/auth/register", data)
  }

  async logout() {
    return this.client.post("/auth/logout")
  }

  async refreshToken(refreshToken: string) {
    return this.client.post<{ accessToken: string; expiresIn: number }>("/auth/refresh", {
      refreshToken,
    })
  }

  async forgotPassword(email: string) {
    return this.client.post("/auth/forgot-password", { email })
  }

  async resetPassword(token: string, newPassword: string) {
    return this.client.post("/auth/reset-password", { token, newPassword })
  }

  async verifyEmail(token: string) {
    return this.client.post("/auth/verify-email", { token })
  }

  async getCurrentUser() {
    return this.client.get<User>("/auth/me")
  }
}
