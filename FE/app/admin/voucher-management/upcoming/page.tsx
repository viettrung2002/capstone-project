'use client'

import {useEffect, useState} from "react";
import {IVoucher} from "@/app/types/voucher";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {TbEdit, TbTrash} from "react-icons/tb";
import * as React from "react";
import {formatDate} from "@/app/utils/format";

export default function VoucherUpcomingPage() {

    const [vouchers, setVouchers] = useState<IVoucher[]>([]);
    const router = useRouter();
    const [reload, setReload] = useState<boolean>(false);
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
        const GetVoucher = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/admin/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    console.log(data);
                    setVouchers(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetVoucher();
    },[router])
    return (
        <div className={"h-full w-full grid grid-cols-3 py-[20px] gap-[20px]"}>
            {vouchers.map((voucher: IVoucher) => (
                new Date(voucher.startTime).getTime() >= Date.now() ?
                    <div key={voucher.voucherId} className={"col-span-1 h-[120px] border-stone-200 flex border rounded-[20px] overflow-hidden"}>
                        <div className={"h-full aspect-square  bg-stone-200"}>

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

                            <p className={"text-[13px] text-stone-700 mt-[5]"}>Kết thúc: {formatDate(voucher.endTime)}</p>
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
    )
}