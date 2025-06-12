'use client'

import React from "react";
import {useRouter} from "next/navigation";
export default function VoucherManagementLayout({children}: {children: React.ReactNode} ) {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState(0)
    return (
        <div className={"w-full h-full p-[20px]"}>
            <div className={"w-full h-[40px] rounded-full  grid grid-cols-4 gap-[10px] "}>
                <div onClick={()=> {
                    setActiveTab(0);
                    router.push("/admin/voucher-management/active")
                }} className={`col-span-1 h-full flex items-center transition duration-200 justify-center rounded-full font-[500]  ${activeTab == 0 ? "bg-amber-600 text-white" : "bg-stone-200 text-stone-800 " }`}>Đang Hoạt Động</div>
                <div onClick={()=> {
                    setActiveTab(1);
                    router.push("/admin/voucher-management/upcoming")
                }} className={`col-span-1 h-full flex items-center transition duration-200 justify-center rounded-full font-[500]  ${activeTab == 1 ? "bg-amber-600 text-white" : "bg-stone-200 text-stone-800" }`}>Chưa Diễn Ra</div>
                <div onClick={()=> {
                    setActiveTab(2);
                    router.push("/admin/voucher-management/expired")
                }}  className={`col-span-1 h-full flex items-center transition duration-200 justify-center rounded-full font-[500]  ${activeTab == 2 ? "bg-amber-600 text-white" : "bg-stone-200 text-stone-800" }`}>Đã Hết Hạn</div>
                <div onClick={()=> {
                    setActiveTab(3);
                    router.push("/admin/voucher-management/create-voucher")
                }} className={`col-span-1 h-full flex items-center transition duration-200 justify-center rounded-full font-[500]  ${activeTab == 3 ? "bg-amber-600 text-white" : "bg-stone-200 text-stone-800" }`}>Tạo Voucher</div>
            </div>

            <div className={"w-full"}>
                {children}
            </div>
        </div>
    )
}