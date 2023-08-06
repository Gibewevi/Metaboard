import Chart from "@/components/chart/lightweight/chart"
export default function tradingView(){

    const handleImportDataIntoDataBase = async() => {
        const resCurrency = await fetch(`/api/import`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const data = [
        { time: '2023-08-01', open: 50, high: 52, low: 48, close: 51 },
        { time: '2023-08-02', open: 51, high: 53, low: 49, close: 50 },
        { time: '2023-08-03', open: 50, high: 54, low: 47, close: 52 },
        { time: '2023-08-04', open: 52, high: 55, low: 51, close: 53 },
        { time: '2023-08-05', open: 53, high: 54, low: 51, close: 52 },
        { time: '2023-08-06', open: 52, high: 56, low: 50, close: 54 },
        { time: '2023-08-07', open: 54, high: 58, low: 52, close: 56 },
        { time: '2023-08-08', open: 56, high: 59, low: 54, close: 57 },
        { time: '2023-08-09', open: 57, high: 60, low: 55, close: 59 },
        { time: '2023-08-10', open: 59, high: 61, low: 57, close: 60 },
        { time: '2023-08-11', open: 60, high: 63, low: 58, close: 62 },
        { time: '2023-08-12', open: 62, high: 64, low: 60, close: 63 },
        { time: '2023-08-13', open: 63, high: 65, low: 61, close: 64 },
        { time: '2023-08-14', open: 64, high: 66, low: 62, close: 65 },
        { time: '2023-08-15', open: 65, high: 67, low: 63, close: 66 },
        { time: '2023-08-16', open: 66, high: 68, low: 64, close: 67 },
        { time: '2023-08-17', open: 67, high: 69, low: 65, close: 68 },
        { time: '2023-08-18', open: 68, high: 70, low: 66, close: 69 },
        { time: '2023-08-19', open: 69, high: 71, low: 67, close: 70 },
        { time: '2023-08-20', open: 70, high: 72, low: 68, close: 71 },
    ];
    
    return(
        <div className="relative max-w-7xl w-full h-[400px] mx-auto p-4 bg-[#1A1D1F]">
            <button onClick={handleImportDataIntoDataBase} className="bg-slate-200 text-slate-800 p-2 rounded-lg">Load data</button>
            <Chart data={data} />
        </div>
    )
}