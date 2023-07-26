import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import ProfitLossChart from "@/components/chart/ProfitLoss";
import HeaderIndex from "@/components/accountOverview/HeaderIndex";
import Layout from "@/containers/Layout";
import NewOrder from "@/components/button/NewOrder";
import RiskRewardAverage from "@/components/chart/RiskRewardAverage";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";
import SocialHeader from "@/components/account/SocialHeader";
import DateProfits from "@/components/chart/dateProfits";

export default function PublicAccountAnalytic({ analytic }) {

    const [dateProfits, setDateProfits] = useState(analytic.dateProfits.perWeek);
    const [account, setAccount] = useState(analytic.account);
    const [risksRewards, setRiskRewards] = useState(analytic.risksRewards);
    const [profitLoss, setProfitLoss] = useState(analytic.profitLoss);
    const [orders, setOrders] = useState(analytic.orders);

    return (
        <div className="w-full">
            <Layout>
                <div className="flex flex-col gap-y-5">

                    <SocialHeader strategy={account.strategy} />

                    <div className="flex flex-row">
                        <HeaderIndex account_id={account.account_id} />
                    </div>
                    <div className=" flex flex-col w-full gap-y-6">

                        <ProfitLossChart profitLoss={profitLoss} account={account} />

                        <div className="grid gap-y-7 w-full lg:grid-cols-2 lg:gap-y-0 lg:gap-x-4">
                            <div>
                                <RiskRewardAverage risksRewards={risksRewards} />
                            </div>
                            <div>
                                <DateProfits dateProfits={dateProfits} />
                            </div>
                        </div>

                        <div className="bg-[#1A1D1F] w-full p-5">
                            <TradingAccountHistory orders={orders} isPrivacy={false}/>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}