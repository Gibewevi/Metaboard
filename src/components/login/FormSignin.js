import { withFormik } from "formik";
import * as Yup from 'yup';

function FormSignin(props) {
    return (
        <form className="flex flex-col gap-y-5">
            <div className="">
                <label for="email"></label>
                <input className="w-full h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-[#00cfe8]"
                    type='email'
                    id="email"
                    name="email"
                    onChange={props.handleChange}
                    value={props.values.email}
                    onBlur={props.handleBlur}
                    placeholder="john@exemple.com"
                ></input>
                {props.touched.email && props.errors.email && <span className="text-red-500">{props.errors.email}</span>}
            </div>
            <div>
                <label for="password"></label>
                <input className=" text-slate-800 w-full h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-[#00cfe8]"
                    type='password'
                    id="password"
                    name="password"
                    onChange={props.handleChange}
                    value={props.values.password}
                    onBlur={props.handleBlur}
                    placeholder="Password"
                ></input>
                {props.touched.password && props.errors.password && <span className="text-red-500">{props.errors.password}</span>}
            </div>
            <button type="submit" onClick={props.handleSubmit} className="bg-[#00cfe8] h-[45px] rounded-sm text-lg font-semibold hover:bg-white hover:text-[#00cfe8] transition-all duration-200 ease-in">Sign In</button>
            <div className="flex flex-row gap-x-3">
                <span>New on our platform?</span>
                <span onClick={props.handleSetSignupPage} className="font-black text-[#00cfe8] cursor-pointer">Sign up</span>
            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('You did not enter a valid email.')
            .required('email required.'),
        password: Yup.string()
            .required('password required.'),
    }),
    handleSubmit: (values, { props }) => {
        const formSignin = {
            email: values.email,
            password: values.password
        }
        props.submit(FormSignin);
    }
})(FormSignin);