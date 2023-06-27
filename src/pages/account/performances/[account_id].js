import ContentHeader from "@/components/contentHeader/contentHeader";
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";
import ProfitLossChart from "@/components/chart/ProfitLoss";
import Link from "next/link";
import HeaderIndex from "@/components/accountOverview/HeaderIndex";
import Layout from "@/containers/Layout";
import NewOrder from "@/components/button/NewOrder";

export default function Performance({ account_id, profitLoss, account }) {
    const [orderFormOpen, setOrderFormOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);

    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };

    const handleFormNewOrder = async (order) => {
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
                        <ContentHeader icon={'/CarbonHomeBlue.svg'} title={'Open range break 129540'} />
                    </div>
                    <div className="flex flex-row">
                        <HeaderIndex account_id={account_id} />
                        <NewOrder onClick={openNewOrderForm}/>
                    </div>
                    <NewOrderForm submit={handleFormNewOrder} openNewOrderForm={openNewOrderForm} isOpen={orderFormOpen} account_id={account_id} orderLoading={orderLoading}/>
                    <ProfitLossChart profitLoss={profitLoss} account={account} />
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
    const { profitLoss, account } = await resOrders.json();
    return {
        props: {
            account_id: account_id,
            profitLoss,
            account
        }
    };
}
