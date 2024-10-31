export interface User {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: null
  cellphoneNumber: null
}

export interface UserResponse {
  user: User
  jwt: string
}

export interface LoginRequest {
  identifier: string
  password: string
}
