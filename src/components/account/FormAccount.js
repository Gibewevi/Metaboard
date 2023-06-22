import { withFormik } from "formik";
import * as Yup from 'yup';

function FormAccount(props) {
    return (
        <form className={`flex flex-col bg-[#1A1D1F] rounded-md transition-all duration-200 ease-in ${props.isVisible ? 'visible' : ' hidden'}`}>
            <div className="w-full flex justify-center items-center gap-x-3 rounded-t-md p-2">
                <img src='CarbonWallet.svg' className="w-[25px]" />
                <span className="text-lg font-bold">General account settings</span>
            </div>
            <div className="flex flex-row justify-around items-center">
                <div className="p-4 flex flex-col gap-y-2">
                    <label htmlFor="strategy">Your strategy :</label>
                    <input className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
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
                    <label htmlFor="devise">Your devise :</label>
                    <input className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
                        type='text'
                        id="devise"
                        name="devise"
                        onChange={props.handleChange}
                        value={props.values.devise}
                        onBlur={props.handleBlur}
                        placeholder="USD"
                    ></input>
                    {props.touched.devise && props.errors.devise && <span className="text-red-500">{props.errors.devise}</span>}
                </div>
                <div className="p-4 flex flex-col gap-y-2">
                    <label htmlFor="initiale_balance">Your balance :</label>
                    <input className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
                        type='number'
                        id="initiale_balance"
                        name="initiale_balance"
                        onChange={props.handleChange}
                        value={props.values.initiale_balance}
                        onBlur={props.handleBlur}
                        placeholder="200000"
                    ></input>
                    {props.touched.initiale_balance && props.errors.initiale_balance && <span className="text-red-500">{props.errors.initiale_balance}</span>}
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
        devise:"",
        initiale_balance:"",
    }),
    validationSchema: Yup.object().shape({
        strategy: Yup.string()
            .required('strategy required.'),
        devise: Yup.string()
            .required('devise required.'),
        initiale_balance: Yup.number()
            .required('balance required.')
    }),
    handleSubmit: (values, { props }) => {
        const account = {
            strategy: values.strategy,
            devise: values.devise,
            initiale_balance: values.initiale_balance,
            user: props.user.email
        }
        console.log(account)
        props.submit(account, props.API_URL);
    }
})(FormAccount);