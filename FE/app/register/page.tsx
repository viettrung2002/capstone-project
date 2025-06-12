'use client'
import { FaCircleUser, FaCircleChevronLeft, FaGoogle, FaFacebook } from "react-icons/fa6";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Breadcrumb from "@/app/components/breadcrumb";
import Cookies from "js-cookie";
export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [openInfo, setOpenInfo] = useState(false);
    const breadcrumbs = [
        { name: "Register", href: "/register" },

    ];
    const router = useRouter();
    async function handleRegisterCustomer() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/register/customer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    role: role,
                    info: {
                        customerName: name,
                        address: address,
                        phone: phone,
                        email: email,
                    }
                }),
            });
            if (response.ok) {
                const data = response.json();
                console.log(data);
                alert("Tạo tài khoản thành công");
                router.push("/login");

            }
        } catch (error) {
            console.log("Loi", error);
        }
    }
    async function handleRegisterShop() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/register/shop`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    role: role,
                    info: {
                        shopName: name,
                        address: address,
                        email: email,
                    }
                }),
            });
            if (response.ok) {
                const data = response.json();
                console.log(data);
                alert("Tạo tài khoản thành công");
                router.push("/login");
            }
        } catch (error) {
            console.log("Loi", error);
        }
    }
    return (
        <div className={`flex flex-col w-full items-center justify-center  bg-white pt-[40px]`}>
            {/*<div className="w-[1300px] h-[40px]  mt-[10px] px-[10px] items-center flex ">*/}

            {/*    <div className="flex items-center w-[250px] h-full ">*/}
            {/*        <Breadcrumb breadcrumbs={breadcrumbs} />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {openInfo ? (
                <div className={`w-[500px] pb-[40px] rounded-[25px] border border-stone-200 flex flex-col items-center bg-white mb-[40px]`}>

                    <div className={`h-[120px] w-[400px] flex justify-center items-center pt-[20px] text-stone-800 border-b border-stone-200`}>
                        <FaCircleUser className={`text-[40px] `} />
                        <span className={`font-sf font-[700] text-[35px] ml-[10px]`}>ĐĂNG KÍ</span>
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[30px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>HỌ VÀ TÊN</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tài khoản của bạn"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}
                        />
                    </div>

                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>ĐỊA CHỈ</span>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nhập mật khẩu "
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}
                        />
                    </div>
                    {role == "Customer" &&
                        <div className={`w-[400px] flex flex-col mt-[20px]`}>
                            <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>SỐ ĐIỆN THOẠI</span>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 border bg-stone-200 rounded-full px-[15px]`}
                            />
                        </div>
                    }
                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>EMAIL</span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập mật khẩu "
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}
                        />
                    </div>

                    <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                        <div onClick={()=> setOpenInfo(false)} className={`col-span-4 flex rounded-full bg-stone-800 justify-center items-center  hover:bg-stone-700 transition-all duration-200`}>
                            <FaCircleChevronLeft className={`text-stone-50 text-[18px] mr-[10px]`} />
                            <span className={`text-stone-50 font-sf text-[15px] font-[400] select-none mt-[2px]`}>Quay Lại</span>

                        </div>
                        <div onClick={()=> {
                            if (role == "Customer") {
                                if (username !== "" && password !== "" && name !== "" && phone !== "" && address !== "")
                                    handleRegisterCustomer();
                                else alert("Vui lòng nhập đầy đủ thông tin")
                            }
                                else {
                                    if (username !== "" && password !== "" && name !== "" && address !== "")
                                        handleRegisterShop();
                                    else alert("Vui lòng nhập đầy đủ thông tin")
                            }
                        }} className={`col-span-6 flex rounded-full bg-amber-600 justify-center items-center hover:bg-amber-500 transition-all duration-200`}>
                            <span className={`text-stone-50 font-sf text-[20px] font-[600] select-none`}>ĐĂNG KÍ</span>
                        </div>

                    </div>

                </div>
            ): (
                <div className={`w-[500px] pb-[40px] rounded-[25px] border border-stone-200 flex flex-col items-center bg-white mb-[40px]`}>

                    <div className={`h-[120px] w-[400px] flex justify-center items-center pt-[20px] text-stone-800 border-b border-stone-200`}>
                        <FaCircleUser className={`text-[40px] `} />
                        <span className={`font-sf font-[700] text-[35px] ml-[10px]`}>ĐĂNG KÍ</span>
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[30px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>TÊM ĐĂNG NHẬP</span>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tài khoản của bạn"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}
                        />
                    </div>

                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>MẬT KHẨU</span>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu "
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}
                        />
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>XÁC NHẬN MẬT KHẨU</span>
                        <input
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 border bg-stone-200 rounded-full px-[15px]`}
                        />
                    </div>
                    <div className={`w-[400px] flex mt-[20px] font-sf text-stone-800`}>
                        <div className={"flex items-center"}>
                            <button onClick={()=> setRole("Customer")} className={"w-[20px] h-[20px] rounded-full border border-stone-400 flex items-center justify-center mr-[5px]"}>
                                <div className={`w-[12px] h-[12px] rounded-full ${role == "Customer" && " bg-stone-500 "} `}></div>
                            </button>
                            <p>Người Mua</p>
                        </div>
                        <div className={"flex items-center ml-[25px]"}>
                            <button onClick={()=> setRole("Shop")} className={"w-[20px] h-[20px] rounded-full border border-stone-400 flex items-center justify-center mr-[5px]"}>
                                <div className={`w-[12px] h-[12px] rounded-full ${role == "Shop" && " bg-stone-500 "} `}></div>
                            </button>
                            <p>Người Bán</p>
                        </div>


                    </div>
                    <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                        <div onClick={()=> router.push("/login")} className={`col-span-4 flex rounded-full bg-stone-800 justify-center items-center  hover:bg-stone-700 transition-all duration-200`}>
                            <FaCircleChevronLeft className={`text-stone-50 text-[18px] mr-[10px]`} />
                            <span className={`text-stone-50 font-sf text-[15px] font-[400] select-none mt-[2px]`}>ĐĂNG NHẬP</span>
                        </div>
                        <div onClick={()=>setOpenInfo(true)} className={`col-span-6 flex rounded-full bg-amber-600 justify-center items-center hover:bg-amber-500 transition-all duration-200`}>
                            <span className={`text-stone-50 font-sf text-[20px] font-[600] select-none`}>TIẾP TỤC</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}