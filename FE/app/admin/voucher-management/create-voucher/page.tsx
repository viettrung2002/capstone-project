'use client'



import * as React from "react";
import {useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

export default function CreateVoucherPage() {
    const router = useRouter();
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false)
    const [voucherName, setVoucherName] = useState("")
    const [startDate, setStartDate] = useState<Date>(new Date(0))
    const [endDate, setEndDate] = useState<Date>(new Date(0))
    const [value, setValue] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [minPrice, setMinPrice] = useState<number>(0)
    const [perUserQuantity, setPerUserQuantity] = useState<number>(0)
    const [openHour, setOpenHour] = useState<boolean>(false)
    const [openMinute, setOpenMinute] = useState<boolean>(false)

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
                    startTime: startDate.toISOString(),
                    endTime: endDate.toISOString(),
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
                    <button onClick={()=>setShowDatePicker(!showDatePicker)} className={"w-[180px] h-[40px] border rounded-full bg-stone-200"}>
                        {startDate.getTime() != new Date(0).getTime() ? `${startDate.getHours()}:${startDate.getMinutes()}, ${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()}` : "Chọn Ngày và Giờ"}
                    </button>
                    {/*{showDatePicker && (*/}
                    {/*    <div className={"absolute top-[45px] bg-stone-100 rounded-[20px] pb-[10px] z-50"}>*/}
                    {/*        <Calendar*/}
                    {/*            mode="single"*/}
                    {/*            selected={startDate}*/}
                    {/*            onSelect={(date) => {*/}
                    {/*                if (date) setStartDate(date);*/}
                    {/*            }}*/}
                    {/*            initialFocus*/}
                    {/*        />*/}
                    {/*        <div className={"w-full h-[40px] mt-[10px] relative flex justify-between px-[10px] items-center"}>*/}
                    {/*            <button onClick={()=>setOpenHour(!openHour)} className={"h-full w-[105px] flex items-center justify-center bg-stone-200 rounded-full"}>*/}
                    {/*                {startDate.getHours() == 0 ? "00" : "Giờ"}*/}
                    {/*            </button>*/}

                    {/*            {openHour && (*/}
                    {/*                <div className={"absolute w-[100px] h-[130px] left-[-1px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>*/}
                    {/*                    {Array.from({ length: 24 }).map((_, index) => (*/}
                    {/*                        <div key={index} onClick={()=> {*/}
                    {/*                            if (startDate) {*/}
                    {/*                                const updated = new Date(startDate);*/}
                    {/*                                updated.setHours(index + 1);*/}
                    {/*                                setStartDate(updated);*/}
                    {/*                            }*/}
                    {/*                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">*/}
                    {/*                            {index + 1}*/}
                    {/*                        </div>*/}
                    {/*                    ))}*/}
                    {/*                </div>*/}
                    {/*            )}*/}
                    {/*            <p className={"text-[20px] mb-[2px]"}>:</p>*/}
                    {/*            <button onClick={()=>setOpenMinute(!openMinute)} className={"h-full w-[105px] flex items-center justify-center relative bg-stone-200 rounded-full"}>*/}
                    {/*                {startDate.getMinutes() == 0 ? "00" : "Phút"}*/}
                    {/*            </button>*/}

                    {/*            {openMinute && (*/}
                    {/*                <div className={"absolute w-[100px] h-[130px] right-[-0px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>*/}
                    {/*                    {Array.from({ length: 6 }).map((_, index) => (*/}
                    {/*                        <div key={index} onClick={()=> {*/}
                    {/*                            if (startDate) {*/}
                    {/*                                const updated = new Date(startDate);*/}
                    {/*                                updated.setMinutes(index * 10);*/}
                    {/*                                setStartDate(updated);*/}
                    {/*                            }*/}
                    {/*                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">*/}
                    {/*                            {index == 0 ? "00" : index*10}*/}
                    {/*                        </div>*/}
                    {/*                    ))}*/}
                    {/*                </div>*/}
                    {/*            )}*/}

                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}


                </div>
                <div className={"h-[40px] flex items-center mt-[10px] relative "}>
                    <button onClick={()=>setShowEndDatePicker(!showEndDatePicker)} className={"w-[180px] h-[40px] border rounded-full bg-stone-200"}>
                        {endDate.getTime() != new Date(0).getTime() ? `${endDate.getHours()}:${endDate.getMinutes()}, ${endDate.getDate()}-${endDate.getMonth()}-${endDate.getFullYear()}` : "Chọn Ngày và Giờ"}
                    </button>
                    {/*{showEndDatePicker && (*/}
                    {/*    <div className={"absolute top-[45px] bg-stone-100 rounded-[20px] pb-[10px] z-50"}>*/}
                    {/*        <Calendar*/}
                    {/*            mode="single"*/}
                    {/*            selected={endDate}*/}
                    {/*            onSelect={(date) => {*/}
                    {/*                if (date) setEndDate(date);*/}
                    {/*            }}*/}
                    {/*            initialFocus*/}
                    {/*        />*/}
                    {/*        <div className={"w-full h-[40px] mt-[10px] relative flex justify-between px-[10px] items-center"}>*/}
                    {/*            <button onClick={()=>setOpenHour(!openHour)} className={"h-full w-[105px] flex items-center justify-center bg-stone-200 rounded-full"}>*/}
                    {/*                {endDate.getHours() == 0 ? "00" : "Giờ"}*/}
                    {/*            </button>*/}

                    {/*            {openHour && (*/}
                    {/*                <div className={"absolute w-[100px] h-[130px] left-[-1px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>*/}
                    {/*                    {Array.from({ length: 24 }).map((_, index) => (*/}
                    {/*                        <div key={index} onClick={()=> {*/}
                    {/*                            if (startDate) {*/}
                    {/*                                const updated = new Date(startDate);*/}
                    {/*                                updated.setHours(index + 1);*/}
                    {/*                                setEndDate(updated);*/}
                    {/*                            }*/}
                    {/*                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">*/}
                    {/*                            {index + 1}*/}
                    {/*                        </div>*/}
                    {/*                    ))}*/}
                    {/*                </div>*/}
                    {/*            )}*/}
                    {/*            <p className={"text-[20px] mb-[2px]"}>:</p>*/}
                    {/*            <button onClick={()=>setOpenMinute(!openMinute)} className={"h-full w-[105px] flex items-center justify-center relative bg-stone-200 rounded-full"}>*/}
                    {/*                {endDate.getMinutes() == 0 ? "00" : "Phút"}*/}
                    {/*            </button>*/}

                    {/*            {openMinute && (*/}
                    {/*                <div className={"absolute w-[100px] h-[130px] right-[-0px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>*/}
                    {/*                    {Array.from({ length: 6 }).map((_, index) => (*/}
                    {/*                        <div key={index} onClick={()=> {*/}
                    {/*                            if (startDate) {*/}
                    {/*                                const updated = new Date(startDate);*/}
                    {/*                                updated.setMinutes(index * 10);*/}
                    {/*                                setEndDate(updated);*/}
                    {/*                            }*/}
                    {/*                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">*/}
                    {/*                            {index == 0 ? "00" : index*10}*/}
                    {/*                        </div>*/}
                    {/*                    ))}*/}
                    {/*                </div>*/}
                    {/*            )}*/}

                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}


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