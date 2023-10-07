import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import ProfitLossChart from "@/components/chart/ProfitLoss";
import HeaderIndex from "@/components/accountOverview/HeaderIndex";
import Layout from "@/containers/Layout";
import NewOrder from "@/components/button/NewAnimate";
import RiskRewardAverage from "@/components/chart/RiskRewardAverage";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";
import SocialHeader from "@/components/account/SocialHeader";
import DateProfits from "@/components/chart/dateProfits";

export default function PrivateAccountAnalytic({ headerTitle, analytic }) {
    const [analyticData, setAnalyticData] = useState(analytic);
    const [orderFormOpen, setOrderFormOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };

    const updateAnalyticAccount = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const resAnalytic = await fetch(`${API_URL}/api/account/analytics?account_id=${analyticData.account.account_id}`, {
            method: 'GET'
        });

        const updatedAnalyticData = await resAnalytic.json();
        setAnalyticData(updatedAnalyticData);
    }

    const handleFormNewOrder = async (order) => {
        setOrderLoading(true);
        try {
            let newOrder = await ordersService.sendOrderIntoDataBase(order);
            const formatOrder = ordersService.format(newOrder);
            let updatedOrders = [...analyticData.orders, formatOrder];
            updatedOrders.sort((a, b) => new Date(b.closed_date) - new Date(a.closed_date));
            setAnalyticData({ ...analyticData, orders: updatedOrders });
            updateAnalyticAccount();
        } catch (error) {
            console.error('Error sending order:', error);
        } finally {
            setOrderLoading(false);
            openNewOrderForm();
        }
    };

    return (
        <div className="w-full">
            <Layout>
                <div className="flex flex-col gap-y-5">

                    <SocialHeader account={analyticData.account} headerTitle={headerTitle} />

                    <div className="flex flex-row">
                        <HeaderIndex account_id={analyticData.account.account_id} />
                        <NewOrder onClick={openNewOrderForm} title={'new order'}/>
                    </div>
                    <NewOrderForm submit={handleFormNewOrder} openNewOrderForm={openNewOrderForm} isOpen={orderFormOpen} account_id={analyticData.account.account_id} orderLoading={orderLoading} />
                    <div className=" flex flex-col w-full gap-y-6">

                        <ProfitLossChart profitLoss={analyticData.profitLoss} account={analyticData.account} />

                        <div className="grid gap-y-7 w-full lg:grid-cols-2 lg:gap-y-0 lg:gap-x-4">
                            <div>
                                <RiskRewardAverage risksRewards={analyticData.risksRewards} />
                            </div>
                            <div>
                                <DateProfits dateProfits={analyticData.dateProfits.perWeek} />
                            </div>
                        </div>

                        <div className="bg-[#1A1D1F] w-full p-5">
                            <TradingAccountHistory orders={analyticData.orders} isPrivacy={true} updateAnalyticAccount={updateAnalyticAccount} />
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
