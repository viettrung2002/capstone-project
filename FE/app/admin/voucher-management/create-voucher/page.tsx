'use client'



import * as React from "react";
import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {formatDate} from "@/app/utils/format";

export default function CreateVoucherPage() {
    const router = useRouter();
    const [voucherName, setVoucherName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [value, setValue] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [minPrice, setMinPrice] = useState<number>(0)
    const [perUserQuantity, setPerUserQuantity] = useState<number>(0)

    const inputStartDateRef = useRef<HTMLInputElement>(null);
    const inputEndDateRef = useRef<HTMLInputElement>(null);
    const CreateVouchers = async () => {
        const token = Cookies.get("token");
        console.log("Token:", token);
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/voucher`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    voucherName: voucherName,
                    startTime: startDate,
                    endTime: endDate,
                    value: value,
                    quantity: quantity,
                    minPrice: minPrice,
                    perUserQuantity: perUserQuantity,
                    role: 1
                })
            })
            if (response.ok) {
                alert("Tạo thành công!");
                const data = await response.json();
                console.log(data.data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(startDate)
    }, [startDate]);
    return (
        <div className={"w-full h-full  grid grid-cols-3 gap-[20px] relative bg-white rounded-[25px] py-[20px]" }>

            <div className={"col-span-1"}>
                <div className={"h-[40px] flex items-center justify-end"}>
                    <p>Tên Voucher</p>
                </div>
                <div className={"h-[40px] flex items-center justify-end mt-[10px]"}>
                    <p>Giá Giảm Cho Mỗi Đơn Hàng</p>
                </div>
                <div className={"h-[40px] flex items-center justify-end mt-[10px]"}>
                    <p>Giá Tối Thiểu Để Áp Dụng</p>
                </div>
                <div className={"h-[40px] flex items-center justify-end mt-[10px]"}>
                    <p>Số Lượng</p>
                </div>
                <div className={"h-[40px] flex items-center justify-end mt-[10px]"}>
                    <p>Số Lượng Voucher Cho Mỗi Tài Khoản</p>
                </div>
                <div className={"h-[40px] flex items-center justify-end mt-[10px]"}>
                    <p>Thời Gian Bắt Đầu</p>
                </div>
                <div className={"h-[40px] flex items-center justify-end mt-[10px]"}>
                    <p>Thời Gian Kết Thúc</p>
                </div>
            </div>
            <div className={"col-span-2"}>
                <div className={"h-[40px] flex items-center "}>
                    <input
                        type={"text"}
                        value={voucherName}
                        onChange={(e) => {setVoucherName(e.target.value)}}
                        className={"w-2/3 h-full focus:outline-none border border-stone-200 px-[20px] rounded-full "}
                    />
                </div>
                <div className={"h-[40px] flex items-center mt-[10px]"}>
                    <input
                        type={"number"}
                        value={value}
                        onChange={(e) => {setValue(Number(e.target.value))}}
                        className={"w-[130px] h-full focus:outline-none border px-[20px] border-stone-200 rounded-full "}
                    />
                </div>
                <div className={"h-[40px] flex items-center mt-[10px]"}>
                    <input
                        type={"number"}
                        value={minPrice}
                        onChange={(e) => {setMinPrice(Number(e.target.value))}}
                        className={"w-[130px] h-full focus:outline-none border px-[20px] border-stone-200 rounded-full "}
                    />
                </div>
                <div className={"h-[40px] flex items-center mt-[10px]"}>
                    <input
                        type={"number"}
                        value={quantity}
                        onChange={(e) => {setQuantity(Number(e.target.value))}}
                        className={"w-[130px] h-full focus:outline-none border px-[20px] border-stone-200 rounded-full "}
                    />
                </div>
                <div className={"h-[40px] flex items-center mt-[10px]"}>
                    <input
                        type={"number"}
                        value={perUserQuantity}
                        onChange={(e) => {setPerUserQuantity(Number(e.target.value))}}
                        className={"w-[130px] h-full focus:outline-none border px-[20px] border-stone-200 rounded-full "}
                    />
                </div>
                <div className={"h-[40px] flex items-center mt-[10px] relative "}>
                    <div className={"h-full relative"}>
                        <input
                            type={"datetime-local"}
                            ref={inputStartDateRef}
                            onChange={(e)=> setStartDate(e.target.value)}
                            className={"opacity-0 absolute pointer-events-none h-full"}

                        />
                        <button onClick={()=> inputStartDateRef.current?.showPicker()} className={"w-[160px] h-full  flex justify-center items-center bg-stone-200 mr-[10px] rounded-full text-[15px] font-sf"}>
                            <p>{startDate ? formatDate(startDate, true) : "Ngày Bắt Đầu"}</p>
                        </button>
                    </div>

                </div>
                <div className={"h-[40px] flex items-center mt-[10px] relative "}>
                    <input
                        type={"datetime-local"}
                        ref={inputEndDateRef}
                        onChange={(e)=> setEndDate(e.target.value)}
                        className={"opacity-0 absolute pointer-events-none h-full"}
                        min={startDate}

                    />
                    <button onClick={()=> {
                        if (startDate != "")
                            inputEndDateRef.current?.showPicker()
                        else alert("Vui lòng chọn ngày bắt đầu trước")
                    }} className={"w-[160px] h-full  flex justify-center items-center bg-stone-200 mr-[10px] rounded-full text-[15px] font-sf"}>
                        <p>{endDate ? formatDate(endDate, true) : "Ngày Kết Thúc"}</p>
                    </button>

                </div>

                <button
                    onClick={()=> {
                        if (voucherName != "" && startDate && endDate && value > 0 && quantity > 0 && perUserQuantity > 0 )
                            CreateVouchers()
                        else alert("thieu thong tin voucher") ;
                    }}
                    className={"h-[40px] px-[30px] flex items-center justify-center mt-[20px] bg-amber-600 text-white font-[600] rounded-full hover:bg-amber-500"}>
                    <p>TẠO</p>
                </button>

            </div>




        </div>
    )
}