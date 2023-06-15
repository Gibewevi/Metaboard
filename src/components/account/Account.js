export default function Account(props) {
    return (
        <div className="flex flex-row w-full h-[90px] bg-[#1A1D1F] rounded-md transition-all ease-in duration-800 hover:scale-105 hover:border hover:border-2 hover:border-[#35E2F7] ">

            <div className=" flex flex-col p-3 w-[190px]">
                <span className="text-white text-2xl font-black">{props.identifiant}</span>
                <span className="text-gray-600 text-md">{props.strategy}</span>
            </div>

            <div className="flex-1 p-1">
                <div className="flex flex-row justify-around w-full bg-[#111315] h-full">
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">Balance</span>
                        <span className="text-[#35E2F7]">{props.balance}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">Orders</span>
                        <span className="text-white">{props.orders}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">P&L</span>
                        <span className="text-white">{props.pl}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">P&L%</span>
                        <span className="text-green-600">{props.plPercent}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white">dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    )
}