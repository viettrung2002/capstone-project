'use client'

import {useParams} from "next/navigation";
import {HiOutlineClipboard, HiOutlinePercentBadge, HiOutlineUser, HiOutlineWallet} from "react-icons/hi2";
import {TbBrandAppgallery, TbChartBar, TbLogout, TbReceipt, TbTicket, TbUser} from "react-icons/tb";
import {useState} from "react";
import OrderManagement from "@/app/seller/order-management";
import ProductManagement from "@/app/seller/product-management";
import CreateProduct from "@/app/seller/create-product";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import Statistics from "@/app/seller/statistics";
import VoucherManagement from "@/app/seller/voucher-management";
export default function Seller () {
    const [activeTab, setActiveTab] = useState(0);
    const [openOderManagement , setOpenOderManagement] = useState(true);
    const [openProductManagement , setOpenProductManagement] = useState(true);
    const {id} = useParams<{id: string}>()
    const router = useRouter();
    return (
        <div className="w-full bg-gray-200 flex justify-center items-center flex-col">

            <div className={`w-[1300px] grid grid-cols-5 gap-[20px] mt-[20px]`}>
                <div className={"col-span-1"}>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbReceipt/>
                        </div>
                        <p onClick={()=>setActiveTab(0)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Quản Lý Đơn Hàng</p>
                    </div>
                    <div className={`${openOderManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=>setActiveTab(0)} className={` ${activeTab == 0 ? "text-amber-600" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] font-[400]`}>
                            Tất Cả
                        </div>
                        {/*<div onClick={()=>setActiveTab(1)} className={` ${activeTab == 1 ? "text-amber-600" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>*/}
                        {/*    Đã Hủy*/}
                        {/*</div>*/}
                    </div>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbBrandAppgallery/>
                        </div>
                        <p onClick={()=>setActiveTab(0)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Quản Lý Sản Phẩm</p>
                    </div>
                    <div className={`${openProductManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=>setActiveTab(1)} className={` ${activeTab == 1 ? "text-amber-600 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
                            Tất Cả Sản Phẩm
                        </div>
                        <div onClick={()=>setActiveTab(2)} className={` ${activeTab == 2 ? "text-amber-600 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
                            Quản Lý Tồn Kho
                        </div>
                        <div onClick={()=>setActiveTab(3)} className={` ${activeTab == 3 ? "text-amber-600 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
                            Thêm Sản Phẩm
                        </div>
                    </div>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbChartBar/>
                        </div>
                        <p onClick={()=>setActiveTab(4)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Thống Kê</p>
                    </div>
                    <div className={`${openProductManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=>setActiveTab(4)} className={` ${activeTab == 4 ? "text-amber-600 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px]  `}>
                            Tổng Quan
                        </div>
                        <div onClick={()=>setActiveTab(5)} className={` ${activeTab == 5 ? "text-amber-600 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] `}>
                            Doanh Thu
                        </div>
                    </div>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbTicket/>
                        </div>
                        <p onClick={()=>setActiveTab(6)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Voucher</p>
                    </div>
                    <div className={`${openProductManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=>setActiveTab(6)} className={` ${activeTab == 6 ? "text-amber-600 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px]  `}>
                            Tất Cả Voucher
                        </div>
                        <div onClick={()=>setActiveTab(7)} className={` ${activeTab == 7 ? "text-amber-600 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] `}>
                            Thêm Voucher
                        </div>
                    </div>
                </div>

                <div className={"col-span-4"}>
                    {
                        activeTab == 0 ? <OrderManagement/> : activeTab == 1 ? <ProductManagement id = {id!}/> : activeTab == 3 ? <CreateProduct/> : activeTab == 4 ? <Statistics/> : activeTab == 6 ? <VoucherManagement/> : null
                    }
                </div>
            </div>

        </div>
    )
}