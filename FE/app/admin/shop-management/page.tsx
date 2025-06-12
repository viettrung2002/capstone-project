'use client'
import {useState, useEffect} from "react";
import {IShopInAdminPage} from "@/app/types/shop";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {TbLock, TbLockOpen2, TbSearch} from "react-icons/tb";
export default function ShopManagementPage() {
    const router = useRouter();
    const [shops, setShops] = useState<IShopInAdminPage[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openUnlock, setOpenUnlock] = useState<boolean>(false);
    const [openLock, setOpenLock] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [shopId, setShopId] = useState<string>("");
    const GetShops = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/shops`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setShops(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const ActivateShop = async (shopId: string) => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/activate?shopId=${shopId}`, {
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
    const DectivateShop = async (shopId: string) => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/deactivate?shopId=${shopId}`, {
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
        GetShops();
    },[reload])
    return(
        <div className={"w-full h-full px-[20px] py-[20px]"}>
            {openUnlock && (
                <div className={"absolute border border-stone-200 py-[20px] px-[20px] flex flex-col z-50 bg-white rounded-[25px] shadow-md top-[10px] right-1/2"}>
                    <p>Xác nhận kích hoạt shop</p>
                    <div className={"flex mt-[15px] "}>
                        <button onClick={()=> {
                            ActivateShop(shopId);
                            setOpenUnlock(false);
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-amber-600 text-white rounded-full mr-[10px]"}>
                            Xác Nhận
                        </button>
                        <button onClick={()=> {
                            setOpenUnlock(false);
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-stone-800 text-white rounded-full mr-[10px]"}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            {openLock && (
                <div className={"absolute border border-stone-200 py-[20px] px-[20px] flex flex-col z-50 bg-white rounded-[25px] shadow-md top-[10px] right-1/2"}>
                    <p>Xác nhận hủy kích hoạt shop</p>
                    <div className={"flex mt-[15px] "}>
                        <button onClick={()=> {
                            DectivateShop(shopId);
                            setOpenLock(false);
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-amber-600 text-white rounded-full mr-[10px]"}>
                            Xác Nhận
                        </button>
                        <button onClick={()=> {
                            setOpenLock(false);
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-stone-800 text-white rounded-full mr-[10px]"}>
                            Hủy
                        </button>
                    </div>
                </div>
            )}
            <div className={"relative mb-[10px] flex items-center"}>
                <input
                    type={"text"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={"Tìm kiếm"}
                    className={"w-full h-[40px] rounded-full px-[40px]  focus:outline-none focus:shadow-outline border border-stone-200 "}
                />
                <button className={"absolute  left-[15px]  flex justify-center items-center text-stone-700 text-[20px]"}>
                    <TbSearch/>
                </button>
            </div>

            <div className={"h-[40px] rounded-full bg-stone-200 grid grid-cols-8"}>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Avatar</div>
                <div className={"h-full col-span-2 flex justify-start items-center font-[500] text-[15px]"}>Tên Shop</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Số Sản Phẩm</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Số Đơn</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Doanh Thu</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Trạng Thái</div>
                <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>Tháo Tác</div>
            </div>
            {
                shops.length > 0 ?
                    shops.map( (shop) =>
                        <div key={shop.shopId} className={"grid grid-cols-8 h-[60px]  mt-[10px]"}>
                            <div className={"h-full col-span-1 flex justify-center items-center   "}>
                                <div className={"h-full aspect-square rounded-full bg-stone-200"}>

                                </div>
                            </div>
                            <div className={"h-full col-span-2 flex justify-start items-center font-[400] text-[15px]"}>{shop.shopName}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>{shop.productCount}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>{shop.billCount}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>{shop.revenue}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>{shop.status}</div>
                            <div className={"h-full col-span-1 flex justify-center items-center font-[500] text-[15px]"}>
                                <button onClick={()=> {
                                    setShopId(shop.shopId)
                                    setOpenLock(true)
                                }} className={"h-[30px] w-[30px] rounded-full bg-stone-800 flex justify-center items-center text-white mr-[5px]"}>
                                    <TbLock/>
                                </button>
                                <button onClick={()=> {
                                    setShopId(shop.shopId)
                                    setOpenUnlock(true)
                                }} className={"h-[30px] w-[30px] rounded-full bg-amber-600 flex justify-center items-center text-white"}>
                                    <TbLockOpen2/>
                                </button>
                            </div>
                        </div>
                    ) : null
            }

        </div>
    )
}