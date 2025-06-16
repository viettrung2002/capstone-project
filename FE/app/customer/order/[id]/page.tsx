'use client'
import {TbChecks, TbChevronLeft, TbReceipt, TbStar, TbTruckDelivery, TbX} from "react-icons/tb";
import {useParams} from "next/navigation";
import {useState, useEffect} from "react";
import {IBillInfo, ItemInBill} from "@/app/types/bill";
import {IVoucher} from "@/app/types/voucher";
import Image from "next/image";

export default function OrderDetailsPage() {
    const {id} = useParams();
    const [bill, setBill] = useState<IBillInfo | null>(null)
    const [voucher, setVoucher] = useState<IVoucher>()
    const [shopVoucher, setShopVoucher] = useState<IVoucher>()
    const [total, setTotal] = useState(0);
    const GetBill = async () => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill/details/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log("BILL: ",data.data);
                if (data.data.voucherId != "00000000-0000-0000-0000-000000000000") GetVoucher(data.data.voucherId);
                if (data.data.shopVoucherId != "00000000-0000-0000-0000-000000000000") GetShopVoucher(data.data.shopVoucherId);
                setBill(data.data);
                const totalUnitPrice = data.data.items.reduce((sum: number, item: ItemInBill) => {
                    const price = Number(item.unitPrice) || 0;
                    return sum + price;
                }, 0);
                setTotal(totalUnitPrice);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetBill();
    },[])
    const GetVoucher = async (voucherId: string) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/${voucherId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log("VOUCHER: ",data.data);
                setVoucher(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetShopVoucher = async (voucherId: string) => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/${voucherId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log("SHOP VOUCHER: ",data.data);
                setShopVoucher(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (bill == null) {
        return (
            <div>Loading....</div>
        )
    }
    return (
        <div className={"w-full border-stone-200 overflow-hidden font-sf"}>
            <div className={"h-[50px] border-b flex justify-between items-center rounded-[25px] border"}>
                <button className={"h-[30px] px-[15px] flex items-center justify-center text-stone-600 text-[18px]"}>
                    <TbChevronLeft/>
                    <p className={"text-[14px] ml-[5px]"}>Trở Lại</p>
                </button>
                <div className={"h-[20px] flex"}>
                    <p className={"px-[10px] text-[15px]"}>Mã Đơn Hàng: {bill.billId}</p>
                    <p className={"px-[10px] pr-[20px] border-l text-[15px] text-amber-600  "}>{bill.orderStatus == "Pending" ? "Đơn Hàng Đã Được Đặt" : bill.orderStatus == "Confirmed" ? "Đơn Hàng Đã Được Xác Nhận" : bill.orderStatus == "Shipped" ? "Đơn Hàng Đang Được Vận Chuyển" : bill.orderStatus == "Completed" ? "Đơn Hàng Đã Hoàn Thành" :  "Đơn Hàng Đã Bị Hủy"  }</p>
                </div>
            </div>
            <div className={" border-b flex border rounded-[25px] mt-[20px] flex-col"}>
                <div className={"h-[70px] w-full grid grid-cols-5 mt-[50px] border-stone-300"}>
                    <div className={"col-span-1 h-full flex items-center justify-center"}>
                        <div className={`h-[2px] flex-1`}>

                        </div>
                        <div className={`h-[70px] w-[70px]  border-[4px] rounded-full flex items-center justify-center text-[35px]  ${bill.orderStatus == "Pending" || bill.orderStatus == "Confirmed" || bill.orderStatus == "Shipped" || bill.orderStatus == "Completed" || bill.orderStatus == "Cancelled"  ? " text-amber-600 border-amber-600" : " text-stone-500 border-stone-300"}`}>
                            <TbReceipt/>
                        </div>
                        <div className={`h-[4px] flex-1 ${ bill.orderStatus == "Confirmed" || bill.orderStatus == "Shipped" || bill.orderStatus == "Completed"  ? " text-amber-600 bg-amber-600" : " bg-stone-300 "}`}>

                        </div>
                    </div>
                    <div className={"col-span-1 h-full flex items-center justify-center"}>
                        <div className={`h-[4px] flex-1 ${ bill.orderStatus == "Confirmed" || bill.orderStatus == "Shipped" || bill.orderStatus == "Completed"  ? " text-amber-600 bg-amber-600" : " bg-stone-300 "}`}>

                        </div>
                        <div className={`h-[70px] w-[70px] border-[4px] rounded-full flex items-center justify-center text-[35px]  ${ bill.orderStatus == "Confirmed" || bill.orderStatus == "Shipped" || bill.orderStatus == "Completed"  ? " text-amber-600 border-amber-600" : " text-stone-500 border-stone-300"}`}>
                            <TbChecks/>
                        </div>
                        <div className={`h-[4px] flex-1 ${ bill.orderStatus == "Shipped" || bill.orderStatus == "Completed"  ? " text-amber-600 bg-amber-600" : " bg-stone-300 "}`}>

                        </div>
                    </div>
                    <div className={"col-span-1 h-full flex items-center justify-center"}>
                        <div className={`h-[4px] flex-1 ${ bill.orderStatus == "Shipped" || bill.orderStatus == "Completed"  ? " text-amber-600 bg-amber-600" : " bg-stone-300 "}`}>

                        </div>
                        <div className={`h-[70px] w-[70px] border-[4px] rounded-full flex items-center justify-center text-[35px]  ${ bill.orderStatus == "Shipped" || bill.orderStatus == "Completed"  ? " text-amber-600 border-amber-600" : " text-stone-500 border-stone-300"}`}>
                            <TbTruckDelivery/>
                        </div>
                        <div className={`h-[4px] flex-1 ${ bill.orderStatus == "Shipped" || bill.orderStatus == "Completed"  ? " text-amber-600 bg-amber-600" : " bg-stone-300 "}`}>

                        </div>
                    </div>
                    <div className={"col-span-1 h-full  flex items-center justify-center"}>
                        <div className={`h-[4px] flex-1 ${ bill.orderStatus == "Completed"  ? " text-amber-600 bg-amber-600" : " bg-stone-300 "}`}>

                        </div>
                        <div className={`h-[70px] w-[70px] border-[4px] rounded-full flex items-center justify-center text-[35px]  ${ bill.orderStatus == "Completed"  ? " text-amber-600 border-amber-600" : " text-stone-500 border-stone-300"}`}>
                            <TbStar/>
                        </div>
                        <div className={`h-[4px] flex-1 `}>

                        </div>
                    </div>
                    <div className={"col-span-1 h-full  flex items-center justify-center"}>
                        {/*<div className={`h-[4px] flex-1 ${ bill.orderStatus == "Completed"  ? " text-amber-600 bg-amber-600" : " bg-stone-300 "}`}>*/}

                        {/*</div>*/}
                        <div className={`h-[70px] w-[70px] border-[4px] rounded-full flex items-center justify-center text-[35px]  ${ bill.orderStatus == "Cancelled"  ? " text-red-600 border-red-600" : " text-stone-500 border-stone-300"}`}>
                            <TbX/>
                        </div>
                        {/*<div className={`h-[4px] flex-1 `}>*/}

                        {/*</div>*/}
                    </div>
                </div>
                <div className={"h-[30px] w-full grid grid-cols-5 mt-[10px]"}>
                    <div className={`col-span-1 flex items-start justify-center text-[15px] ${bill.orderStatus == "Pending" || bill.orderStatus == "Confirmed" || bill.orderStatus == "Shipped" || bill.orderStatus == "Completed" || bill.orderStatus == "Cancelled"  ? " text-stone-800" : " text-stone-500 "}`}>
                        Đơn Hàng Đã Đặt
                    </div>
                    <div className={`col-span-1 flex items-start justify-center text-[15px] ${ bill.orderStatus == "Confirmed" || bill.orderStatus == "Shipped" || bill.orderStatus == "Completed" ? " text-stone-800" : " text-stone-500 "}`}>
                        Đơn Hàng Đã Xác Nhận
                    </div>
                    <div className={`col-span-1 flex text-center items-start justify-center text-[15px] ${ bill.orderStatus == "Shipped" || bill.orderStatus == "Completed" ? " text-stone-800" : " text-stone-500 "}`}>
                        Đơn Hàng Đang Được Vận Chuyển
                    </div>
                    <div className={`col-span-1 flex items-start justify-center text-[15px] ${ bill.orderStatus == "Completed" ? " text-stone-800" : " text-stone-500 "}`}>
                        Đơn Hàng Đã Hoàn Thành
                    </div>
                    <div className={`col-span-1 flex items-start justify-center text-[15px] ${  bill.orderStatus == "Cancelled" ? " text-stone-800" : " text-stone-500 "}`}>
                        Đơn Hàng Đã Bị Hủy
                    </div>

                </div>
                <div className={"w-full border-t h-[55px] mt-[40px] flex items-center justify-between px-[50px] text-[15px]"}>
                    <p>Cảm ơn bạn đã mua hàng!</p>
                    <div className={"flex"}>
                        <button className={"h-[35px] px-[20px] rounded-full bg-amber-600 text-white"}>
                            <p>Mua Lại</p>
                        </button>
                        <button className={"h-[35px] px-[20px] rounded-full bg-stone-800 text-white ml-[10px]"}>
                            <p>Đánh Giá Sản Phẩm</p>
                        </button>
                    </div>


                </div>
            </div>
            <div className={"grid grid-cols-3 w-full gap-[20px]  mt-[20px] "}>
                <div className={"col-span-1 rounded-[25px] border relative py-[20px] px-[20px] max-h-fit"}>
                    <p className={"absolute top-[-14px] px-[8px] bg-white left-[15px]"}>Địa Chỉ Nhận Hàng</p>
                    <p className={"font-[500] text-[15px]"}>Viet Trung</p>
                    <p className={"text-[14px] text-stone-700 mt-[5px]"}>0934413090</p>
                    <p className={"text-[14px] text-stone-700 mt-[5px]"}>Đội 3 Thạch Bàn, An Thủy, Lệ Thủy, Quảng Bình</p>
                </div>
                <div className={"col-span-2 rounded-[25px] border relative pt-[5px]"}>
                    <p className={"absolute top-[-14px] px-[8px] bg-white left-[15px]"}>Asus Official Store</p>
                    {
                        bill.items.map((item) => (
                            <div key={item.itemId} className={"flex py-[10px] px-[10px]"}>
                                <div className={"h-[80px] w-[80px] rounded-[20px] bg-stone-200 p-[10px]"}>
                                    <div className={"w-full h-full relative"}>
                                        <Image src={item.image} alt={"img"} fill={true}/>
                                    </div>
                                </div>
                                <div className={"flex-1 px-[10px] flex flex-col justify-center"}>
                                    <p className={"text-[15px] text-stone-800"}>{item.productName}</p>
                                    <p className={"text-[14px] text-stone-600"}>{item.unitPrice}</p>
                                    <p className={"text-[14px] text-stone-600"}>{item.quantity} sản phẩm</p>
                                </div>
                            </div>
                        ))
                    }
                    <div className={"border-b w-full"}></div>
                    <div className={"w-full grid grid-cols-3"}>
                        <div className={"col-span-2 flex flex-col items-center justify-center border-r"}>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[14px] border-b border-stone-100 px-[20px]"}>
                                <p>Tổng Tiền Hàng</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[14px] border-b border-stone-100 px-[20px]"}>
                                <p>Phí Vận Chuyển</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[14px] border-b border-stone-100 px-[20px]"}>
                                <p>Giảm Giá Voucher BuyNow</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[14px] border-b border-stone-100 px-[20px]"}>
                                <p>Giảm Giá Voucher Shop</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[14px] border-b border-stone-100 px-[20px]"}>
                                <p>Thành Tiền</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[14px] border-stone-100 px-[20px]"}>
                                <p>Phương Thức Thanh Toán</p>
                            </div>
                        </div>
                        <div className={"col-span-1 flex flex-col items-center justify-center"}>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[15px] border-b border-stone-100 px-[20px]"}>
                                <p>{total}</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[15px] border-b border-stone-100 px-[20px]"}>
                                <p>0</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[15px] border-b border-stone-100 px-[20px]"}>
                                <p>-{voucher?.value}</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[15px] border-b border-stone-100 px-[20px]"}>
                                <p>-{shopVoucher?.value}</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end  text-[19px] border-b border-stone-100 font-[600] px-[20px] text-amber-600"}>
                                <p>{bill.totalPrice}</p>
                            </div>
                            <div className={"h-[40px] w-full flex items-center justify-end text-stone-600 text-[15px] border-stone-100 px-[20px]"}>
                                <p>Thanh Toán Khi Nhận Hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}