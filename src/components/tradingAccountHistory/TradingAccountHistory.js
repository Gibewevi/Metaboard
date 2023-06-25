import { useState, useEffect } from "react"

export default function TradingAccountHistory(props) {

    const calculMaxPage = () => {
        let maxPage = orders.length / ordersPerPage;
        return Math.round(maxPage);
    };

    const [orders, setOrders] = useState(props.orders);
    const page = [5, 10, 25, 50, 100];
    const [ordersPerPage, setOrdersPerPage] = useState(5);
    const [pageSelect, setPageSelect] = useState(1);
    const [maxPage, setMaxPage] = useState(calculMaxPage)

    const handleSelectChange = (event) => {
        setPageSelect(1);
        const selectOrderMax = parseInt(event.target.value);
        setOrdersPerPage(selectOrderMax);
        const ordersMax = orders.length;
        const numberMaxPage = Math.round(ordersMax / selectOrderMax);
        setMaxPage(numberMaxPage);
    };

    const handlePageSelectLeft = () => {
        if (pageSelect === 1) {
            return;
        };
        let page = pageSelect - 1;
        setPageSelect(page);
    };
    const handlePageSelectRight = () => {
        if (pageSelect >= maxPage) {
            return;
        };
        let page = pageSelect + 1;
        setPageSelect(page);
    };

    const OrdersList = (orders) => {
        // calculate start and end indexes
        const startIndex = (pageSelect - 1) * ordersPerPage;
        const endIndex = Math.min(startIndex + ordersPerPage, orders.length);

        return orders.slice(startIndex, endIndex).map((order, key) => {
            return (
                <tr key={key} className={`${key % 2 === 0 ? 'bg-[#111315]' : ''} text-center hover:bg-[#00cfe8] group`}>
                    <td className="py-4 rounded-l-md text-white">{order.asset}</td>
                    <td className="py-4 text-white">{order.type}</td>
                    <td className="py-4 text-white">{order.open}</td>
                    <td className="py-4 text-white">{order.close}</td>
                    <td className="py-4 text-white">{order.closed_date}</td>
                    <td className={`${order.profit > 0 ? 'text-[#00cfe8] group-hover:text-white' : 'text-red-700'} py-4`}>{order.profit}</td>
                    <td className="py-4 rounded-r-md"><img src={'/CarbonDocumentBlank.svg'} className="w-[25px]" /></td>
                </tr>
            )
        })
    }


    return (
        <>
            <div className="flex flex-col w-full gap-y-5">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="py-4 text-white">SYMBOL</th>
                            <th className="py-4 text-white">TYPE</th>
                            <th className="py-4 text-white">OPEN</th>
                            <th className="py-4 text-white">CLOSE</th>
                            <th className="py-4 text-white">CLOSE DATE</th>
                            <th className="py-4 text-white">PROFIT</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {OrdersList(orders, ordersPerPage)}
                    </tbody>
                </table>

                <div className="flex flex-row items-center justify-between">

                    <div className="flex flew-row items-center gap-x-2">
                        <span className="font-light text-white">Per page</span>
                        <select
                            name="orderChoice"
                            id="orderChoice"
                            className="h-[40px] bg-[#111315] text-white focus:outline-none "
                            onChange={handleSelectChange}
                        >
                            {[5, 10, 25, 50, 100].map(value => (
                                <option key={value} value={value} className="text-center">{value}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <ul className="flex flex-row items-center gap-x-3 bg-[#111315]">
                            <li onClick={handlePageSelectLeft} className="hover:bg-[#00cfe8]"><img src={'/CarbonCaretLeft.svg'} /></li>
                            <li className='text-white' >{pageSelect}</li>
                            <li onClick={handlePageSelectRight} className="hover:bg-[#00cfe8]"><img src={'/CarbonCaretRight.svg'} /></li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}
