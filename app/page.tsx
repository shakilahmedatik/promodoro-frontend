'use client'
import { useUserStore } from '@/stores/user-store'
import { redirect } from 'next/navigation'

export default function Home() {
  const { user } = useUserStore()
  if (user) {
    return redirect('/pomodoro')
  } else {
    return redirect('/login')
  }
}
