import Link from "next/link"
export default function Header(props) {

    return (
        <div className="flex flex-shrink-0 justify-between items-center bg-[#1A1D1F] border border-1 border-r-0 border-l-0 border-t-0 border-b-1 border-slate-700 h-[50px] shadow-xl">
            <div className="flex flex-row gap-x-3 ml-8">
                <h1 className=" font-satoshi text-[#00cfe8] text-xl font-black">META<span className="text-white">BOARD</span><span className="text-sm text-white"> alpha</span></h1>
            </div>
            <div className="flex flex-row justify-center items-center gap-x-1 list-none font-light font-satoshi text-white text-md relative mr-8">
                <span className="text-sm font-extralight text-white">Charts by</span>
                <Link href='https://fr.tradingview.com/'>
                    <span className="text-md font-black text-white">TradingView</span>
                </Link>
            </div>
        </div>
    )
}