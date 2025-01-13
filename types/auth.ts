// types/auth.ts
export interface RegisterUserData {
  name: string
  email: string
  image: string
  password: string
}

export interface LoginUserData {
  email: string
  password: string
}

export interface user {
  id: number
  name: string
  email: string
  image: string
  created_at: string
}

export interface UserResponse {
  message: string
  status: number
  data: user
}
