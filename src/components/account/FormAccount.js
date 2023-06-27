import { withFormik } from "formik";
import * as Yup from 'yup';

function FormAccount(props) {
    return (
        <form className={`flex flex-col bg-[#1A1D1F] rounded-md transition-all duration-200 ease-in ${props.isVisible ? 'visible' : ' hidden'}`}>
            <div className="w-full flex justify-center items-center gap-x-3 rounded-t-md p-2">
                <img src='CarbonWallet.svg' className="w-[25px]" />
                <span className="text-lg font-bold text-white">General account settings</span>
            </div>
            <div className="flex flex-row justify-around items-center">
                <div className="p-4 flex flex-col gap-y-2">
                    <label className="text-white" htmlFor="strategy">Your strategy :</label>
                    <input className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600 text-white"
                        type='text'
                        id="strategy"
                        name="strategy"
                        onChange={props.handleChange}
                        value={props.values.email}
                        onBlur={props.handleBlur}
                        placeholder="Open Range Break-out"
                    ></input>
                    {props.touched.strategy && props.errors.strategy && <span className="text-red-500">{props.errors.strategy}</span>}
                </div>
                <div className="p-4 flex flex-col gap-y-2">
                    <label className="text-white" htmlFor="devise">Your devise :</label>
                    <select
                        className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600 text-white"
                        id="devise"
                        name="devise"
                        onChange={props.handleChange}
                        value={props.values.devise}
                        onBlur={props.handleBlur}
                    >
                        <option value="">Select</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CHF">CHF - Swiss Franc</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="NZD">NZD - New Zealand Dollar</option>
                        <option value="HKD">HKD - Hong Kong Dollar</option>
                        <option value="SEK">SEK - Swedish Krona</option>
                        <option value="NOK">NOK - Norwegian Krone</option>
                        <option value="CNY">CNY - Chinese Yuan</option>
                        <option value="SGD">SGD - Singapore Dollar</option>
                        <option value="MXN">MXN - Mexican Peso</option>
                        <option value="INR">INR - Indian Rupee</option>
                    </select>
                    {props.touched.devise && props.errors.devise && <span className="text-red-500">{props.errors.devise}</span>}
                </div>

                {/* <div className="p-4 flex flex-col gap-y-2">
                    <label className="text-white" htmlFor="devise">Your devise :</label>
                    <input className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600 text-white"
                        type='text'
                        id="devise"
                        name="devise"
                        onChange={props.handleChange}
                        value={props.values.devise}
                        onBlur={props.handleBlur}
                        placeholder="USD"
                    ></input>
                    {props.touched.devise && props.errors.devise && <span className="text-red-500">{props.errors.devise}</span>}
                </div> */}
                <div className="p-4 flex flex-col gap-y-2">
                    <label className="text-white" htmlFor="initial_balance">Your balance :</label>
                    <input className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600 text-white"
                        type='number'
                        id="initial_balance"
                        name="initial_balance"
                        onChange={props.handleChange}
                        value={props.values.initial_balance}
                        onBlur={props.handleBlur}
                        placeholder="200000"
                    ></input>
                    {props.touched.initial_balance && props.errors.initial_balance && <span className="text-red-500">{props.errors.initial_balance}</span>}
                </div>
                <div className="mt-8">
                    <button type="submit" onClick={props.handleSubmit} className="border border-1 border-[#35E2F7] p-2 pt-1 pb-1 rounded-md text-[#35E2F7] transition-all ease-in duration-800 hover:bg-[#35E2F7] hover:text-white">add account</button>
                </div>
            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        strategy: "",
        devise: "",
        initial_balance: "",
    }),
    validationSchema: Yup.object().shape({
        strategy: Yup.string()
            .required('strategy required.'),
        devise: Yup.string()
            .required('devise required.'),
        initial_balance: Yup.number()
            .required('balance required.')
    }),
    handleSubmit: (values, { props }) => {
        const API_URL = props.API_URL;
        const account = {
            strategy: values.strategy,
            devise: values.devise,
            initial_balance: values.initial_balance,
            user: props.user.email
        }
        props.submit(account, API_URL);
    }
})(FormAccount);
