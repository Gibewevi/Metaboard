export default function ContentHeader(){
    return(
        <div className="w-full flex flex-row p-4 items-center gap-x-4">
            <span className="text-3xl">Accounts overview</span>
            <div className="flex flex-row border-t-0 border-b-0 border-r-0 border-l-[1px] border-gray-700 ml-2 h-[30px] justify-center items-center p-4">
                <img src='CarbonHomeBlue.svg'  className="w-[20px]"/>
                <img src='CarbonChevronRight.svg'  className="w-[20px]"/>
                <span className="text-gray-400"> Accounts overview</span>
            </div>
        </div>
    )
}