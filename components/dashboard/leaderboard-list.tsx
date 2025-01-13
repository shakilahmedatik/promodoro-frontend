interface LeaderboardItem {
  name: string
  value: string
}

interface LeaderboardListProps {
  title: string
  data?: LeaderboardItem[]
}

export function LeaderboardList({ title, data = [] }: LeaderboardListProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      {data.length > 0 ? (
        <ul className='space-y-2'>
          {data.map((item, index) => (
            <li key={index} className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{item.name}</span>
              <span className='text-sm text-muted-foreground'>
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-sm text-muted-foreground'>No data available</p>
      )}
    </div>
  )
}
