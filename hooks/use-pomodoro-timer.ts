import { useState, useEffect, useCallback } from 'react'

const FOCUS_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds

interface PomodoroTimer {
  time: string
  isRunning: boolean
  isBreak: boolean
  progress: number
  cycleCompleted: boolean
  start: () => void
  pause: () => void
  reset: () => void
}

export function usePomodoroTimer(): PomodoroTimer {
  const [time, setTime] = useState(FOCUS_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [totalTime, setTotalTime] = useState(FOCUS_TIME)
  const [cycleCompleted, setCycleCompleted] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isRunning && time > 0) {
      intervalId = setInterval(() => setTime(time => time - 1), 1000)
    } else if (time === 0) {
      if (isBreak) {
        setIsRunning(false)
        setTime(FOCUS_TIME)
        setTotalTime(FOCUS_TIME)
        setIsBreak(false)
        setCycleCompleted(true)
      } else {
        setTime(BREAK_TIME)
        setTotalTime(BREAK_TIME)
        setIsBreak(true)
      }
    }
    return () => clearInterval(intervalId)
  }, [isRunning, time, isBreak])

  const start = useCallback(() => {
    setIsRunning(true)
    setCycleCompleted(false)
  }, [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setIsRunning(false)
    setTime(FOCUS_TIME)
    setTotalTime(FOCUS_TIME)
    setIsBreak(false)
    setCycleCompleted(false)
  }, [])

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }, [])

  const progress = ((totalTime - time) / totalTime) * 100

  return {
    time: formatTime(time),
    isRunning,
    isBreak,
    progress,
    cycleCompleted,
    start,
    pause,
    reset,
  }
}
