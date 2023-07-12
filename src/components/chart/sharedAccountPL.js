import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SharedAccountPL = ({ profitLoss }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const chartContext = chartContainer.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const labels = profitLoss.map((item) => item.date);
            const data = profitLoss.map((item) => item.plValue);

            const gradient = chartContext.createLinearGradient(0, 0, 0, 450);
            gradient.addColorStop(0, 'rgba(53, 226, 247, 0.4)');
            gradient.addColorStop(1, 'rgba(53, 226, 247, 0)');

            chartInstance.current = new Chart(chartContext, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '',
                            data: data,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: gradient,
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false, // Désactiver les légendes
                        },
                    },
                    scales: {
                        x: {
                            display: false, // Désactiver l'axe des x (labels)
                        },
                        y: {
                            display: false, // Désactiver l'axe des y (labels)
                        },
                    },
                },
            });
        }
    }, [profitLoss]);


    return (
        <div style={{ height: '100%', width: '100%' }}>  {/* Définissez la hauteur ici */}
            <canvas ref={chartContainer} />
        </div>
    );
}





export default SharedAccountPL;
