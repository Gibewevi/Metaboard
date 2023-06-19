import ContentHeader from "@/components/contentHeader/contentHeader";;
import NewOrderForm from "@/components/form/NewOrderForm";
import { useState } from "react";
export default function Orders(account_id) {
    const [orderFormOpen, setOrderFormOpen] = useState(false);

    const openNewOrderForm = () => {
        setOrderFormOpen(!orderFormOpen);
    };

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto flex flex-col gap-y-5 relative">

                <div className="flex flex-row items-center">
                    <ContentHeader icon={'/CarbonHomeBlue.svg'} title={'Open range break 129540'} />
                </div>

                <div className="flex flex-col gap-y-4 w-full">
                    <div className="w-full">
                        <button onClick={openNewOrderForm} className="max-w-[150px] float-right flex flex-row items-center justify-center border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white fill-[#35E2F7] hover:fill-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" /></svg>
                            <span>new order</span>
                        </button>
                    </div>
                </div>  
                <NewOrderForm isOpen={orderFormOpen} />



                <div className="bg-[#1A1D1F] w-full p-5">
                    <div>
                        <span>Trading account history</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const account_id = context.query.account_id;
    // try {

    // } catch {

    // }
    // récupération des données du compte
    // récupération des trades du compte
    return { props: { account_id } };
}
