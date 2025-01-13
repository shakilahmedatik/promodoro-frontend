'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, ReactNode } from 'react'
interface TanstackProviderProps {
  children: ReactNode
}
const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default TanstackProvider
