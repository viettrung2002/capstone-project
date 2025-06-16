'use client'
import {useState} from "react";
import * as React from "react";
export default function VoucherPage() {

    const [voucherId, setVoucherId] = useState("");
    return (
        <div className={"w-full h-full border rounded-[25px] p-[20px] font-sf"}>


            <div className={"w-full py-[30px] flex items-center text-[15px] justify-center bg-stone-100 rounded-[20px]"}>

                <p>Mã Voucher</p>
                <input
                    type={"text"}
                    placeholder={"Nhập mã voucher tại đây"}
                    value={voucherId}
                    onChange={(e) => setVoucherId(e.target.value)}
                    className={"w-[300px] h-[40px] rounded-full text-[15px] border px-[20px] ml-[10px]"}
                />
                <button className={"px-[20px] h-[40px] bg-amber-600 text-white text-[15px] rounded-full ml-[10px]"}>
                    Lưu Lại
                </button>
            </div>
            <div className={"h-[40px] w-full grid grid-cols-3 mt-[10px]"}>
                <div className={"col-span-1 flex justify-center items-center text-[15px] border-b border-amber-600"}>
                    Tất Cả
                </div>
                <div className={"col-span-1 flex justify-center items-center text-[15px] border-b border-stone-200"}>
                    BuyNow
                </div>
                <div className={"col-span-1 flex justify-center items-center text-[15px] border-b border-stone-200"}>
                    Shop
                </div>
            </div>

            <div className={"w-full grid grid-cols-2 mt-[20px] gap-[20px]"}>
                <div className={"col-span-1 rounded-[20px] bg-stone-100 h-[100px] overflow-hidden flex relative"}>
                    <div className={"h-[100px] w-[100px] bg-stone-200 font-fre text-[16px] font-[800] flex justify-center text-amber-600 items-center"}>
                        BuyNow
                    </div>
                    <div className={"w-[20px] h-[20px] flex rounded-full bg-amber-600 text-white text-[12px] justify-center items-center absolute right-[10px] top-[10px]"}>
                        x2
                    </div>
                    <div className={"flex flex-col justify-center ml-[20px]"}>
                        <p className={"text-[14px] uppercase font-[500] h-[16px] line-clamp-1"}>ADMIN VOUCHER</p>
                        <div className={"flex items-baseline h-[18px]"}>
                            <p className={"text-[13px] align-baseline text-gray-600"}>giảm </p>
                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>50000</p>
                        </div>
                        <div className={"flex items-baseline h-[17px]"}>
                            <p className={"text-[13px] text-gray-600"}>cho đơn tối thiểu:</p>
                            <p className={"text-[15px] ml-[5px] text-gray-900 font-[600]"}>200000</p>
                        </div>

                        <p className={"text-[13px] text-gray-700 mt-[5]"}>Kết thúc: 12:00 20/9/2025</p>
                    </div>
                </div>

                <div className={"col-span-1 rounded-[20px] bg-stone-100 h-[100px] overflow-hidden flex relative"}>
                    <div className={"w-[20px] h-[20px] flex rounded-full bg-amber-600 text-white text-[12px] justify-center items-center absolute right-[10px] top-[10px]"}>
                        x2
                    </div>
                    <div className={"h-[100px] w-[100px] bg-stone-200 font-fre text-[16px] font-[800] flex justify-center text-amber-600 items-center"}>
                        BuyNow
                    </div>
                    <div className={"flex flex-col justify-center ml-[20px]"}>
                        <p className={"text-[14px] uppercase font-[500] h-[16px] line-clamp-1"}>Khuyến Mãi Hè 2025</p>
                        <div className={"flex items-baseline h-[18px]"}>
                            <p className={"text-[13px] align-baseline text-gray-600"}>giảm </p>
                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>50000</p>
                        </div>
                        <div className={"flex items-baseline h-[17px]"}>
                            <p className={"text-[13px] text-gray-600"}>cho đơn tối thiểu:</p>
                            <p className={"text-[15px] ml-[5px] text-gray-900 font-[600]"}>200000</p>
                        </div>

                        <p className={"text-[13px] text-gray-700 mt-[5]"}>Kết thúc: 12:00 20/9/2025</p>
                    </div>
                </div>
                <div className={"col-span-1 rounded-[20px] bg-stone-100 h-[100px] overflow-hidden flex relative"}>
                    <div className={"h-[100px] w-[100px] bg-stone-200 font-fre text-[16px] font-[800] flex justify-center text-amber-600 items-center"}>
                        BuyNow
                    </div>
                    <div className={"w-[20px] h-[20px] flex rounded-full bg-amber-600 text-white text-[12px] justify-center items-center absolute right-[10px] top-[10px]"}>
                        x3
                    </div>
                    <div className={"flex flex-col justify-center ml-[20px]"}>
                        <p className={"text-[14px] uppercase font-[500] h-[16px] line-clamp-1"}>Khuyến Mãi Hè</p>
                        <div className={"flex items-baseline h-[18px]"}>
                            <p className={"text-[13px] align-baseline text-gray-600"}>giảm </p>
                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>50000</p>
                        </div>
                        <div className={"flex items-baseline h-[17px]"}>
                            <p className={"text-[13px] text-gray-600"}>cho đơn tối thiểu:</p>
                            <p className={"text-[15px] ml-[5px] text-gray-900 font-[600]"}>200000</p>
                        </div>

                        <p className={"text-[13px] text-gray-700 mt-[5]"}>Kết thúc: 12:00 20/9/2025</p>
                    </div>
                </div>
                <div className={"col-span-1 rounded-[20px] bg-stone-100 h-[100px] overflow-hidden flex relative"}>
                    <div className={"w-[20px] h-[20px] flex rounded-full bg-amber-600 text-white text-[12px] justify-center items-center absolute right-[10px] top-[10px]"}>
                        x1
                    </div>
                    <div className={"h-[100px] w-[100px] bg-stone-200 font-fre text-[16px] font-[800] flex justify-center text-amber-600 items-center"}>
                        BuyNow
                    </div>
                    <div className={"flex flex-col justify-center ml-[20px]"}>
                        <p className={"text-[14px] uppercase font-[500] h-[16px] line-clamp-1"}>Khuyến Mãi Hè 7</p>
                        <div className={"flex items-baseline h-[18px]"}>
                            <p className={"text-[13px] align-baseline text-gray-600"}>giảm </p>
                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>35000</p>
                        </div>
                        <div className={"flex items-baseline h-[17px]"}>
                            <p className={"text-[13px] text-gray-600"}>cho đơn tối thiểu:</p>
                            <p className={"text-[15px] ml-[5px] text-gray-900 font-[600]"}>400000</p>
                        </div>

                        <p className={"text-[13px] text-gray-700 mt-[5]"}>Hiệu lực từ: 00:00 16/6/2025</p>
                    </div>
                </div>
                <div className={"col-span-1 rounded-[20px] bg-stone-100 h-[100px] overflow-hidden flex relative"}>
                    <div className={"w-[20px] h-[20px] flex rounded-full bg-amber-600 text-white text-[12px] justify-center items-center absolute right-[10px] top-[10px]"}>
                        x3
                    </div>
                    <div className={"h-[100px] w-[100px] bg-stone-200 font-fre text-[16px] font-[800] flex justify-center text-amber-600 items-center"}>
                        BuyNow
                    </div>

                    <div className={"flex flex-col justify-center ml-[20px]"}>
                        <p className={"text-[14px] uppercase font-[500] h-[16px] line-clamp-1"}>Khuyến Mãi Hè 8</p>
                        <div className={"flex items-baseline h-[18px]"}>
                            <p className={"text-[13px] align-baseline text-gray-600"}>giảm </p>
                            <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>10000</p>
                        </div>
                        <div className={"flex items-baseline h-[17px]"}>
                            <p className={"text-[13px] text-gray-600"}>cho đơn tối thiểu:</p>
                            <p className={"text-[15px] ml-[5px] text-gray-900 font-[600]"}>90000</p>
                        </div>

                        <p className={"text-[13px] text-gray-700 mt-[5]"}>Hiệu lực từ: 00:00 16/6/2025</p>
                    </div>
                </div>
            </div>

        </div>

    )
}