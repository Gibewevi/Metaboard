import ContentHeader from "@/components/contentHeader/contentHeader";
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";
import ProfitLossChart from "@/components/chart/ProfitLoss";
import Link from "next/link";
export default function Performance({ account_id, profitLoss, account }) {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto flex flex-col gap-y-5 relative">
                <div className="flex flex-row items-center">
                    <ContentHeader icon={'/CarbonHomeBlue.svg'} title={'Open range break 129540'} />
                </div>

                <div className="flex flex-row items-center justify-around ml-2 gap-x-2 w-full">
                    <Link href={`/account/performances/${account_id}`}>
                        <span className="text-xl font-light">Performances</span>
                    </Link>
                    <img src="/CarbonChevronRight.svg" className="w-[20px] mt-1" />
                    <Link href={`/account/orders/${account_id}`}>
                        <span className="text-x font-light text-[#575757]">Orders</span>
                    </Link>
                </div>
                <ProfitLossChart profitLoss={profitLoss} account={account}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const account_id = context.query.account_id;
    const API_URL = process.env.API_URL;
    const resOrders = await fetch(`${API_URL}/api/account/profit-losses?account_id=${account_id}`, {
        method: 'GET'
    });
    const { profitLoss, account } = await resOrders.json();
    return {
        props: {
            account_id: account_id,
            profitLoss,
            account
        }
    };
}
