'use client'
import {TbCheck} from "react-icons/tb";
import {useRouter} from "next/navigation";
export default  function PaymentSuccess() {
    const router = useRouter();
    return (
        <div className={"w-full h-full rounded-[25px] border flex justify-center items-center flex-col font-sf bg-white"}>
            <div className={"w-[120px] h-[120px] rounded-full bg-green-500 flex justify-center items-center text-white text-[70px] mb-[15px]"}>
                <TbCheck/>
            </div>
            <p>Nạp Tiền Thành Công!</p>
            <button onClick={()=> router.push("/customer/wallet")} className={"px-[20px] py-[8px] rounded-full bg-amber-600 text-white text-[15px] mt-[15px]"}>
                <p>Trở Về Ví </p>
            </button>
        </div>
    )
}