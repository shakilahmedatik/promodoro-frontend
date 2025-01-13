export type focusSessionData = {
  user_id: number
  duration: number
  timestamp: string
}

export interface focusSessionLogResponse {
  message: string
  status: number
  data: number
}

export interface focusSessionMetrics {
  currentBadge: string
  highestBadge: string
  currentStreak: number
  longestStreak: number
  dailyMetrics: {
    sessions: number
    total_time: number
  }
  weeklyMetrics: {
    sessions: number
    total_time: number
  }
}

export interface focusSessionMetricsResponse {
  message: string
  status: number
  data: focusSessionMetrics[]
}
export interface leaderBoardData {
  rank: number
  user_name: string
  user_image: string
  total_focus_time: number
  user_id: number
}
export interface leaderboardResponse {
  message: string
  status: number
  data: leaderBoardData[]
}

export interface sessionLog {
  date: string // e.g., "2025-01-01"
  totalSessions: number
  totalDuration: number // in minutes
}
