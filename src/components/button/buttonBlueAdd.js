export default function ButtonBlueAdd(props) {
    return (
        <button className="flex flex-row items-center justify-center border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white fill-[#35E2F7] hover:fill-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z"/></svg>
            <span>{props.title}</span>
        </button>
    )
}