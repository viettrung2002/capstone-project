'use client'
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {IVoucher} from "@/app/types/voucher";
import {HiOutlineSearch} from "react-icons/hi";
import * as React from "react"
import {TbEdit, TbTrash} from "react-icons/tb";


export default function Page() {
    const router = useRouter();
    const [vouchers, setVouchers] = useState<IVoucher[]>([])
    const  [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState(0)
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
    const [reload, setReload] = useState<boolean>(false)
    const GetVouchers = async () => {
        const token = Cookies.get("token");
        console.log("Token:", token);
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/shop`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json();
            console.log(data.data);
            setVouchers(data.data);
        } catch (error) {
            console.log(error)
        }
    }

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
    const DeleteVoucher = async (id: string) => {
        const token = Cookies.get("token");
        console.log("Token:", token);
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/voucher?voucherId=${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

            })
            if (response.ok) {
                alert("Xóa thành công!");
                const data = await response.json();
                setReload(!reload);
                console.log(data.data);
            }



        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetVouchers();
    }, [reload]);

    useEffect(() => {
        console.log(startDate.toISOString());
    }, [startDate]);
    return (
        <div className={"w-full bg-gray-200 font-sf"}>
            <div className={"w-full h-[40px] bg-white mt-[10px] flex items-center px-[10px] rounded-[8px] shadow-md"}>
                <HiOutlineSearch className={"text-[22px] mr-[10px] text-stone-700"}/>
                <input
                    value={searchQuery}
                    onChange={(e)=> setSearchQuery(e.target.value)}
                    type={"text"}
                    className={"flex-1 focus:outline-none pr-[10px] font-sf text-[15px] placeholder:text-stone-400 text-stone-800"}
                    placeholder={"Bạn có thể tìn kiếm theo tên sản phẩm"}/>
            </div>
            <div className={"w-full grid grid-cols-4 h-[50px] gap-[1px] mt-[15px] "}>
                <div className={`col-span-1 relative rounded-t-[25px] rounded-lt-[25px] border-stone-200 p-[5px] pt-[6px] ${activeTab == 0 ? " border-l " : " "}  `}>
                    <div className={`${activeTab == 0 ?  "border-t border-x  " : " " } absolute top-0 w-full h-1/2  rounded-t-[25px] box-content  left-[-1px] border-stone-200`}>
                    </div>
                    <div className={`${activeTab == 0 ? " ": activeTab == 1 ? "border-b border-r border-stone-200 rounded-br-[25px] right-[-1px]" : " border-b right-[-3px]"}  absolute bottom-[-1px] w-[calc(100%-25px)] h-1/2  box-content border-stone-200`}>
                    </div>
                    <button onClick={()=>setActiveTab(0)} className={`w-full h-full rounded-full  relative z-50 ${activeTab == 0 ? " bg-amber-600 text-white" : "bg-stone-200"}`}>
                        <p className={"font-[500] text-[15px]"}>Đang Hoạt Động</p>
                    </button>
                </div>
                <div className={"col-span-1 relative  p-[5px] pt-[6px]"}>
                    <button onClick={()=>setActiveTab(1)} className={`w-full h-full relative rounded-full ${activeTab == 1 ? " bg-amber-600 text-white" : "bg-stone-200"} z-50`}>
                        <p className={"font-[500] text-[15px]"}>Chưa Diễn Ra</p>
                    </button>
                    <div className={`${activeTab == 1 ? " border-t border-x " : " "} absolute top-0 left-[-1px] w-full h-1/2  rounded-t-[25px] box-content z-0 border-stone-200`}></div>
                    <div className={`${activeTab == 1 ? " " : activeTab == 0 ? " rounded-bl-[25px] left-[-1px]  border-l border-b " : activeTab == 2 ? "border-stone-200 border-b rounded-br-[25px] z-0 border-r left-[-0px]" : " border-b left-[1px]"}  absolute bottom-[-1px]    w-full h-1/2  box-content border-stone-200`}></div>

                </div>
                <div className={"col-span-1 relative p-[5px] pt-[6px]"}>
                    {/*<div className={"absolute top-0 left-[-1px] w-full h-1/2 border-t border-x rounded-t-[25px] box-content"}></div>*/}
                    {/*<div className={"absolute bottom-[-1px] left-[-1px] w-full h-1/2 border-x border-b rounded-b-[25px] box-content"}></div>*/}
                    <div className={`${activeTab == 2 ? " border-t border-x " : ""} absolute top-0 left-[-1px] w-full h-1/2  rounded-t-[25px] box-content border-stone-200 `}></div>
                    <div className={`${activeTab == 2 ? " " : activeTab == 1 ? " rounded-bl-[25px] border-l border-b left-[-1px] " : activeTab == 3 ? " rounded-br-[25px] border-r border-b left-[0px] " : "border-b left-[-1px]"} absolute bottom-[-1px] w-full h-1/2  box-content border-stone-200`}></div>
                    <button onClick={()=>setActiveTab(2)} className={`w-full relative h-full rounded-full ${activeTab == 2 ? " bg-amber-600 text-white" : "bg-stone-200"} z-20`}>
                        <p className={"font-[500] text-[15px]"}>Đã Hết Hạn</p>
                    </button>
                </div>
                <div className={` ${activeTab == 3 ? " border-r" : ""} col-span-1 relative  rounded-tr-[25px] p-[5px] pt-[6px] border-stone-200`}>
                    <div className={`${activeTab == 3 ? "rounded-t-[25px] border-x border-t " : " "} absolute top-0 left-[-1px] w-full h-1/2 box-content border-stone-200`}></div>
                    <div className={`${activeTab == 3 ? "" : activeTab == 2 ? "rounded-bl-[25px] border-b border-l left-[-1px] " : " border-b left-[-2px]"}  absolute bottom-[-1px] w-[calc(100%-25px)] h-1/2 box-content border-stone-200`}></div>
                    <button onClick={()=>setActiveTab(3)} className={`w-full h-full rounded-full ${activeTab == 3 ? " bg-amber-600 text-white" : "bg-stone-200"} relative z-20 `}>
                        <p className={"font-[500] text-[15px]"}>Tạo Voucher</p>
                    </button>
                </div>

            </div>

            <div className={`${activeTab == 0 ? " rounded-r-[25px] " : activeTab == 3 ?  " rounded-l-[25px] ": " rounded-[25px]" } w-full  border-x relative flex justify-center border-stone-200 p-[10px]`}>
                <div className={`${activeTab != 0 && "border-l border-t" }  absolute top-0 left-[-1px]  rounded-tl-[25px] h-[30px] w-[30px] border-stone-200`}></div>
                <div className={`${activeTab != 3 && "border-r border-t" }  absolute top-0 right-[-1px] rounded-tr-[25px] h-[30px] w-[30px] border-stone-200`}></div>

                {activeTab == 0 && (
                    <div className={"w-full h-full  grid grid-cols-3 gap-[20px] "}>

                        {vouchers.map((voucher)=> {
                            return(
                            new Date(voucher.startTime).getTime() <= Date.now() && new Date(voucher.endTime).getTime() >= Date.now() ?
                                <div key={voucher.voucherId} className={"col-span-1 h-[100px] border-stone-200 flex border rounded-[25px] overflow-hidden bg-white p-[5px]"}>
                                    <div className={"h-full aspect-square  bg-stone-200 rounded-[20px]"}>

                                    </div>
                                    <div className={"flex-1 font-sf pl-[15px] flex flex-col justify-center"}>
                                        <p className={"text-[14px] uppercase font-[500]"}>{voucher.voucherName}</p>
                                        <div className={"flex items-baseline"}>
                                            <p className={"text-[13px] align-baseline text-stone-600"}>giảm </p>
                                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>{voucher.value}</p>
                                        </div>
                                        <div className={"flex items-baseline"}>
                                            <p className={"text-[13px] text-stone-600"}>cho đơn tối thiểu:</p>
                                            <p className={"text-[15px] ml-[5px] text-stone-900 font-[600]"}>{voucher.minPrice}</p>
                                        </div>

                                        <p className={"text-[13px] text-stone-700"}>Kết thúc: {new Date(voucher.endTime).getHours()}:{new Date(voucher.endTime).getMinutes()}, {new Date(voucher.endTime).getDay()}-{new Date(voucher.endTime).getMonth()}-{new Date(voucher.endTime).getFullYear()}</p>
                                    </div>
                                </div> : null
                        )})}

                    </div>
                )}
                {activeTab == 1 && (
                    <div className={"w-full h-full  grid grid-cols-3 gap-[20px] "}>

                        {vouchers.map((voucher)=> (
                            new Date(voucher.startTime).getTime() >= Date.now() ?
                                <div key={voucher.voucherId} className={"col-span-1 h-[120px] border-stone-200 flex border rounded-[25px] overflow-hidden bg-white p-[5px] "}>
                                    <div className={"h-full aspect-square rounded-[20px] bg-stone-200"}>

                                    </div>
                                    <div className={"flex-1 font-sf pl-[15px] flex flex-col justify-center"}>
                                        <p className={"text-[14px] uppercase font-[500] h-[16px] line-clamp-1"}>{voucher.voucherName}</p>
                                        <div className={"flex items-baseline h-[18px]"}>
                                            <p className={"text-[13px] align-baseline text-stone-600"}>giảm </p>
                                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>{voucher.value}</p>
                                        </div>
                                        <div className={"flex items-baseline h-[17px]"}>
                                            <p className={"text-[13px] text-stone-600"}>cho đơn tối thiểu:</p>
                                            <p className={"text-[15px] ml-[5px] text-stone-900 font-[600]"}>{voucher.minPrice}</p>
                                        </div>

                                        <p className={"text-[13px] text-stone-700 mt-[5]"}>Kết thúc: 20/9/2025</p>
                                        <div className={'flex '}>
                                            <button className={"h-[30px] w-[30px] rounded-full bg-stone-200 flex justify-center items-center"}>
                                                <TbEdit/>
                                            </button>
                                            <button onClick={()=> DeleteVoucher(voucher.voucherId)} className={"h-[30px] w-[30px] rounded-full bg-stone-200 ml-[5px] flex justify-center items-center"}>
                                                <TbTrash/>
                                            </button>
                                        </div>
                                    </div>

                                </div> : null
                        ))}

                    </div>
                )}
                {activeTab == 2 && (
                    <div className={"w-full h-full  grid grid-cols-3 gap-[20px] "}>

                        {vouchers.map((voucher)=> (
                            new Date(voucher.endTime).getTime() <= Date.now() ?
                                <div key={voucher.voucherId} className={"col-span-1 h-[100px] border-stone-200 flex border rounded-[25px] overflow-hidden bg-white p-[5px]"}>
                                    <div className={"h-full aspect-square  bg-stone-200 rounded-[20px]"}>

                                    </div>
                                    <div className={"flex-1 font-sf pl-[15px] flex flex-col justify-center"}>
                                        <p className={"text-[14px] uppercase font-[500]"}>Giảm giá mùa hè</p>
                                        <div className={"flex items-baseline"}>
                                            <p className={"text-[13px] align-baseline text-stone-600"}>giảm </p>
                                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>50000</p>
                                        </div>
                                        <div className={"flex items-baseline"}>
                                            <p className={"text-[13px] text-stone-600"}>cho đơn tối thiểu:</p>
                                            <p className={"text-[15px] ml-[5px] text-stone-900 font-[600]"}>50000</p>
                                        </div>

                                        <p className={"text-[13px] text-stone-700"}>Kết thúc: 20/9/2025</p>
                                    </div>
                                </div> : null
                        ))}

                    </div>
                )}

                {activeTab == 3 && (
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
                                    Chọn Ngày và Giờ
                                </button>
                                {showDatePicker && (
                                    <div className={"absolute top-[45px] bg-stone-100 rounded-[20px] pb-[10px]"}>
                                        {/*<Calendar*/}
                                        {/*    mode="single"*/}
                                        {/*    selected={startDate}*/}
                                        {/*    onSelect={(date) => {*/}
                                        {/*        if (date) setStartDate(date);*/}
                                        {/*    }}*/}
                                        {/*    initialFocus*/}
                                        {/*/>*/}
                                        <div className={"w-full h-[40px] mt-[10px] relative flex justify-between px-[10px] items-center"}>
                                            <button onClick={()=>setOpenHour(!openHour)} className={"h-full w-[105px] flex items-center justify-center bg-stone-200 rounded-full"}>
                                                {startDate.getHours() == 0 ? "00" : "Giờ"}
                                            </button>

                                            {openHour && (
                                                <div className={"absolute w-[100px] h-[130px] left-[-1px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>
                                                    {Array.from({ length: 24 }).map((_, index) => (
                                                        <div key={index} onClick={()=> {
                                                            if (startDate) {
                                                                const updated = new Date(startDate);
                                                                updated.setHours(index + 1);
                                                                setStartDate(updated);
                                                            }
                                                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">
                                                            {index + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <p className={"text-[20px] mb-[2px]"}>:</p>
                                            <button onClick={()=>setOpenMinute(!openMinute)} className={"h-full w-[105px] flex items-center justify-center relative bg-stone-200 rounded-full"}>
                                                {startDate.getMinutes() == 0 ? "00" : "Phút"}
                                            </button>

                                            {openMinute && (
                                                <div className={"absolute w-[100px] h-[130px] right-[-0px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>
                                                    {Array.from({ length: 6 }).map((_, index) => (
                                                        <div key={index} onClick={()=> {
                                                            if (startDate) {
                                                                const updated = new Date(startDate);
                                                                updated.setMinutes(index * 10);
                                                                setStartDate(updated);
                                                            }
                                                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">
                                                            {index == 0 ? "00" : index*10}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )}


                            </div>
                            <div className={"h-[40px] flex items-center mt-[10px] relative "}>
                                <button onClick={()=>setShowEndDatePicker(!showEndDatePicker)} className={"w-[180px] h-[40px] border rounded-full bg-stone-200"}>
                                    Chọn Ngày và Giờ
                                </button>
                                {showEndDatePicker && (
                                    <div className={"absolute top-[45px] bg-stone-100 rounded-[20px] pb-[10px]"}>
                                        {/*<Calendar*/}
                                        {/*    mode="single"*/}
                                        {/*    selected={endDate}*/}
                                        {/*    onSelect={(date) => {*/}
                                        {/*        if (date) setEndDate(date);*/}
                                        {/*    }}*/}
                                        {/*    initialFocus*/}
                                        {/*/>*/}
                                        <div className={"w-full h-[40px] mt-[10px] relative flex justify-between px-[10px] items-center"}>
                                            <button onClick={()=>setOpenHour(!openHour)} className={"h-full w-[105px] flex items-center justify-center bg-stone-200 rounded-full"}>
                                                {endDate.getHours() == 0 ? "00" : "Giờ"}
                                            </button>

                                            {openHour && (
                                                <div className={"absolute w-[100px] h-[130px] left-[-1px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>
                                                    {Array.from({ length: 24 }).map((_, index) => (
                                                        <div key={index} onClick={()=> {
                                                            if (startDate) {
                                                                const updated = new Date(startDate);
                                                                updated.setHours(index + 1);
                                                                setEndDate(updated);
                                                            }
                                                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">
                                                            {index + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <p className={"text-[20px] mb-[2px]"}>:</p>
                                            <button onClick={()=>setOpenMinute(!openMinute)} className={"h-full w-[105px] flex items-center justify-center relative bg-stone-200 rounded-full"}>
                                                {endDate.getMinutes() == 0 ? "00" : "Phút"}
                                            </button>

                                            {openMinute && (
                                                <div className={"absolute w-[100px] h-[130px] right-[-0px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto z-10"}>
                                                    {Array.from({ length: 6 }).map((_, index) => (
                                                        <div key={index} onClick={()=> {
                                                            if (startDate) {
                                                                const updated = new Date(startDate);
                                                                updated.setMinutes(index * 10);
                                                                setEndDate(updated);
                                                            }
                                                        }} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">
                                                            {index == 0 ? "00" : index*10}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )}


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
                )}
            </div>

        </div>
    )
}