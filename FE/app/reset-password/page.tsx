'use client'
import {useState} from "react";
import AlertMessage from "../components/alert";
import {useRouter} from "next/navigation";
export default function LoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    async function handleResetPassword() {
        const url = new URL(window.location.href);
        const tokenParam = url.searchParams.get('token');
        console.log("token reset", tokenParam);
        try {
            const response =  await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/account/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password,
                    token: tokenParam}),
            });
            if (response.ok) {
                setOpenNotification(true)
                setTimeout(()=> {
                    setOpenNotification(false)
                    router.push("/login")
                }, 3000)

            } else {
                
            }
        } catch (error) {
            console.log("Loi",error);
        }
    }
    return (
        <div className={`flex w-full items-center justify-center relative bg-white flex-col pt-[40px]`}>

            {openNotification && (
                <AlertMessage message="Cập nhật lại mật khẩu thành công" onClose={()=> setOpenNotification(false)}/>
            )}
                {/*<div className="w-[1300px] h-[40px]  mt-[10px] px-[10px] items-center flex ">*/}

                {/*        <div className="flex items-center w-[250px] h-full ">*/}
                {/*            <Breadcrumb breadcrumbs={breadcrumbs} />*/}
                {/*        </div>*/}
                {/*</div>*/}
            <div className={`w-[500px] rounded-[25px] border border-stone-200 flex flex-col items-center pt-[10px] bg-white mb-[50px] pb-[40px]`}>
                <div className={`w-[400px] flex flex-col mt-[20px]`}>
                    <span className={`font-sf text-stone-700 font-[600] text-[20px]`}>MẬT KHẨU</span>
                    <input
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu của bạn"
                        className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 border rounded-full px-[15px] bg-stone-200`}
                    />
                </div>
                <div className={`w-[400px] flex flex-col mt-[20px]`}>
                    <span className={`font-sf text-stone-700 font-[600] text-[20px]`}>XÁC NHẬN MẬT KHẨU</span>
                    <input
                        type={"password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu của bạn"
                        className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 border rounded-full px-[15px] bg-stone-200`}
                    />
                </div>
                <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                    <div className={`col-span-10 flex  bg-amber-600 justify-center items-center hover:bg-amber-500 transition-all rounded-full duration-200 pt-[1px]`} onClick={()=> handleResetPassword()}>
                        <span className={`text-stone-50 font-sf text-[20px] font-[600] select-none`}>CẬP NHẬT MẬT KHẨU</span>
                    </div>
                    
                </div>
                {/*<div className={`w-[400px] flex justify-between items-center mt-[20px]`}>*/}
                {/*    <div className={`flex-1 border-b h-[1px] border-stone-200`}>*/}

                {/*    </div>*/}
                {/*    <p className={`text-stone-400 font-sf text-[16px] font-[300] px-[10px]`}>hoặc</p>*/}
                {/*    <div className={`flex-1 border-b h-[1px] border-stone-200`}>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={`w-[300px] h-[45px] grid grid-cols-2 gap-[20px] mt-[20px]`}>*/}
                {/*    <div className={`col-span-1 rounded-[4px] border-stone-200 border flex items-center pl-[10px] group hover:bg-stone-700 transition-all duration-300 `}>*/}
                {/*        <FaGoogle className="text-[20px] text-amber-600 group-hover:text-stone-50  " />*/}
                {/*        <p className={`font-sf text-stone-700 text-[15px] font-[500] group-hover:text-stone-50 text-center flex-1 select-none`}>Google</p>*/}
                {/*    </div>*/}
                {/*    <div className={`col-span-1 rounded-[4px] border-stone-200 border flex items-center pl-[10px] group hover:bg-stone-700`}>*/}
                {/*        <FaFacebook className="text-[20px] text-amber-600  group-hover:text-stone-50" />*/}
                {/*        <p className={`font-sf text-stone-700 text-[15px] font-[500] text-center flex-1 select-none group-hover:text-stone-50`}>Facebook</p>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        </div>
    )
}