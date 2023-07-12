import Link from "next/link"
import NewOrderForm from "../form/NewOrderForm"
import { useState } from "react";
import ordersService from "@/services/Orders";

export default function HeaderIndex(props) {
    const account_id = props.account_id;
    return (
        <div className="flex flex-row items-center justify-around ml-2 gap-x-2 w-full">
            <div className="flex flex-1 flex-row gap-x-5 items-center">
                <Link href={`/account/performances/${props.account_id}`}>
                    <span className="text-xl font-light text-white">Analytics</span>
                </Link>
            </div>
        </div>
    )
}