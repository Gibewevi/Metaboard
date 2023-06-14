import Menu from "./menu"
import { useState, useEffect } from "react"

export default function Sidebar() {

    const [unfold, setIsUnfold] = useState(false);

    useEffect(() => {
        const getUnfoldInLocalStorage = () => {
            const unfold = localStorage.getItem("sidebarUnfold");
            if(unfold){
                return JSON.parse(unfold);
            } else {
                return false;
            }
        }
        setIsUnfold(getUnfoldInLocalStorage());
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebarUnfold", JSON.stringify(unfold));
    }, [unfold]);

    const unfoldIsHover = () => {
        setIsUnfold(true);
    }
    const unfoldIsNotHover = () => {
        setIsUnfold(false);
    }
    return (
        <div
            onMouseLeave={unfoldIsNotHover}
            onMouseEnter={unfoldIsHover}
            className={`${unfold ? 
                "absolute left-0 grow h-full transition-all duration-200 ease-in w-[250px] bg-[#1A1D1F] p-5" 
                :
                "absolute left-0 grow h-full transition-all duration-200 ease-in w-[90px] bg-[#1A1D1F] p-5" 
               }`}
        >
            <div className={`${unfold ? "list-none flex flex-col gap-y-4 justify-center mt-6" : "list-none flex flex-col gap-y-4 justify-center items-center mt-6"}`}>
                <Menu title='Accounts overview' image='/CarbonHome.svg' link='/accounts' unfold={unfold} />
                <Menu title='Profil' image='/CarbonUser.svg' link='profil' unfold={unfold} />
                <Menu title='Leaderboard' image='/CarbonBookmarkAdd.svg' link='leaderboard' unfold={unfold} />
            </div>
        </div>
    )
}