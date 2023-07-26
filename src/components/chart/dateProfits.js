import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const DateProfits = (props) => {
    const chartContainer = useRef(null);
    const [dateProfits, setDateProfits] = useState(props.dateProfits);
    console.log('date : ', dateProfits);

    const getBorderColor = (profits) => {
        return profits.map(profit => profit < 0 ? 'rgba(213, 215, 216, 1)' : 'rgba(75,192,192,1)');
    };    

    const getColor = (profits) => {
        return profits.map(profit => profit < 0 ? 'rgba(213, 215, 216, 0.3)' : 'rgba(53, 226, 247,0.3)');
    };

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const chartInstance = new Chart(chartContainer.current, {
                type: 'bar',
                data: {
                    labels: Object.keys(props.dateProfits), // Assuming dateProfits is an object with dates as keys
                    datasets: [{
                        label: 'Profits',
                        data: Object.values(props.dateProfits), // Assuming dateProfits is an object with profits as values
                        borderColor: getBorderColor(Object.values(props.dateProfits)),
                        backgroundColor: getColor(Object.values(props.dateProfits)),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Ajoutez cette ligne
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Date Profits Bar Chart'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [props.dateProfits]);

    return (
        <div className="bg-[#1A1D1F] p-4 rounded-lg h-[225px] w-full">
            <div style={{ height: '100%', width: '100%' }}>  {/* Définissez la hauteur et la largeur ici */}
                <canvas ref={chartContainer} />
            </div>
        </div>
    );
};

export default DateProfits;
