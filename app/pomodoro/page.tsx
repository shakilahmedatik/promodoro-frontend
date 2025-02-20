'use client'
import { TextShimmerWave } from '@/components/core/text-shimmer-wave'
import { PomodoroTimer } from '@/components/pomodoro-timer'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spotlight } from '@/components/core/spotlight'
import { BorderTrail } from '@/components/core/border-trail'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { focusSessionMetrics } from '@/types/focusSession'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getFocusMetrics } from '@/services/api/focus-session'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

const Pomodoro = () => {
  const { user } = useUserStore()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      return router.push('/login')
    }
  }, [user])

  const {
    data: focusMetrics,
    isError,
  }: UseQueryResult<focusSessionMetrics, unknown> = useQuery({
    enabled: !!user?.id,
    queryKey: ['focus-metrics', user?.id],
    queryFn: getFocusMetrics,
  })
  console.log(isError)

  return (
    <div className='space-y-8 flex flex-col justify-center items-center min-h-[calc(100vh-130px)]'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className='relative  min-h-[550px] w-full lg:col-span-2 aspect-video  overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30'>
          <Spotlight
            className='from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400'
            size={250}
          />
          <div className='relative h-full w-full rounded-xl bg-white dark:bg-black'>
            <Card className='h-full rounded-xl'>
              <CardHeader>
                <CardTitle>Pomodoro Timer</CardTitle>
                <CardDescription>
                  <TextShimmerWave className=' text-sm' duration={2}>
                    Start your focused work session
                  </TextShimmerWave>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PomodoroTimer />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='relative min-h-[400px] overflow-hidden rounded-md border border-zinc-950/10 bg-white text-zinc-700 outline-none dark:border-zinc-50/20 dark:bg-zinc-950 dark:text-zinc-300'>
          <Card className='h-full rounded-md'>
            <CardHeader>
              <CardTitle>Daily Statistics</CardTitle>

              <CardDescription>
                <TextShimmerWave className=' text-sm' duration={2}>
                  Your productivity overview
                </TextShimmerWave>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user && user?.id && focusMetrics ? (
                <>
                  <p>
                    Total Focus Time:{' '}
                    {focusMetrics?.dailyMetrics?.total_time || 0}
                  </p>
                  <p>
                    Completed Pomodoro's: {focusMetrics?.dailyMetrics?.sessions}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className='h-4 w-[180px] mb-2' />
                  <Skeleton className='h-4 w-[200px]' />
                </>
              )}
            </CardContent>
          </Card>
          <BorderTrail
            className='bg-gradient-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700'
            size={120}
          />
        </div>
      </div>
    </div>
  )
}
export default Pomodoro
