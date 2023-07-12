export default function SocialHeader(props) {
    return (
        <div>
            <div className="w-full flex flex-col gap-y-3">
                <div className="flex flex-row">
                    <span className="text-3xl pr-3 text-white border-t-0 border-b-0 border-r-[1px] border-l-0 border-gray-700">Open range break</span>
                    <div className="flex flex-row items-center gap-x-2 ml-4">
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M17.74 30L16 29l4-7h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4.84Z" /><path d="M8 10h16v2H8zm0 6h10v2H8z" /></svg>
                            <span className="text-sm">105</span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M22.5 4c-2 0-3.9.8-5.3 2.2L16 7.4l-1.1-1.1c-2.9-3-7.7-3-10.6-.1l-.1.1c-3 3-3 7.8 0 10.8L16 29l11.8-11.9c3-3 3-7.8 0-10.8C26.4 4.8 24.5 4 22.5 4z" /></svg>
                            <span className="text-sm">54</span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path d="M16 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" /></svg>
                            <span className="text-sm">21</span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-1 fill-[#00cfe8]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><circle cx="16" cy="16" r="4"  /><path d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z" /></svg>
                            <span className="text-sm">33</span>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-row  h-[30px] items-center">
                    <img src='/CarbonHomeBlue.svg' className="w-[20px]" />
                    <img src='/CarbonChevronRight.svg' className="w-[20px]" />
                    <span className="text-gray-400"> Accounts overview</span>
                </div>
            </div>
        </div>
    )
}