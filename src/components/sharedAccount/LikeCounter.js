import { useEffect, useRef, useState } from "react";
import accountService from "@/services/Account";
export default function LikeCounter({ sharedAccount, userId, accountId }) {
    const [likes, setLikes] = useState([sharedAccount.likes + 1, sharedAccount.likes, sharedAccount.likes - 1]);
    const [isLikedByUser, setIsLikedByUser] = useState(sharedAccount.isLikedByUser);

    const handleAddLike = async () => {
        const likes = await accountService.likeAccount(userId, accountId);
        if (Boolean(likes)) {
            setIsLikedByUser(true);
            // setLikes(likes);
        }
    };

    const handleRemoveLike = async () => {
        const likes = await accountService.unlikeAccount(userId, accountId);
        console.log('likes : ', likes);
        if (likes !== null && likes !== undefined) {
            setIsLikedByUser(false);
            // setLikes(likes);
        }
    }

    const ListLike = () => {
        return (
            <div
                className=' overflow-hidden w-[30px] h-[20px] relative'
            >
                <div  className={`like-container ${isLikedByUser ? 'translate-y-20' : 'translate-y-0'}`}>
                {likes.map((like, key) => (
                    <span
                        className={`h-[20px] w-[20px]`}
                        key={key}
                    >
                        {like}
                    </span>
                ))}
                </div>
            </div>
        );
    };

    return (
        <>
            {
                isLikedByUser ?
                    <div className="group flex flex-row justify-items-center items-center gap-x-1">
                        < div onClick={handleRemoveLike} className="fill-[#00cfe8]" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="M22.5 4c-2 0-3.9.8-5.3 2.2L16 7.4l-1.1-1.1c-2.9-3-7.7-3-10.6-.1l-.1.1c-3 3-3 7.8 0 10.8L16 29l11.8-11.9c3-3 3-7.8 0-10.8C26.4 4.8 24.5 4 22.5 4z" /></svg>
                        </div >
                        <div className="flex flex-col h-[20px] justify-center items-center transition-transform ease-in-out delay-75 duration-200">
                            <ListLike />
                        </div>
                    </div >
                    :
                    <div className="group flex flex-row justify-items-center items-center gap-x-1">
                        <div className="fill-[#8E9AAB] group-hover:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64a5.7 5.7 0 0 1 0 8L16 26.13L5.64 15.64a5.7 5.7 0 0 1 0-8a5.48 5.48 0 0 1 7.82 0l2.54 2.6l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12a7.49 7.49 0 0 0-10.68 0a7.72 7.72 0 0 0 0 10.82L16 29l11.79-11.94a7.72 7.72 0 0 0 0-10.82A7.49 7.49 0 0 0 22.45 4Z" /></svg>
                        </div>
                        <div onClick={handleAddLike} className="hidden group-hover:block group-hover:fill-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="M22.5 4c-2 0-3.9.8-5.3 2.2L16 7.4l-1.1-1.1c-2.9-3-7.7-3-10.6-.1l-.1.1c-3 3-3 7.8 0 10.8L16 29l11.8-11.9c3-3 3-7.8 0-10.8C26.4 4.8 24.5 4 22.5 4z" /></svg>
                        </div>
                        <div className="flex flex-col h-[20px] justify-center items-center transition-transform ease-in-out delay-75 duration-200">
                            <ListLike />
                        </div>
                    </div>
            }</>
    )
}