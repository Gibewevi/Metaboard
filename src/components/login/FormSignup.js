import { withFormik } from "formik";
import * as Yup from 'yup';

function FormSignup(props) {
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
            <div>
                <label for="confirmPassword"></label>
                <input className=" text-slate-800 w-full h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-[#00cfe8]"
                    type='confirmPassword'
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={props.handleChange}
                    value={props.values.password}
                    onBlur={props.handleBlur}
                    placeholder="Confirm your password"
                ></input>
                {props.touched.confirmPassword && props.errors.confirmPassword && <span className="text-red-500">{props.errors.confirmPassword}</span>}
            </div>
            <button type="submit" onClick={props.handleSubmit} className="bg-[#00cfe8] h-[45px] rounded-sm text-lg font-semibold hover:bg-white hover:text-[#00cfe8] transition-all duration-200 ease-in">Sign Up</button>
            <div className="flex flex-row gap-x-3">
                <span>Already have an account?</span>
                <span onClick={props.handleSetSigninPage} className="font-black text-[#00cfe8] cursor-pointer">Sign in.</span>
            </div>
        </form>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: "",
        confirmPassword: "",
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('You did not enter a valid email.')
            .required('email required.'),
        password: Yup.string()
            .required('password required.'),
        confirmPasswordpassword: Yup.string()
            .required('password required.'),
    }),
    handleSubmit: (values, { props }) => {
        const FormSignup = {
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }
        props.submit(FormSignup);
    }
})(FormSignup);