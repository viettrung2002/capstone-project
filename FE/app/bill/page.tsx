"use client"
import {useEffect, useState, useRef} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {HiMiniXMark } from "react-icons/hi2"
import {ICustomer} from "@/app/types/account";
import {IProductInCart, IProductInBill} from "@/app/types/product";
import { IShopInBill} from "@/app/types/shop";
import Image from "next/image";
import {IVoucher, IVoucherW} from "@/app/types/voucher";
import {Payload} from "@/app/types/payload";
import {TbCheck, TbMapPin, TbTicket, TbX} from "react-icons/tb";
import {IAddress, IAddressResponse} from "@/app/types/address";
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
    const [paymentMethod, setPaymentMethod] = useState(0)
    const [shopVoucher, setShopVoucher] = useState<IVoucher>()
    const [billComplete, setBillComplete] = useState<boolean>(false)
    const [showInsufficientInventory, setShowInsufficientInventory] = useState<boolean>(false)
    const [otp, setOtp] = useState<string[]>(["", "", "", "","",""]);
    const [addresses, setAddresses] = useState<IAddressResponse[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<IAddressResponse>();
    const [openAddress, setOpenAddress] = useState<boolean>(false)
    // 👇 Dùng đúng kiểu Ref cho TypeScript
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


    useEffect(() => {
        console.log(shop)
    }, [shop]);
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
                    productName: p.productName,
                    unitPrice: p.price,
                    quantity: p.quantity,
                });
            }
            console.log(productInBill);

            const payload: Payload = {
                totalPrice: item.totalPrice,
                note: item.note,
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
                    body: JSON.stringify({
                        bill: payload
                    })
                })
                const data = await response.json();

                if (response.ok) {

                    console.log("CREATE BILL",data);
                    setBillComplete(true)
                } else {
                    if (data.error == "Insufficient inventory") setShowInsufficientInventory(true)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
    const createBillPayWithWallet =  async () => {
        const token = Cookies.get("token");
        console.log("Token:", token);
        if (!token) {
            router.push("/login");
            return;
        }
        const isOtpComplete = otp.every(digit => digit !== "");
        if (isOtpComplete) {
            const otpCode = otp.join("");
            for (const item of shop ) {
                const productsInBill = product.filter( p => p.shopId == item.shopId );
                console.log("",productsInBill);
                const productInBill: IProductInBill[] = [];
                for (const p of productsInBill) {
                    productInBill.push( {
                        productId: p.productId,
                        productName: p.productName,
                        unitPrice: p.price,
                        quantity: p.quantity,
                    });
                }
                console.log(productInBill);

                const payload: Payload = {
                    totalPrice: item.totalPrice,
                    note: item.note,
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
                        body: JSON.stringify({
                            bill: payload,
                            otp: otpCode
                        })
                    })
                    const data = await response.json();

                    if (response.ok) {

                        console.log("CREATE BILL",data);
                        setBillComplete(true)
                    } else {
                        if (data.error == "Insufficient inventory") setShowInsufficientInventory(true)
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        } else alert("Vui lòng nhập đủ OTP")

    }

    const GetAddresses = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data.data);
                setAddresses(data.data);
                data.data.forEach((item : IAddressResponse) => {
                    if (item.isDefault) {
                        setSelectedAddress(item);
                    }
                })
                setOpenAddress(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAddresses();
    }, []);
    if (billComplete)
        return (
            <div className={"flex justify-center items-center flex-col w-full h-screen pb-[80px]"}>
                <div className="w-[150px] h-[150px] rounded-full bg-green-600 text-white flex justify-center items-center text-[100px]">
                    <TbCheck/>
                </div>
                <p className={"font-sf text-stone-800 font-[400] text-[25px] mt-[20px]"}>Mua Hàng Thành Công!</p>
                <div className={"flex mt-[15px]"}>
                    <button onClick={()=> router.push("/")} className={"bg-stone-200 px-[20px] py-[8px] rounded-full mr-[10px] font-sf font-[500]"}>
                        Trang Chủ
                    </button>
                    <button className={"bg-amber-600 px-[20px] py-[8px] rounded-full font-sf font-[500] text-white"}>
                        Đơn Hàng
                    </button>
                </div>

            </div>
        )
    else
        return (

            <div className="w-full flex flex-col justify-center items-center bg-white relative pb-[20px] font-sf">

                <div className={`${openAddress ? "visible" : "hidden"} fixed w-screen h-screen top-0 left-0 bg-black/20 z-50 flex justify-center items-center `}>
                    <div className={" w-[500px] bg-white rounded-[25px] pb-[10px]"}>
                        <div className={"h-[40px] border-b flex justify-center items-center"}>
                            Địa Chỉ Của Tôi
                        </div>

                        <div className={"px-[20px] h-[360px] overflow-y-auto"}>
                            {
                                addresses.map((address) => {
                                    return (
                                        <div key={address.addressId} className={`${selectedAddress == address && "border border-amber-600 "}  w-full rounded-[20px] bg-stone-50  flex justify-between items-center px-[20px] py-[10px] mt-[20px]`}>
                                            <div onClick={()=> address?.addressId && setSelectedAddress(address) } className={"flex-1 flex flex-col"}>
                                                <div className={"flex items-center "}>
                                                    <p className={"pr-[10px] border-r  flex justify-center items-center text-[16px] font-[500]"}>{address.name}</p>
                                                    <p className={"pl-[10px] flex justify-center items-center text-[15px] mt-[1px] text-stone-700"}>{address.phoneNumber}</p>
                                                </div>
                                                <p className={"text-[15px] text-stone-700"}>{address.streetAddress}</p>
                                                <p className={"text-[15px] text-stone-700"}>{address.ward.wardName}, {address.district.districtName}, {address.province.provinceName}</p>

                                                {
                                                    address.isDefault == true &&
                                                    <div className={"w-[100px] py-[0px] rounded-full border border-amber-600 text-[14px] text-amber-600 flex justify-center items-center mt-[3px]"}>
                                                        Mặc Định
                                                    </div>
                                                }

                                            </div>
                                            <div className={"flex flex-col text-[15px] h-full items-center justify-center"}>
                                                <button>Cập Nhật</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={"h-[40px] flex justify-end items-center px-[20px]"}>
                            <button onClick={()=>setOpenAddress(false)} className={"h-full px-[20px] flex items-center justify-center bg-stone-200 text-[15px] rounded-full"}>
                                Trở Lại
                            </button>
                            <button className={"h-full px-[20px] flex items-center justify-center bg-amber-600 text-white text-[15px] ml-[10px] rounded-full"}>
                                Xác Nhận
                            </button>
                        </div>
                    </div>
                </div>
                {showInsufficientInventory && (
                    <div className={"absolute top-[-70px] border border-stone-200 py-[20px] px-[20px] flex flex-col z-50 bg-white rounded-[25px] shadow-md "}>
                        <p>Số lượng sản phẩm trong kho còn lại không đủ</p>
                        <div className={"flex mt-[15px] "}>
                            <button onClick={()=> {
                                router.push("/")
                                setShowInsufficientInventory(false)
                            }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-amber-600 text-white rounded-full mr-[10px]"}>
                                Trở về trang chủ
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-[1300px]   p-[30px] py-[25px] border border-stone-200 mt-[20px] rounded-[25px]">
                    <div className={"flex items-center text-amber-600 font-sf"}>
                        <TbMapPin className={"text-[18px] mr-[5px]"}/>
                        <p className={"text-[18px]"}>ĐỊA CHỈ NHẬN HÀNG</p>
                    </div>
                    <div className="flex font-sf items-end  mt-[10px]">
                        <p className={"font-[500] text-[17px] mr-[10px] "}>{selectedAddress?.name}</p>
                        <p className={"text-amber-600 text-[15px] mb-[1px]"}>{selectedAddress?.phoneNumber}</p>
                        <p className={"text-[16px] ml-[10px] mr-[10px] mb-[1px]"}>Địa chỉ: {selectedAddress?.streetAddress}, {selectedAddress?.ward.wardName}, {selectedAddress?.district.districtName}, {selectedAddress?.province.provinceName}</p>
                        <button onClick={()=> {
                            setOpenAddress(true)
                        }} className={"text-amber-600 text-[14px]  mb-[2px]"}>
                            Thay đổi địa chỉ
                        </button>
                    </div>
                </div>
                <div className="w-[1300px] grid grid-cols-3 gap-[20px] ">
                    <div className={" mt-[20px]  col-span-2"}>
                        <div className={"w-full grid grid-cols-21 p-[10px] px-[20px]  bg-stone-200 shadow font-sf rounded-full" }>
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
                                <div key={shop.shopId} className={"w-full  border border-stone-200 mt-[20px] rounded-[25px] relative"}>
                                    <p className={"col-span-10 text-[16px] font-[500] text-stone-800 font-sf uppercase bg-white px-[8px] absolute top-[-13px] left-[20px]"}>{shop.shopName}</p>

                                    <div className={"w-full"}>
                                        {product.map((product) => (
                                            product.shopId === shop.shopId ? (
                                                <div key={product.itemId} className={"w-full px-[20px]"}>
                                                    <div className={"grid grid-cols-21 w-full border-b border-stone-200 py-[20px] "}>
                                                        <div className={"col-span-10 flex items-center"}>
                                                            <div className={"relative w-[80px] h-[80px] bg-stone-200 rounded-[20px] mr-[10px] p-[10px]"}>
                                                                <div className={"w-full h-full relative"}>
                                                                    <Image src={product.productImage} alt={"image"} fill={true}/>
                                                                </div>

                                                            </div>
                                                            <p className={"font-sf text-stone-600 text-[15px]"}>{product.productName}</p>
                                                        </div>
                                                        <div className={"col-span-5 flex items-center justify-center"}>
                                                            <p className={"font-sf text-stone-600 text-[15px]"}>{product.price}</p>
                                                        </div>
                                                        <div className={"col-span-2 flex items-center justify-center"}>
                                                            <div className={"w-[110px] h-[30px] font-sf justify-center items-center text-stone-600 flex"}>
                                                                <p>{product.quantity}</p>
                                                            </div>

                                                        </div>
                                                        <div className={"col-span-4  flex items-center justify-center pl-[calc(30%)]"}>
                                                            <p className={"font-sf text-stone-600 text-[15px]"}>{product.price*product.quantity}</p>
                                                        </div>

                                                    </div>


                                                </div>
                                            ) : null
                                        ))}

                                        <div className={"col-span-4  flex  justify-center flex-col  "}>
                                            <div className={"border-stone-200 h-full pl-[20px] pr-[20px]"}>
                                                <div className={" border-stone-200 py-[15px]"}>
                                                    <div className={"h-[30px] w-full flex items-center justify-between  "}>
                                                        <p className={"font-sf text-[16px] text-stone-800"}>Voucher của Shop</p>
                                                        <button onClick={()=> {
                                                            fetchShopVoucherData(shop.shopId)
                                                            setShowShopVoucher(true)
                                                        }}  className={"font-sf text-[15px] text-amber-600"}>Chọn voucher</button>
                                                    </div>
                                                    <div className={"h-[35px] flex  items-center mt-[10px]"}>
                                                        <p className={"font-sf text-[16px] text-stone-800 mr-[20px] "}>Lời nhắn:</p>
                                                        <input
                                                            type={"text"}
                                                            value={shop.note}
                                                            placeholder={"Lưu ý cho người bán"}
                                                            onChange={(e) => setShop(prevState => prevState.map(s=>s.shopId == shop.shopId ? {...s,note: e.target.value}: s))}
                                                            className={"h-full bg-stone-100 focus:outline-none flex-1 font-sf text-stone-800 px-[20px] text-[15px] rounded-full border border-stone-200"}/>
                                                    </div>
                                                    <div className={"flex items-end justify-end mt-[10px]"}>
                                                        <p className={"font-sf text-[16px] text-stone-800 mb-[2px] mr-[5px]"}>Tổng số tiền:</p>
                                                        <p className={"font-sf text-[20px] text-amber-600 font-[600]"}>{shop.totalPrice}</p>
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
                    <div className={"col-span-1 max-h-fit border border-stone-200 mt-20px sticky top-[80px] mt-[20px] p-[30px] pt-[20px]   flex flex-col items-center rounded-[25px]"}>
                        <p className={"font-sf text-stone-800 font-[800] text-[22px]"}>THANH TOÁN</p>
                        <div className={"border-b border-stone-200 w-full mt-[10px] mb-[20px]"}></div>
                        <div className={"flex flex-col w-full"}>
                            <div className={"flex items-center justify-between w-full"}>
                                <div className={"flex items-center justify-center"}>
                                    <TbTicket className="text-amber-600 text-[18px]" />
                                    <p className="text-stone-800 text-[16px] font-sf ml-[5px]">BuyNow Voucher</p>
                                </div>
                                <div onClick={()=> {
                                    fetchVoucherData();
                                    setShowVoucher(!showVoucher)
                                }} className={"flex items-center justify-center border-stone-200"}>
                                    <p className={"text-amber-600  text-[15px] font-sf ml-[5px]"}>Chọn Voucher</p>
                                </div>
                            </div>
                            <div className={"border-b border-stone-200 w-full mt-[20px] mb-[20px]"}></div>

                            <div className={"flex items-center flex-col w-full"}>
                                <p className="text-stone-800 text-[16px] font-sf w-full ">Phương thức thanh toán</p>
                                <div className={"flex items-center justify-between w-full mt-[10px]"}>
                                    <div className={"flex items-center justify-center"}>
                                        <button onClick={()=>setPaymentMethod(0)} className={`w-[16px] h-[16px] border border-stone-400 rounded-full mr-[5px] flex items-center justify-center ${paymentMethod == 0 ? "bg-stone-400" : "bg-white"}`}>
                                            {/*<div className={` ${paymentMethod == 0 ? "bg-stone-400" : "bg-white"}  w-[10px] h-[10px] rounded-full`}></div>*/}
                                        </button>
                                        <p className="text-stone-800 text-[15px] font-sf ">Thanh toán khi nhận hàng</p>
                                    </div>
                                    <div className={"flex items-center justify-center"}>
                                        <button onClick={()=>setPaymentMethod(1)} className={`w-[16px] h-[16px] border border-stone-400 rounded-full mr-[5px] flex justify-center items-center ${paymentMethod == 1 ? "bg-stone-400" : "bg-white"}`}>

                                        </button>
                                        <p className="text-stone-800 text-[15px] font-sf ">Ví BuyNow</p>
                                    </div>

                                </div>
                            </div>

                            <div className={"border-b border-stone-200 w-full mt-[20px] mb-[20px]"}></div>
                            <div className={"flex flex-col w-full justify-end items-end"}>
                                <div className={"w-full h-[30px] justify-between flex items-center"}>
                                    <p className={"text-stone-600 text-[15px] font-sf"}>Tổng tiền hàng</p>
                                    <p className={"text-stone-700 text-[16px] font-sf"}>{shop.reduce((sum,s) => sum + s.totalPrice, 0)}</p>
                                </div>
                                <div className={"w-full h-[30px] justify-between flex items-center"}>
                                    <p className={"text-stone-600 text-[15px] font-sf"}>Tổng tiền phí vận chuyển</p>
                                    <p className={"text-stone-700 text-[16px] font-sf"}>{shippingFee}</p>
                                </div>
                                <div className={"w-full h-[30px] justify-between flex items-center"}>
                                    <p className={"text-stone-600 text-[15px] font-sf"}>Tổng cộng voucher giảm giá</p>
                                    <p className={"text-stone-700 text-[16px] font-sf"}>{(voucher ? voucher.value * shop.length : 0) + (selectedShopVoucher ? selectedShopVoucher.reduce((sum,s)=> sum + s.value, 0): 0) + (shippingVoucher ? shippingVoucher.value * shop.length : 0) }</p>
                                </div>
                                <div className={"w-full h-[30px] justify-between flex items-center"}>
                                    <p className={"text-stone-800 text-[15px] font-sf font-[500] uppercase"}>Tổng thanh toán</p>
                                    <p className={"text-amber-600 font-[600] text-[20px] font-sf"}>{(shop.reduce((sum,s) => sum + s.totalPrice, 0)) - shippingFee - ((voucher ? voucher.value * shop.length : 0) + (selectedShopVoucher ? selectedShopVoucher.reduce((sum,s)=> sum + s.value, 0): 0) + (shippingVoucher ? shippingVoucher.value * shop.length : 0))}</p>
                                </div>
                            </div>

                            <div className={"border-b border-stone-200 w-full mt-[20px] mb-[20px]"}></div>
                            {
                                paymentMethod == 1 && (
                                    <div className={"w-full font-sf text-[15px] text-stone-700"}>
                                        <p>
                                            Vui lòng nhập mã OTP của Ví để tiến hành thanh toán và đặt hàng!
                                        </p>
                                        <div className={"h-[40px] w-full mt-[20px] justify-center flex"}>
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
                                )
                            }
                            {paymentMethod == 1 && (
                                <div className={"border-b border-stone-200 w-full mt-[20px] mb-[20px]"}></div>
                            )}

                            <button onClick={()=> {
                                if (paymentMethod == 0)  createBill(); else createBillPayWithWallet()
                            }} className={"w-full h-[40px] bg-stone-800 text-white hover:bg-stone-700 rounded-full"}>
                                <p className={" text-[18px] font-sf"}>ĐẶT HÀNG</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/*CHON VOUCHER SHOP*/}
                <div className={`${showShopVoucher ? `visible bg-black/20` : `hidden`} top-0 flex justify-center items-center fixed w-screen h-screen z-50  flex-col `}>
                    <div className={"w-[500px] rounded-[25px] bg-white "}>
                        <div className={"border-b border-stone-200 p-[20px] py-[15px] relative flex items-center justify-center"}>
                            <h1 className={"font-sf text-[20px] text-stone-800 uppercase font-[700]"}> BuyNow Voucher</h1>
                            <button className={"absolute right-[20px] text-[20px] "} onClick={()=> {
                                setShowShopVoucher(!showVoucher);
                                setShopVoucher(undefined);
                            }}>
                                <TbX/>
                            </button>
                        </div>
                        <div className={"w-full px-[20px] h-[35px] flex items-center justify-center mt-[20px] mb-[20px]"}>
                            <p className={"font-sf text-stone-600 text-[15px]"}>Mã Voucher</p>
                            <input
                                type={"text"}
                                placeholder={"Mã BuyNow Voucher"}
                                className={`font-sf text-stone-700 text-[15px] border border-stone-200 h-full mr-[10px] ml-[10px] px-[15px] focus:outline-none rounded-full`}
                            />

                            <button className={"h-full px-[15px] border bg-amber-600 font-sf text-[15px] text-stone-50 flex justify-center items-center hover:bg-stone-700 rounded-full"}>ÁP DỤNG</button>
                        </div>
                        <div className={"overflow-y-auto h-[475px] pr-[15px] pl-[25px] pt-[5px]"}>

                            {shopVouchers.map((v) => (
                                <div key={v.voucherWalletId} className={"h-[100px] mb-[20px] flex"}>
                                    <div className={"h-full aspect-square bg-stone-300 rounded-l-[20px] flex items-center justify-center"}>
                                        <p className={"font-fre ml-[5px] text-text font-[800] text-amber-600 text-[17px]"}>BuyNow</p>
                                    </div>
                                    <div className={"flex-1 border-y border-r border-stone-200 flex justify-between px-[20px] rounded-r-[20px]  items-center"}>
                                        <div>
                                            <p className={"font-sf text-stone-800 text-[16px]"}>{v.voucher.voucherName}</p>
                                            <div className={"flex items-baseline h-[20px]"}>
                                                <p className={"font-sf text-stone-600 text-[14px]"}>Giảm giá</p>
                                                <p className={"font-sf tebg-amber-600 text-[16px] ml-[5px]"}>{v.voucher.value}</p>
                                            </div>
                                            <div className={"flex items-baseline"}>
                                                <p className={"font-sf text-stone-600 text-[14px]"}>Đơn tối thiểu</p>
                                                <p className={"font-sf text-stone-800 text-[14px] ml-[5px]"}> {v.voucher.minPrice}</p>
                                            </div>

                                            <p className={"font-sf text-stone-600 text-[13px]"}>HSD: {new Date(v.voucher.endTime).toLocaleString("vi-VN", {
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
                                        }} className={"w-[18px] h-[18px] border border-stone-300 rounded-full flex justify-center items-center"}>
                                            <div className={`w-[12px] h-[12px] ${v.voucherId == shopVoucher?.voucherId ? "bg-stone-400": "bg-white" } rounded-full`}></div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {/*Voucher*/}

                        </div>
                        <div className={" flex items-center justify-end px-[25px] mt-[15px] border-t border-stone-200 p-[20px]"}>
                            <button onClick={()=> {
                                setShowShopVoucher(!showShopVoucher)
                                setShopVoucher(undefined);
                            }} className={"h-[40px] border border-stone-200 bg-stone-200 px-[20px] rounded-full"}>
                                <p className={"font-sf text-stone-800 text-[16px] font-[500]"}>TRỞ LẠI</p>
                            </button>
                            <button onClick={()=> {
                                setShowShopVoucher(!showShopVoucher);
                                if (shopVoucher != undefined)
                                    setSelectedShopVoucher(prev => [...prev, shopVoucher]);
                                setShopVoucher(undefined);
                            }} className={"h-[40px] border bg-amber-600 px-[35px] ml-[10px] text-stone-50 rounded-full"}>
                                <p className={"font-sf  text-[16px] font-[500]"}>OK</p>
                            </button>
                        </div>
                    </div>

                </div>
                <div className={`${showVoucher ? `visible bg-black/20` : `hidden`} top-0 flex justify-center items-center fixed w-screen h-screen z-50  flex-col `}>
                    <div className={"w-[500px]  border border-stone-200 bg-white"}>
                        <div className={"border-b border-stone-200 p-[20px] py-[15px] relative flex items-center justify-center"}>
                            <h1 className={"font-sf text-[20px] text-stone-800"}>Chọn BuyNow Voucher</h1>
                            <button className={"absolute right-[20px]"} onClick={()=> {
                                setShowVoucher(!showVoucher);
                                setVoucher(undefined);
                            }}>
                                X
                            </button>
                        </div>
                        <div className={"w-full px-[20px] h-[35px] flex items-center justify-center mt-[20px] mb-[20px]"}>
                            <p className={"font-sf text-stone-600 text-[15px]"}>Mã Voucher</p>
                            <input
                                type={"text"}
                                placeholder={"Mã BuyNow Voucher"}
                                className={`font-sf text-stone-700 text-[15px] border border-stone-200 h-full mr-[10px] ml-[10px] px-[10px] focus:outline-none `}
                            />

                            <button className={"h-full px-[10px] border bg-amber-600 font-sf text-[15px] text-stone-50 flex justify-center items-center hover:bg-stone-700 "}>ÁP DỤNG</button>
                        </div>
                        <div className={"overflow-y-auto h-[475px] pr-[15px] pl-[25px] pt-[5px]"}>

                            {adminVoucher.map((v) => (
                                <div key={v.voucherWalletId} className={"h-[100px] mb-[20px] flex"}>
                                    <div className={"h-full aspect-square bg-blue-300"}>

                                    </div>
                                    <div className={"flex-1 border-y border-r border-stone-200 flex justify-between px-[20px]  items-center"}>
                                        <div>
                                            <p className={"font-sf text-stone-800 text-[16px]"}>{v.voucher.voucherName}</p>
                                            <div className={"flex items-baseline h-[20px]"}>
                                                <p className={"font-sf text-stone-600 text-[14px]"}>Giảm giá</p>
                                                <p className={"font-sf tebg-amber-600 text-[16px] ml-[5px]"}>{v.voucher.value}</p>
                                            </div>
                                            <div className={"flex items-baseline"}>
                                                <p className={"font-sf text-stone-600 text-[14px]"}>Đơn tối thiểu</p>
                                                <p className={"font-sf text-stone-800 text-[14px] ml-[5px]"}> {v.voucher.minPrice}</p>
                                            </div>

                                            <p className={"font-sf text-stone-600 text-[13px]"}>HSD: {new Date(v.voucher.endTime).toLocaleString("vi-VN", {
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
                                        }} className={"w-[18px] h-[18px] border border-stone-300 rounded-full flex justify-center items-center"}>
                                            <div className={`w-[12px] h-[12px] ${v.voucherId == voucher?.voucherId ? "bg-stone-400": "bg-white" } rounded-full`}></div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {/*Voucher*/}

                        </div>
                        <div className={" flex items-center justify-end px-[25px] mt-[15px] border-t border-stone-200 p-[20px]"}>
                            <button onClick={()=> {
                                setShowVoucher(!showVoucher)
                                setVoucher(undefined);
                            }} className={"h-[40px] border border-stone-200 px-[20px] rounded-full"}>
                                <p className={"font-sf text-stone-800 text-[16px]"}>TRỞ LẠI</p>
                            </button>
                            <button onClick={()=> setShowVoucher(!showVoucher)} className={"h-[40px] border bg-amber-600 px-[35px] ml-[15px] text-stone-50 rounded-full"}>
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