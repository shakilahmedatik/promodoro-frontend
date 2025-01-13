import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { leaderBoardData } from '../../types/focusSession'
import { FC, JSX } from 'react'
import Image from 'next/image'
interface LeaderboardByTimeProps {
  leaderboard: leaderBoardData[]
}

const LeaderboardByTime: FC<LeaderboardByTimeProps> = ({ leaderboard }) => {
  const getRankContent = (rank: number): JSX.Element | string => {
    if (rank == 1)
      return (
        <Image
          src={'/gold-medal.png'}
          width={40}
          height={40}
          alt='Medal image'
        />
      )
    if (rank == 2)
      return (
        <Image
          src={'/silver-medal.png'}
          width={40}
          height={40}
          alt='Medal image'
        />
      )
    if (rank == 3)
      return (
        <Image
          src={'/bronze-medal.png'}
          width={40}
          height={40}
          alt='Medal image'
        />
      )
    return ''
  }

  return (
    <>
      {leaderboard?.map((user, i) => (
        <div key={user.user_id} className='space-y-8 mb-2'>
          <div className='flex items-center'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src={user?.user_image} alt='Avatar' />
              <AvatarFallback>Pro</AvatarFallback>
            </Avatar>
            <div className='ml-4 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {user?.user_name}
              </p>
              <p className='text-sm text-muted-foreground'>
                Total Focus Time: {user?.total_focus_time} Minute
              </p>
            </div>
            <div className='ml-auto font-medium'>{getRankContent(i + 1)}</div>
          </div>
        </div>
      ))}
    </>
  )
}

export default LeaderboardByTime
