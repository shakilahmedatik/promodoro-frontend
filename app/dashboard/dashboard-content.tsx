'use client'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecentSales } from '@/components/dashboard/recent-sales'
import { Progress } from '@/components/ui/progress'
import { StatCard } from '@/components/dashboard/stat-card'
import { LeaderboardList } from '@/components/dashboard/leaderboard-list'
import { FocusBarChart } from '@/components/dashboard/bar-chart'
import { useEffect, useState } from 'react'
import StepProgressBar from '@/components/StepProgressBar'
import {
  useFocusLogs,
  useFocusMetrics,
  useOverallLeaderboard,
  useTodayLeaderboard,
} from '@/hooks/focus-sessions'
import TimeComboChart from '@/components/dashboard/TimeComboChart'
import Image from 'next/image'
import LeaderboardByTime from '@/components/dashboard/LeaderboardByTime'

export default function DashboardContent() {
  const { data: focusMetrics, isLoading: isFocusMetricsLoading } =
    useFocusMetrics()
  const { data: overAllLeaderboard, isLoading: isOverallLeaderboardLoading } =
    useOverallLeaderboard()
  const { data: todayLeaderboard, isLoading: isTodayLeaderboardLoading } =
    useTodayLeaderboard()
  const { data: sessionLogs, isLoading: isSessionLogsLoading } = useFocusLogs()
  console.log(
    isFocusMetricsLoading,
    isOverallLeaderboardLoading,
    isTodayLeaderboardLoading,
    isSessionLogsLoading
  )
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
        <StatCard
          title='Daily Metrics'
          values={dailyMetrics}
          image_url='/daily.png'
        />
        <StatCard
          title='Weekly Metrics'
          values={weeklyMetrics}
          image_url='/weekly.png'
        />
        <StatCard
          title='Current Streak'
          value={currentStreak}
          image_url='/current.png'
        />
        <StatCard
          title='Longest Streak'
          value={longestStreak}
          image_url='/longest.png'
        />
      </div>
      {/* <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Chart</CardTitle>
          </CardHeader>

          <FocusBarChart />
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div> */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Focus Session Log (Last 10 Days.)
            </CardTitle>
          </CardHeader>
          <CardContent className='pl-2 overflow-hidden'>
            <div className='w-full h-64 sm:h-96 lg:h-[400px]'>
              {sessionLogs && <TimeComboChart sessionLogs={sessionLogs} />}
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Streak Progress (Consecutive Days.)
            </CardTitle>
          </CardHeader>

          <CardContent className='flex flex-col justify-between space-y-12'>
            <div className='flex justify-between  w-full flex-grow'>
              <div>
                <p>Current Badge: {currentBadge}</p>
                <p>You&apos;ve received this badge based on your streak.</p>
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
            <div> {currentStreak && <StepProgressBar streak={streak} />}</div>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <Card className=''>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Top Users (Today)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayLeaderboard && (
              <LeaderboardByTime leaderboard={todayLeaderboard} />
            )}
          </CardContent>
        </Card>
        <Card className=''>
          <CardHeader>
            <CardTitle className='text-xl font-medium'>
              Top Users (Total Focus Time.)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overAllLeaderboard && (
              <LeaderboardByTime leaderboard={overAllLeaderboard} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const salesLeaders = [
  { name: 'Alice Johnson', value: '$12,345' },
  { name: 'Bob Smith', value: '$10,987' },
  { name: 'Charlie Brown', value: '$9,876' },
  { name: 'Diana Ross', value: '$8,765' },
  { name: 'Edward Norton', value: '$7,654' },
]

const topRatedProducts = [
  { name: 'Product A', value: '4.9★' },
  { name: 'Product B', value: '4.8★' },
  { name: 'Product C', value: '4.7★' },
  { name: 'Product D', value: '4.6★' },
  { name: 'Product E', value: '4.5★' },
]
