'use client'
import {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {AdminData} from "@/app/types/admin";
export default function Overview() {
    const router = useRouter();
    const [data, setData] = useState<AdminData>()
    const GetData = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setData(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetData();
    }, []);
    return (
        <div className={"w-full h-full p-[20px]"}>
            <div className={"w-full grid grid-cols-4 gap-[20px]"}>
                <div className={"col-span-1 grid grid-rows-5 gap-[20px]"}>
                    <div className={"row-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Tổng số shop</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{data?.shopCount}0</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"row-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số lượng người dùng</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{data?.customerCount}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"row-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số bill hoàn thành</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{data?.billCount}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"row-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Tổng doanh thu</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{data?.revenue}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"row-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số lượng sản phẩm</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{data?.productCount}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                </div>
                <div className={"col-span-3 bg-stone-100 rounded-[25px] "}>

                </div>
            </div>

        </div>
    )
}