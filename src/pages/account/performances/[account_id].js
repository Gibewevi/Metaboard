import ContentHeader from "@/components/contentHeader/contentHeader";
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import ProfitLossChart from "@/components/chart/ProfitLoss";
import HeaderIndex from "@/components/accountOverview/HeaderIndex";
import Layout from "@/containers/Layout";
import NewOrder from "@/components/button/NewOrder";
import RiskRewardAverage from "@/components/chart/RiskRewardAverage";

export default function Performance({ account_id, profitLoss, account, risksRewards }) {
    const [orderFormOpen, setOrderFormOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);

    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };

    const handleFormNewOrderFromPerformance = async (order) => {
        setOrderLoading(true);
        try {
            let newOrder = await ordersService.sendOrderIntoDataBase(order);
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
                    <div className="flex flex-row items-center">
                        <ContentHeader icon={'/CarbonHomeBlue.svg'} title={account.strategy} />
                    </div>
                    <div className="flex flex-row">
                        <HeaderIndex account_id={account_id} />
                        <NewOrder onClick={openNewOrderForm} />
                    </div>
                    <NewOrderForm submit={handleFormNewOrderFromPerformance} openNewOrderForm={openNewOrderForm} isOpen={orderFormOpen} account_id={account_id} orderLoading={orderLoading} />
                    <div className=" flex flex-col w-full gap-y-6">

                        <ProfitLossChart profitLoss={profitLoss} account={account} />

                        <div className="flex flex-row gap-x-4 w-full">
                            <div className="w-full">
                                <RiskRewardAverage risksRewards={risksRewards} />
                            </div>
                            <div className="w-full">
                                <RiskRewardAverage risksRewards={risksRewards} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context) {
    const account_id = context.query.account_id;
    const API_URL = process.env.API_URL;
    const resOrders = await fetch(`${API_URL}/api/account/profit-losses?account_id=${account_id}`, {
        method: 'GET'
    });

    const resriskRewardOrders = await fetch(`${API_URL}/api/orders/stats/risksRewards/?account_id=${account_id}`, {
        method: 'GET'
    });
    const risksRewards = await resriskRewardOrders.json();
    const { profitLoss, account } = await resOrders.json();
    return {
        props: {
            account_id: account_id,
            profitLoss,
            account,
            risksRewards
        }
    };
}
