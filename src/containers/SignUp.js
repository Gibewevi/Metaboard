import FormSignup from "@/components/login/FormSignup"
import { useState, useEffect } from "react"
import login from "@/components/services/login"

export default function SignUp(props) {

    const newUser = (account) => {
        const user = {
            email: account.email,
            password: account.password,
        }
        return user;
    }

    const sendAccountToDataBase = (account) => {
        newUser(account);
        login.signup(account);
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-col gap-y-5 w-[500px] bg-[#1A1D1F] p-8">
                <h1 className="text-4xl font-black"><span className="">M</span><span className="text-[#00cfe8]">TB</span></h1>
                <div className="flex flex-col gap-y-2 tracking-widest">
                    <span className="text-2xl">Adventure starts here<span className="text-[#00cfe8]">.</span></span>
                    <span>Make your trading easy and fun!</span>
                </div>
                <FormSignup submit={sendAccountToDataBase} handleSetSigninPage={props.handleSetSigninPage} />
            </div>
        </div>
    )
}