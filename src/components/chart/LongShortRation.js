import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const LongShortRatio = (props) => {
  const chartContainer = useRef(null);
  console.log(props.ratio);
const long = props.ratio.long;
const short = props.ratio.short;
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: 'doughnut',
        data: {
          labels: ['Long', 'Short'],
          datasets: [{
            label: 'Long-Short Ratio',
            data: [long, short],
            backgroundColor: [
              '#FFFFFF',
              '#35E2F7',
            ],
            hoverOffset: 4,
          }]
        }
      });

      return () => {
        newChartInstance.destroy();
      };
    }
  }, [chartContainer, long, short]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default LongShortRatio;
