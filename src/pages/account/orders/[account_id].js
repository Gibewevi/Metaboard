import ContentHeader from "@/components/contentHeader/contentHeader";
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
import ordersService from "@/services/Orders";
import TradingAccountHistory from "@/components/tradingAccountHistory/TradingAccountHistory";
import LongShortRatio from "@/components/chart/LongShortRation";
import Link from "next/link";

export default function Orders({ account_id, orders, ratioLongShort }) {
    const [orderFormOpen, setOrderFormOpen] = useState(false);
    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };

    const handleFormNewOrder = async (order) => {
        await ordersService.sendOrderIntoDataBase(order);
    };

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



                <div className="flex flex-col gap-y-4 w-full">
                    <div className="w-full">
                        <button onClick={openNewOrderForm} className="max-w-[150px] float-right flex flex-row items-center justify-center border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white fill-[#35E2F7] hover:fill-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" /></svg>
                            <span>new order</span>
                        </button>
                    </div>
                </div>
                <NewOrderForm submit={handleFormNewOrder} isOpen={orderFormOpen} account_id={account_id} />

                <div className="bg-[#1A1D1F] w-full p-5">
                    <div>
                        <span>Trading account history</span>
                    </div>
                    <TradingAccountHistory orders={orders} />
                </div>

                <div className="w-full h-10">
                    <div className="w-[250px]">
                        <LongShortRatio ratio={ratioLongShort} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const account_id = context.query.account_id;
        const API_URL = 'http://localhost:3000';
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
        const ratioLongShort = await resLongShort.json();
        console.log(ratioLongShort);

        return {
            props: {
                account_id: account_id,
                orders: orders,
                ratioLongShort: ratioLongShort
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
