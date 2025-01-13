'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUserStore } from '@/stores/user-store'
import { logoutUser } from '@/services/api/auth'
import { useRouter } from 'next/navigation'
export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, clearUser } = useUserStore()
  const handleLogOut = async (): Promise<void> => {
    console.log('logout')
    try {
      await logoutUser()
      clearUser()
      router.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <div className='flex items-center space-x-2 lg:space-x-6'>
          <Link href='/' className='text-xl font-bold font-minecraft'>
            Promodoro
          </Link>
        </div>
        <div className='ml-auto flex items-center md:space-x-4'>
          {user && (
            <Button
              asChild
              variant='ghost'
              className={cn(
                'transition-colors hover:text-primary',
                pathname === '/pomodoro'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <Link href='/pomodoro'>Pomodoro</Link>
            </Button>
          )}
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.image} alt='User Photo' />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard'>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                variant='ghost'
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === '/login'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <Link href='/login'>Login</Link>
              </Button>
              <Button
                asChild
                variant='ghost'
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === '/register'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <Link href='/register'>Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
