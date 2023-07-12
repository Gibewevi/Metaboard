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
        <div className={`${isShared ? 'bg-carbon' : 'bg-[#1A1D1F]'} flex flex-row w-full h-[90px] bg-[#1A1D1F] rounded-md transition-all ease-in duration-800 hover:scale-105 hover:border hover:border-2 hover:border-[#35E2F7]`}>

            <div className=" flex flex-col p-3 w-[190px]">
                <div className="flex flex-row items-center gap-x-3">
                    <span className="text-white text-2xl font-black">{account.account_id}</span>
                    {isShared && <span className="text-white font-black">SHARED</span>}
                </div>
                <span className="text-gray-600 text-md">{account.strategy}</span>
            </div>

            <div className="flex-1 p-1">
                <div className="flex flex-row justify-around w-full bg-[#111315] h-full">
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">Balance</span>
                        <span className="text-[#35E2F7]">{account.current_balance}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">Orders</span>
                        <span className="text-white">{account.orders}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">P&L</span>
                        <span className="text-white">{account.profit_and_loss}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-white">P&L%</span>
                        <span className="text-green-600">{account.profit_and_loss_percent}</span>
                    </div>
                    <div className="flex gap-x-3 items-center justify-center">
                        <Link href={`account/analytics/${account.account_id}`}>
                            <button className="h-[35px] border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white">dashboard</button>
                        </Link>
                        <button onClick={handleShared} className={`${isShared ? 'fill-white bg-[#35E2F7]' : 'fill-[#35E2F7] hover:fill-white'} h-[35px] border border-1 border-[#35E2F7] p-2 pt-1 pb-1 fill-[#35E2F7] rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M27 25h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4zm6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2zM6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5zm13-11h7v2h-7zm0-4h10v2H19zm0-4h10v2H19zm-8 9H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}