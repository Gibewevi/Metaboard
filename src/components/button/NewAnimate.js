export default function NewOrder(props) {
    return (
        <button onClick={props.onClick} className="group flex items-center justify-center w-[40px] h-[40px] hover:w-[140px] border border-1 border-[#35E2F7] rounded-lg hover:bg-[#35E2F7] fill-[#35E2F7] hover:fill-white hover:text-white transition-all ease-in-out duration-300 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" /></svg>
            <span className="hidden group-hover:inline-flex whitespace-nowrap text-white transition-opacity duration-300">{props.title}</span>
        </button>
    )
}