import Link from "next/link"
export default function ReturnButton(props){
    return (
        <Link href={props.link}>
            <button className={`${props.css} flex flex-row gap-x-1 pr-4 items-center justify-center fill-[#D2D6DB] hover:fill-slate-800 text-[#D2D6DB] border border-1 border-[#D2D6DB] max-w-[130px] rounded-md p-1 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 ease-in-out`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="M10 16L20 6l1.4 1.4l-8.6 8.6l8.6 8.6L20 26z"/></svg>
                {props.title}
                </button>
        </Link>
    )
}