'use client'
import {useEffect, useState} from "react";
import Image from "next/image";
import {  HiOutlineShoppingCart, HiOutlineMagnifyingGlass, HiOutlineUser, HiOutlineHome } from "react-icons/hi2";
import {useRouter , usePathname} from "next/navigation";
import { TbBasketFilled } from "react-icons/tb";
import Cookies from "js-cookie";
import {ICustomer} from "@/app/types/account";
import {TbLogout, TbUser} from "react-icons/tb";
export default function Navbar() {

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpenAccount, setIsOpenAccount] = useState(false);

    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>();
    const pathname = usePathname();
    const token = Cookies.get('token');
    const [mounted, setMounted] = useState(false);

    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        const id = Cookies.get("id");
        const token = Cookies.get("token");

        const GetCustomer = async () => {
            if (id && token) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.ok){
                        const data = await response.json();
                        console.log(data.data);
                        setCustomer(data.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        GetCustomer();
    }, [pathname]);

    useEffect(() => {
        const r = Cookies.get("role");
        setRole(r || null);
        setMounted(true);
    }, [pathname]);
    if (!mounted) return <div>Loadinggg</div>;
    return (
        role != "Shop" ?
            (<div className={`w-full relative h-[70px] z-20  ${pathname == '/' ? null : "bg-white shadow-[0px_0px_100px_rgba(0,0,0,0.1)]"} `}>
                <nav className=" w-full h-[70px]  items-center flex-row flex justify-center  pb-[0px]">
                    <div className="w-full flex items-center justify-between px-[20px]">
                        <div className="flex h-full items-center flex-row">
                            <Image src={"/cart.png"} alt={"Logo"} width={40} height={40}></Image>
                            <p className={"font-fre ml-[5px] text-text font-[800] text-gray-700 text-[28px]"}>BuyNow</p>
                        </div>
                        {/*Search*/}
                        <div className={`flex flex-row h-[40px] w-[580px] `}>
                            <div className={`flex border-gray-300 w-full pl-[20px] items-center pr-[15px] bg-stone-200 rounded-[20px]`}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Tìm kiếm sản phẩm"
                                    className={`flex focus:outline-none h-[25px] items-center w-full font-sf font-regular leading-tight placeholder:font-sf placeholder:font-[300] `}
                                />
                                <HiOutlineMagnifyingGlass className="text-[22px] text-gray-600"/>
                            </div>

                        </div>
                        <div className={` flex h-[40px]  items-center `}>
                            <button onClick={()=>router.push("/")} className={`flex col-span-2 h-full items-center `}>

                                <p className={"font-sf text-gray-800 font-[700] text-[15px] hover:text-amber-600"}>TRANG CHỦ</p>

                            </button>
                            <button onClick={()=> {
                                const token = Cookies.get("token");

                                if (!token) {
                                    router.push("/login")
                                } else router.push(`/customer/${Cookies.get("id")}`)

                            }}
                                    onMouseLeave={() => {
                                        const id = setTimeout(() => {
                                            setIsOpenAccount(false);
                                        }, 200); //

                                        setTimeoutId(id);
                                    }}
                                    onMouseEnter={() => {
                                        if (timeoutId) {
                                            clearTimeout(timeoutId);
                                        }
                                        setIsOpenAccount(true);
                                    }}
                                    className={`relative flex items-center h-full`}>

                                <div className={`flex h-full items-center ml-[20px] mr-[20px]`}>
                                    {customer ? (<p className={"font-sf text-gray-600 font-[600] text-[14px]"}>xin chào</p>) : null }
                                    <span className={`text-[15px]  font-sf ml-[7px] text-gray-800 font-[700]  uppercase`}>{customer? ` ${customer.customerName}` : "ĐĂNG NHẬP"}</span>
                                </div>

                                {
                                    isOpenAccount && customer ?
                                        <div  className={"absolute bottom-[-100px] w-[150px] bg-gray-50  left-[-0px]  border border-gray-100 rounded-[4px] overflow-hidden shadow-sm "}>
                                            <p onClick={()=> router.push(`/customer/${Cookies.get("id")}`)} className={"transition-all duration-200 font-sf mt-1 text-gray-800 text-[15px] px-[15px] hover:bg-gray-700  hover:text-gray-50 py-[4px]"}>Tài khoản của tôi</p>
                                            <p className={"font-sf text-gray-800 text-[15px] px-[15px] hover:bg-gray-700 hover:text-gray-50 py-[4px] transition-all duration-200"}>Đơn hàng</p>
                                            <p onClick={()=>{
                                                Cookies.remove("id");
                                                Cookies.remove("token");
                                                Cookies.remove("role");
                                                setCustomer(undefined);
                                                router.push("/");
                                            }} className={"font-sf text-gray-800 text-[15px]  px-[15px] hover:bg-gray-700 hover:text-gray-50 mb-1 py-[4px] transition-all duration-200"}>Đăng xuất</p>
                                        </div>
                                        : null
                                }

                            </button>
                            <button onClick={()=> {
                                const token = Cookies.get("token");
                                if (!token) {
                                    router.push("/login")
                                } else router.push("/cart")
                            }} className={`text-gray-800 text-[30px] h-full mb-[4px]`}>

                                <TbBasketFilled/>
                            </button>
                        </div>

                    </div>
                </nav>
            </div>)
            :
            (
                <div className={"w-full h-[50px] bg-white shadow-md flex items-center justify-center"}>
                    <div className={"w-[1300px] h-full flex justify-end items-center"}>
                        <div className={"flex h-[40px] font-sf  items-center px-[3px] pr-[10px] border border-gray-200 rounded-full"}>
                            <div className={" h-[34px] w-[34px] bg-gray-200 rounded-full mr-[10px] flex items-center justify-center text-[20px] text-gray-700"}>
                                <TbUser/>
                            </div>
                            <p className={"text-gray-800 text-[15px]"}>Viet Trung</p>
                        </div>
                        <button onClick={()=>{
                            Cookies.remove("id");
                            Cookies.remove("token");
                            Cookies.remove("role");
                            router.push("/");
                        }} className={"flex justify-center items-center rounded-full h-[40px] w-[40px] border ml-[10px] bg-gray-700 text-gray-50 text-[20px] pl-[2px]"}>
                            <TbLogout/>
                        </button>


                    </div>
                </div>
            )
    )
}