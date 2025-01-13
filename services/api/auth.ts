import axios from 'axios'
import { RegisterUserData, LoginUserData, UserResponse } from '../../types/auth'
import axiosInstance from '../axiosInstance'

export const registerUser = async (
  data: RegisterUserData
): Promise<UserResponse> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`,
    data
  )
  return response.data
}

export const loginUser = async (data: LoginUserData): Promise<UserResponse> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
    data,
    {
      withCredentials: true,
    }
  )
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
