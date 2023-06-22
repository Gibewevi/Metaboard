import { useState } from "react";
import { withFormik } from "formik";
import * as Yup from 'yup';
import ButtonBlue from "../button/buttonBlue";

function NewOrderForm(props) {
    const [orderChoice, setOrderChoice] = useState('percent');

    const handleSelectChange = (event) => {
        props.setFieldValue("orderChoice", event.target.value);
        console.log(event.target.value);
    };

    return (
        <>
            {props.isOpen && (
                <form className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[500px] flex flex-col gap-y-5 bg-[#1A1D1F] p-5">
                    <div className="grid grid-cols-2 gap-8 ">
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="base">Asset :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
                                type="text"
                                id="asset"
                                name="asset"
                                onChange={props.handleChange}
                                value={props.values.asset}
                                onBlur={props.handleBlur}
                                placeholder="BTCUSDT"
                            />
                            {props.touched.asset && props.errors.asset && (
                                <span className="text-red-500">{props.errors.asset}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="ClosedDate">Closed date :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600 text-neutral-600"
                                type="date"
                                id="closed_date"
                                name="closed_date"
                                onChange={props.handleChange}
                                value={props.values.closed_date}
                                onBlur={props.handleBlur}
                                placeholder="19/06/2023"
                            />
                            {props.touched.closed_date && props.errors.closed_date && (
                                <span className="text-red-500">{props.errors.closed_date}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="open">Open position :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
                                type="text"
                                id="open"
                                name="open"
                                onChange={props.handleChange}
                                value={props.values.open}
                                onBlur={props.handleBlur}
                                placeholder="28 500"
                            />
                            {props.touched.open && props.errors.open && (
                                <span className="text-red-500">{props.errors.open}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="close">Closed position :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
                                type="text"
                                id="close"
                                name="close"
                                onChange={props.handleChange}
                                value={props.values.close}
                                onBlur={props.handleBlur}
                                placeholder="29 000"
                            />
                            {props.touched.close && props.errors.close && (
                                <span className="text-red-500">{props.errors.closeclosedPosition}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="stop_loss">Stop loss :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
                                type="number"
                                id="stop_loss"
                                name="stop_loss"
                                onChange={props.handleChange}
                                value={props.values.stop_loss}
                                onBlur={props.handleBlur}
                                placeholder="28 000"
                            />
                            {props.touched.stop_loss && props.errors.stop_loss && (
                                <span className="text-red-500">{props.errors.stop_loss}</span>
                            )}
                        </div>
                        <div className="flex flex-row items-center relative">
                            <div className="flex flex-row absolute bottom-0">
                                <select
                                    name="orderChoice"
                                    id="orderChoice"
                                    className="h-[45px] w-[80px] bg-white text-black focus:outline-none border-t border-b border-r rounded-tl-md rounded-bl-md"
                                    value={props.values.orderChoice} // utilisez props.values.orderChoice
                                    onChange={handleSelectChange}
                                >
                                    <option value="percent" className="text-center">%</option>
                                    <option value="fixed" className="text-center">fixed</option>
                                </select>
                                <div className="flex flex-col justify-center items-center">
                                    <input
                                        className="h-[45px] w-full p-3 bg-[#111315] border-[#111315] border-t border-b border-r rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md placeholder-neutral-600"
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        onChange={props.handleChange}
                                        value={props.values.amount}
                                        onBlur={props.handleBlur}
                                        placeholder={props.values.orderChoice === 'percent' ? "0.5" : "1000"}
                                    />
                                    {props.touched.amount && props.errors.amount && (
                                        <span className="text-red-500">{props.errors.amount}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button type='submit' onClick={props.handleSubmit} className="mt-5 w-[130px] float-right border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white">add order</button>
                    </div>
                </form>
            )}
        </>
    );
}


export default withFormik({
    mapPropsToValues: () => ({
        asset: "",
        open: "",
        close: "",
        closed_date: "",
        stop_loss: "",
        amount: "",
        orderChoice: "percent"
    }),
    validationSchema: Yup.object().shape({
        asset: Yup.string()
            .required('base required.'),
    }),
    handleSubmit: (values, { props }) => {
        const account_id = props.account_id;
        const order = {
            asset: values.asset,
            open: values.open,
            close: values.close,
            closed_date: values.closed_date,
            stop_loss: values.stop_loss,
            amount: values.amount,
            orderChoice: values.orderChoice, 
            account_id : account_id
        };
        props.submit(order);
    }
})(NewOrderForm);

