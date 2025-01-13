import Image from 'next/image'
import { Fragment, JSX } from 'react'

interface SevenDayProgressBarProps {
  streak: number // Current streak value
}

const SevenDayProgressBar: React.FC<SevenDayProgressBarProps> = ({
  streak,
}) => {
  // Determine the current medal
  const getStepCircleContent = (index: number): JSX.Element | string => {
    if (index == 0)
      return (
        <Image
          src={'/bronze-medal-streak.png'}
          width={100}
          height={100}
          alt='Medal image'
        />
      )
    if (index == 2)
      return (
        <Image
          src={'/silver-medal-streak.png'}
          width={100}
          height={100}
          alt='medal image'
        />
      )
    if (index == 6)
      return (
        <Image
          src={'/gold-medal-streak.png'}
          width={100}
          height={100}
          alt='medal image'
        />
      )
    return <div className='text-center'>{`${index + 1}`}</div>
  }

  // const medal = getStepCircleContent(streak)

  // Medal colors
  // const medalColors: Record<string, string> = {
  //   bronze: 'bg-orange-500',
  //   silver: 'bg-gray-400',
  //   gold: 'bg-yellow-400',
  // }

  return (
    <div className='w-full'>
      {/* Step Progress Bar */}
      <p className='mb-5'>Current Progress:</p>
      <div className='flex items-center w-full'>
        {Array.from({ length: 7 }).map((_, index) => (
          <Fragment key={index}>
            {/* Step Circle */}
            <div
              className={`relative p-2 w-full rounded-full flex items-center justify-center text-gray-700 font-bold transition-all duration-500 ${
                index < streak ? 'bg-green-500 scale-110' : 'bg-gray-300'
              }`}
            >
              {getStepCircleContent(index)}
            </div>
            {/* Connector */}
            {index < 6 && (
              <div
                className={`h-1 w-full transition-all duration-500 ${
                  index < streak - 1 ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default SevenDayProgressBar
