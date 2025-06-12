'use client'
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {ICustomer} from "@/app/types/account";
export default function PasswordPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [reload, setReload] = useState(false);
    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>();
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        const GetCustomer = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    setCustomer(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetCustomer();


    }, [reload]);

        const ChangePassword = async (oldPass: string, newPass: string, accountId: string) => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/change-password?oldPassword=${oldPass}&newPassword=${newPass}&accountId=${accountId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setReload(!reload);
                    setPassword("")
                    setConfirmPassword("")
                    setOldPassword("")
                    alert("Đổi mật khẩu thành công")
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        return (
        <div className={` col-span-4 border border-stone-200 bg-white px-[20px] pb-[20px] rounded-[25px]`}>
            <div className={"w-full"}>
                <div className={"h-[84px] border-b border-stone-200 flex justify-center flex-col"}>
                    <p className={"font-sf text-stone-800 text-[20px] uppercase font-[600]"}>Đổi Mật Khẩu</p>
                    <p className={"font-sf text-stone-600 text-[15px]"}>Để bảo mật tài khoản, vui lòng không chia sẻ cho người khác</p>
                </div>
            </div>
            <div className={"w-full grid grid-cols-3 gap-[30px]"}>
                <div className={"col-span-3 grid grid-cols-7 gap-[20px] mt-[20px]"}>
                    <div className={"col-span-2"}>
                        <div className={"h-[40px] w-full flex items-center justify-end"}>
                            <p className={"font-sf text-stone-600 text-[15px]"}>Mật Khẩu Cũ</p>
                        </div>
                        <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                            <p className={"font-sf text-stone-600 text-[15px]"}>Mật Khẩu Mới</p>
                        </div>
                        <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                            <p className={"font-sf text-stone-600 text-[15px]"}>Xác Nhận Mật Khẩu</p>
                        </div>
                    </div>
                    <div className={"col-span-3"}>
                        <div className={"h-[40px] w-full "}>
                            <input onChange={(e)=> setOldPassword(e.target.value)} type={"text"} value={oldPassword} className={"w-full h-full rounded-full border border-stone-200 font-sf text-stone-800 focus:outline-none px-[20px]"}/>
                        </div>
                        <div className={"h-[40px] w-full mt-[20px]"}>
                            <input onChange={(e)=> setPassword(e.target.value)} type={"text"} value={password} className={"w-full h-full rounded-full border border-stone-200 font-sf text-stone-800 focus:outline-none px-[20px]"}/>
                        </div>
                        <div className={"h-[40px] w-full mt-[20px]"}>
                            <input onChange={(e)=> setConfirmPassword(e.target.value)} type={"text"} value={confirmPassword} className={"w-full rounded-full h-full border border-stone-200 font-sf text-stone-800 focus:outline-none px-[20px]"}/>
                        </div>

                        <button onClick={()=> {
                            if (password != confirmPassword) {
                                alert("Mật khẩu không trùng nhau");
                                return;
                            }
                            if (customer?.accountId)
                                ChangePassword(oldPassword, password, customer.accountId)
                        }} className={"px-[20px] py-[8px] bg-amber-600 mt-[20px] hover:bg-stone-700 rounded-full"}>
                            <p className={"font-sf text-stone-50 text-[15px]"}>Xác Nhận</p>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}