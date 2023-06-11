export default function Header(props) {

    return (
        <div className="flex flex-shrink-0 justify-between items-center bg-[#1A1D1F] border border-1 border-r-0 border-l-0 border-t-0 border-b-1 border-slate-700 h-[50px] shadow-xl">
            <div className="flex flex-row gap-x-3 ml-8">
                <h1 className=" font-satoshi text-[#00cfe8] text-xl font-black">MT<span className="text-white">B</span><span className="text-sm text-white"> alpha</span></h1>
            </div>
            <div className="flex flex-row justify-center items-center gap-x-5 list-none font-light font-satoshi text-md relative mr-8">
                <li >Community</li>
                <li >Market</li>
                <li >Developers</li>
                <li >Roadmap</li>
            </div>
        </div>
    )
}