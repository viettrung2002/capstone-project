"use client"
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {HiMiniMinus, HiMiniPlus, HiOutlineMapPin, HiOutlineTrash, HiOutlineTicket, HiMiniXMark } from "react-icons/hi2"
import {ICustomer} from "@/app/types/account";
import {IProductInCart, IProductInBill} from "@/app/types/product";
import {IShop, IShopInBill} from "@/app/types/shop";
import Image from "next/image";
import {IVoucher, IVoucherW} from "@/app/types/voucher";
import {Payload} from "@/app/types/payload";
export default function Bill() {
    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>()
    const [product, setProduct] = useState<IProductInCart[]>([])
    const [shop, setShop] = useState<IShopInBill[]>([])
    const [adminVoucher, setAdminVoucher] = useState<IVoucherW[]>([])
    const [shopVouchers, setShopVouchers] = useState<IVoucherW[]>([])
    // const [productInBill, setProductInBill] = useState<IProductInBill[]>([])
    const [showVoucher, setShowVoucher] = useState<boolean>(false)
    const [showShopVoucher, setShowShopVoucher] = useState<boolean>(false)
    const [voucher, setVoucher] = useState<IVoucher>()
    const [shippingFee, setShippingFee] = useState<number>(0)
    const [shippingVoucher, setShippingVoucher] = useState<IVoucher>()
    const [selectedShopVoucher, setSelectedShopVoucher] = useState<IVoucher[]>([])
    const [openNotification, setOpenNotification] = useState<boolean>(false)
    const [shopVoucher, setShopVoucher] = useState<IVoucher>()
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setOpenNotification(false);
    //     }, 10000); // 10 giây = 10000 ms
    //     return () => clearTimeout(timer); // clear nếu unmount
    // }, []);
    useEffect(() => {
        const storedArray = localStorage.getItem("productInBill");
        if (storedArray) {
            const parsedArray = JSON.parse(storedArray);
            console.log("item da duoc ative tai cart: ",parsedArray);
            setProduct(parsedArray);
            const newShops: IShopInBill[] = [];

            for (const p of parsedArray) {

                const ex = newShops.some(s=>s.shopId === p.shopId)

                if (!ex) {
                    const shop: IShopInBill = {
                        shopId: p.shopId,
                        shopName: p.shopName,
                        voucherId: "00000000-0000-0000-0000-000000000000",
                        shippingVoucherId: "00000000-0000-0000-0000-000000000000",
                        totalPrice: 0,
                        note:""
                    }
                    for (const p of parsedArray) {
                        if (p.shopId == shop.shopId) shop.totalPrice = shop.totalPrice + p.price * p.quantity;
                    }
                    console.log(shop.totalPrice);
                    newShops.push(shop);

                }
                console.log("SHopppppp",newShops);

            }
            setShop(newShops);
        }

        async function GetProduct() {
            const token = Cookies.get("token");
            console.log("Token:", token);
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/account/getcustomer`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                })
                const data = await response.json();
                console.log(data.data);
                setCustomer(data.data);
            } catch (error) {
                console.log(error)
            }
        }
        GetProduct();

    }, []);
    const fetchVoucherData = async () => {
        try {
            const token = Cookies.get("token");
            console.log("Token:", token);
            if (!token) {
                router.push("/login");
                return;
            }
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/customer/admin-voucher`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json();
            console.log("voucher admin",data.data);
            setAdminVoucher(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const fetchShopVoucherData = async (id: string) => {
        try {
            const token = Cookies.get("token");
            console.log("Token:", token);
            if (!token) {
                router.push("/login");
                return;
            }
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/customer/shop-voucher/${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json();
            console.log("voucher shop",data.data);
            setShopVouchers(data.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log("voucher da chon cua cac shop:", selectedShopVoucher);
    }, [selectedShopVoucher]);
    const createBill =  async () => {
        const token = Cookies.get("token");
        console.log("Token:", token);
        if (!token) {
            router.push("/login");
            return;
        }

        for (const item of shop ) {
            const productsInBill = product.filter( p => p.shopId == item.shopId );
            console.log("",productsInBill);
            const productInBill: IProductInBill[] = [];
            for (const p of productsInBill) {
                productInBill.push( {
                    productId: p.productId,
                    unitPrice: p.price,
                    quantity: p.quantity,
                });
            }
            console.log(productInBill);

            const payload: Payload = {
                totalPrice: item.totalPrice,
                items: productInBill
            };
            if (voucher) {
                payload.voucherId = voucher.voucherId;
            }
            if (shippingVoucher) {
                payload.shippingVoucherId = shippingVoucher.voucherId;
            }
            const shopVoucher = selectedShopVoucher.find(s=>s.shopId == item.shopId)

            if (selectedShopVoucher && shopVoucher!=null) {
                payload.shopVoucherId = shopVoucher.voucherId ;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                })
                const data = await response.json();
                console.log("CREATE BILL",data);
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div className="w-full flex flex-col justify-center items-center bg-gray-50 relative">
            <div className="w-[1300px]  bg-white p-[30px] py-[25px] border border-gray-200 mt-[20px]">
                <div className={"flex items-center text-blue-500 font-sf"}>
                    <HiOutlineMapPin className={"text-[18px] mr-[5px]"}/>
                    <p className={"text-[18px]"}>ĐỊA CHỈ NHẬN HÀNG</p>

                </div>
                <div className="flex font-sf items-end  mt-[10px]">
                    <p className={"font-[500] text-[17px] mr-[10px] "}>{customer?.customerName}</p>
                    {customer?.phoneNumber == null ? <p className={"text-blue-500 text-[14px] mb-[2px]"}>Thêm số điện thoại?</p> : <p className={""}>{customer.phoneNumber}</p>}
                    <p className={"text-[16px] ml-[10px] mr-[10px] mb-[1px]"}>Địa chỉ: {customer?.address}</p>
                    <button className={"text-blue-500 text-[14px]  mb-[2px]"}>
                        Thay đổi địa chỉ
                    </button>
                </div>
            </div>
            <div className="w-[1300px] grid grid-cols-3 gap-[20px] ">
                <div className={" mt-[20px] bg-white col-span-2"}>
                    <div className={"w-full grid grid-cols-21 p-[10px] px-[20px] border border-gray-200"}>
                        <div className={"flex items-center col-span-10 "}>
                            <p>Sản phẩm</p>
                        </div>
                        <div className={"flex items-center col-span-5  justify-center"}>
                            <p>Đơn giá</p>
                        </div>
                        <div className={"flex items-center col-span-2  justify-center"}>
                            <p>Số lượng</p>
                        </div>
                        <div className={"flex items-center col-span-4  justify-center pl-[calc(30%)]"}>
                            <p>Thành tiền</p>
                        </div>
                    </div>
                    <div className={"w-full flex flex-col "}>
                        {shop.map((shop) =>
                            <div key={shop.shopId} className={"w-full bg-white border border-gray-200 mt-[20px]"}>
                                <div className={"w-full h-[40px] border-b border-gray-200 grid grid-cols-25 px-[20px]"}>

                                    <div className={"col-span-10  flex items-center"}>
                                        <p className={"col-span-10 text-[16px] font-sf"}>{shop.shopName}</p>
                                    </div>

                                </div>
                                <div className={"w-full"}>
                                        {product.map((product) => (
                                            product.shopId === shop.shopId ? (
                                                <div key={product.itemId} className={"w-full px-[20px]"}>
                                                    <div className={"grid grid-cols-21 w-full border-b border-gray-200 py-[20px] "}>
                                                        <div className={"col-span-10 flex items-center"}>
                                                            <div className={"relative w-[65px] h-[65px] border border-gray-200 mr-[10px]"}>
                                                                <Image src={"/products/product-4.jpg"} alt={"image"} fill={true}/>
                                                            </div>
                                                            <p className={"font-sf text-gray-600 text-[15px]"}>{product.productName}</p>
                                                        </div>
                                                        <div className={"col-span-5 flex items-center justify-center"}>
                                                            <p className={"font-sf text-gray-600 text-[15px]"}>{product.price}</p>
                                                        </div>
                                                        <div className={"col-span-2 flex items-center justify-center"}>
                                                            <div className={"w-[110px] h-[30px] font-sf justify-center items-center text-gray-600 flex"}>
                                                                <p>{product.quantity}</p>
                                                            </div>

                                                        </div>
                                                        <div className={"col-span-4  flex items-center justify-center pl-[calc(30%)]"}>
                                                            <p className={"font-sf text-gray-600 text-[15px]"}>{product.price*product.quantity}</p>
                                                        </div>

                                                    </div>


                                                </div>
                                            ) : null
                                        ))}

                                    <div className={"col-span-4  flex  justify-center flex-col  "}>
                                        <div className={"border-gray-200 h-full pl-[20px] pr-[20px]"}>
                                            <div className={" border-gray-200 py-[15px]"}>
                                                <div className={"h-[30px] w-full flex items-center justify-between  "}>
                                                    <p className={"font-sf text-[16px] text-gray-800"}>Voucher của Shop</p>
                                                    <button onClick={()=> {
                                                        fetchShopVoucherData(shop.shopId)
                                                        setShowShopVoucher(true)
                                                    }}  className={"font-sf text-[15px] text-blue-500"}>Chọn voucher</button>
                                                </div>
                                                <div className={"h-[35px] flex  items-center mt-[10px]"}>
                                                    <p className={"font-sf text-[16px] text-gray-800 mr-[20px] "}>Lời nhắn:</p>
                                                    <input
                                                        type={"text"}
                                                        placeholder={"Lưu ý cho người bán"}
                                                        className={"h-full border border-gray-200 focus:outline-none flex-1 font-sf text-gray-800 px-[10px] text-[15px]"}/>
                                                </div>
                                                <div className={"flex items-end justify-end mt-[10px]"}>
                                                    <p className={"font-sf text-[16px] text-gray-800 mb-[2px] mr-[5px]"}>Tổng số tiền:</p>
                                                    <p className={"font-sf text-[20px] text-blue-500 font-[600]"}>{shop.totalPrice}</p>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>)}
                    </div>

                    <div className={""}>

                    </div>

                </div>
                <div className={"col-span-1 max-h-fit border border-gray-200 mt-20px sticky top-[80px] mt-[20px] p-[30px] pt-[25px] bg-white flex flex-col items-center"}>

                    <p className={"font-sf text-gray-800 font-400 text-[18px]"}>THANH TOÁN</p>
                    <div className={"border-b border-gray-200 w-full mt-[10px] mb-[20px]"}></div>
                    <div className={"flex flex-col w-full"}>
                        <div className={"flex items-center justify-between w-full"}>
                            <div className={"flex items-center justify-center"}>
                                <HiOutlineTicket className="text-blue-500 text-[18px]" />
                                <p className="text-gray-800 text-[16px] font-sf ml-[5px]">BuyNow Voucher</p>
                            </div>
                            <div onClick={()=> {
                                fetchVoucherData();
                                setShowVoucher(!showVoucher)
                            }} className={"flex items-center justify-center border border-gray-200"}>
                                <p className={"text-blue-500  text-[15px] font-sf ml-[5px]"}>Chọn Voucher</p>
                            </div>
                        </div>
                        <div className={"border-b border-gray-200 w-full mt-[20px] mb-[20px]"}></div>

                        <div className={"flex items-center flex-col w-full"}>
                            <p className="text-gray-800 text-[16px] font-sf w-full ">Phương thức thanh toán</p>
                            <div className={"flex items-center justify-between w-full mt-[10px]"}>
                                <div className={"flex items-center justify-center"}>
                                    <button className={"w-[16px] h-[16px] border border-gray-400 rounded-full mr-[5px] flex justify-center items-center"}>
                                        <div className={"w-[10px] h-[10px]  rounded-full"}></div>
                                    </button>
                                    <p className="text-gray-800 text-[15px] font-sf ">Thanh toán khi nhận hàng</p>
                                </div>
                                <div className={"flex items-center justify-center"}>
                                    <button className={"w-[16px] h-[16px] border border-gray-400 rounded-full mr-[5px] flex justify-center items-center"}>
                                        <div className={"w-[10px] h-[10px]  rounded-full"}></div>
                                    </button>
                                    <p className="text-gray-800 text-[15px] font-sf ">Ví BuyNow</p>
                                </div>

                            </div>
                        </div>

                        <div className={"border-b border-gray-200 w-full mt-[20px] mb-[20px]"}></div>
                        <div className={"flex flex-col w-full justify-end items-end"}>
                            <div className={"w-full h-[30px] justify-between flex items-center"}>
                                <p className={"text-gray-600 text-[15px] font-sf"}>Tổng tiền hàng</p>
                                <p className={"text-gray-700 text-[16px] font-sf"}>{shop.reduce((sum,s) => sum + s.totalPrice, 0)}</p>
                            </div>
                            <div className={"w-full h-[30px] justify-between flex items-center"}>
                                <p className={"text-gray-600 text-[15px] font-sf"}>Tổng tiền phí vận chuyển</p>
                                <p className={"text-gray-700 text-[16px] font-sf"}>{shippingFee}</p>
                            </div>
                            <div className={"w-full h-[30px] justify-between flex items-center"}>
                                <p className={"text-gray-600 text-[15px] font-sf"}>Tổng cộng voucher giảm giá</p>
                                <p className={"text-gray-700 text-[16px] font-sf"}>{(voucher ? voucher.value * shop.length : 0) + (selectedShopVoucher ? selectedShopVoucher.reduce((sum,s)=> sum + s.value, 0): 0) + (shippingVoucher ? shippingVoucher.value * shop.length : 0) }</p>
                            </div>
                            <div className={"w-full h-[30px] justify-between flex items-center"}>
                                <p className={"text-gray-600 text-[15px] font-sf"}>Tổng thanh toán</p>
                                <p className={"text-blue-500 text-[20px] font-sf"}>{(shop.reduce((sum,s) => sum + s.totalPrice, 0)) - shippingFee - ((voucher ? voucher.value * shop.length : 0) + (selectedShopVoucher ? selectedShopVoucher.reduce((sum,s)=> sum + s.value, 0): 0) + (shippingVoucher ? shippingVoucher.value * shop.length : 0))}</p>
                            </div>
                        </div>

                        <div className={"border-b border-gray-200 w-full mt-[20px] mb-[20px]"}></div>
                        <button onClick={()=>createBill()} className={"w-full h-[40px] bg-blue-500 text-gray-50 hover:bg-gray-700"}>
                            <p className={" text-[18px] font-sf"}>ĐẶT HÀNG</p>
                        </button>
                    </div>
                </div>
            </div>

            {/*CHON VOUCHER SHOP*/}
            <div className={`${showShopVoucher ? `visible bg-black/20` : `hidden`} top-0 flex justify-center items-center fixed w-screen h-screen z-50  flex-col `}>
                <div className={"w-[500px]  border border-gray-200 bg-white"}>
                    <div className={"border-b border-gray-200 p-[20px] py-[15px] relative flex items-center justify-center"}>
                        <h1 className={"font-sf text-[20px] text-gray-800"}>Chọn BuyNow Voucher</h1>
                        <button className={"absolute right-[20px]"} onClick={()=> {
                            setShowShopVoucher(!showVoucher);
                            setShopVoucher(undefined);
                        }}>
                            X
                        </button>
                    </div>
                    <div className={"w-full px-[20px] h-[35px] flex items-center justify-center mt-[20px] mb-[20px]"}>
                        <p className={"font-sf text-gray-600 text-[15px]"}>Mã Voucher</p>
                        <input
                            type={"text"}
                            placeholder={"Mã BuyNow Voucher"}
                            className={`font-sf text-gray-700 text-[15px] border border-gray-200 h-full mr-[10px] ml-[10px] px-[10px] focus:outline-none `}
                        />

                        <button className={"h-full px-[10px] border bg-blue-500 font-sf text-[15px] text-gray-50 flex justify-center items-center hover:bg-gray-700 "}>ÁP DỤNG</button>
                    </div>
                    <div className={"overflow-y-auto h-[475px] pr-[15px] pl-[25px] pt-[5px]"}>

                        {shopVouchers.map((v) => (
                            <div key={v.voucherWalletId} className={"h-[100px] mb-[20px] flex"}>
                                <div className={"h-full aspect-square bg-blue-300"}>

                                </div>
                                <div className={"flex-1 border-y border-r border-gray-200 flex justify-between px-[20px]  items-center"}>
                                    <div>
                                        <p className={"font-sf text-gray-800 text-[16px]"}>{v.voucher.voucherName}</p>
                                        <div className={"flex items-baseline h-[20px]"}>
                                            <p className={"font-sf text-gray-600 text-[14px]"}>Giảm giá</p>
                                            <p className={"font-sf text-blue-500 text-[16px] ml-[5px]"}>{v.voucher.value}</p>
                                        </div>
                                        <div className={"flex items-baseline"}>
                                            <p className={"font-sf text-gray-600 text-[14px]"}>Đơn tối thiểu</p>
                                            <p className={"font-sf text-gray-800 text-[14px] ml-[5px]"}> {v.voucher.minPrice}</p>
                                        </div>

                                        <p className={"font-sf text-gray-600 text-[13px]"}>HSD: {new Date(v.voucher.endTime).toLocaleString("vi-VN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}</p>
                                    </div>
                                    <button onClick={()=> {
                                        if (v.quantity >= 1) {
                                            setShopVoucher(v.voucher)
                                        } else {
                                            setOpenNotification(true)
                                            setTimeout(() => {
                                                setOpenNotification(false);
                                            }, 2000);
                                        }
                                    }} className={"w-[18px] h-[18px] border border-gray-300 rounded-full flex justify-center items-center"}>
                                        <div className={`w-[12px] h-[12px] ${v.voucherId == shopVoucher?.voucherId ? "bg-gray-400": "bg-white" } rounded-full`}></div>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/*Voucher*/}

                    </div>
                    <div className={" flex items-center justify-end px-[25px] mt-[15px] border-t border-gray-200 p-[20px]"}>
                        <button onClick={()=> {
                            setShowShopVoucher(!showShopVoucher)
                            setShopVoucher(undefined);
                        }} className={"h-[40px] border border-gray-200 px-[20px]"}>
                            <p className={"font-sf text-gray-800 text-[16px]"}>TRỞ LẠI</p>
                        </button>
                        <button onClick={()=> {
                            setShowShopVoucher(!showShopVoucher);
                            if (shopVoucher != undefined)
                                setSelectedShopVoucher(prev => [...prev, shopVoucher]);
                            setShopVoucher(undefined);
                        }} className={"h-[40px] border bg-blue-500 px-[35px] ml-[15px] text-gray-50"}>
                            <p className={"font-sf  text-[16px]"}>OK</p>
                        </button>
                    </div>
                </div>

            </div>
            <div className={`${showVoucher ? `visible bg-black/20` : `hidden`} top-0 flex justify-center items-center fixed w-screen h-screen z-50  flex-col `}>
                <div className={"w-[500px]  border border-gray-200 bg-white"}>
                    <div className={"border-b border-gray-200 p-[20px] py-[15px] relative flex items-center justify-center"}>
                        <h1 className={"font-sf text-[20px] text-gray-800"}>Chọn BuyNow Voucher</h1>
                        <button className={"absolute right-[20px]"} onClick={()=> {
                            setShowVoucher(!showVoucher);
                            setVoucher(undefined);
                        }}>
                            X
                        </button>
                    </div>
                    <div className={"w-full px-[20px] h-[35px] flex items-center justify-center mt-[20px] mb-[20px]"}>
                        <p className={"font-sf text-gray-600 text-[15px]"}>Mã Voucher</p>
                        <input
                            type={"text"}
                            placeholder={"Mã BuyNow Voucher"}
                            className={`font-sf text-gray-700 text-[15px] border border-gray-200 h-full mr-[10px] ml-[10px] px-[10px] focus:outline-none `}
                        />

                        <button className={"h-full px-[10px] border bg-blue-500 font-sf text-[15px] text-gray-50 flex justify-center items-center hover:bg-gray-700 "}>ÁP DỤNG</button>
                    </div>
                    <div className={"overflow-y-auto h-[475px] pr-[15px] pl-[25px] pt-[5px]"}>

                        {adminVoucher.map((v) => (
                            <div key={v.voucherWalletId} className={"h-[100px] mb-[20px] flex"}>
                                <div className={"h-full aspect-square bg-blue-300"}>

                                </div>
                                <div className={"flex-1 border-y border-r border-gray-200 flex justify-between px-[20px]  items-center"}>
                                    <div>
                                        <p className={"font-sf text-gray-800 text-[16px]"}>{v.voucher.voucherName}</p>
                                        <div className={"flex items-baseline h-[20px]"}>
                                            <p className={"font-sf text-gray-600 text-[14px]"}>Giảm giá</p>
                                            <p className={"font-sf text-blue-500 text-[16px] ml-[5px]"}>{v.voucher.value}</p>
                                        </div>
                                        <div className={"flex items-baseline"}>
                                            <p className={"font-sf text-gray-600 text-[14px]"}>Đơn tối thiểu</p>
                                            <p className={"font-sf text-gray-800 text-[14px] ml-[5px]"}> {v.voucher.minPrice}</p>
                                        </div>

                                        <p className={"font-sf text-gray-600 text-[13px]"}>HSD: {new Date(v.voucher.endTime).toLocaleString("vi-VN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}</p>
                                    </div>
                                    <button onClick={()=> {
                                        if (v.quantity >= shop.length) {
                                            setVoucher(v.voucher)
                                        } else {
                                            setOpenNotification(true)
                                            setTimeout(() => {
                                                setOpenNotification(false);
                                            }, 2000);
                                        }
                                    }} className={"w-[18px] h-[18px] border border-gray-300 rounded-full flex justify-center items-center"}>
                                        <div className={`w-[12px] h-[12px] ${v.voucherId == voucher?.voucherId ? "bg-gray-400": "bg-white" } rounded-full`}></div>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/*Voucher*/}

                    </div>
                    <div className={" flex items-center justify-end px-[25px] mt-[15px] border-t border-gray-200 p-[20px]"}>
                        <button onClick={()=> {
                            setShowVoucher(!showVoucher)
                            setVoucher(undefined);
                        }} className={"h-[40px] border border-gray-200 px-[20px]"}>
                            <p className={"font-sf text-gray-800 text-[16px]"}>TRỞ LẠI</p>
                        </button>
                        <button onClick={()=> setShowVoucher(!showVoucher)} className={"h-[40px] border bg-blue-500 px-[35px] ml-[15px] text-gray-50"}>
                            <p className={"font-sf  text-[16px]"}>OK</p>
                        </button>
                    </div>
                </div>

            </div>
            <div className={`${openNotification? "block" : "hidden"} border-blue-200 border absolute top-[-50px] z-50`}>
                <div className={"flex items-center px-[20px] py-[15px] bg-blue-50"}>
                    <p className={"font-sf text-blue-600 mr-[15px]"}>Số lượng voucher còn lại không đủ</p>
                    <button onClick={()=>setOpenNotification(false)} className={""}>
                        <HiMiniXMark className="text-[20px] text-blue-600" />
                    </button>
                </div>

            </div>
        </div>
    )
}