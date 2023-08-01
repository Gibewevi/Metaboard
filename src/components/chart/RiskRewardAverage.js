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
                            backgroundColor: 'rgba(53, 226, 247,0.3)',
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
                            ticks: {
                                // Ajoutez une certaine marge à votre graphique
                                padding: 10,
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
        <div className="bg-[#1A1D1F] p-4 rounded-lg h-[225px]">
            <div className="w-full flex flex-row justify-between p-4">
                <div className='flex flex-col justify-center items-center'>
                    <span className="text-xl font-extralight text-[#ADB6C2]">Average RR</span>
                    <span className="text-2xl font-black text-[#ADB6C2]">{average}</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <span className="text-xl font-extralight text-[#ADB6C2]">Max RR</span>
                    <span className="text-2xl font-black text-[#ADB6C2]">{max}</span>
                </div>
            </div>
            <div style={{ height: '90px', width: '100%' }}>  {/* Définissez la hauteur ici */}
                <canvas ref={chartContainer} />
            </div>
        </div>
    );
};

export default RiskRewardAverage;
