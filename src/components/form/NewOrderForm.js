import { useEffect, useState } from "react";
import { withFormik } from "formik";
import * as Yup from 'yup';
import ButtonBlue from "../button/buttonBlue";

function NewOrderForm(props) {
    const [orderChoice, setOrderChoice] = useState('percent');
    const handleSelectChange = (event) => {
        props.setFieldValue("orderChoice", event.target.value);
    };

    const handleCloseWindow = () => {
        props.openNewOrderForm();
    };

    return (
        <>
            {props.isOpen && (
                <form className="z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[500px] flex flex-col gap-y-5 bg-[#1A1D1F] p-5 border border-1 border-[#35E2F7] border-1">
                    <button onClick={handleCloseWindow} className=" fill-white hover:fill-[#35E2F7] absolute right-0 top-0 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" /></svg>
                    </button>
                    <div className="grid grid-cols-2 gap-8 ">
                        <div className="flex flex-col gap-y-2">
                            <label className='text-white' htmlFor="base">Asset :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] focus:bg-[#111315] rounded-md placeholder-neutral-600 text-white"
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
                            <label className="text-white" htmlFor="ClosedDate">Closed date :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] focus:bg-[#111315] rounded-md placeholder-neutral-600 text-neutral-600 text-white"
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
                            <label className="text-white" htmlFor="open">Open position :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] focus:bg-[#111315] rounded-md placeholder-neutral-600 text-white"
                                type="number"
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
                            <label className="text-white" htmlFor="close">Closed position :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] focus:bg-[#111315] rounded-md placeholder-neutral-600 text-white"
                                type="number"
                                id="close"
                                name="close"
                                onChange={props.handleChange}
                                value={props.values.close}
                                onBlur={props.handleBlur}
                                placeholder="29 000"
                            />
                            {props.touched.close && props.errors.close && (
                                <span className="text-red-500">{props.errors.close}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-white" htmlFor="stop_loss">Stop loss :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] focus:bg-[#111315] rounded-md placeholder-neutral-600 text-white"
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
                                    name="risk_method"
                                    id="risk_method"
                                    className="h-[45px] w-[80px] bg-white focus:bg-[#111315] text-black focus:outline-none border-t border-b border-r rounded-tl-md rounded-bl-md "
                                    value={props.values.risk_method} // utilisez props.values.orderChoice
                                    onChange={handleSelectChange}
                                >
                                    <option value="percent" className="text-center">%</option>
                                    <option value="fixed" className="text-center">fixed</option>
                                </select>
                                <div className="flex flex-col justify-center items-center">
                                    <input
                                        className="h-[45px] w-full p-3 bg-[#111315] focus:bg-[#111315] border-[#111315] border-t border-b border-r rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md placeholder-neutral-600 text-white"
                                        type="number"
                                        id="risk"
                                        name="risk"
                                        onChange={props.handleChange}
                                        value={props.values.risk}
                                        onBlur={props.handleBlur}
                                        placeholder={props.values.orderChoice === 'percent' ? "0.5" : "1000"}
                                    />
                                    {props.touched.risk && props.errors.risk && (
                                        <span className="text-red-500">{props.errors.risk}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center mt-2">
                        <div className="flex flex-1 flex-col gap-y-2 mr-5 ">
                            <label className="text-white" htmlFor="picture">Tradingview (facultatif) :</label>
                            <input
                                className=" h-[45px] p-3 bg-[#111315] focus:bg-[#111315] rounded-md placeholder-neutral-600 text-white"
                                type="text"
                                id="picture"
                                name="picture"
                                onChange={props.handleChange}
                                value={props.values.picture}
                                onBlur={props.handleBlur}
                                placeholder="https://www.tradingview.com/x/j2VANrs3/"
                            />
                            {props.touched.picture && props.errors.picture && (
                                <span className="text-red-500">{props.errors.picture}</span>
                            )}
                        </div>
                        <div>
                            {props.orderLoading ?
                                <button
                                    disabled
                                    className="flex flex-row items-center justify-center gap-x-2 mt-5 w-[130px] float-right border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white"
                                >
                                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-[#1A1D1F] rounded-full"></div>
                                    Process
                                </button>
                                :
                                <button type='submit' onClick={props.handleSubmit} className="mt-5 w-[130px] float-right border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white">add order</button>
                            }
                        </div>


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
        risk: "",
        risk_method: "percent",
        picture: ""
    }),
    validationSchema: Yup.object().shape({
        asset: Yup.string()
            .required('Asset is required.')
            .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed for asset name.'),
        open: Yup.number()
            .required('Open position is required.')
            .positive('Open position must be a positive number.')
            .moreThan(0, 'Open position must be greater than 0.'),
        close: Yup.number()
            .required('Closed position is required.')
            .positive('Closed position must be a positive number.'),
        closed_date: Yup.date()
            .required('Closed date is required.'),
        stop_loss: Yup.number()
            .required('Stop loss is required.')
            .positive('Stop loss must be a positive number.'),
            risk: Yup.number()
            .required('Amount is required.')
            .positive('Amount must be a positive number.'),
            risk_method: Yup.string()
            .required('Order choice is required.')
            .oneOf(['percent', 'fixed'], 'Invalid order choice.'),
        picture: Yup.string()
            .matches(
                /^https:\/\/www\.tradingview\.com\//,
                'Picture URL must start with "https://www.tradingview.com/"'
            )
            .url('Invalid URL for the Tradingview.')
    }),

    handleSubmit: async (values, { props }) => {
        const account_id = props.account_id;
        let riskPercent = null;
        if(values.risk_method=='percent'){
            riskPercent = values.risk;
        }
        const order = {
            asset: values.asset,
            open: values.open,
            close: values.close,
            closed_date: values.closed_date,
            stop_loss: values.stop_loss,
            risk: values.risk,
            risk_percent : riskPercent, 
            risk_method: values.risk_method,
            account_id: account_id,
            picture: values.picture
        };
        await props.submit(order);
    }
})(NewOrderForm);

