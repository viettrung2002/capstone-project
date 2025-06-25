'use client'
import { FaCircleUser, FaCircleChevronRight } from "react-icons/fa6";
import Cookies from 'js-cookie';
// import Breadcrumb from "@/app/components/breadcrumb";
import {useState} from "react";
import {useRouter} from "next/navigation";
import AlertMessage from "../components/alert";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [notifContent, setNotifContent] = useState("");
    const router = useRouter();
    // const breadcrumbs = [
    //     { name: "Login", href: "/login" },
    //
    // ];

    async function handleForgotPassword() {
        try {
            const response =  await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/account/forgot-password?email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                setNotifContent("Link đặt lại mật khẩu đã được gửi vào địa chỉ email của bạn")
                setOpenNotification(true);
                setTimeout(() => {
                    setOpenNotification(false);
                }, 3000);
            } else {
                const status = response.status;
                if (status != 200) {
                    setNotifContent("Địa chỉ email của bạn không có trong hệ thống")
                    setOpenNotification(true);
                    setTimeout(() => {
                        setOpenNotification(false);
                    }, 3000);
                }
            }
        } catch (error) {
            console.log("Loi",error);
        }
    }
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
                window.dispatchEvent(new Event("userLoggedIn"));
                Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: 'Strict' });
                if (res.data.role == "Customer") {
                    Cookies.set("id", res.data.info.customerId, { expires: 7, secure: true, sameSite: 'Strict' });
                    Cookies.set("role", res.data.role, { expires: 7, secure: true, sameSite: 'Strict' });
                    router.push("/");
                }
                if (res.data.role == "Shop") {
                    Cookies.set("id", res.data.info.shopId, { expires: 7, secure: true, sameSite: 'Strict' });
                    Cookies.set("role", res.data.role, { expires: 7, secure: true, sameSite: 'Strict' });
                    router.push(`/seller/order-management`);
                }
                if (res.data.role == "Admin") {
                    Cookies.set("id", res.data.info.shopId, { expires: 7, secure: true, sameSite: 'Strict' });
                    Cookies.set("role", res.data.role, { expires: 7, secure: true, sameSite: 'Strict' });
                    router.push(`/admin/overview`);
                }

                console.log(res);
                console.log(status);
            } else {
                const status = response.status;
                if (status != 200) {
                    setNotifContent("Sai tên đăng nhập hoặc mật khẩu")
                    setOpenNotification(true);
                    setTimeout(() => {
                        setOpenNotification(false);
                    }, 3000);
                }
            }
        } catch (error) {
            console.log("Loi",error);
        }
    }
    return (
        <div className={`flex w-full items-center justify-center relative bg-white flex-col pt-[40px]`}>

            {openNotification && (
                <AlertMessage message={notifContent} onClose={()=> setOpenNotification(false)}/>
            )}
                {/*<div className="w-[1300px] h-[40px]  mt-[10px] px-[10px] items-center flex ">*/}

                {/*        <div className="flex items-center w-[250px] h-full ">*/}
                {/*            <Breadcrumb breadcrumbs={breadcrumbs} />*/}
                {/*        </div>*/}

                {/*</div>*/}


            {activeTab == 0 ?
                <div className={`w-[500px] rounded-[25px] border border-stone-200 flex flex-col items-center bg-white mb-[50px] pb-[40px]`}>
                    <div className={`h-[120px] w-[400px] flex justify-center items-center pt-[20px] text-stone-800 border-b border-stone-200`}>
                        <FaCircleUser className={`text-[40px] `} />
                        <span className={`font-sf font-[800] text-[35px] ml-[10px]`}>ĐĂNG NHẬP</span>
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[30px]`}>
                        <span className={`font-sf text-stone-700 font-[600] text-[20px]`}>TÊN ĐĂNG NHẬP</span>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tài khoản của bạn"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px]  border-stone-200 border rounded-full px-[15px] bg-stone-200`}
                        />
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[600] text-[20px]`}>MẬT KHẨU</span>
                        <input
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu của bạn"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 border rounded-full px-[15px] bg-stone-200`}
                        />
                    </div>
                    <div  className={`w-[400px] flex flex-col mt-[10px]`}>
                        <span onClick={()=>setActiveTab(1)} className={`font-sf text-amber-600 font-[400] text-[15px] select-none`}>Quên mật khẩu?</span>
                    </div>
                    <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                        <div className={`col-span-7 flex  bg-amber-600 justify-center items-center hover:bg-amber-500 transition-all rounded-full duration-200 pt-[1px]`} onClick={handleLogin}>
                            <span className={`text-stone-50 font-sf text-[20px] font-[600] select-none`}>ĐĂNG NHẬP</span>
                        </div>
                        <button onClick={()=> router.push("/register")} className={`col-span-3 flex rounded-full bg-stone-800 justify-center items-center hover:bg-stone-700 transition-all duration-200 pt-[2px]`}>
                            <span className={`text-stone-50 font-sf text-[15px] font-[400] select-none`}>ĐĂNG KÝ</span>
                            <FaCircleChevronRight className={`text-stone-50 text-[18px] ml-[10px]`} />
                        </button>
                    </div>
                    {/*<div className={`w-[400px] flex justify-between items-center mt-[20px]`}>*/}
                    {/*    <div className={`flex-1 border-b h-[1px] border-stone-200`}>*/}

                    {/*    </div>*/}
                    {/*    <p className={`text-stone-400 font-sf text-[16px] font-[300] px-[10px]`}>hoặc</p>*/}
                    {/*    <div className={`flex-1 border-b h-[1px] border-stone-200`}>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={`w-[300px] h-[45px] grid grid-cols-2 gap-[20px] mt-[20px]`}>*/}
                    {/*    <div className={`col-span-1 rounded-[4px] border-stone-200 border flex items-center pl-[10px] group hover:bg-stone-700 transition-all duration-300 `}>*/}
                    {/*        <FaGoogle className="text-[20px] text-amber-600 group-hover:text-stone-50  " />*/}
                    {/*        <p className={`font-sf text-stone-700 text-[15px] font-[500] group-hover:text-stone-50 text-center flex-1 select-none`}>Google</p>*/}
                    {/*    </div>*/}
                    {/*    <div className={`col-span-1 rounded-[4px] border-stone-200 border flex items-center pl-[10px] group hover:bg-stone-700`}>*/}
                    {/*        <FaFacebook className="text-[20px] text-amber-600  group-hover:text-stone-50" />*/}
                    {/*        <p className={`font-sf text-stone-700 text-[15px] font-[500] text-center flex-1 select-none group-hover:text-stone-50`}>Facebook</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
                :
                <div className={`w-[500px] rounded-[25px] border border-stone-200 flex flex-col items-center bg-white mb-[50px] pb-[40px]`}>
                    <div className={`w-[400px] flex flex-col mt-[30px]`}>
                        <span className={`font-sf text-stone-700 font-[600] text-[20px]`}>EMAIL</span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px]  border-stone-200 border rounded-full px-[15px] bg-stone-200`}
                        />
                    </div>
                    <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                        <div className={`col-span-7 flex  bg-amber-600 justify-center items-center hover:bg-amber-500 transition-all rounded-full duration-200 pt-[1px]`} onClick={handleForgotPassword}>
                            <span className={`text-stone-50 font-sf text-[20px] font-[600] select-none`}>XÁC NHẬN</span>
                        </div>
                        <button onClick={()=> setActiveTab(0)} className={`col-span-3 flex rounded-full bg-stone-800 justify-center items-center hover:bg-stone-700 transition-all duration-200 pt-[2px]`}>
                            <span className={`text-stone-50 font-sf text-[15px] font-[400] select-none`}>TRỞ LẠI</span>
                            <FaCircleChevronRight className={`text-stone-50 text-[18px] ml-[10px]`} />
                        </button>
                    </div>
                    {/*<div className={`w-[400px] flex justify-between items-center mt-[20px]`}>*/}
                    {/*    <div className={`flex-1 border-b h-[1px] border-stone-200`}>*/}

                    {/*    </div>*/}
                    {/*    <p className={`text-stone-400 font-sf text-[16px] font-[300] px-[10px]`}>hoặc</p>*/}
                    {/*    <div className={`flex-1 border-b h-[1px] border-stone-200`}>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={`w-[300px] h-[45px] grid grid-cols-2 gap-[20px] mt-[20px]`}>*/}
                    {/*    <div className={`col-span-1 rounded-[4px] border-stone-200 border flex items-center pl-[10px] group hover:bg-stone-700 transition-all duration-300 `}>*/}
                    {/*        <FaGoogle className="text-[20px] text-amber-600 group-hover:text-stone-50  " />*/}
                    {/*        <p className={`font-sf text-stone-700 text-[15px] font-[500] group-hover:text-stone-50 text-center flex-1 select-none`}>Google</p>*/}
                    {/*    </div>*/}
                    {/*    <div className={`col-span-1 rounded-[4px] border-stone-200 border flex items-center pl-[10px] group hover:bg-stone-700`}>*/}
                    {/*        <FaFacebook className="text-[20px] text-amber-600  group-hover:text-stone-50" />*/}
                    {/*        <p className={`font-sf text-stone-700 text-[15px] font-[500] text-center flex-1 select-none group-hover:text-stone-50`}>Facebook</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>



            }

        </div>
    )
}