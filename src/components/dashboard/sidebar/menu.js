import Link from "next/link"

export default function Menu(props) {

    return (
        <Link href={props.link}>
            <li className="flex flex-row items-center gap-x-3  hover:bg-gradient-to-r from-[#00cfe8] to-[#35E2F7] hover:shadow-custom hover:shadow-[#00cfe8]  transition-transform duration-200 ease-in hover:translate-x-1 p-1 hover:rounded-sm overflow-hidden"><img src={props.image} className="w-[22px]" />
            { props.unfold && <span className=" min-w-[250px] text-white">{props.title}</span>}
            </li>
        </Link>
    )
}