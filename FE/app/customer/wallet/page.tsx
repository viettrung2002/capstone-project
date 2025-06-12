'use client'

import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {IWallet} from "@/app/types/wallet";
import {TbWallet} from "react-icons/tb";
import {HiOutlineWallet} from "react-icons/hi2";
export default function WalletPage(){
    const id = Cookies.get("id");
    const router = useRouter();
    const [wallet, setWallet] = React.useState<IWallet>();
    const [hasWallet, setHasWallet] = React.useState(0);
    const [openWallet, setOpenWallet] = React.useState(false);
    const [otp, setOtp] = useState<string[]>(["", "", "", "","",""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [reload, setReload] = React.useState(false);
    const handleCheckout = async () => {
        if (!id) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pay/create`, {
            method: 'POST',
            body: JSON.stringify({
                amount: price,
                orderId: 6,
                description: id,
                returnUrl: 'http://localhost:3000/customer/wallet/success',
                cancelUrl: 'http://localhost:3000/customer/wallet/cancel'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        window.location.href = data.url;
    };

    const GetWallet = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallet`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok){
                const data = await response.json();
                setWallet(data.data);
                console.log(data);
                setHasWallet(1)
            } else
            setHasWallet(2);
        } catch (error) {
            console.log(error);
        }
    }
    const CreateWallet = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        const isOtpComplete = otp.every(digit => digit !== "");
        if (isOtpComplete) {
            const otpCode = otp.join("");
            console.log("OTP Code:", otpCode);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallet`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(otpCode),
                });
                if (response.ok){
                    const data = await response.json();
                    alert(data.message);
                    setReload(!reload);

                }
            } catch (error) {
                console.log(error);
            }
        } else alert("Vui lòng điền đủ 6 số OTP")

    }
    useEffect(() => {
        GetWallet()
    }, [reload]);
    const [price, setPrice] = React.useState<number>(0);
    const [openFormRecharge, setOpenFormRecharge] = React.useState(false);



    // 👇 Dùng đúng kiểu Ref cho TypeScript


    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // chỉ cho nhập số

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto chuyển sang ô kế tiếp
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    return (
        <div className={"w-full h-full flex justify-center items-center font-sf"}>
            {
                hasWallet == 0 ? (
                    <div>Loading...</div>
                ) : hasWallet == 1 ? (
                    <div className={` col-span-3 h-full w-full`}>
                        <div className={"w-full h-full border rounded-[25px] bg-white border-t border-x border-stone-200 p-[20px] flex flex-col justify-between"}>
                            <div className={"h-[40px] w-full"}>
                                <button onClick={()=>router.push("/customer/wallet/history")} className={"px-[20px] h-full bg-stone-200 font-sf text-stone-80 text-[15px] rounded-full"}>
                                    Lịch Sử Giao Dịch
                                </button>
                            </div>
                            <div>
                                <div className={"h-[20px] w-full font-sf text-stone-700 text-[15px] flex items-center justify-center"}>
                                    Số Dư Ví
                                </div>
                                <div className={"h-[70px] flex w-full font-sf text-blue-600 text-[40px] justify-center items-center"}>
                                    <p className={"font-[700]"}>{wallet?.balance}</p>
                                    <p className={"font-sf text-stone-700 text-[20px]"}>đ</p>
                                </div>
                            </div>

                            <div className={"h-[40px] w-full flex items-center justify-center"}>
                                <button onClick={()=> setOpenFormRecharge(true) } className={"px-[20px] h-full bg-stone-700 font-sf text-stone-50 text-[15px] mr-[10px] rounded-full"}>
                                    Nạp Tiền
                                </button>
                                <button className={"px-[20px] h-full bg-stone-700 font-sf text-stone-50 text-[15px] ml-[10px] rounded-full"}>
                                    Rút Tiền
                                </button>
                            </div>

                            <div className={"w-full flex items-center justify-center font-sf"}>
                                {
                                    openFormRecharge && (
                                        <div className={"w-[300px]  bg-white rounded-[20px] mt-[20px] px-[20px] py-[20px] border"}>
                                            <div className={"relative h-[40px] flex items-center group"}>
                                                <input
                                                    type="number"
                                                    value={price != 0 ? price : ""}
                                                    onChange={(e)=> setPrice(Number(e.target.value))}
                                                    className={"h-[40px] absolute focus:outline-none rounded-full w-full bg-white/0 px-[20px] border z-10"}
                                                >
                                                </input>
                                                <p className={`absolute text-[15px] text-stone-700 left-[20px]  group-focus-within:text-[12px] group-focus-within:top-[-10px] group-focus:left-[20px] group-focus-within:px-[8px] group-focus-within:bg-white group-focus-within:z-10 transition-all duration-200`}>Số Tiền Cần Nạp</p>
                                            </div>

                                            <div className={"h-[36px] flex items-center justify-center mt-[20px]"}>
                                                <button onClick={()=>handleCheckout()} className={"h-full w-[100px] rounded-full bg-amber-600 text-[15px] text-white mr-2"}>
                                                    Xác Nhận
                                                </button>
                                                <button onClick={()=> {
                                                    setOpenFormRecharge(false)
                                                    setPrice(0)
                                                }} className={"h-full w-[100px] rounded-full bg-stone-200 text-[15px] text-stone-800"}>
                                                    Đóng
                                                </button>
                                            </div>

                                        </div>
                                    )
                                }
                            </div>


                        </div>
                    </div>
                ) : (
                    <div className={"w-full h-full flex  items-center font-sf border rounded-[25px] flex-col"}>
                        <div className={"w-[140px] h-[140px] rounded-full flex justify-center items-center text-[60px] bg-stone-200 text-stone-500 mb-[20px] mt-[30px]"}>
                            <HiOutlineWallet/>
                        </div>
                        {
                            !openWallet ?
                            <div className={"flex justify-center items-center flex-col"}>
                                <p className={"font-[500] text-stone-800 text-[15px]"}>Bạn chưa có ví BuyNow!</p>
                                <p className={"font-[400] text-stone-600 text-[14px] mt-[5px]"}>Kích hoạt ngay để thanh toán nhanh hơn và nhận các ưu đãi chỉ dành riêng cho bạn. </p>
                                <p className={"font-[400] text-stone-600 text-[14px]"} >Hoàn toàn miễn phí và sẵn sàng để sử dụng ngay lập tức!</p>
                            </div>
                            :
                            <div className={"flex flex-col justify-center items-center"}>
                                <p className={"font-[400] text-stone-600 text-[14px] mt-[5px]"}>Vui lòng nhập mật khẩu cho Ví của bạn!</p>
                                <div className={"flex justify-center items-center mt-[10px]"}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            className="w-10 h-10 text-center border border-stone-300 rounded text-xl focus:outline-none focus:border-amber-600 focus:border-[2px] mr-[3px] ml-[3px]"
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                        />
                                    ))}
                                </div>

                            </div>
                        }

                        {
                            !openWallet ?
                                <button onClick={()=> setOpenWallet(true)} className={"px-[20px] py-[8px] bg-amber-600 text-[15px] text-white rounded-full mt-[20px]"}>
                                    Kích Hoạt Ví BuyNow
                                </button>
                                :
                                    <div className={"flex justify-center items-center"}>
                                        <button onClick={()=> setOpenWallet(false)} className={"px-[20px] py-[8px] bg-stone-800 text-[15px] text-white rounded-full mt-[20px] mr-[10px]"}>
                                            Trở Lại
                                        </button>
                                        <button onClick={()=> CreateWallet()} className={"px-[20px] py-[8px] bg-amber-600 text-[15px] text-white rounded-full mt-[20px]"}>
                                            Xác Nhận Kích Hoạt
                                        </button>
                                    </div>
                        }

                    </div>
                )
            }

        </div>

    )
}