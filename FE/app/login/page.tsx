'use client'
import { FaCircleUser, FaCircleChevronRight, FaGoogle, FaFacebook } from "react-icons/fa6";
import Cookies from 'js-cookie';
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

    async function handleLogin() {
        try {
            const response =  await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/account/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: username,
                    passWord: password}),
            });

            if (response.ok) {
                const res = await response.json();
                const status = response.status;
                Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: 'Strict' });
                if (res.data.role == "Customer") {
                    Cookies.set("id", res.data.info.customerId, { expires: 7, secure: true, sameSite: 'Strict' });
                    Cookies.set("role", res.data.role, { expires: 7, secure: true, sameSite: 'Strict' });
                    router.push("/");
                }
                if (res.data.role == "Shop") {
                    Cookies.set("id", res.data.info.shopId, { expires: 7, secure: true, sameSite: 'Strict' });
                    Cookies.set("role", res.data.role, { expires: 7, secure: true, sameSite: 'Strict' });
                    router.push(`/seller/${res.data.info.shopId}`);
                }

                console.log(res);
                console.log(status);
            } else {
                const status = response.status;
                if (status != 200) {
                    console.log("Sai ten dang nhap hoac mat khau");
                }
            }


        } catch (error) {
            console.log("Loi",error);
        }
    }
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
                    <span className={`font-sf font-[800] text-[35px] ml-[10px]`}>ĐĂNG NHẬP</span>
                </div>
                <div className={`w-[400px] flex flex-col mt-[30px]`}>
                    <span className={`font-sf text-gray-700 font-[600] text-[20px]`}>TÊN ĐĂNG NHẬP</span>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tài khoản của bạn"
                        className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-gray-200 border rounded-[4px] px-[15px]`}
                    />
                </div>
                <div className={`w-[400px] flex flex-col mt-[20px]`}>
                    <span className={`font-sf text-gray-700 font-[600] text-[20px]`}>MẬT KHẨU</span>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu của bạn"
                        className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-gray-200 border rounded-[4px] px-[15px]`}
                    />
                </div>
                <div className={`w-[400px] flex flex-col mt-[10px]`}>
                    <span className={`font-sf text-blue-500 font-[400] text-[15px]`}>Quên mật khẩu?</span>
                </div>
                <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                    <div className={`col-span-7 flex rounded-[4px] bg-blue-500 justify-center items-center hover:bg-gray-700 transition-all duration-200`} onClick={handleLogin}>
                        <span className={`text-gray-50 font-sf text-[20px] font-[600] select-none`}>ĐĂNG NHẬP</span>
                    </div>
                    <button onClick={()=> router.push("/register")} className={`col-span-3 flex rounded-[4px] bg-blue-500 justify-center items-center hover:bg-gray-700 transition-all duration-200`}>
                        <span className={`text-gray-50 font-sf text-[15px] font-[400] select-none`}>ĐĂNG KÝ</span>
                        <FaCircleChevronRight className={`text-gray-50 text-[18px] ml-[10px]`} />
                    </button>
                </div>
                <div className={`w-[400px] flex justify-between items-center mt-[20px]`}>
                    <div className={`flex-1 border-b h-[1px] border-gray-200`}>

                    </div>
                    <p className={`text-gray-400 font-sf text-[16px] font-[300] px-[10px]`}>hoặc</p>
                    <div className={`flex-1 border-b h-[1px] border-gray-200`}>
                    </div>
                </div>
                <div className={`w-[300px] h-[45px] grid grid-cols-2 gap-[20px] mt-[20px]`}>
                    <div className={`col-span-1 rounded-[4px] border-gray-200 border flex items-center pl-[10px] group hover:bg-gray-700 transition-all duration-300 `}>
                        <FaGoogle className="text-[20px] text-blue-500 group-hover:text-gray-50  " />
                        <p className={`font-sf text-gray-700 text-[15px] font-[500] group-hover:text-gray-50 text-center flex-1 select-none`}>Google</p>
                    </div>
                    <div className={`col-span-1 rounded-[4px] border-gray-200 border flex items-center pl-[10px] group hover:bg-gray-700`}>
                        <FaFacebook className="text-[20px] text-blue-500  group-hover:text-gray-50" />
                        <p className={`font-sf text-gray-700 text-[15px] font-[500] text-center flex-1 select-none group-hover:text-gray-50`}>Facebook</p>
                    </div>
                </div>

            </div>
        </div>
    )
}