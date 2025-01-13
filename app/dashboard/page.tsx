import { Metadata } from 'next'
import DashboardContent from './dashboard-content'

export const metadata: Metadata = {
  title: 'Dashboard | Promodoro',
  description: 'User Analytics, Achievements & Leaderboard',
}

const Dashboard = () => {
  return <DashboardContent />
}

export default Dashboard
