import { useEffect, useState } from "react"
import SharedAccountPL from "../chart/sharedAccountPL";
import accountService from "@/services/Account";

export default function SharedAccount({ account, user_id }) {
    const [sharedAccount, setSharedAccount] = useState(account);
    const [isFavoritedByUser, setIsFavoritedByUser] = useState(sharedAccount.isFavoritedByUser);
    const [likes, setLikes] = useState(sharedAccount.likes);
    const [userIsLiked, setUserIsLiked] = useState(false);
    const accountId = sharedAccount.account_id;
    const userId = user_id;
    const [profitLoss, setProfitLoss] = useState(account.profitLoss);


    const handleAddLike = async() => {
        const isLike = await accountService.likeAccount(userId, accountId);
    };

    const handleRemoveFavorite = async() => {
        const isDelete = await accountService.deleteFavoriteAccount(userId, accountId);
        setIsFavoritedByUser(isDelete);
    };

    const handleAddFavorite = async () => {
        const isFavorite = await accountService.addFavoriteAccountByAccountId(userId, accountId);
        setIsFavoritedByUser(isFavorite);
    };

    return (
        <div className="flex flex-col gap-y-4 bg-[#1A1D1F] rounded-2xl min-w-[290px] p-4">
            <div className="flex flex-row justify-between items-center">
                <div className="flex justify-center items-center h-[30px] bg-[#282C2E] rounded-lg p-4">
                    <span className="text-sm text-[#8E9AAB]">strategy</span>
                </div>
                <div className="flex flex-row gap-x-4">

                    {isFavoritedByUser ?
                        <div className="group">
                            <div onClick={handleRemoveFavorite} className="fill-[#00cfe8] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"/></svg>
                            </div>
                        </div>
                        :
                        <div className="group">
                            <div className="fill-slate-200 group-hover:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z" /></svg>
                            </div>
                            <div onClick={handleAddFavorite} className="hidden group-hover:block group-hover:fill-slate-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z" /></svg>
                            </div>
                        </div>
                    }

                    <div className="group flex flex-row justify-items-center items-center gap-x-1">
                        <div className="fill-slate-200 group-hover:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64a5.7 5.7 0 0 1 0 8L16 26.13L5.64 15.64a5.7 5.7 0 0 1 0-8a5.48 5.48 0 0 1 7.82 0l2.54 2.6l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12a7.49 7.49 0 0 0-10.68 0a7.72 7.72 0 0 0 0 10.82L16 29l11.79-11.94a7.72 7.72 0 0 0 0-10.82A7.49 7.49 0 0 0 22.45 4Z" /></svg>
                        </div>
                        <div onClick={handleAddLike} className="hidden group-hover:block group-hover:fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M22.5 4c-2 0-3.9.8-5.3 2.2L16 7.4l-1.1-1.1c-2.9-3-7.7-3-10.6-.1l-.1.1c-3 3-3 7.8 0 10.8L16 29l11.8-11.9c3-3 3-7.8 0-10.8C26.4 4.8 24.5 4 22.5 4z" /></svg>
                        </div>
                        <span className="text-[#8E9AAB]">{likes}</span>
                    </div>

                </div>
            </div>
            <div className="flex flex-row gap-x-3 justify-between">
                <div className="flex flex-row gap-x-2">
                    <span className="text-[#C7CCD5]">{sharedAccount.strategy}</span>
                    <span className="text-[#00cfe8]">{sharedAccount.profit_and_loss_percent}%</span>
                </div>
                <span className="text-[#00cfe8]">{sharedAccount.profit_and_loss}$</span>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-[80px] rounded-xl p-4 bg-[#111315]">
                <div className="flex flex-col">
                    <span className="text-[#8E9AAB] font-thin">Initiale</span>
                    <span className="text-[#8E9AAB] font-thin">{sharedAccount.initial_balance}</span>
                </div>
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32"><path fill="currentColor" d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" /></svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#8E9AAB] font-thin">Current</span>
                    <span className="text-[#8E9AAB] font-thin">{sharedAccount.current_balance}</span>
                </div>
            </div>
            <button className="border border-[2px] border-gray-700 rounded-lg text-[#8E9AAB] p-1 hover:bg-[#282C2E] hover:text-[#8E9AAB] ">More Details</button>
            {/* <div>
                <SharedAccountPL profitLoss={profitLoss}/>
            </div> */}
            {/* <div><span>{sharedAccount.profit_and_loss}</span></div> */}
        </div>
    )
}