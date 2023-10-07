import Link from "next/link";
import numeral from "numeral";

export default function SocialHeader({account, headerTitle}) {

    function formatNumber(number) {
        if (number >= 1000) {
            return numeral(number).format('0.0a');
        } else {
            return number;
        }
    }
    
    return (
        <div>
            <div className="w-full flex flex-col gap-y-3">
                <div className="flex flex-row">
                    <span className="text-3xl pr-3 text-[#ADB6C2] border-t-0 border-b-0 border-r-[1px] border-l-0 border-gray-700">{account.strategy}</span>
                    <div className="flex flex-row items-center gap-x-2 ml-4">
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M17.74 30L16 29l4-7h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4.84Z" /><path d="M8 10h16v2H8zm0 6h10v2H8z" /></svg>
                            <span className="text-sm text-[#ADB6C2]">{formatNumber(account.comments)}</span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M22.5 4c-2 0-3.9.8-5.3 2.2L16 7.4l-1.1-1.1c-2.9-3-7.7-3-10.6-.1l-.1.1c-3 3-3 7.8 0 10.8L16 29l11.8-11.9c3-3 3-7.8 0-10.8C26.4 4.8 24.5 4 22.5 4z" /></svg>
                            <span className="text-sm text-[#ADB6C2]">{formatNumber(account.likes)}</span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z" /></svg>
                            <span className="text-sm text-[#ADB6C2]">{formatNumber(account.favorite_count)}</span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><circle cx="16" cy="16" r="4"  /><path d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z" /></svg>
                            <span className="text-sm text-[#ADB6C2]">{formatNumber(account.views)}</span>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-row  h-[30px] items-center">
                    <Link href='/accounts'>
                    <img src='/CarbonHomeBlue.svg' className="w-[20px]" />
                    </Link>
                    <img src='/CarbonChevronRight.svg' className="w-[20px]" />
                    <span className="text-gray-400">{headerTitle}</span>
                </div>
            </div>
        </div>
    )
}