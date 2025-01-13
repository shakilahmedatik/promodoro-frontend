import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

interface StatCardProps {
  title: string
  value?: number
  image_url: string
  values?: {
    sessions: number
    total_time: number
  }
}

export function StatCard({ title, value, image_url, values }: StatCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-xl font-medium'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center'>
          {value && (
            <div className='text-base'>
              Days: <span className='font-bold'>{value}</span>
            </div>
          )}
          {values && (
            <div>
              <div className='text-base'>
                Sessions: <span className='font-bold'>{values?.sessions}</span>
              </div>
              <div className='text-base'>
                Time Spent:{' '}
                <span className='font-bold'>
                  {values?.total_time ? `${values?.total_time} Minute` : 'N/A'}
                </span>
              </div>
            </div>
          )}

          <Image
            src={image_url}
            className=''
            alt='card icon'
            width={50}
            height={50}
          />
        </div>
      </CardContent>
    </Card>
  )
}
