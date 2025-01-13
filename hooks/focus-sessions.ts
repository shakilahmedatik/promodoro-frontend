import {
  getFocusMetrics,
  getFocusSessionLogs,
  getOverallLeaderboardData,
  getTodayLeaderboardData,
} from '@/services/api/focus-session'
import {
  focusSessionMetrics,
  leaderBoardData,
  sessionLog,
} from '@/types/focusSession'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useFocusMetrics = (): UseQueryResult<
  focusSessionMetrics,
  unknown
> => useQuery({ queryKey: ['focus-metrics'], queryFn: getFocusMetrics })

export const useOverallLeaderboard = (): UseQueryResult<
  leaderBoardData[],
  unknown
> =>
  useQuery({
    queryKey: ['leaderboard-overall'],
    queryFn: getOverallLeaderboardData,
  })
export const useTodayLeaderboard = (): UseQueryResult<
  leaderBoardData[],
  unknown
> =>
  useQuery({
    queryKey: ['leaderboard-today'],
    queryFn: getTodayLeaderboardData,
  })

export const useFocusLogs = (): UseQueryResult<sessionLog[], unknown> =>
  useQuery({ queryKey: ['focus-logs'], queryFn: getFocusSessionLogs })
