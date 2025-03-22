'use client'
import { FaCircleUser, FaCircleChevronRight, FaGoogle, FaFacebook } from "react-icons/fa6";
import { LuHouse } from "react-icons/lu";
import Breadcrumb from "@/app/components/breadcrumb";
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const breadcrumbs = [
        { name: "Login", href: "/login" },

    ];
    return (
        <div className={`flex w-full items-center justify-center  bg-gray-50 flex-col`}>

                <div className="w-[1300px] h-[40px]  mt-[10px] px-[10px] items-center flex ">

                        <div className="flex items-center w-[250px] h-full ">
                            <Breadcrumb breadcrumbs={breadcrumbs} />
                        </div>

                </div>

            <div className={`w-[500px] h-[600px] rounded-[5px] shadow-[0px_0px_5px_rgba(0,0,0,0.2)] flex flex-col items-center bg-white mb-[50px]`}>
                <div className={`h-[120px] w-[400px] flex justify-center items-center pt-[20px] text-gray-700 border-b border-gray-200`}>
                    <FaCircleUser className={`text-[40px] `} />
                    <span className={`font-fre font-[700] text-[35px] ml-[10px]`}>SIGN IN</span>
                </div>
                <div className={`w-[400px] flex flex-col mt-[30px]`}>
                    <span className={`font-pop text-gray-700 font-[500] text-[20px]`}>USERNAME</span>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className={`flex mt-[10px] items-center font-pop w-full focus:outline-none h-[45px] border-gray-200 border rounded-[4px] px-[15px]`}
                    />
                </div>
                <div className={`w-[400px] flex flex-col mt-[20px]`}>
                    <span className={`font-pop text-gray-700 font-[500] text-[20px]`}>PASSWORD</span>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your password"
                        className={`flex mt-[10px] items-center font-pop w-full focus:outline-none h-[45px] border-gray-200 border rounded-[4px] px-[15px]`}
                    />
                </div>
                <div className={`w-[400px] flex flex-col mt-[10px]`}>
                    <span className={`font-pop text-blue-500 font-[300] text-[15px]`}>Forgot password?</span>
                </div>
                <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                    <div className={`col-span-7 flex rounded-[4px] bg-blue-500 justify-center items-center hover:bg-gray-700 transition-all duration-200`}>
                        <span className={`text-gray-50 font-pop text-[20px] font-[600] select-none`}>Sign in</span>
                    </div>
                    <button onClick={()=> router.push("/register")} className={`col-span-3 flex rounded-[4px] bg-blue-500 justify-center items-center hover:bg-gray-700 transition-all duration-200`}>
                        <span className={`text-gray-50 font-pop text-[15px] font-[400] select-none`}>Sign up</span>
                        <FaCircleChevronRight className={`text-gray-50 text-[18px] ml-[10px]`} />
                    </button>
                </div>
                <div className={`w-[400px] flex justify-between items-center mt-[20px]`}>
                    <div className={`flex-1 border-b h-[1px] border-gray-200`}>

                    </div>
                    <p className={`text-gray-400 font-pop text-[16px] font-[300] px-[10px]`}>OR</p>
                    <div className={`flex-1 border-b h-[1px] border-gray-200`}>
                    </div>
                </div>
                <div className={`w-[300px] h-[45px] grid grid-cols-2 gap-[20px] mt-[20px]`}>
                    <div className={`col-span-1 rounded-[4px] border-gray-200 border flex items-center pl-[10px] group hover:bg-gray-700 transition-all duration-300 `}>
                        <FaGoogle className="text-[20px] text-blue-500 group-hover:text-gray-50  " />
                        <p className={`font-pop text-gray-700 text-[15px] font-[500] group-hover:text-gray-50 text-center flex-1 select-none`}>Google</p>
                    </div>
                    <div className={`col-span-1 rounded-[4px] border-gray-200 border flex items-center pl-[10px] group hover:bg-gray-700`}>
                        <FaFacebook className="text-[20px] text-blue-500  group-hover:text-gray-50" />
                        <p className={`font-pop text-gray-700 text-[15px] font-[500] text-center flex-1 select-none group-hover:text-gray-50`}>Facebook</p>
                    </div>
                </div>

            </div>
        </div>
    )
}