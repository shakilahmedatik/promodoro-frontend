'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/dashboard/stat-card'
import { useEffect, useState } from 'react'
import {
  useFocusLogs,
  useFocusMetrics,
  useOverallLeaderboard,
  useTodayLeaderboard,
} from '@/hooks/focus-sessions'
import TimeComboChart from '@/components/dashboard/TimeComboChart'
import Image from 'next/image'
import LeaderboardByTime from '@/components/dashboard/LeaderboardByTime'
import StepProgressBar from '@/components/dashboard/StepProgressBar'
import { Spinner } from '@/components/ui/spinner'
export default function DashboardContent() {
  const { data: focusMetrics, isLoading: isFocusMetricsLoading } =
    useFocusMetrics()
  const { data: overAllLeaderboard, isLoading: isOverallLeaderboardLoading } =
    useOverallLeaderboard()
  const { data: todayLeaderboard, isLoading: isTodayLeaderboardLoading } =
    useTodayLeaderboard()
  const { data: sessionLogs, isLoading: isSessionLogsLoading } = useFocusLogs()

  const {
    currentBadge,
    currentStreak = 0,
    dailyMetrics,
    weeklyMetrics,
    highestBadge,
    longestStreak,
  } = focusMetrics || {}

  const [streak, setStreak] = useState(0)

  // Simulate progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setStreak(prev => {
        if (prev >= currentStreak || prev >= 7) {
          clearInterval(timer)
          return currentStreak // Stop at the last step
        }
        return prev + 1
      })
    }, 500) // Increase streak every second

    return () => clearInterval(timer)
  }, [currentStreak])
  return (
    <div className='flex-1 space-y-4  pt-6'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {isFocusMetricsLoading ? (
          <div className='flex items-center h-[100px] justify-center gap-3'>
            <Spinner size='small' />
          </div>
        ) : (
          <StatCard
            title='Daily Metrics'
            values={dailyMetrics}
            image_url='/daily.png'
          />
        )}
        {isFocusMetricsLoading ? (
          <div className='flex items-center h-[100px] justify-center gap-3'>
            <Spinner size='small' />
          </div>
        ) : (
          <StatCard
            title='Weekly Metrics'
            values={weeklyMetrics}
            image_url='/weekly.png'
          />
        )}
        {isFocusMetricsLoading ? (
          <div className='flex items-center h-[100px] justify-center gap-3'>
            <Spinner size='small' />
          </div>
        ) : (
          <StatCard
            title='Current Streak'
            value={currentStreak}
            image_url='/current.png'
          />
        )}
        {isFocusMetricsLoading ? (
          <div className='flex items-center h-[100px] justify-center gap-3'>
            <Spinner size='small' />
          </div>
        ) : (
          <StatCard
            title='Longest Streak'
            value={longestStreak}
            image_url='/longest.png'
          />
        )}
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Focus Session Log (Last 10 Days.)
            </CardTitle>
          </CardHeader>
          {isSessionLogsLoading ? (
            <div className='flex items-center h-[400px] justify-center gap-3'>
              <Spinner size='large' />
            </div>
          ) : (
            <CardContent className='pl-2 overflow-hidden'>
              <div className='w-full h-64 sm:h-96 lg:h-[400px]'>
                {sessionLogs && <TimeComboChart sessionLogs={sessionLogs} />}
              </div>
            </CardContent>
          )}
        </Card>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Streak Progress (Consecutive Days.)
            </CardTitle>
          </CardHeader>

          {isFocusMetricsLoading ? (
            <div className='flex h-[400px] items-center  justify-center gap-3'>
              <Spinner size='large' />
            </div>
          ) : (
            <CardContent className='flex flex-col justify-between space-y-12'>
              <div className='flex justify-between items-center w-full flex-grow'>
                <div className='space-y-3'>
                  <p>Current Badge: {currentBadge}</p>
                  <p className='text-sm pb-4'>
                    You&apos;ve received this badge based on your streak.
                  </p>
                  <p>Highest Badge: {highestBadge}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  {
                    <Image
                      src={`/${currentBadge?.toLowerCase()}-medal-streak.png`}
                      width={100}
                      height={100}
                      className='object-co'
                      alt='Medal image'
                    />
                  }
                  <p>{currentBadge} Badge</p>
                </div>
              </div>
              <div>
                {currentStreak && <StepProgressBar streak={streak} />}
                <div className='mt-12 text-xl'>
                  {currentBadge === 'Bronze' && (
                    <p className='text-center'>
                      "Keep up the good work, next badge: Silver"
                    </p>
                  )}
                  {currentBadge === 'Silver' && (
                    <p className='text-center'>
                      "You are almost there, next badge: Gold"
                    </p>
                  )}
                  {currentBadge === 'Gold' && (
                    <p className='text-center'>
                      "Here comes the hard part, keep maintaining your streak
                      and dominate leaderboard"
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <Card className=''>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Top Users (Today)
            </CardTitle>
          </CardHeader>
          {isTodayLeaderboardLoading ? (
            <div className='flex items-center h-[400px] justify-center gap-3'>
              <Spinner size='large' />
            </div>
          ) : (
            <CardContent>
              {todayLeaderboard && (
                <LeaderboardByTime leaderboard={todayLeaderboard} />
              )}
            </CardContent>
          )}
        </Card>
        <Card className=''>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Top Users (Total Focus Time.)
            </CardTitle>
          </CardHeader>
          {isOverallLeaderboardLoading ? (
            <div className='flex items-center h-[400px] justify-center gap-3'>
              <Spinner size='large' />
            </div>
          ) : (
            <CardContent>
              {overAllLeaderboard && (
                <LeaderboardByTime leaderboard={overAllLeaderboard} />
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
