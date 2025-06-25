'use client'

import {useState, useEffect} from "react";
import {HiOutlineSearch} from "react-icons/hi";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {Bill} from "@/app/types/bill";
import Image from "next/image";

export default function Page() {
    const [orderStatus, setOrderStatus] = useState(0);
    const router = useRouter();
    const [bills, setBills] = useState<Bill[]>([]);
    const [updateBills, setUpdateBills] = useState(true)
    useEffect(() => {
        const GetBill = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill/shop?pageIndex=1&pageSize=10`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    console.log("Bill",data.data.items);
                    setBills(data.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetBill();
    },[updateBills, router])

    const UpdateBill = async (bill: Bill) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill/update-status?billID=${bill.billId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                CreateNotification(bill);
                setUpdateBills(!updateBills);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const CreateNotification = async (bill : Bill) => {
        const title = bill.orderStatus == "Pending" ? "Đã xác nhận đơn hàng" : bill.orderStatus == "Confirmed" ? "Đang vận chuyển" : bill.orderStatus == "Shipped" ? "Đã hoàn thành đơn hàng" : "Đã hủy đơn" ;
        const content = bill.orderStatus == "Pending" ? `Đơn hàng ${bill.billId} đã được xác nhận. Vui lòng kiểm tra lại thông tin đơn hàng trong phần Chi tiết đơn hàng.`
            : bill.orderStatus == "Confirmed" ? `Đơn hàng ${bill.billId} đã được người bán giao cho đơn vị vận chuyển.`
                : bill.orderStatus == "Shipped" ? `Đơn hàng ${bill.billId} đã được giao thành công đến bạn.`
                    : `Đơn hàng ${bill.billId} đã bị hủy.` ;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    billId: bill.billId,
                    userId: bill.customerId,
                    content: content,
                    title: title,
                })
            });
            if (response.ok){
                const data = await response.json();
                console.log(data)
                alert(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className={"w-full h-full "}>
            <div className={"w-full h-[45px] bg-white border-t border-x border-gray-100 grid grid-cols-6"}>
                <div onClick={()=>setOrderStatus(0)} className={`${orderStatus == 0 ? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-200 text-gray-800"} col-span-1 flex items-center justify-center hover:text-blue-500`}>
                    <p className={` font-sf text-[16px] select-none`}>Tất cả</p>
                </div>
                <div onClick={()=>setOrderStatus(1)} className={`${orderStatus == 1 ? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-200 text-gray-800"} col-span-1 flex items-center justify-center hover:text-blue-500`}>
                    <p className={` font-sf text-[16px] select-none`}>Đang xử lý</p>
                </div>
                <div onClick={()=>setOrderStatus(2)} className={`${orderStatus == 2 ? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-200 text-gray-800"} col-span-1 flex items-center justify-center hover:text-blue-500`}>
                    <p className={` font-sf text-[16px] select-none`}>Đã xác nhận</p>
                </div>
                <div onClick={()=>setOrderStatus(3)} className={`${orderStatus == 3 ? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-200 text-gray-800"} col-span-1 flex items-center justify-center hover:text-blue-500`}>
                    <p className={` font-sf text-[16px] select-none`}>Chờ giao hàng</p>
                </div>
                <div onClick={()=>setOrderStatus(4)} className={`${orderStatus == 4 ? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-200 text-gray-800"} col-span-1 flex items-center justify-center hover:text-blue-500`}>
                    <p className={` font-sf text-[16px] select-none`}>Hoàn thành</p>
                </div>
                <div onClick={()=>setOrderStatus(5)} className={`${orderStatus == 5 ? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-200 text-gray-800"} col-span-1 flex items-center justify-center hover:text-blue-500`}>
                    <p className={` font-sf text-[16px] select-none`}>Đã hủy</p>
                </div>
            </div>

            <div className={"w-full h-[40px] bg-white mt-[10px] flex items-center px-[10px]"}>
                <HiOutlineSearch className={"text-[22px] mr-[10px] text-gray-700"}/>
                <input
                    type={"text"}
                    className={"flex-1 focus:outline-none pr-[10px] font-sf text-[15px] placeholder:text-gray-400 text-gray-800"}
                    placeholder={"Bạn có thể tìn kiếm theo ID đơn hàng hoặc Tên sản phẩm"}/>
            </div>

            {
                bills.map((bill)=>
                    <div key={bill.billId} className={"w-full bg-white mt-[10px] border border-gray-200"}>
                        <div className={"h-[50px] border-b border-gray-200 px-[20px] flex items-center justify-between"}>
                            <p className={"font-sf text-gray-800 "}>{bill.orderStatus == "Pending" ? "ĐANG XỬ LÝ" : bill.orderStatus == "Confirmed" ? "ĐÃ XÁC NHẬN" : bill.orderStatus == "Shipped" ? "ĐANG GIAO HÀNG" : bill.orderStatus == "Completed" ? "ĐÃ HOÀN THÀNH"  : "ĐÃ HỦY"}</p>

                            {bill.orderStatus != "Completed" &&
                            <button onClick={()=> UpdateBill(bill)} className={"px-[20px] bg-blue-500 hover:bg-gray-700 h-[35px]"}>
                                <p className={"font-sf text-gray-50 text-[15px]"}>{bill.orderStatus == "Pending" ? "Xác Nhận Đơn" : "Cập Nhật Trạng Thái"}</p>
                            </button>
                            }
                        </div>
                        <div className={"w-full px-[20px] border-dashed border-gray-200 border-b"}>
                            {
                                bill.items.map((item)=>
                                    <div key={item.itemId} className={"w-full py-[10px] border-gray-200 flex"}>
                                        <div className={"w-[90px] h-[90px] border border-gray-100 p-[10px]"}>
                                            <div className={"h-full w-full relative"}>
                                                <Image src={item.image} alt={"i"} fill={true}/>
                                            </div>
                                        </div>
                                        <div className={"h-[90px] flex flex-col items-start py-[3px] pl-[20px] justify-between font-sf"}>
                                            <p className={"text-[16px] text-gray-800"}>{item.productName}</p>
                                            <div className={"flex items-center"}>
                                                {/*<p className={"line-through text-gray-500 text-[14px] mr-[5px]"}>260000</p>*/}
                                                <p className={" text-blue-500 text-[16px]"}>{item.unitPrice}</p>
                                            </div>
                                            <p className={" text-gray-800 text-[15px]"}>{item.quantity} sản phẩm</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className={"w-full px-[20px] flex justify-between py-[10px] text-gray-800 font-sf"}>
                            <div className={"flex items-center"}>
                                <p className={"text-[15px] mr-[10px]"}>Thành tiền:</p>
                                <p className={"text-[22px] text-blue-500"}>{bill.totalPrice}</p>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}