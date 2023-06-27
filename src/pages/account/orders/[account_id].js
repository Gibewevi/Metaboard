import ContentHeader from "@/components/contentHeader/contentHeader";
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";
import HeaderIndex from "@/components/accountOverview/HeaderIndex";
import Layout from "@/containers/Layout";
import NewOrder from "@/components/button/NewOrder";

export default function Orders({ account_id, orders, ratioLongShort }) {
    const [orderFormOpen, setOrderFormOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [ordersHistory, setOrdersHistory] = useState(orders);

    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };

    const formatNewOrder = (pOrder) => {
        const order = {
            account_id: parseInt(pOrder.account_id),
            asset: pOrder.asset,
            type: pOrder.type,
            open: parseFloat(pOrder.open),
            close: parseFloat(pOrder.close),
            closed_date: pOrder.closed_date,
            profit: Math.round(pOrder.profit * 100) / 100 || 0, // assumez 0 si le profit n'est pas fourni
            profit_percent: pOrder.profit_percent || 0, // assumez 0 si le profit_pourcent n'est pas fourni
            stop_loss: pOrder.stop_loss,
            amount: pOrder.amount
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
                        <ContentHeader icon={'/CarbonHomeBlue.svg'} title={'Open range break 129540'} />
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
                        <TradingAccountHistory orders={ordersHistory} />
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

        const resLongShort = await fetch(`${API_URL}/api/orders/stats/longshort`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orders)
        });

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
