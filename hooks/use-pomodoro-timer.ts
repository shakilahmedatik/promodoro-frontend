import { saveFocusSession } from '@/services/api/focus-session'
import { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { focusSessionData, PomodoroTimer } from '@/types/focusSession'
import { useUserStore } from '@/stores/user-store'
import { useQueryClient } from '@tanstack/react-query'
import { playSound } from '@/utils/utils'
import { toast } from 'sonner'
const FOCUS_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds

export function usePomodoroTimer(): PomodoroTimer {
  const { user } = useUserStore()
  const queryClient = useQueryClient()
  const [time, setTime] = useState(FOCUS_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [totalTime, setTotalTime] = useState(FOCUS_TIME)
  const [cycleCompleted, setCycleCompleted] = useState(false)
  const [isBtnDisable, setIsBtnDisable] = useState(false)
  // Check if the user is on a mobile device
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)
  // Request notification permissions only once on app load
  useEffect(() => {
    if (!isMobile && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  }, [isMobile])

  const notifyUser = useCallback((): void => {
    const message = !isBreak
      ? 'Focus session complete! Starting a 5-minute break.'
      : 'Break session complete! Ready for the next focus session?'

    // Check if the notification API is available
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', { body: message })
    }

    // Play sound after user interaction
    const notificationAudio = new Audio('./notification.mp3')
    playSound(notificationAudio)
  }, [isBreak])

  // post data
  const saveFocusLog = async () => {
    // Post data to server
    if (user) {
      const focusData: focusSessionData = {
        user_id: user?.id,
        duration: 25,
        timestamp: moment().format(),
      }
      try {
        const data = await saveFocusSession(focusData)
        console.log(data)
        toast.success('Log Saved!')

        queryClient.invalidateQueries({
          queryKey: [
            'focus-metrics',
            'focus-logs',
            'leaderboard-overall',
            'leaderboard-today',
          ],
        })
      } catch (err) {
        console.log(err)
        toast.error((err as any)?.response?.data?.message)
      }
    }
  }

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
        notifyUser()
      } else {
        setTime(BREAK_TIME)
        setTotalTime(BREAK_TIME)
        setIsBreak(true)
        notifyUser()
        saveFocusLog()
      }
    }
    return () => clearInterval(intervalId)
  }, [isRunning, time, isBreak])

  const start = useCallback(() => {
    setIsBtnDisable(true)
    // Play sound for 4 seconds before starting the timer
    const startAudio = new Audio('./start-beeps.mp3')
    playSound(startAudio)
    setTimeout(() => {
      setIsRunning(true)
      setIsBtnDisable(false)
      setCycleCompleted(false)
    }, 4000) // Delay start for 3 seconds
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
    isBtnDisable,
  }
}
