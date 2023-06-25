import { withFormik } from "formik";
import * as Yup from 'yup';
import login from "../../services/Login";
import Link from "next/link";
function FormSignup(props) {
    return (
        <form className="flex flex-col gap-y-5">
            <div className="">
                <label htmlFor="email"></label>
                <input className="w-full h-[45px] p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00cfe8]"
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
                <label htmlFor="password"></label>
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
                <label htmlFor="confirmPassword"></label>
                <input className=" text-slate-800 w-full h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-[#00cfe8]"
                    type='password'
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={props.handleChange}
                    value={props.values.confirmPassword}
                    onBlur={props.handleBlur}
                    placeholder="Confirm your password"
                ></input>
                {props.touched.confirmPassword && props.errors.confirmPassword && <span className="text-red-500">{props.errors.confirmPassword}</span>}
            </div>
            <button type="submit" onClick={props.handleSubmit} className="bg-[#00cfe8] h-[45px] rounded-sm text-lg font-semibold text-white hover:bg-white hover:text-[#00cfe8] transition-all duration-200 ease-in">Sign Up</button>
            <span className="text-red-600 text-md">{props.mess}</span>
            <div className="flex flex-row gap-x-3">
                <span className="text-white">Already have an account?</span>
                <Link href="/signin">
                <span onClick={props.handleSetSigninPage} className="font-black text-[#00cfe8] cursor-pointer">Sign in.</span>
                </Link>
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
        .email("The email is not in the correct format")
        .required("The email is required"),
        password: Yup.string()
        .min(8, "The password must be at least 8 characters long")
        .matches(/[A-Z]/, "The password must contain at least one uppercase letter")
        .matches(/[a-z]/, "The password must contain at least one lowercase letter")
        .matches(/[0-9]/, "The password must contain at least one digit")
        .matches(/[@!&]/, "The password must contain at least one special character (@,!,&)")
        .required('The password is required'),
        confirmPassword : Yup.string()
        .oneOf([Yup.ref('password')],"The password does not match")
        .required('You must confirm your password')
    }),
    handleSubmit: (values, { props }) => {
        const account = {
            email: values.email,
            password: values.password,
        }
        props.submit(account);
    }
})(FormSignup);