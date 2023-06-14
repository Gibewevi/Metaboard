import FormSignin from "@/components/login/FormSignin";
import login from "@/components/services/Login";
import { parseCookies } from 'nookies';
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
    const router = useRouter();
    const {setAccount} = useContext(AuthContext);

    const signIn = async(account) => {
       const user = await login.signin(account);
       if(user.valid){
        setAccount(user);
        router.push('/accounts');
       };
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-col gap-y-5 w-[500px] bg-[#1A1D1F] p-8">
                <h1 className="text-4xl font-black">
                    <span className="">M</span>
                    <span className="text-[#00cfe8]">TB</span>
                </h1>
                <div className="flex flex-col gap-y-2 tracking-widest">
                    <span className="text-2xl">
                        Sign in<span className="text-[#00cfe8]">.</span>
                    </span>
                    <span>
                        Simplify your trading experience with our user-friendly dashboard.
                    </span>
                </div>
                <FormSignin submit={signIn} />
            </div>
        </div>
    );
};

