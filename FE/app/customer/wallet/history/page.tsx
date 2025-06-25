'use client'

import { TbChevronLeft, TbChevronRight} from "react-icons/tb";
import React, {useState, useEffect, useRef} from "react";
import {ITransaction} from "@/app/types/wallet";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import VndText from "@/app/components/vnd-text";

export default function HistoryPage() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const inputStartDateRef = useRef<HTMLInputElement>(null);
    const inputEndDateRef = useRef<HTMLInputElement>(null);


    const GetTransactionsByDate = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallet/transactions?startDate=${startDate}&endDate=${endDate}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok){
                const data = await response.json();
                setTransactions(data.data);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const GetTransactions = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallet/transactions`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.ok){
                    const data = await response.json();
                    setTransactions(data.data);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetTransactions();
    },[router])
    return (
        <div className={"w-full border rounded-[25px] h-full font-sf"}>
            <div className={"h-[40px] w-full flex items-center justify-center border-b relative"}>
                <button onClick={()=>router.push("/customer/wallet")} className={"flex justify-center items-center absolute left-[25px]"}>
                    <TbChevronLeft className={"text-[18px] text-stone-700"} />
                    <p className={"text-[14px] text-stone-700 mt-[1px]"}>Trở Lại</p>
                </button>
                <p className={"font-[600]"}>Lịch Sử Giao Dịch</p>
                <div className={"h-[30px] absolute right-[25px] flex items-center justify-center"}>
                    <div className={"h-full relative"}>
                        <input
                            type={"date"}
                            ref={inputStartDateRef}
                            onChange={(e)=> setStartDate(e.target.value)}
                            className={"opacity-0 absolute pointer-events-none h-full"}
                            max={new Date().toISOString().split("T")[0]}
                        />
                        <button onClick={()=> inputStartDateRef.current?.showPicker()} className={"w-[120px] h-full  flex justify-center items-center bg-stone-200   rounded-full text-[14px] font-sf"}>
                            <p>{startDate ? startDate : "Ngày Bắt Đầu"}</p>
                        </button>
                    </div>
                    <TbChevronRight/>
                    <div className={"h-full relative"}>
                        <input
                            type={"date"}
                            ref={inputEndDateRef}
                            onChange={(e)=> setEndDate(e.target.value)}
                            className={"opacity-0 absolute pointer-events-none h-full"}
                            min={startDate}
                            max={new Date().toISOString().split("T")[0]}
                        />
                        <button onClick={()=> inputEndDateRef.current?.showPicker()} className={"w-[120px] h-full  flex justify-center items-center bg-stone-200 mr-[10px] rounded-full text-[14px] font-sf"}>
                            <p>{endDate ? endDate : "Ngày Bắt Đầu"}</p>
                        </button>
                    </div>
                    <button onClick={()=>{
                        if (new Date(startDate) < new Date(endDate)) {
                            GetTransactionsByDate()
                        } else alert("Chọn lại ngày bắt đầu và kết thúc")
                    }} className={"px-[20px] h-full ml-[0px] rounded-full shadow flex justify-center items-center text-white bg-amber-600 text-[15px] font-sf"}>
                        <p>Lọc</p>
                    </button>
                </div>
            </div>
            <div className={"grid grid-cols-2 gap-[20px] p-[20px]"}>
                {
                    transactions.map((transaction: ITransaction) => (
                        <div key={transaction.transactionId} className={"col-span-1 bg-stone-100 rounded-[20px] px-[20px] py-[15px] text-stone-600 text-[15px]"}>
                            <p className={"text-stone-800 font-[500]"}>BuyNow xin thông báo đến Quý khách</p>
                            <div className={"flex"}>
                                <p>Thời gian giao dịch: </p>
                                <p className={"text-stone-800 ml-[3px] font-[500]"}>{new Date(transaction.createDate).getHours()}:{new Date(transaction.createDate).getMinutes()}  {new Date(transaction.createDate).getDate()}/{new Date(transaction.createDate).getMonth() + 1}/{new Date(transaction.createDate).getFullYear()}</p>
                            </div>

                            <div className={"flex"}>
                                <p className={"mr-[5px]"}>Số tiền:</p>
                                {transaction.transactionType == "Deposit" ?
                                    <div className={"flex text-amber-600"}>
                                        <p>+</p>
                                        <VndText
                                            amount={transaction.amount}
                                            classNameCurrency={"font-[400] text-[14px] font-sf text-amber-600" }
                                            classNameNumber={"font-sf text-amber-600 font-[500]"}
                                        />
                                        {/*<p className={"text-amber-600 font-[600] ml-[3px]"}>+{transaction.amount}</p>*/}
                                    </div>

                                    :
                                    <div className={"flex text-red-500"}>
                                        <p>-</p>
                                        <VndText
                                            amount={transaction.amount}
                                            classNameCurrency={"font-[400] text-[14px] font-sf " }
                                            classNameNumber={"font-sf font-[500]"}
                                        />
                                        {/*<p className={"text-amber-600 font-[600] ml-[3px]"}>+{transaction.amount}</p>*/}
                                    </div>}

                            </div>
                            <div className={"flex"}>
                                <p className={"mr-[5px]"}>Số dư cuối:</p>
                                <VndText
                                    amount={transaction.balanceAfter}
                                    classNameCurrency={"font-[400] text-[14px] font-sf text-blue-500" }
                                    classNameNumber={"font-sf text-blue-500 font-[500]"}
                                />
                            </div>
                            <div className={"flex"}>
                                <p>Mã giao dịch:</p>
                                <p className={"text-stone-800 font-[500] ml-[3px]"}>{transaction.transactionId}</p>
                            </div>
                            <div className={"flex"}>
                                <p>Nội dung giao dịch:</p>
                                <p className={"text-stone-800 font-[500] ml-[3px]"}>{transaction.description}</p>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}