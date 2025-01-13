import axios, { AxiosInstance } from 'axios'
import { logoutUser } from './api/auth'

interface AxiosInstanceConfig {
  baseURL?: string
  timeout?: number
  headers?: {
    [key: string]: string | string[]
  }
  withCredentials?: boolean
}

const createAxiosInstance = (config: AxiosInstanceConfig): AxiosInstance => {
  const instance = axios.create(config)

  // Request interceptor for adding authentication token from localStorage
  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // Example: Response interceptor for handling 401 Unauthorized
  instance.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      console.log(error)
      if (
        (error?.response && error.response.status === 401) ||
        error.response.status === 403
      ) {
        await logoutUser()
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )

  return instance
}
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
// Define your default configuration
const defaultConfig: AxiosInstanceConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-User-Timezone': userTimezone, // Add this line to set the header
  },
}

const axiosInstance: AxiosInstance = createAxiosInstance(defaultConfig)

export default axiosInstance
