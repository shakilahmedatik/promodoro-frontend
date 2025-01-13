import { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
  BarController,
  LineController,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Chart } from 'react-chartjs-2'
import { sessionLog } from '@/types/focusSession'

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  Tooltip,
  Legend
)

interface CustomTimeComboChartProps {
  sessionLogs: sessionLog[]
}

const TimeComboChart: FC<CustomTimeComboChartProps> = ({ sessionLogs }) => {
  // Prepare chart data
  const labels = sessionLogs.map(log => log.date) // X-axis labels
  const totalDuration = sessionLogs.map(log => log.totalDuration) // Bar data
  const totalSessions = sessionLogs.map(log => log.totalSessions) // Line data

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Total Duration (minutes)',
        data: totalDuration,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Total Sessions',
        data: totalSessions,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        yAxisID: 'y1',
      },
    ],
  }
  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category', // Use category scale instead of time scale
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Total Duration (minutes)',
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Total Sessions',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  return <Chart type='bar' data={data} options={options} />
}

export default TimeComboChart
