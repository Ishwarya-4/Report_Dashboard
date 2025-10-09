import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartCard = ({ title, data, options, type = 'horizontal' }) => {
  const defaultOptions = {
    indexAxis: type === 'horizontal' ? 'y' : 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: type === 'horizontal' ? 'bottom' : 'top',
        labels: {
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: type === 'vertical'
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        stacked: true,
        grid: {
          display: type === 'horizontal'
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    },
    ...options
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-primary font-semibold text-base mb-4">{title}</h3>
      <div style={{ height: type === 'horizontal' ? '400px' : '350px' }}>
        <Bar data={data} options={defaultOptions} />
      </div>
    </div>
  );
};
