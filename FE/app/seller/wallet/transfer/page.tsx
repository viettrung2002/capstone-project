'use client'
import { useState , useRef} from "react";
import { TbChevronLeft } from "react-icons/tb";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function TransferPage() {
    const [walletNumber, setWalletNumber] = useState("")
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState ("")
    const [otp, setOtp] = useState<string[]>(["", "", "", "","",""]);
    const [name, setName] = useState("")
    const router = useRouter()
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
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

    const GetReceiverName = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallet/wallet-number?walletNumber=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    
                },
            });
            if (response.ok){
                const data = await response.json();
                setName(data.data)
                console.log(data.data)
            } 
        
        } catch (error) {
            console.log(error);
        }
    }

    const TransferMoney = async (amount: number, des: string, walletNumber: string, otp: string[]) => {
        const token = Cookies.get("token")
        if (token == null) {
            router.push("/login")
            return;
        }
        const isOtpComplete = otp.every(digit => digit !== "");

        if (isOtpComplete) {
            const otpCode = otp.join("");
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wallet?amount=${amount}&description=${des}&recipientId=${walletNumber}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(otpCode)
                });
                if (response.ok){
                    const data = await response.json();
                    router.push("/seller/wallet/transfer/success")
                    console.log(data.data)
                } else router.push("/seller/wallet/transfer/success")
            } catch (error) {
                console.log(error);
            }
        } else alert("Vui lòng điền 6 số OTP")
        
    }
    return (
        <div className={"w-full h-full border rounded-[25px] pb-[20px] flex flex-col items-center justify-center font-sf bg-white"}>
            <div className="h-[40px] w-full flex items-center px-[25px] border-b relative justify-center">
                <div className="h-full flex items-center text-[14px] absolute left-[25px]">
                    <TbChevronLeft className="text-[18px]"/>
                    <p className="mt-[1px]">Trở Lại</p>
                </div>
                <p className={"font-[600]"}>Chuyển Tiền</p>
            </div>
            <div className={`w-[400px] h-full mt-[20px]`}>

                <div className="h-[80px] bg-amber-50 w-full rounded-[20px] border border-amber-200 mb-[20px] px-[20px] flex flex-col justify-center">
                    <p className=" flex items-center text-[15px] uppercase text-stone-700">a trung soi</p>
                    <p className=" flex items-center  text-[22px] font-[600] text-amber-600 uppercase">5000000</p>
                </div>
                <div className="flex">
                    <div className={"group relative flex items-center rounded-full h-[40px] flex-1 mr-[5px]"}>
                        <p className={`group-focus-within:top-[-10px] ${walletNumber != "" ? "top-[-10px] left-[16px] text-[13px] px-[8px] z-20 bg-white" : "text-[15px] left-[21px]"} absolute  group-focus-within:left-[16px]  text-stone-700  group-focus-within:text-[13px] group-focus-within:z-20 group-focus-within:bg-white group-focus-within:px-[8px] transition-all duration-200`}>Tài Khoản Nhận</p>
                        <input
                            type={"text"}
                            value={walletNumber}
                            className={"col-span-1 w-full h-full border rounded-full border-stone-200 focus:outline-none focus:shadow-outline px-[20px] z-10"}
                            onChange={(e)=> {
                                setWalletNumber(e.target.value)
                            }}
                        />
                    </div>
                    <button onClick={()=> GetReceiverName(walletNumber)} className="h-[40px] px-[20px] rounded-full bg-stone-200 flex justify-center items-center">
                        Kiểm Tra
                    </button>
                </div>
                <p className="uppercase text-[15px] text-stone-700 ml-[20px] mt-[5px]">{name}</p>
                <div className="w-full mt-[20px] flex justify-center items-center">
                    <div className={"group relative flex items-center justify-center rounded-[20px] h-[80px] w-[200px] flex-1 mr-[5px]"}>
                        <p className={`top-[-10px] text-[13px] px-[8px] z-20 bg-white absolute  text-stone-700  transition-all duration-200`}>Số Tiền Chuyển</p>
                        <input
                            type={"text"}
                            value={amount}
                            inputMode="numeric"
                            className={"col-span-1 w-[200px] h-full border rounded-[20px] border-stone-200 text-center focus:outline-none text-amber-600 text-[30px] focus:shadow-outline px-[20px] z-10"}
                            onChange={(e)=> {
                                setAmount(Number(e.target.value))
                            }}
                        />
                    </div>
                </div>
                <div className={"group relative flex items-center rounded-full h-[40px] flex-1 mr-[5px] mt-[20px]"}>
                        <p className={`group-focus-within:top-[-10px] ${note != "" ? "top-[-10px] left-[16px] text-[13px] px-[8px] z-20 bg-white" : "text-[15px] left-[21px]"} absolute  group-focus-within:left-[16px]  text-stone-700  group-focus-within:text-[13px] group-focus-within:z-20 group-focus-within:bg-white group-focus-within:px-[8px] transition-all duration-200`}>Lời nhắn</p>
                        <input
                            type={"text"}
                            value={note}
                            className={"col-span-1 w-full h-full border rounded-full border-stone-200 focus:outline-none focus:shadow-outline px-[20px] z-10"}
                            onChange={(e)=> {
                                setNote(e.target.value)
                            }}
                        />
                </div>
                <div className={"w-full font-sf text-[15px] flex flex-col justify-center items-center text-stone-700 mt-[10px]"}>
                    <p className="text-center">
                        Vui lòng nhập mã OTP!
                    </p>
                    <div className={"h-[40px] w-full mt-[10px] justify-center flex"}>
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

                <div className="h-[40px] w-full flex justify-center items-center mt-[20px]">
                    <button onClick={()=> TransferMoney(amount, note, walletNumber, otp)} className="h-full px-[30px] font-sf text-[15px] text-white bg-amber-600 rounded-full">
                        Chuyển Tiền
                    </button>
                </div>
            </div>
        </div>
    )
}