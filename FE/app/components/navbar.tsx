'use client'
import {useEffect, useState} from "react";

import { HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {useRouter , usePathname} from "next/navigation";

import {TbBasketFilled, TbBellFilled, TbHomeFilled, TbShoppingCartFilled} from "react-icons/tb";
import Cookies from "js-cookie";
import {ICustomer} from "@/app/types/account";
import {TbLogout, TbUser} from "react-icons/tb";
import {INotification} from "@/app/types/notification";
export default function Navbar() {

    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>();
    const pathname = usePathname();
    const token = Cookies.get('token');
    const [mounted, setMounted] = useState(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);
    const [unreadNotification, setUnreadNotification] = useState(0);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const id = Cookies.get("id");
        const token = Cookies.get("token");

        const GetCustomer = async () => {
            if (id && token) {
                setShowNotification(true);
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

        const GetUnreadNotification = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/unread`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    console.log(data.data);
                    setUnreadNotification(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetUnreadNotification();


        const GetNotifications = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    console.log("NOTIFICATION: ",data.data);
                    setNotifications(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetNotifications();

    }, [pathname, reload]);
    const ReadNotification = async (notification: INotification) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/read?notificationId=${notification.notificationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const r = Cookies.get("role");
        setRole(r || null);
        setMounted(true);
    }, [pathname]);
    if (!mounted) return <div>Loadinggg</div>;
    return (
        role != "Shop" && role != "Admin"  ?
            (<div className={`w-full relative h-[70px] z-20 ${pathname == '/' ? null : "bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.1)]"} `}>
                <nav className=" w-full h-[70px]  items-center flex-row flex justify-center  pb-[0px]">
                    <div className="w-full flex items-center justify-between px-[20px]">
                        <div className="flex h-full items-center flex-row">
                            {/*<Image src={"/cart.png"} alt={"Logo"} width={40} height={40}></Image>*/}
                            {/*<TbShoppingCartFilled className={"text-[28px] text-amber-600"}/>*/}
                            <p className={"font-fre ml-[5px] text-text font-[800] text-amber-600 text-[28px]"}>BuyNow</p>
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

                            <div
                            // onClick={()=> {
                            //     const token = Cookies.get("token");
                            //
                            //     if (!token) {
                            //         router.push("/login")
                            //     } else router.push(`/customer/profile`)
                            // }}
                            className={`relative flex items-center h-full group`}>

                                <div onClick={()=> {
                                    if (customer) router.push("/customer/profile"); else router.push("/login")
                                }} className={`flex h-full items-center ml-[20px] mr-[20px]`}>
                                    {customer ? (<p className={"font-sf text-gray-600 font-[600] text-[14px]"}>xin chào</p>) : null }
                                    <span className={`text-[15px]  font-sf ml-[7px] text-gray-800 font-[700]  uppercase`}>{customer? ` ${customer.customerName}` : "ĐĂNG NHẬP"}</span>
                                </div>

                                {
                                     customer ?
                                        <div  className={"absolute bottom-[-110px] w-[150px] bg-gray-50 hidden left-[-0px]  border border-gray-100 rounded-[25px] overflow-hidden shadow-sm group-hover:block py-[5px]"}>
                                            <p onClick={()=> router.push(`/customer/profile`)} className={" font-sf mt-1 text-gray-800 text-[15px] px-[15px] hover:text-amber-600 hover:font-[600]  py-[4px]"}>Tài khoản của tôi</p>
                                            <p onClick={()=> router.push(`/customer/order`)} className={"font-sf text-gray-800 text-[15px] px-[15px] hover:text-amber-600 hover:font-[600] py-[4px]"}>Đơn hàng</p>
                                            <p onClick={()=>{
                                                Cookies.remove("id");
                                                Cookies.remove("token");
                                                Cookies.remove("role");
                                                setShowNotification(false);
                                                setCustomer(undefined);
                                                router.push("/");
                                            }} className={"font-sf text-gray-800 text-[15px]  px-[15px] hover:text-amber-600  mb-1 py-[4px] hover:font-[600]"}>Đăng xuất</p>
                                        </div>
                                        : null
                                }
                            </div>
                            <button onClick={()=>router.push("/")} className={`flex col-span-2 h-full items-center text-[28px] mr-[15px] mb-[2px] text-gray-800`}>

                                {/*<p className={"font-sf text-gray-800 font-[700] text-[15px] hover:text-amber-600"}>TRANG CHỦ</p>*/}
                                <TbHomeFilled/>

                            </button>

                            {showNotification  && (
                                <div className={"relative flex items-center h-full mr-[15px]  mb-[0px] group"}>
                                    <TbBellFilled className={"text-[30px] text-gray-800"}/>

                                    {unreadNotification > 0 && (
                                        <div className={"absolute top-0 right-0 w-[14px] h-[14px] rounded-full flex items-center justify-center bg-white font-sf text-[10px]"}>
                                            {unreadNotification}
                                        </div>
                                    )}

                                    <div className={`absolute hidden group-hover:block w-[390px] top-[40px] rounded-[25px] py-[6px] right-0   bg-white overflow-hidden border font-sf `}>
                                        <div className={"w-full h-[30px] font-sf text-[15px]  text-stone-600 flex items-center justify-start px-[20px] border-b "}>
                                            <p>Thông Báo Mới Nhận</p>
                                        </div>
                                        {notifications.map((notification) => (
                                            <div onClick={()=> {
                                                ReadNotification(notification);
                                                router.push(`/customer/order/${notification.billId}`)
                                            }} key={notification.notificationId} className={`w-full py-[10px] flex px-[20px] items-start text-start flex-col ${!notification.read && "bg-amber-100"}`}>
                                                <p className={"font-sf text-stone-800 font-[500] text-[15px]"}>{notification.title}</p>
                                                <p className={"font-sf text-stone-700 font-[400] text-[14px]"}> {notification.content}</p>
                                                <p className={"font-sf text-stone-800 font-[500] text-[14px]"}> {new Date(notification.createdDate).getHours()}:{new Date(notification.createdDate).getMinutes()}, {new Date(notification.createdDate).getDate()}/{new Date(notification.createdDate).getMonth()}/{new Date(notification.createdDate).getFullYear()}</p>

                                            </div>
                                        ))}
                                        <button className={"w-full h-[30px] font-sf text-[15px] text-stone-600 flex items-center justify-center px-[20px] border-t"}>
                                            <p className={"mt-[4px]"}>Xem Tất Cả</p>

                                        </button>
                                    </div>

                                </div>
                            )}
                            <button onClick={()=> {
                                const token = Cookies.get("token");
                                if (!token) {
                                    router.push("/login")
                                } else router.push("/cart")
                            }} className={`text-gray-800 text-[30px] h-full mb-[4px] hover:text-amber-600 `}>

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
                                <p className={"text-gray-800 text-[15px]"}>{role == "Shop" ? "Shop" : "Admin"}</p>
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