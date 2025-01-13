import {
  focusSessionData,
  focusSessionLogResponse,
  focusSessionMetrics,
  leaderBoardData,
  sessionLog,
} from '@/types/focusSession'
import axiosInstance from '../axiosInstance'

// save focus session
export const saveFocusSession = async (
  data: focusSessionData
): Promise<focusSessionLogResponse> => {
  const response = await axiosInstance.post(`/focus-session`, data, {
    withCredentials: true,
  })
  return response.data
}

// get focus metrics
export const getFocusMetrics = async (): Promise<focusSessionMetrics> => {
  const response = await axiosInstance.get(`/focus-metrics`, {
    withCredentials: true,
  })

  return response.data.data
}

// get leaderboard
export const getOverallLeaderboardData = async (): Promise<leaderBoardData> => {
  const response = await axiosInstance.get(`/leaderboard-overall`, {
    withCredentials: true,
  })
  return response.data.data
}
// get leaderboard
export const getTodayLeaderboardData = async (): Promise<leaderBoardData> => {
  const response = await axiosInstance.get(`/leaderboard-today`, {
    withCredentials: true,
  })
  return response.data.data
}
// get focus session logs for chart
export const getFocusSessionLogs = async (): Promise<sessionLog> => {
  const response = await axiosInstance.get(`/focus-logs`, {
    withCredentials: true,
  })
  return response.data.data
}
