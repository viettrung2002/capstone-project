'use client'
import React from "react";
import {useRouter} from "next/navigation";
import {TbBuildingStore, TbTicket, TbUser} from "react-icons/tb";
import {usePathname} from "next/navigation";
export default function AdminLayout({children} : {children: React.ReactNode}) {

    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className={"w-full bg-white flex justify-center  font-sf pb-[20px]"}>
            <div className={"w-[1300px] grid grid-cols-5 gap-[20px] mt-[20px]"}>
                <div className={"col-span-1 rounded-[25px] border border-stone-200 px-[20px] py-[18px] max-h-fit font-[500]"}>
                    <div onClick={()=> router.push("/admin/overview")} className={`h-[30px] flex items-center ${pathname === "/admin/overview" &&  "text-amber-600"} `}>
                        <p>Tổng Quan</p>
                    </div>
                    <div onClick={()=> router.push("/admin/shop-management")} className={`h-[30px] flex items-center mt-[10px] font-[500] text-[16px] ${pathname === "/admin/shop-management" &&  "text-amber-600"}`}>
                        <TbBuildingStore className={"text-[20px] mr-[5px]"}/>
                        <p>Quản Lý Shop</p>
                    </div>
                    <div onClick={()=> router.push("/admin/customer-management")} className={`h-[30px] flex mt-[10px] items-center ${pathname === "/admin/customer-management" &&  "text-amber-600"}`}>
                        <TbUser className={"text-[20px] mr-[5px]"}/>
                        <p>Quản Lý Khách Hàng</p>
                    </div>
                    <div  onClick={()=> router.push("/admin/voucher-management/active")} className={`h-[30px] mt-[10px] flex items-center ${pathname.includes("/admin/voucher-management")  &&  "text-amber-600"}`}>
                        <TbTicket className={"text-[20px] mr-[5px]"}/>
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