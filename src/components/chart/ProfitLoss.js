import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ProfitLossChart = ({ profitLoss, account }) => {

  const winrate = Math.round((account.winning_trades / (account.winning_trades+account.losing_trades)) * 100);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);  // utilisez useRef pour une valeur persistante


  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartContext = chartContainer.current.getContext('2d');

      // vérifiez si chartInstance.current existe avant de la détruire
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const labels = profitLoss.map(item => item.date);
      const data = profitLoss.map(item => item.plValue);

      chartInstance.current = new Chart(chartContext, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Profit/Loss',
            data: data,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(53, 226, 247,0.3)',
            fill: true,
            tension: 0.3,
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
          <span className="text-xl text-[#ADB6C2]">Profit and Losses</span>
        </div>
        <div className="flex flex-row justify-around items-center">
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Total Pnl</span>
            <span className="text-xl text-[#ADB6C2]">${account.profit_and_loss}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Account Balance</span>
            <span className="text-xl text-[#ADB6C2]">${account.current_balance}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Win rate</span>
            <span className="text-xl text-[#ADB6C2]">{winrate}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-md text-[#00cfe8]">Total trades</span>
            <span className="text-xl text-[#ADB6C2]">{account.orders}</span>
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
