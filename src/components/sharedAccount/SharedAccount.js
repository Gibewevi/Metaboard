import { useEffect, useState } from "react"
import SharedAccountPL from "../chart/sharedAccountPL";
import accountService from "@/services/Account";
import LikeCounter from "./LikeCounter";
import Favorite from "./Favorite";

export default function SharedAccount({ account, user_id }) {
    const [sharedAccount, setSharedAccount] = useState(account);
    const accountId = sharedAccount.account_id;
    const userId = user_id;

    return (
        <div className="flex flex-col gap-y-4 bg-[#1A1D1F] rounded-2xl min-w-[290px] min-h-[280px] p-3">

            <div className="flex flex-row justify-between items-center mt-2">
                <div className="flex justify-center items-center h-[30px] bg-[#282C2E] rounded-lg p-4">
                    <span className="text-sm text-[#8E9AAB]">strategy</span>
                </div>
                <div className="flex flex-row gap-x-4">
                    <Favorite userId={userId} sharedAccount={sharedAccount} accountId={accountId} />
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M13 15c1.485 0 2.554 1.497 3.686 3.081C17.998 19.918 19.486 22 22 22c5.67 0 7.78-10.79 8-12l-1.968-.358C27.55 12.282 25.394 20 22 20c-1.485 0-2.554-1.497-3.686-3.081C17.002 15.082 15.514 13 13 13c-4.186 0-7.445 7.404-9 11.762V2H2v26a2.002 2.002 0 0 0 2 2h26v-2H5.044c1.51-5.143 4.92-13 7.956-13Z" /></svg>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-x-3 justify-between">
                <div className="flex flex-row gap-x-3">
                    <span className="text-xl text-[#C7CCD5]">{sharedAccount.strategy}</span>
                    <div className="flex flex-row justify-center items-center gap-x-2">
                        <div className="flex justify-center items-center border border-1 border-[#00cfe8] fill-[#00cfe8] rounded-full p-1 w-[23px] h-[23px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203a.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" /></svg>
                        </div>
                        <span className="text-[#00cfe8]">{sharedAccount.profit_and_loss_percent}%</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center w-full h-[120px] rounded-xl p-4 bg-[#111315]">
                <div className="flex flex-col">
                    <span className="text-[#8E9AAB] font-thin">Initiale</span>
                    <span className="text-[#859099] font-thin">{sharedAccount.initial_balance}</span>
                    <span className="text-[#383E43] font-thin">{sharedAccount.entry_date}</span>
                </div>
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><path fill="currentColor" d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" /></svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#8E9AAB] font-thin">Current</span>
                    <span className="text-[#8E9AAB] font-thin">{sharedAccount.current_balance}</span>
                    <span className="text-[#383E43] font-thin">{sharedAccount.exit_date}</span>
                </div>
            </div>

            <div className="w-full flex justify-between items-center">
                <div>
                    <span className="text-[#8E9AAB]">Gain/Loss : </span>
                    <span className="text-[#00cfe8]">{sharedAccount.profit_and_loss}$</span>
                </div>
                <LikeCounter userId={userId} sharedAccount={sharedAccount} accountId={accountId} />
            </div>

        </div>
    )
}