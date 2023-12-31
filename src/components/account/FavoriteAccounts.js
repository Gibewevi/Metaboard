import Link from "next/link"
import { useEffect, useState } from "react"
import serviceAccount from "@/services/Account";

export default function FavoriteAccount({ accountData }) {
    const [account, setAccount] = useState(accountData);

    return (
        <div className={`bg-[#1A1D1F] flex flex-row w-full h-[90px] bg-[#1A1D1F] rounded-md transition-all ease-in duration-800 hover:scale-105 hover:border hover:border-2 hover:border-[#35E2F7]`}>

            <div className=" flex flex-col p-3 w-[230px] justify-center">

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
                        <span className="text-white">{account.orders_number}</span>
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
                        <Link href={`account/favorite/${account.account_id}`}>
                            <button className="h-[35px] border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white">dashboard</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}