import { RegisterUserData, LoginUserData, UserResponse } from '../../types/auth'
import axiosInstance from '../axiosInstance'

export const registerUser = async (
  data: RegisterUserData
): Promise<UserResponse> => {
  const response = await axiosInstance.post(`/user/register`, data)
  return response.data
}

export const loginUser = async (data: LoginUserData): Promise<UserResponse> => {
  const response = await axiosInstance.post(`/user/login`, data, {
    withCredentials: true,
  })
  return response.data
}

export const logoutUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.post(
    `/user/logout`,
    {},
    { withCredentials: true }
  )
  return response.data
}
