'use client'
import React from "react";
import {useRouter} from "next/navigation";
export default function AdminLayout({children} : {children: React.ReactNode}) {
    const router = useRouter();
    return (
        <div className={"w-full bg-white flex justify-center items-center font-sf pb-[20px]"}>
            <div className={"w-[1300px] grid grid-cols-5 gap-[20px] mt-[20px]"}>
                <div className={"col-span-1 rounded-[25px] border border-stone-200 px-[20px] py-[18px] max-h-fit"}>
                    <div onClick={()=> router.push("/admin/overview")} className={"h-[30px] flex items-center"}>
                        <p>Tổng Quan</p>
                    </div>
                    <div onClick={()=> router.push("/admin/shop-management")} className={"h-[30px] flex items-center"}>
                        <p>Quản Lý Shop</p>
                    </div>
                    <div onClick={()=> router.push("/admin/customer-management")} className={"h-[30px] flex items-center"}>
                        <p>Quản Lý Khách Hàng</p>
                    </div>
                    <div onClick={()=> router.push("/admin/voucher-management/active")} className={"h-[30px] flex items-center"}>
                        <p>Quản Lý Voucher</p>
                    </div>
                </div>
                <div className={"col-span-4 rounded-[25px] border border-stone-200"}>
                    {children}
                </div>
            </div>
        </div>
    )
}