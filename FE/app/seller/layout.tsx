'use client'
import React from "react";

import {TbBrandAppgallery, TbChartBar, TbReceipt, TbTicket} from "react-icons/tb";
import {useState} from "react";

import {useRouter} from "next/navigation";

export default function SellerLayout ({children}: {children: React.ReactNode} ) {
    const [activeTab, setActiveTab] = useState(0);
    const [openOderManagement , setOpenOderManagement] = useState(true);
    const [openProductManagement , setOpenProductManagement] = useState(true);
    const router = useRouter();
    return (
        <div className="w-full bg-gray-200 flex justify-center items-center flex-col pb-[20px]">

            <div className={`w-[1300px] grid grid-cols-5 gap-[20px] mt-[20px]`}>
                <div className={"col-span-1"}>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbReceipt/>
                        </div>
                        <p onClick={()=> {
                            setActiveTab(0);
                            router.push("/seller/order-management");
                        }} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Quản Lý Đơn Hàng</p>
                    </div>
                    <div className={`${openOderManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=>setActiveTab(0)} className={` ${activeTab == 0 ? "text-blue-500" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] font-[400]`}>
                            Tất Cả
                        </div>
                        {/*<div onClick={()=>setActiveTab(1)} className={` ${activeTab == 1 ? "text-blue-500" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>*/}
                        {/*    Đã Hủy*/}
                        {/*</div>*/}
                    </div>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbBrandAppgallery/>
                        </div>
                        <p onClick={()=>setActiveTab(1)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Quản Lý Sản Phẩm</p>
                    </div>
                    <div className={`${openProductManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=> {
                            setActiveTab(1);
                            router.push("/seller/product-management");
                        }} className={` ${activeTab == 1 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
                            Tất Cả Sản Phẩm
                        </div>
                        {/*<div onClick={()=>setActiveTab(2)} className={` ${activeTab == 2 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>*/}
                        {/*    Quản Lý Tồn Kho*/}
                        {/*</div>*/}
                        <div onClick={()=> {
                            setActiveTab(3);
                            router.push("/seller/create-product");
                        }} className={` ${activeTab == 3 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
                            Thêm Sản Phẩm
                        </div>
                    </div>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbChartBar/>
                        </div>
                        <p onClick={()=> {
                            setActiveTab(4);
                            router.push("/seller/statistics");
                        }} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Thống Kê</p>
                    </div>
                    <div className={`${openProductManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=>setActiveTab(4)} className={` ${activeTab == 4 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px]  `}>
                            Tổng Quan
                        </div>
                        {/*<div onClick={()=>setActiveTab(5)} className={` ${activeTab == 5 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] `}>*/}
                        {/*    Doanh Thu*/}
                        {/*</div>*/}
                    </div>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbTicket/>
                        </div>
                        <p onClick={()=>setActiveTab(6)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Voucher</p>
                    </div>
                    <div className={`${openProductManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=> {
                            setActiveTab(6);
                            router.push("/seller/voucher-management");
                        }} className={` ${activeTab == 6 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px]  `}>
                            Tất Cả Voucher
                        </div>
                        {/*<div onClick={()=>setActiveTab(7)} className={` ${activeTab == 7 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] `}>*/}
                        {/*    Thêm Voucher*/}
                        {/*</div>*/}
                    </div>
                </div>

                <div className={"col-span-4"}>
                    {children}
                </div>
            </div>

        </div>
    )
}