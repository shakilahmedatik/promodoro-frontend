'use client'

import { usePomodoroTimer } from '@/hooks/use-pomodoro-timer'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Progress } from '@/components/ui/progress'
import { TextScramble } from './core/text-scramble'
import { TextEffect } from './core/text-effect'

export function PomodoroTimer() {
  const {
    time,
    isRunning,
    isBreak,
    progress,
    cycleCompleted,
    start,
    pause,
    reset,
    isBtnDisable,
  } = usePomodoroTimer()
  const { theme } = useTheme()

  return (
    <div className='text-center max-w-md mx-auto mt-12'>
      <div className='text-6xl lg:text-9xl mb-4'>{time}</div>
      <Progress value={progress} className='w-full h-4 mb-4' />
      <div className='text-xl mb-4'>
        {isBreak && (
          <TextScramble className='text-xl uppercase'>Break Time!</TextScramble>
        )}
        {!isBreak && (
          <TextScramble className='text-xl uppercase'>Focus Time</TextScramble>
        )}
      </div>
      {cycleCompleted && (
        <div className='text-xl mb-4 text-green-500 font-bold'>
          <TextEffect
            preset='fade-in-blur'
            speedReveal={1.1}
            speedSegment={0.3}
          >
            Cycle completed! Take a longer break or start a new focus session.
          </TextEffect>
        </div>
      )}
      <div className='space-x-4 mb-8'>
        <Button
          onClick={isRunning ? pause : start}
          disabled={isBtnDisable}
          variant={theme === 'dark' ? 'secondary' : 'default'}
        >
          {isRunning ? 'Pause' : cycleCompleted ? 'Start New Cycle' : 'Start'}
        </Button>
        <Button onClick={reset} variant='destructive'>
          Reset
        </Button>
      </div>
    </div>
  )
}
