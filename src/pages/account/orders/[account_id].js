import ContentHeader from "@/components/contentHeader/contentHeader";
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";
import HeaderIndex from "@/components/accountOverview/HeaderIndex";
import Layout from "@/containers/Layout";
import NewOrder from "@/components/button/NewOrder";

export default function Orders({ account_id, orders }) {
    const [orderFormOpen, setOrderFormOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [ordersHistory, setOrdersHistory] = useState(orders);

    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };


    const updateOrdersAfterRemoveOrder = (orders) => {
        let pendingOrders = [];
        orders.forEach(order => {
            let pendingOrder = formatNewOrder(order);
            pendingOrders.push(order);
        });
        console.log('pending : ', pendingOrders);
        setOrdersHistory(pendingOrders);
    };

    const formatNewOrder = (pOrder) => {
        const order = {
            account_id: parseInt(pOrder.account_id),
            order_id: parseInt(pOrder.order_id),
            asset: pOrder.asset,
            type: pOrder.type,
            open: parseFloat(pOrder.open),
            close: parseFloat(pOrder.close),
            closed_date: pOrder.closed_date,
            profit: parseFloat((Math.round(pOrder.profit * 100) / 100).toFixed(2)) || 0,
            profit_percent: parseFloat((Math.round(pOrder.profit_percent * 100) / 100).toFixed(2)) || 0,
            stop_loss: parseFloat(pOrder.stop_loss),
            risk: parseFloat((Math.round(pOrder.risk * 100) / 100).toFixed(2)),
            risk_method: pOrder.risk_method,
            picture: pOrder.picture || null
        };
        return order;
    };

    const handleFormNewOrder = async (order) => {
        setOrderLoading(true);
        try {
            let newOrder = await ordersService.sendOrderIntoDataBase(order);
            const formatOrder = formatNewOrder(newOrder);
            setOrdersHistory(currentOrders => [...currentOrders, formatOrder]);
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
                        <ContentHeader icon={'/CarbonHomeBlue.svg'} title={'Strategy'} />
                    </div>
                    <div className="flex flex-row">
                        <HeaderIndex account_id={account_id} />
                        <NewOrder onClick={openNewOrderForm} />
                    </div>
                    <NewOrderForm submit={handleFormNewOrder} openNewOrderForm={openNewOrderForm} isOpen={orderFormOpen} account_id={account_id} orderLoading={orderLoading} />
                    <div className="bg-[#1A1D1F] w-full p-5">
                        <div>
                            <span className="text-white">Trading account history</span>
                        </div>
                        <TradingAccountHistory orders={ordersHistory} updateOrdersAfterRemoveOrder={updateOrdersAfterRemoveOrder} />
                    </div>
                </div>
            </Layout>

        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const account_id = context.query.account_id;
        const API_URL = process.env.API_URL;
        const resOrders = await fetch(`${API_URL}/api/account/orders?account_id=${account_id}`, {
            method: 'GET'
        });
        if (!resOrders.ok) {
            throw new Error('Une erreur s\'est produite lors de la récupération des commandes.');
        }
        const data = await resOrders.json();
        const orders = data;
        return {
            props: {
                account_id: account_id,
                orders: orders,
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                error: 'Une erreur s\'est produite lors du traitement de la demande.'
            }
        };
    }
}
