'use client'
import {useEffect, useState} from "react";
import Image from "next/image";
import { HiChevronDown, HiOutlineShoppingCart, HiOutlineMagnifyingGlass, HiOutlineUser, HiOutlineHome } from "react-icons/hi2";
import {useRouter , usePathname} from "next/navigation";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import {ICustomer} from "@/app/types/account";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpenAccount, setIsOpenAccount] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>();
    const pathname = usePathname();
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
    return (
        <div className="sticky top-0 bg-white w-full z-50">
            <nav className="   w-full h-[70px]  border-gray-300 border-b items-center flex-row flex justify-center  pb-[0px]">
                <div className=" w-[1300px] flex items-center justify-between ">
                    <div className="flex h-full items-center flex-row">
                        <Image src={"/cart.png"} alt={"Logo"} width={40} height={40}></Image>
                        <p className={"font-fre ml-[5px] text-text font-[800] text-gray-700 text-[28px]"}>BuyNow</p>
                    </div>
                    {/*Search*/}
                    <div className={`flex flex-row h-[45px] w-[580px] `}>
                        {/*<div*/}
                        {/*    onMouseLeave={() => {*/}
                        {/*        const id = setTimeout(() => {*/}
                        {/*            setIsOpen(false);*/}
                        {/*        }, 200); //*/}

                        {/*        setTimeoutId(id);*/}
                        {/*    }}*/}
                        {/*    onMouseEnter={() => {*/}
                        {/*        if (timeoutId) {*/}
                        {/*            clearTimeout(timeoutId);*/}
                        {/*        }*/}
                        {/*        setIsOpen(true);*/}
                        {/*    }}*/}
                        {/*    className="flex flex-col z-50 bg-gray-50 w-[100px] items-center relative font-sf font-regular">*/}
                        {/*    <div className="flex flex-row w-full h-full items-center justify-between p-[10px] border rounded-l-[4px] border-gray-300 ">*/}
                        {/*        <p className={` text-gray-800 font-pop`}>Click</p>*/}
                        {/*        <HiChevronDown />*/}
                        {/*    </div>*/}

                        {/*    {isOpen ? (*/}
                        {/*        <ul className={`absolute flex-col bg-gray-50 top-[45px] w-full items-center border border-gray-200 shadow rounded-[4px]`}>*/}
                        {/*            <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center rounded-t-[4px]`}>H</li>*/}
                        {/*            <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text text-center h-[30px] items-center justify-center `}>H</li>*/}
                        {/*            <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center `}>H</li>*/}
                        {/*            <li className={`flex text-gray-700  hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center rounded-b-[4px]`}>H</li>*/}
                        {/*        </ul>*/}
                        {/*    ) : null}*/}
                        {/*</div>*/}
                        <div className={`flex border-t border-b border-l border-gray-300 w-full pl-[20px] items-center pr-[20px]`}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm"
                                className={` flex focus:outline-none h-[25px] items-center w-full font-sf font-regular leading-tight placeholder:font-sf placeholder:font-[300]`}
                            />
                        </div>
                        <button className={`flex justify-center items-center w-[45px] h-[45px] bg-blue-500 rounded-r-[4px] hover:bg-gray-700`}>
                            <HiOutlineMagnifyingGlass className="text-[22px] text-gray-50"/>
                        </button>
                    </div>
                    <div className={`grid grid-cols-9 gap-[10px] h-[45px]`}>
                        <button onClick={()=>router.push("/")} className={`flex col-span-2 rounded-full border border-gray-300 justify-center items-center transition duration-300 text-gray-700 hover:bg-blue-500 hover:text-gray-50`}>

                            <HiOutlineHome className={` text-[20px]`} />

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
                                className={`relative flex col-span-5 px-[5px] pr-[10px] rounded-full border border-gray-300  items-center transition duration-300 text-gray-700 hover:bg-blue-500  group`}>
                            <div className={`w-[35px]  h-[35px] bg-gray-200 group-hover:bg-gray-50 rounded-full flex justify-center items-center hover:text-gray-700`}>
                                <HiOutlineUser className={` text-[20px]`} />
                            </div>
                            <span className={`text-[15px]  font-sf mt-[2px] ml-[7px] group-hover:text-gray-50 `}>{customer? customer.customerName : "Đăng nhập"}</span>
                            {
                                isOpenAccount && customer ?
                                    <div  className={"absolute bottom-[-100px] w-[130px] bg-white px-[10px] left-[-0px] py-[5px] border border-gray-200"}>
                                        <p onClick={()=> router.push(`/customer/${Cookies.get("id")}`)} className={"font-sf text-gray-800 text-[15px] mt-1"}>Tài khoản của tôi</p>
                                        <p className={"font-sf text-gray-800 text-[15px] mt-1"}>Đơn hàng</p>
                                        <p onClick={()=>{
                                            Cookies.remove("id");
                                            Cookies.remove("token");
                                            Cookies.remove("role");
                                            setCustomer(undefined);
                                            router.push("/");
                                        }} className={"font-sf text-gray-800 text-[15px] mt-1 mb-1"}>Đăng xuất</p>
                                    </div>
                                    : null
                            }

                        </button>
                        <button onClick={()=> {
                            const token = Cookies.get("token");
                            if (!token) {
                                router.push("/login")
                            } else router.push("/cart")
                        }} className={`flex col-span-2 w-[45px] h-[45px] rounded-full border border-gray-300 justify-center items-center transition duration-300 text-gray-700 hover:bg-blue-500 hover:text-gray-50`}>

                            <HiOutlineShoppingCart className={` text-[20px]`}/>
                        </button>
                    </div>

                </div>


            </nav>



        </div>



    )
}