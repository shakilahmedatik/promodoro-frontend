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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUserStore } from '@/stores/user-store'

export function Navbar() {
  const pathname = usePathname()
  const { user } = useUserStore()
  return (
    <nav className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <div className='flex items-center space-x-2 lg:space-x-6'>
          <Link href='/' className='text-xl font-bold font-minecraft'>
            Promodoro
          </Link>
        </div>
        <div className='ml-auto flex items-center md:space-x-4'>
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
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link href='/dashboard'>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
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
