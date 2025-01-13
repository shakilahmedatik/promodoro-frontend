'use client'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecentSales } from '@/components/dashboard/recent-sales'
import { Progress } from '@/components/ui/progress'
import { StatCard } from '@/components/dashboard/stat-card'
import { Users, DollarSign, CreditCard, Activity } from 'lucide-react'
import { LeaderboardList } from '@/components/dashboard/leaderboard-list'
import { FocusBarChart } from '@/components/dashboard/bar-chart'
import { useEffect } from 'react'

export default function DashboardContent() {
  const { user } = useUserStore()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      return router.push('/login')
    }
  }, [user])
  return (
    <div className='flex-1 space-y-4  pt-6'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Revenue'
          value='$45,231.89'
          icon={<DollarSign className='h-4 w-4' />}
        />
        <StatCard
          title='Subscriptions'
          value='+2350'
          icon={<Users className='h-4 w-4' />}
        />
        <StatCard
          title='Sales'
          value='+12,234'
          icon={<CreditCard className='h-4 w-4' />}
        />
        <StatCard
          title='Active Now'
          value='+573'
          icon={<Activity className='h-4 w-4' />}
        />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Chart</CardTitle>
          </CardHeader>

          <FocusBarChart />
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaderboardList title='Sales Leaders' data={salesLeaders} />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-4'>
              <div className='space-y-2'>
                <p className='text-sm font-medium'>Overall Satisfaction</p>
                <Progress value={87} className='h-2' />
                <p className='text-sm text-muted-foreground'>
                  87% of customers are satisfied
                </p>
              </div>
              <LeaderboardList
                title='Top Rated Products'
                data={topRatedProducts}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const salesLeaders = [
  { name: 'Alice Johnson', value: '$12,345' },
  { name: 'Bob Smith', value: '$10,987' },
  { name: 'Charlie Brown', value: '$9,876' },
  { name: 'Diana Ross', value: '$8,765' },
  { name: 'Edward Norton', value: '$7,654' },
]

const topRatedProducts = [
  { name: 'Product A', value: '4.9★' },
  { name: 'Product B', value: '4.8★' },
  { name: 'Product C', value: '4.7★' },
  { name: 'Product D', value: '4.6★' },
  { name: 'Product E', value: '4.5★' },
]
