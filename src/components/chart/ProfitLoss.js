import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ProfitLossChart = ({ profitLoss, account }) => {
  const chartContainer = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartContext = chartContainer.current.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = profitLoss.map(item => item.date);
      const data = profitLoss.map(item => item.plValue);

      chartInstance = new Chart(chartContext, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Profit/Loss',
            data: data,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day'
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Profit/Loss'
              }
            }]
          },
        }
      });
    }
  }, [profitLoss]);

  return (
    <div className="bg-[#1A1D1F] p-4 rounded-lg">
      <div className="flex flex-col">
        <div className="p-3">
          <span className="text-xl">Profit and Losses</span>
        </div>
        <div className="flex flex-row justify-around items-center">
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Total Pnl</span>
            <span className="text-xl text-white">${account.profit_and_loss}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Account Balance</span>
            <span className="text-xl text-white">${account.current_balance}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Win rate</span>
            <span className="text-xl text-white">xx%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Total trades</span>
            <span className="text-xl text-white">{account.orders}</span>
          </div>
        </div>
      </div>
      <div style={{ height: '280px', width: '100%' }}>  {/* Définissez la hauteur ici */}
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}





export default ProfitLossChart;
