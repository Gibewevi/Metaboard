import ContentHeader from "@/components/contentHeader/contentHeader";
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import ProfitLossChart from "@/components/chart/ProfitLoss";
import HeaderIndex from "@/components/accountOverview/HeaderIndex";
import Layout from "@/containers/Layout";
import NewOrder from "@/components/button/NewOrder";
import RiskRewardAverage from "@/components/chart/RiskRewardAverage";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";

export default function Performance({ account_id, profitLoss, account, risksRewards, ordersList }) {
    const [orderFormOpen, setOrderFormOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orders, setOrders] = useState(ordersList);

    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };

    const handleFormNewOrder = async (order) => {
        setOrderLoading(true);
        try {
            let newOrder = await ordersService.sendOrderIntoDataBase(order);
            const formatOrder = ordersService.format(newOrder);
            setOrders(currentOrders => [...currentOrders, formatOrder]);
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
                    <NewOrderForm submit={handleFormNewOrder} openNewOrderForm={openNewOrderForm} isOpen={orderFormOpen} account_id={account_id} orderLoading={orderLoading} />
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
                        <div className="bg-[#1A1D1F] w-full p-5">
                            <div>
                                <span className="text-white">Trading account history</span>
                            </div>
                            <TradingAccountHistory orders={orders} />
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
    const resProfitLosses = await fetch(`${API_URL}/api/account/profit-losses?account_id=${account_id}`, {
        method: 'GET'
    });

    const resriskRewardOrders = await fetch(`${API_URL}/api/orders/stats/risksRewards/?account_id=${account_id}`, {
        method: 'GET'
    });

    const resOrders = await fetch(`${API_URL}/api/account/orders?account_id=${account_id}`, {
        method: 'GET'
    });

    const risksRewards = await resriskRewardOrders.json();
    const orders = await resOrders.json();
    const { profitLoss, account } = await resProfitLosses.json();
    return {
        props: {
            account_id: account_id,
            profitLoss,
            account,
            risksRewards,
            ordersList: orders
        }
    };
}