'use client'
import {HiOutlineSearch} from "react-icons/hi";
import {useEffect, useState} from "react";
import {Bill} from "@/app/types/bill";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {TbStar, TbStarFilled} from "react-icons/tb";
import * as React from "react";
import {ICommentReq} from "@/app/types/comment";
import ConfirmDialog from "@/app/components/confirm";
import AlertMessage from "@/app/components/alert";
import VndText from "@/app/components/vnd-text";
export default function OrderPage() {
    const [bills, setBills] = useState<Bill[]>([]);
    const [orderStatus, setOrderStatus] = useState(0);
    const [idToCancel, setIdToCancel] = useState<string>("00000000-0000-0000-0000-000000000000");
    const [showPostComment, setShowPostComment] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false);
    const [openNotifCancel, setOpenNotifCancel] = useState<boolean>(false);
    const [openNotifComplete, setOpenNotifComplete] = useState<boolean>(false);
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [notifContent,  setNotifContent] = useState("");
    const router = useRouter();
    const [newComment, setNewComment] = useState<ICommentReq>({
        content: "",
        rating: 5,
    })
    useEffect(() => {
        const GetBill = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill?${orderStatus == 1 ? "orderStatus=Pending&" : orderStatus == 2 ? "orderStatus=Confirmed&" : orderStatus == 3 ? "orderStatus=Shipped&" : orderStatus == 4 ? "orderStatus=Completed&": orderStatus == 5 ? "orderStatus=Cancelled&": null }pageIndex=1&pageSize=10`, {
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
    }, [orderStatus, reload, router]);

    const UpdateBill = async (billId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill/update-status?billID=${billId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setNotifContent("Cập nhật thành công!")
                setOpenNotification(true)
                setTimeout(() => {
                    setOpenNotification(false)
                },3000)
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function CreateComment () {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/comment/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newComment),
            })

            if (response.ok) {
                const data = await response.json();
                console.log("comment",data);
                setShowPostComment(false)
                setNotifContent("Sản phẩm đã được đánh giá!")
                setOpenNotification(true)
                setTimeout(() => {
                    setOpenNotification(false)
                },3000)
                setReload(!reload);

            }

        } catch (error) {
            console.log(error);
        }
    }
    const CancelBill = async (id: string) => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill/cancel?billId=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setNotifContent("Đơn hàng của bạn đã được hủy!")
                setOpenNotification(true)
                setTimeout(() => {
                    setOpenNotification(false)
                },3000)
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(newComment);
    }, [newComment]);
    return(
        <div className={` col-span-4  pb-[20px]`}>
            {
                showPostComment ?
                    <div className={`w-full h-screen top-0 w-screen left-0 fixed  bg-stone-500/20 z-20  flex justify-center items-center font-sf`}>

                        <div className={" w-[500px] bg-white rounded-[25px] shadow pb-[20px]"}>
                            <div className={"w-full h-[50px] justify-center items-center flex border-b border-stone-200"}>
                                <p className={"uppercase text-[22px] text-stone-800 font-[700]"}>đánh giá</p>
                            </div>
                            <div className={"h-[40px] w-full px-[20px] flex items-center  mt-[10px] text-[22px] text-yellow-500"}>
                                {newComment.rating >= 1 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 1}))}/> : <TbStar/> }
                                {newComment.rating >= 2 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 2}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 2}))}/> }
                                {newComment.rating >= 3 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 3}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 3}))}/> }
                                {newComment.rating >= 4 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 4}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 4}))}/> }
                                {newComment.rating >= 5 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 5}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 5}))}/> }
                            </div>

                            <div className={"w-full px-[20px] relative mt-[15px]"}>
                                <p className={"font-[600] ml-[20px] text-stone-700 absolute top-[-12px] px-[6px] bg-white"}>Nội Dung</p>
                                <textarea
                                    value={newComment.content}
                                    onChange={(e) =>
                                        setNewComment((prev) => ({...prev!, content: e.target.value}))
                                    }
                                    className={"w-full h-[200px] border border-stone-200 rounded-[20px] p-[15px] focus:outline-none"}
                                />
                            </div>

                            <div className={"h-10 w-full flex justify-end px-[20px] mt-[10px]"}>
                                <div className={"h-full flex justify-center items-center font-sf px-[20px] rounded-full bg-stone-200 text-[15px] font-[500] text-stone-800"}
                                     onClick={()=> {
                                         setShowPostComment(false);
                                         setNewComment((prev) => ({...prev!, content: "", rating: 5}))
                                     }}>
                                    <p className={"select-none"}>Trở Lại</p>
                                </div>
                                <div onClick={()=>CreateComment()} className={"h-full flex justify-center items-center font-sf px-[20px] rounded-full bg-stone-800 text-[15px] font-[500] text-white ml-[10px]"}>
                                    <p>Gửi</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    : null
            }
            {openNotification && <AlertMessage message={notifContent} onClose={()=>setOpenNotification(false)}/>}
            {openNotifCancel && (
                <ConfirmDialog
                    message={"Bạn có chắc chắn muốn hủy đơn hàng?"}
                    onConfirm={()=> {
                        setOpenNotifCancel(false)
                        CancelBill(idToCancel)
                    }}
                    onCancel={()=> setOpenNotifCancel(false)}/>
            )}
            {openNotifComplete && (
                <ConfirmDialog
                    message={"Bạn có chắc chắn đã nhận được đơn hàng?"}
                    onConfirm={()=> {
                        setOpenNotifCancel(false)
                        UpdateBill(idToCancel)
                    }}
                    onCancel={()=> setOpenNotifComplete(false)}/>
            )}
            <div className={"w-full h-[50px] bg-white border-t border-x border-stone-200 grid grid-cols-6 rounded-full "}>
                <div onClick={()=>setOrderStatus(0)} className={`${orderStatus == 0 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} rounded-l-full col-span-1 flex items-center justify-center hover:text-amber-600`}>
                    <p className={` font-sf text-[16px] select-none`}>Tất cả</p>
                </div>
                <div onClick={()=>setOrderStatus(1)} className={`${orderStatus == 1 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                    <p className={` font-sf text-[16px] select-none`}>Đang xử lý</p>
                </div>
                <div onClick={()=>setOrderStatus(2)} className={`${orderStatus == 2 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                    <p className={` font-sf text-[16px] select-none`}>Đã xác nhận</p>
                </div>
                <div onClick={()=>setOrderStatus(3)} className={`${orderStatus == 3 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                    <p className={` font-sf text-[16px] select-none`}>Chờ giao hàng</p>
                </div>
                <div onClick={()=>setOrderStatus(4)} className={`${orderStatus == 4 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                    <p className={` font-sf text-[16px] select-none`}>Hoàn thành</p>
                </div>
                <div onClick={()=>setOrderStatus(5)} className={`${orderStatus == 5 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} rounded-r-full col-span-1 flex items-center justify-center hover:text-amber-600`}>
                    <p className={` font-sf text-[16px] select-none`}>Đã hủy</p>
                </div>
            </div>
            <div className={"w-full h-[40px] bg-stone-200 mt-[10px] flex items-center px-[15px] rounded-full"}>
                <HiOutlineSearch className={"text-[22px] mr-[10px] text-stone-700"}/>
                <input
                    type={"text"}
                    className={"flex-1 focus:outline-none pr-[10px] font-sf text-[15px] placeholder:text-stone-400 text-stone-800"}
                    placeholder={"Bạn có thể tìn kiếm theo tên Shop, ID đơn hàng hoặc Tên sản phẩm"}/>
            </div>
            {
                bills.map((bill)=>
                    <div  key={bill.billId} className={"w-full bg-white mt-[20px] border border-stone-200 rounded-[25px] relative pt-[10px] pb-[5px]"}>
                        <p className={"font-sf text-stone-800 text-[16px] absolute uppercase px-[8px] bg-white top-[-13px] font-[600] left-[30px] select-none hover:text-amber-600"}>{bill.shopName}</p>
                        {bill.orderStatus == "Pending" && (
                            <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-yellow-600 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                <p>Đang Xử Lý</p>
                            </div>
                        )}
                        {bill.orderStatus == "Confirmed" && (
                            <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-blue-500 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                <p>Đã Xác Nhận Đơn</p>
                            </div>
                        )}
                        {bill.orderStatus == "Shipped" && (
                            <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-cyan-600 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                <p>Đang Vận Chuyển</p>
                            </div>
                        )}
                        {bill.orderStatus == "Completed" && (
                            <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-green-600 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                <p>Đã Hoành Thành</p>
                            </div>
                        )}
                        {bill.orderStatus == "Cancelled" && (
                            <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-red-500 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                <p>Đã Hủy </p>
                            </div>
                        )}

                        <div onClick={()=>router.push(`/customer/order/${bill.billId}`)} className={"w-full px-[20px] border-dashed border-stone-200 border-b "}>
                            {/*<div className={"w-full h-[50px] border-b border-stone-200 flex items-center"}>*/}
                            {/*    <div className={"flex items-center"}>*/}
                            {/*        <p className={"font-sf text-stone-800 text-[16px]"}>{bill.shopName}</p>*/}
                            {/*        <button onClick={()=>router.push(`/shop/${bill.shopId}`)} className={"h-[30px] px-[10px] border text-stone-700 border-stone-200 text-[14px] flex items-center justify-center font-sf ml-[10px]"}>*/}
                            {/*            <p>Xem shop</p>*/}
                            {/*        </button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {
                                bill.items.map((item)=>
                                    <div key={item.itemId} className={"w-full py-[10px] border-stone-200 flex items-center"}>
                                        <div className={"flex flex-1"}>
                                            <div className={"w-[90px] h-[90px] bg-stone-200 rounded-[20px] p-[10px]"}>
                                                <div className={"w-full h-full relative"}>
                                                    <Image src={item.image} alt={"iam"} fill={ true}/>
                                                </div>
                                            </div>
                                            <div className={"h-[90px] flex flex-col items-start py-[3px] pl-[20px] justify-between font-sf"}>
                                                <p className={"text-[16px] text-stone-800"}>{item.productName}</p>
                                                <div className={"flex items-center"}>
                                                    {/*<p className={"line-through text-stone-500 text-[14px] mr-[5px]"}>260000</p>*/}

                                                    <VndText
                                                        amount={item.unitPrice}
                                                        classNameCurrency={"font-[400] text-[15px] font-sf  text-amber-600" }
                                                        classNameNumber={"font-sf  text-[16px]  text-amber-600"}
                                                    />
                                                    {/*<p className={" text-amber-600 text-[16px]"}>{item.unitPrice}</p>*/}
                                                </div>
                                                <p className={" text-stone-800 text-[15px]"}>{item.quantity} sản phẩm</p>
                                            </div>
                                        </div>
                                        {bill.orderStatus == "Completed" && (
                                            <div onClick={(e)=> {
                                                e.stopPropagation();
                                                setShowPostComment(true);
                                                setNewComment((prev) => ({...prev!, productId: item.productId}))
                                            }} className={"h-[30px] w-[120px] border flex justify-center items-center font-sf text-[15px] rounded-full bg-stone-200"}>
                                                <p>Đánh Giá</p>
                                            </div>
                                        )}


                                    </div>
                                )
                            }

                        </div>

                        <div className={"w-full px-[20px] flex justify-between py-[10px] text-stone-800 font-sf"}>
                            <div className={"flex items-center"}>
                                <p className={"text-[15px] mr-[10px]"}>Thành tiền:</p>
                                <VndText
                                    amount={bill.totalPrice}
                                    classNameCurrency={"font-[400] text-[20px] font-sf  text-amber-600" }
                                    classNameNumber={"font-sf font-[500] text-[22px]  text-amber-600"}
                                />
                                {/*<p className={"text-[22px] text-amber-600"}>{bill.totalPrice}</p>*/}
                            </div>
                            <div className={"flex relative"}>

                                {bill.orderStatus == "Shipped" && (
                                    <button  onClick={()=>{
                                        setIdToCancel(bill.billId)
                                        setOpenNotifComplete(true)
                                    }} className={"px-[20px] py-[8px] bg-stone-800 hover:bg-stone-700 rounded-full mr-[10px]"}>
                                        <p className={"font-sf text-stone-50 text-[15px]"}>Hoàn Thành</p>
                                    </button>
                                )}
                                {bill.orderStatus == "Pending" && (
                                    <button onClick={()=> {
                                        setIdToCancel(bill.billId)
                                        setOpenNotifCancel(true)
                                    }} className={"px-[20px] py-[8px]  bg-stone-800 hover:bg-stone-700 rounded-full mr-[10px]"}>
                                        <p className={"font-sf text-stone-50 text-[15px]"}>Hủy Đơn</p>
                                    </button>
                                )}
                                <button className={"px-[20px] py-[8px] bg-amber-600 hover:bg-stone-700 rounded-full"}>
                                    <p className={"font-sf text-stone-50 text-[15px]"}>Mua Lại</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}