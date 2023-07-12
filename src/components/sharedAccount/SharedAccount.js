import { useState } from "react"
import SharedAccountPL from "../chart/sharedAccountPL";
export default function SharedAccount({account}){
    const [sharedAccount, setSharedAccount] = useState(account);
    const [profitLoss, setProfitLoss] = useState(account.profitLoss);
    return(
        <div className="flex flex-col bg-[#1A1D1F] rounded-2xl p-1 w-[300px] h-[300px]">
            <SharedAccountPL profitLoss={profitLoss}/>
        </div>
    )
}