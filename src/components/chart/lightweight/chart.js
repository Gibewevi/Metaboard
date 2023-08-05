import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Chart = ({ data }) => {
    const chartContainerRef = useRef();
    let chart;
    let lineSeries;

    const addLine = (price) => {
        if (!lineSeries) {
            lineSeries = chart.addLineSeries({ color: 'yellow' });
        }
        lineSeries.setData([{ time: Date.now() / 1000, value: price }]);
    };

    const handleClick = (param) => {
        if (param.seriesPrices.size > 0) {
          for (var seriesPrice of param.seriesPrices.values()) {
            addLine(seriesPrice);
          }
        }
      };
      

    useEffect(() => {
        if (chartContainerRef.current) {
            chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                layout: {
                    background: { color: '#1A1D1F' },
                    textColor: '#DDD',
                },
                grid: {
                    vertLines: {
                        color: '#444',
                        visible: false,
                    },
                    horzLines: {
                        color: '#444',
                        visible: false,
                    },
                },
                rightPriceScale: {
                    borderColor: '#5d606b',
                    scaleMargins: {
                        top: 0.2,
                        bottom: 0.2,
                    },
                },
                timeScale: {
                    borderColor: '#5d606b',
                    timeVisible: true,
                    secondsVisible: false,
                },
                watermark: {
                    color: '#25272A',
                    visible: true,
                    text: 'METABOARD',
                    fontSize: 48,
                    horzAlign: 'left',
                    vertAlign: 'bottom',
                },
            });

            const candleSeries = chart.addCandlestickSeries({
                upColor: '#d1d4dc',
                downColor: '#787b86',
                borderDownColor: '#787b86',
                borderUpColor: '#d1d4dc',
                wickDownColor: '#5d606b',
                wickUpColor: '#d1d4dc',
            });

            candleSeries.setData(data);

            // Define visible range
            const firstDate = data[0].time;
            const lastDate = data[data.length - 1].time;
            chart.timeScale().setVisibleRange({
                from: firstDate,
                to: lastDate
            });
            chart.subscribeClick(handleClick);
        }

        return () => {
            chart.unsubscribeClick(handleClick);
            chart && chart.remove();
        };
    }, [data]);

    return <div style={{ width: '100%', height: '100%' }} ref={chartContainerRef} />;
};

export default Chart;
