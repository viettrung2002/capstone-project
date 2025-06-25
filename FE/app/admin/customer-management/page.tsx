'use client'
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {TbSearch} from "react-icons/tb";
import {ICustomerInAdminPage} from "@/app/types/account";
import {MdLockReset} from "react-icons/md";
import Image from "next/image";

export default function CustomerManagementPage() {
    const router = useRouter();
    const [customers, setCustomers] = useState<ICustomerInAdminPage[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [reload, setReload] = useState(false);
    const [openLock, setOpenLock] = useState<boolean>(false);
    const [id, setId] = useState<string>("");


    const ResetPassword = async (accountId : string) => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/reset-password?${accountId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                alert("Đặt lại mật khẩu thành công")
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const GetShops = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/customers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    console.log(data);
                    setCustomers(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetShops()
    },[reload, router]);
    return(
        <div className={"w-full h-full px-[20px] py-[20px]"}>
            {openLock && (
                <div className={"absolute border border-stone-200 py-[20px] px-[20px] flex flex-col z-50 bg-white rounded-[25px] shadow-md top-[10px] right-1/2"}>
                    <p>Xác nhận đặt lại mật khẩu</p>
                    <div className={"flex mt-[15px] "}>
                        <button onClick={()=> {
                            ResetPassword(id)
                            setOpenLock(false);
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-amber-600 text-white rounded-full mr-[10px]"}>
                            Xác Nhận
                        </button>
                        <button onClick={()=> {
                            setOpenLock(false);
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-stone-800 text-white rounded-full mr-[10px]"}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            <div className={"relative mb-[10px] flex items-center"}>
                <input
                    type={"text"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={"Tìm kiếm"}
                    className={"w-full h-[40px] rounded-full px-[40px]  focus:outline-none focus:shadow-outline border border-stone-200 "}
                />
                <button className={"absolute  left-[15px]  flex justify-center items-center text-stone-700 text-[20px]"}>
                    <TbSearch/>
                </button>
            </div>

            <div className={"h-[40px] rounded-full bg-stone-200 grid grid-cols-8"}>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Avatar</div>
                <div className={"h-full col-span-2 flex justify-start items-center font-[500] text-[15px]"}>Tên Khách Hàng</div>
                <div className={"h-full col-span-2 flex justify-center items-center font-[500] text-[15px]"}>Số Điện Thoại</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Tổng Chi Tiêu</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Số Đơn</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Thao Tác</div>
            </div>
            {
                customers.length > 0 ?
                    customers.map( (customer) =>
                        <div key={customer.customerId} className={"grid grid-cols-8 h-[60px]  mt-[10px]"}>
                            <div className={"h-full col-span-1 flex justify-center items-center   "}>
                                <div className={"h-full aspect-square rounded-full bg-stone-200 relative overflow-hidden"}>
                                    <Image src={customer?.avatar ? customer.avatar : "/logo/avatar.png"} alt={"a"} fill={true}/>
                                </div>
                            </div>
                            <div className={"h-full col-span-2 flex justify-start items-center font-[400] text-[15px]"}>{customer.customerName}</div>
                            <div className={"h-full col-span-2 flex justify-center items-center font-[500] text-[15px]"}>{customer.phoneNumber ? customer.phoneNumber : "Chưa có"}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>{customer.totalSpending}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>{customer.completeOrderCount}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>
                                <button onClick={()=> {
                                    setOpenLock(true);
                                    if (customer.accountId) setId(customer.accountId);
                                }} className={"h-[30px] w-[30px] rounded-full bg-stone-800 flex justify-center items-center text-white mr-[5px] text-[20px]"}>
                                    <MdLockReset/>
                                </button>
                            </div>
                        </div>
                    ) : null
            }

        </div>
    )
}