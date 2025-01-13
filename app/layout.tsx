import './globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { minecraftFont } from './fonts'
import TanstackProvider from '@/components/providers/tanstack-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Promodoro | Focus Tracker',
  description: 'Time Management and Focus Tracker',
  openGraph: {
    title: 'Promodoro',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning className={minecraftFont.variable}>
      <body className='font-minecraft bg-background text-foreground'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow container mx-auto px-4 py-8'>
              <TanstackProvider>{children}</TanstackProvider>
              <Toaster />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
