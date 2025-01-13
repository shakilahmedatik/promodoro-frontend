type cycle = {
  date: string
  count: number
}

// Format time as MM:SS
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

// get Total focusCycles For Today
export const getTotalForToday = (focusCycles: cycle[]): number => {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const todayEntry = focusCycles.find(cycle => cycle.date === today)
  return todayEntry ? todayEntry.count : 0
}

// get Total focusCycles For Last 7 days
export const getTotalForLast7Days = (focusCycles: cycle[]): number => {
  const today = new Date()
  return focusCycles.reduce((total: number, cycle: cycle): number => {
    const cycleDate = new Date(cycle.date)
    const differenceInDays =
      (today.getTime() - cycleDate.getTime()) / (1000 * 60 * 60 * 24)
    if (differenceInDays >= 0 && differenceInDays < 7) {
      return total + cycle.count
    }
    return total
  }, 0)
}

// Play sound
export const playSound = (audio: HTMLAudioElement): void => {
  // Ensure it's triggered by a user action
  audio.play().catch(error => {
    console.error('Error playing sound:', error)
  })
}

// format date
export const dateFormatter = (): string => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
  const dd = String(today.getDate()).padStart(2, '0')

  const formattedDate = `${yyyy}-${mm}-${dd}`
  return formattedDate
}
