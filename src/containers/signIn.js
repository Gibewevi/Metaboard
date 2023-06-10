export default function SignIn() {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-col gap-y-5 w-[500px] bg-[#1A1D1F] p-8">
                <h1 className="text-4xl font-black"><span className="">M</span><span className="text-[#00cfe8]">TB</span></h1>
                <div className="flex flex-col gap-y-2 tracking-widest">
                    <span className="text-2xl">Sign in<span className="text-[#00cfe8]">.</span></span>
                    <span>Simplify your trading experience with our user-friendly dashboard.</span>
                </div>
                <form className="flex flex-col gap-y-5">
                    <div className="">
                        <label for="email"></label>
                        <input className="w-full h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-[#00cfe8]" type='email' id="email" name="email" placeholder="john@exemple.com"></input>
                    </div>
                    <div>
                        <label for="password"></label>
                        <input className=" w-full h-[45px] p-3 focus:outline-none focus:ring-2 focus:ring-[#00cfe8]" type='password' id="password" name="password" placeholder="Password"></input>
                    </div>
                    <button className="bg-[#00cfe8] h-[45px] rounded-sm text-lg font-semibold">Sign In</button>
                </form>
            </div>
        </div>
    )
}