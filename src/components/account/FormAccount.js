import { withFormik } from "formik";
import * as Yup from 'yup';
import ButtonBlue from "../button/buttonBlue";
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
                    <label htmlFor="strategy">Your devise :</label>
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
                    <label htmlFor="strategy">Your balance :</label>
                    <input className="w-[250px] h-[45px] p-3 bg-[#111315] rounded-md placeholder-neutral-600"
                        type='number'
                        id="balance"
                        name="balance"
                        onChange={props.handleChange}
                        value={props.values.email}
                        onBlur={props.handleBlur}
                        placeholder="200000"
                    ></input>
                    {props.touched.balance && props.errors.balance && <span className="text-red-500">{props.errors.balance}</span>}
                </div>
                <div className="mt-8">
                    <ButtonBlue title={'add account'} />
                </div>
            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        strategy: "",
    }),
    validationSchema: Yup.object().shape({
        strategy: Yup.string()
            .required('strategy required.'),
        devise: Yup.string()
            .required('devise required.'),
        balance: Yup.number()
            .required('balance required.')
    }),
    handleSubmit: (values, { props }) => {

    }
})(FormAccount);