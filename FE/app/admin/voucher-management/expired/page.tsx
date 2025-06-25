'use client'

import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {IVoucher} from "@/app/types/voucher";
import * as React from "react";
import {formatDate} from "@/app/utils/format";
export default function VoucherExpiredPage() {
    const router = useRouter();

    const [vouchers, setVouchers] = useState<IVoucher[]>([]);


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
        <div className={"w-full h-full mt-[20px] grid grid-cols-3 gap-[20px]"}>
            {vouchers.map((voucher: IVoucher) => (
                new Date(voucher.endTime).getTime() <= Date.now() ?
                    <div key={voucher.voucherId} className={"col-span-1 h-[100px] border-stone-200 flex border rounded-[20px] overflow-hidden"}>
                        <div className={"h-full aspect-square  bg-stone-200"}>

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

                            <p className={"text-[13px] text-stone-700"}>Kết thúc: {formatDate(voucher.endTime)}</p>
                        </div>
                    </div> : null
            ))}
        </div>
    )
}