'use client'

import {useParams} from "next/navigation";
import {HiOutlineClipboard, HiOutlinePercentBadge, HiOutlineUser, HiOutlineWallet} from "react-icons/hi2";
import {TbBrandAppgallery, TbChartBar, TbLogout, TbReceipt, TbUser} from "react-icons/tb";
import {useState} from "react";
import OrderManagement from "@/app/seller/order-management";
import ProductManagement from "@/app/seller/product-management";
import CreateProduct from "@/app/seller/create-product";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import Statistics from "@/app/seller/statistics";
export default function Seller () {
    const [activeTab, setActiveTab] = useState(0);
    const [openOderManagement , setOpenOderManagement] = useState(true);
    const [openProductManagement , setOpenProductManagement] = useState(true);
    const {id} = useParams<{id: string}>()
    const router = useRouter();
    return (
        <div className="w-full bg-gray-200 flex justify-center items-center flex-col">
            <div className={"w-full h-[50px] bg-white shadow-md flex items-center justify-center"}>
                <div className={"w-[1300px] h-full flex justify-end items-center"}>
                    <div className={"flex h-[40px] font-sf  items-center px-[3px] pr-[10px] border border-gray-200 rounded-full"}>
                        <div className={" h-[34px] w-[34px] bg-gray-200 rounded-full mr-[10px] flex items-center justify-center text-[20px] text-gray-700"}>
                            <TbUser/>
                        </div>
                        <p className={"text-gray-800 text-[15px]"}>Viet Trung</p>
                    </div>
                    <button onClick={()=>{
                        Cookies.remove("id");
                        Cookies.remove("token");
                        Cookies.remove("role");
                        router.push("/");
                    }} className={"flex justify-center items-center rounded-full h-[40px] w-[40px] border ml-[10px] bg-gray-700 text-gray-50 text-[20px] pl-[2px]"}>
                        <TbLogout/>
                    </button>


                </div>
            </div>
            <div className={`w-[1300px] grid grid-cols-5 gap-[20px] mt-[20px]`}>
                <div className={"col-span-1"}>
                    <div className={"flex h-[30px] pl-[15px] items-center mt-[20px]"}>
                        <div className={"w-[25px] text-[18px]"}>
                            <TbReceipt/>
                        </div>
                        <p onClick={()=>setActiveTab(0)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Quản Lý Đơn Hàng</p>
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
                        <p onClick={()=>setActiveTab(0)} className={"flex font-[600] font-sf text-[15px] text-gray-800"}>Quản Lý Sản Phẩm</p>
                    </div>
                    <div className={`${openProductManagement? "block" : "hidden"} flex flex-col`}>
                        <div onClick={()=>setActiveTab(1)} className={` ${activeTab == 1 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
                            Tất Cả Sản Phẩm
                        </div>
                        <div onClick={()=>setActiveTab(2)} className={` ${activeTab == 2 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
                            Quản Lý Tồn Kho
                        </div>
                        <div onClick={()=>setActiveTab(3)} className={` ${activeTab == 3 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] font-[400]`}>
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
                        <div onClick={()=>setActiveTab(4)} className={` ${activeTab == 4 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px]  `}>
                            Tổng Quan
                        </div>
                        <div onClick={()=>setActiveTab(5)} className={` ${activeTab == 5 ? "text-blue-500 font-[500]" : "text-gray-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[15px] `}>
                            Doanh Thu
                        </div>
                    </div>
                </div>

                <div className={"col-span-4"}>
                    {
                        activeTab == 0 ? <OrderManagement/> : activeTab == 1 ? <ProductManagement id = {id!}/> : activeTab == 3 ? <CreateProduct/> : activeTab == 4 ? <Statistics/> : null
                    }
                </div>
            </div>

        </div>
    )
}