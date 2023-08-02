import { useState } from "react";
import { format } from 'date-fns';

import orders from "@/services/Orders";
export default function Order(props) {
    const formattedDate = format(new Date(props.data.closed_date), 'dd-MM-yyyy');
    const [isPrivacy, SetIsPrivacy] = useState(props.isPrivacy);
    const [isOpen, setIsOpen] = useState(false);

    const removeOrder = async () => {
        try {
            let updatedOrders = await orders.deleteOrderById(props.data);
            props.updateAnalyticAccount();
        } catch (error) {
            console.error(error);
        }

    };

    const closeRemoveOrder = () => {
        setIsOpen(false);
    }

    const handleOrder = () => {
        setIsOpen(!isOpen);
    };

    return (
        <tr onMouseLeave={closeRemoveOrder} onClick={handleOrder} className={`${props.id % 2 === 0 ? 'bg-[#111315]' : ''} text-center group relative`}>
            <td className="relative py-4 rounded-l-md text-white group-hover:bg-[#00cfe8]">{props.data.asset}</td>
            <td className="relative py-4 text-[#ADB6C2] group-hover:bg-[#00cfe8]">{props.data.type}</td>
            <td className="relative py-4 text-[#ADB6C2] group-hover:bg-[#00cfe8]">{parseFloat(props.data.open).toFixed(4)}</td>
            <td className="relative py-4 text-[#ADB6C2] group-hover:bg-[#00cfe8]">{parseFloat(props.data.close).toFixed(4)}</td>
            <td className="relative py-4 text-[#ADB6C2] group-hover:bg-[#00cfe8]">{formattedDate}</td>
            <td className="relative py-4 text-[#ADB6C2] group-hover:bg-[#00cfe8]">{props.data.risk_reward}</td>
            <td className={`relative ${props.data.profit > 0 ? 'text-[#00cfe8] group-hover:text-white group-hover:bg-[#00cfe8]' : 'text-red-700 group-hover:bg-[#00cfe8]'} py-4`}>{props.data.profit}</td>
            {props.data.picture != null ?
                <td className="relative py-4 rounded-r-md group-hover:bg-[#00cfe8]">
                    <a href={props.data.picture} target="_blank" rel="noopener noreferrer">
                        <img src={'/CarbonDocumentBlank.svg'} className="w-[25px]" />
                    </a>
                </td>
                :
                <td className="relative py-4 rounded-r-md group-hover:bg-[#00cfe8]"></td>
            }
            {/* pas de hover ici  */}
            {isPrivacy &&
                <td className={`${isOpen ? 'w-[80px] visible' : 'w-0 invisible'} flex flex-row gap-x-4 overflow-hidden items-center justify-center absolute right-0 rounded-tl-md rounded-bl-md bg-white h-full transition-all duration-150 ease-in`}>
                    <div onClick={removeOrder} className="fill-[#00cfe8] hover:fill-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path d="M12 12h2v12h-2zm6 0h2v12h-2z" /><path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z" /></svg>
                    </div>
                    <div className="fill-[#00cfe8] hover:fill-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z" /></svg>
                    </div>
                </td>
            }
        </tr>

    );

};
