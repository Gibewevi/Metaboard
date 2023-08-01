import { useState } from "react";
import accountService from "@/services/Account";
export default function Favorite({ sharedAccount, userId, accountId }) {
    const [isFavoritedByUser, setIsFavoritedByUser] = useState(sharedAccount.isFavoritedByUser);

    const handleRemoveFavorite = async () => {
        const isDelete = await accountService.deleteFavoriteAccount(userId, accountId);
        setIsFavoritedByUser(isDelete);
    };

    const handleAddFavorite = async () => {
        const isFavorite = await accountService.addFavoriteAccountByAccountId(userId, accountId);
        setIsFavoritedByUser(isFavorite);
    };
    return (
        <>
            {isFavoritedByUser ?
                <div className="group">
                    <div onClick={handleRemoveFavorite} className="fill-[#00cfe8] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z" /></svg>
                    </div>
                </div>
                :
                <div className="group">
                    <div className="fill-[#8E9AAB] group-hover:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z" /></svg>
                    </div>
                    <div onClick={handleAddFavorite} className="hidden group-hover:block group-hover:fill-slate-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z" /></svg>
                    </div>
                </div>
            }
        </>
    )
}