'use client'

import {
    HiOutlineClipboard,
    HiOutlinePencilSquare,
    HiOutlineUser,
    HiOutlineBell,
    HiOutlineWallet,
    HiOutlinePercentBadge
} from "react-icons/hi2";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {ICustomer} from "@/app/types/account";
import React from "react";
import Image from "next/image";
import {images} from "next/dist/build/webpack/config/blocks/images";
export default function CustomerLayout({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>();
    const [isOpenAccountInfo, setIsOpenAccountInfo] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

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

    }, []);

    function formatVND(amount: number): string {
        return amount.toLocaleString('vi-VN') ;
    }
    useEffect(() => {
        console.log(customer);
    }, [customer]);
    return(
        <div className={`w-full flex items-center justify-center bg-white pb-[20px]`}>
            <div className={`w-[1300px] grid grid-cols-5 gap-[20px] mt-[20px] `}>
                <div className={`col-span-1 max-h-fit rounded-[25px] border border-stone-200`}>
                    <div className={"h-[85px] flex p-[15px] border-b border-stone-200"}>
                        <div className={`h-full aspect-square rounded-full overflow-hidden border border-stone-200 flex items-center justify-center relative`}>
                            {customer?.avatar? <Image src={customer.avatar} alt={"avatar"} fill={true}/> : <HiOutlineUser className={`text-[30px] text-stone-300`} />}


                        </div>
                        <div className={`flex flex-col px-[15px] justify-between py-[3px]`}>
                            <p className={"font-sf text-[17px] text-stone-800 font-[500]"}>{customer?.customerName}</p>
                            <div className={`flex items-center`}>
                                <HiOutlinePencilSquare className={"text-stone-500 mr-[5px] mb-[1px]"}/>
                                <p className={"font-sf text-[15px] text-stone-400"}>Sửa hồ sơ</p>
                            </div>
                        </div>
                    </div>
                    <div className={"py-[10px] px-[5px]"}>
                        <div className={"flex h-[30px] pl-[15px] items-center"}>
                            <div className={"w-[25px] text-[18px]"}>
                                <HiOutlineUser/>
                            </div>
                            <p onClick={()=>setActiveTab(0)} className={"flex  font-sf text-[16px] text-stone-800"}>Tài Khoản Của Tôi</p>
                        </div>
                        <div className={`${isOpenAccountInfo? "block" : "hidden"} flex flex-col`}>
                            <div onClick={()=> {
                                setActiveTab(0);
                                router.push("/customer/profile");
                            }} className={` ${activeTab == 0 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>
                                Hồ Sơ
                            </div>
                            <div onClick={()=> {
                                setActiveTab(1);
                                router.push("/customer/address");
                            }} className={` ${activeTab == 1 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>
                                Địa Chỉ
                            </div>
                            <div onClick={()=> {
                                setActiveTab(2);
                                router.push("/customer/password");
                            }} className={` ${activeTab == 2 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>
                                Đổi Mật Khẩu
                            </div>
                            <div onClick={()=>setActiveTab(3)} className={` ${activeTab == 3 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center font-sf text-[16px] `}>
                                Đóng Tài Khoản
                            </div>
                        </div>
                        <div onClick={()=> {
                            setActiveTab(4);
                            router.push("/customer/order");
                        }} className={"flex h-[35px] pl-[15px] items-center "}>
                            <div className={"w-[25px] text-[18px]"}>
                                <HiOutlineClipboard/>
                            </div>
                            <p className={` ${activeTab == 4 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] `}>Đơn Mua</p>
                        </div>


                        <div onClick={()=> {
                            setActiveTab(5);
                            router.push("/customer/notification");
                        }} className={"flex h-[35px] pl-[15px] items-center "}>
                            <div className={"w-[25px] text-[20px]"}>
                                <HiOutlineBell/>
                            </div>
                            <p className={` ${activeTab == 5 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] `}>Thông Báo</p>
                        </div>
                        <div onClick={()=> {
                            setActiveTab(7);
                            router.push("/customer/voucher");
                        }} className={"flex h-[35px] pl-[15px] items-center"}>
                            <div className={"w-[25px] text-[20px]"}>
                                <HiOutlinePercentBadge/>
                            </div>
                            <p className={` ${activeTab == 7 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] `}>Kho Voucher </p>
                        </div>
                        <div onClick={()=> {
                            setActiveTab(6);
                            router.push("/customer/wallet");
                        }} className={"flex h-[35px] pl-[15px] items-center"}>
                            <div className={"w-[25px] text-[20px]"}>
                                <HiOutlineWallet/>
                            </div>
                            <p className={` ${activeTab == 6 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] select-none`}>Ví BuyNow </p>
                        </div>
                    </div>
                </div>
                <div className={`col-span-4`}>
                    {children}
                </div>

                {/*TAB ĐÓNG TÀI KHOẢN*/}
                <div className={`${activeTab == 3 ? "block" : "hidden"} col-span-4 border border-stone-200 bg-white px-[20px] pb-[20px] rounded-[25px]`}>
                    <div className={"w-full"}>
                        <div className={"h-[84px] border-b border-stone-200 flex justify-center flex-col"}>
                            <p className={"font-sf text-stone-800 text-[20px] uppercase font-[600]"}>Đóng Tài Khoản</p>

                        </div>
                    </div>
                    <div className={"w-full grid grid-cols-3 gap-[30px]"}>
                        <div className={"col-span-3 grid grid-cols-7 gap-[20px] mt-[20px]"}>
                            <div className={"col-span-2"}>
                                <div className={"h-[40px] w-full flex items-center justify-end "}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Yêu Cầu Đóng Tài Khoản</p>
                                </div>
                            </div>
                            <div className={"col-span-4 "}>
                                <div className={"h-[40px] w-full flex items-center justify-end "}>
                                    <button className={"px-[20px] py-[8px] bg-amber-600 hover:bg-stone-700 rounded-full"}>
                                        <p className={"font-sf text-stone-50 text-[15px]"}>Xác Nhận</p>
                                    </button>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
                {/*TAB ĐÓNG TÀI KHOẢN*/}


                {/*VÍ*/}

            </div>
        </div>
    )
}
