'use client'

import {useEffect, useState} from "react";
import {INotification} from "@/app/types/notification";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import Image from "next/image";
export default function NotificationPage () {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const token = Cookies.get("token");
    const router = useRouter();
    const [reload, setReload] = useState(false);
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
    useEffect(() => {
        if (token == null) {
            router.push("/login");
            return;
        }
        GetNotifications();
    }, [reload]);
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
    return(
        <div className={"w-full h-full rounded-[25px] border border-stone-200 relative font-sf max-h-fit overflow-hidden"}>
            <div className={"h-[30px] w-full flex items-center justify-end border-b px-[20px] text-[14px] text-stone-600 hover:text-amber-600 select-none"}>
                <p>Đánh Dấu Đã Đọc Tất Cả</p>
            </div>
            {notifications.map((notification) => (
                <div onClick={()=>ReadNotification(notification)} key={notification.notificationId} className={`h-[120px] w-full px-[10px] flex items-center ${!notification.read && "bg-amber-100"}`}>
                    <div className={"h-[100px] aspect-square rounded-[20px] bg-stone-200 p-[10px]"}>
                        <div className={"w-full h-full relative"}>
                            <Image src={notification.bill.items[0].image} alt={"i"} fill={true}/>
                        </div>
                    </div>
                    <div className={"h-[100px] flex-1 flex px-[20px] flex-col justify-center"}>
                        <p className={"font-[500] text-[15px]"}>{notification.title}</p>
                        <p className={"font-[400] text-[14px] text-stone-700"}>{notification.content}</p>
                        <p className={"font-[400] text-[14px] text-stone-700"}>{new Date(notification.createdDate).getHours()}:{new Date(notification.createdDate).getMinutes()}, {new Date(notification.createdDate).getDate()}/{new Date(notification.createdDate).getMonth()}/{new Date(notification.createdDate).getFullYear()}</p>
                    </div>
                    <div className={"w-[120px] h-full py-[20px] "}>
                        <button onClick={()=> router.push(`/customer/order/${notification.billId}`)} className={"w-[120px] h-[30px] border rounded-full font-[400] text-[14px] bg-white"}>
                            <p>Xem Chi Tiết</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}