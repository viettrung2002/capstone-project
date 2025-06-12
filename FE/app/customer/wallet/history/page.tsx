'use client'

import {TbArrowRight, TbChevronLeft, TbChevronRight} from "react-icons/tb";
import {useState, useEffect} from "react";
import {ITransaction} from "@/app/types/wallet";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

export default function HistoryPage() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
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
    useEffect(() => {
        GetTransactions();
    },[])
    return (
        <div className={"w-full border rounded-[25px] h-full font-sf"}>
            <div className={"h-[40px] w-full flex items-center justify-center border-b relative"}>
                <button onClick={()=>router.push("/customer/wallet")} className={"flex justify-center items-center absolute left-[25px]"}>
                    <TbChevronLeft className={"text-[18px] text-stone-700"} />
                    <p className={"text-[14px] text-stone-700 mt-[1px]"}>Trở Lại</p>
                </button>
                <p className={"font-[600]"}>Lịch Sử Giao Dịch</p>
                <div className={"h-[30px] absolute right-[25px] flex items-center justify-center"}>
                    <input
                        type={"date"}
                        className={"font-sf w-[140px] text-[14px] px-[15px] border rounded-full bg-stone-200"}
                    />
                    <TbChevronRight/>
                    <input
                    type={"date"}
                    className={"font-sf w-[140px] text-[14px] px-[15px] border rounded-full bg-stone-200"}
                    />
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
                                <p>Số tiền:</p>
                                {transaction.transactionType == "Deposit" ? <p className={"text-amber-600 font-[600] ml-[3px]"}>+{transaction.amount}</p> : <p className={"text-red-600 font-[600] ml-[3px]"}>-{transaction.amount}</p>}

                            </div>
                            <div className={"flex"}>
                                <p>Số dư cuối:</p>
                                <p className={"text-blue-600 font-[600] ml-[3px]"}>{transaction.balanceAfter}</p>
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