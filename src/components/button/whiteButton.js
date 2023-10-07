import Link from "next/link"
export default function WhiteButton(props) {
    return (
        <Link href={props.link}>
            <button className='text-[#D2D6DB] border border-1 border-[#D2D6DB] rounded-md p-1 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 ease-in-out '>More Accounts</button>
        </Link>
    )
}

// flex flex-row gap-x-1 pr-4 items-center justify-center fill-[#D2D6DB] hover:fill-slate-800 text-[#D2D6DB] border border-1 border-[#D2D6DB] max-w-[130px] rounded-md p-1 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 ease-in-out