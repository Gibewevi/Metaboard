import Link from "next/link"
import { useEffect, useState } from "react"
import serviceAccount from "@/services/Account";
export default function Account({ accountData }) {
    const [account, setAccount] = useState(accountData);
    const [isShared, setIsShared] = useState(accountData.shared);

    const handleShared = async () => {
        const shared = await serviceAccount.setAccountShared(account.account_id);;
        setIsShared(shared);
    };

    return (
        <div className={`${isShared ? 'bg-carbon' : 'bg-[#1A1D1F]'} flex flex-row w-full h-[85px] bg-[#1A1D1F] rounded-md transition-all ease-in duration-800 hover:scale-105 hover:border hover:border-2 hover:border-[#35E2F7]`}>

            <div className="flex flex-col gap-y-2 p-4 w-[260px] justify-center">
                {/* <div className="flex flex-row items-center gap-x-3">
                    <span className="text-white text-2xl font-black">{account.account_id}</span>
                    {isShared && <span className="text-white font-black">SHARED</span>}
                </div> */}
                <div className="flex-1">
                    <span className={`${isShared ? 'text-[#c8cdd0]' : 'text-gray-600'} text-lg `}>{accountData.strategy}</span>
                </div>
                <div className={`${isShared ? 'fill-[#c8cdd0]' : 'fill-gray-600'} flex flex-row justify-start items-center gap-x-3`}>
                    <div className="min-w-[15px] flex flex-row gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path d="M22.5 4c-2 0-3.9.8-5.3 2.2L16 7.4l-1.1-1.1c-2.9-3-7.7-3-10.6-.1l-.1.1c-3 3-3 7.8 0 10.8L16 29l11.8-11.9c3-3 3-7.8 0-10.8C26.4 4.8 24.5 4 22.5 4z" /></svg>
                        <span className={`${isShared ? 'text-[#c8cdd0]' : 'text-gray-600'} text-sm`}>10</span>
                    </div>
                    <div className="min-w-[15px] flex flex-row gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z" /></svg>
                        <span className={`${isShared ? 'text-[#c8cdd0]' : 'text-gray-600'} text-sm`}>156</span>
                    </div>
                    <div className="min-w-[15px] flex flex-row gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><circle cx="16" cy="16" r="4" /><path d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z" /></svg>
                        <span className={`${isShared ? 'text-[#c8cdd0]' : 'text-gray-600'} text-sm`}>1.6k</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-1">
                <div className="flex flex-row justify-around w-full bg-[#111315] h-full">
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-[#c8cdd0]">Balance</span>
                        <span className="text-[#35E2F7]">{account.current_balance}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-[#c8cdd0]">Orders</span>
                        <span className="text-[#c8cdd0]">{account.orders_number}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-[#c8cdd0]">P&L</span>
                        <span className="text-[#c8cdd0]">{account.profit_and_loss}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-[#c8cdd0]">P&L%</span>
                        <span className="text-green-600">{account.profit_and_loss_percent}</span>
                    </div>
                    <div className="flex gap-x-3 items-center justify-center">
                        <Link href={`account/private/${account.account_id}`}>
                            <button className="h-[35px] border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-[#c8cdd0]">dashboard</button>
                        </Link>
                        <button onClick={handleShared} className={`${isShared ? 'fill-[#c8cdd0] bg-[#35E2F7]' : 'fill-[#35E2F7] hover:fill-[#c8cdd0]'} h-[35px] border border-1 border-[#35E2F7] p-2 pt-1 pb-1 fill-[#35E2F7] rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-[#c8cdd0]`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M27 25h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4zm6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2zM6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5zm13-11h7v2h-7zm0-4h10v2H19zm0-4h10v2H19zm-8 9H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}