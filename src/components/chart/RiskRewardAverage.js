import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const RiskRewardAverage = ({ risksRewards }) => {
  const average = risksRewards.average;
  const max = risksRewards.max;
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartContext = chartContainer.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const data = risksRewards.RR.map(value => parseFloat(value));
      const labels = risksRewards.RR.map((_, index) => index);

      chartInstance.current = new Chart(chartContext, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,
              title: {
                display: true,
                text: 'Index',
              },
            },
            y: {
              display: false,
              title: {
                display: false,
                text: 'Risk Reward',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [risksRewards]);

  return (
    <div className="bg-[#1A1D1F] p-4 rounded-lg">
      <div style={{ height: '280px', padding:'4px' }}>
        <div className='w-full flex flex-col'>
            <span className='text-xl text-white'>Average RR</span>
            <span className='text-3xl text-white'>{average}</span>
        </div>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
};

export default RiskRewardAverage;
