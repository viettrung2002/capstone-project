'use client'
import Breadcrumb from "@/app/components/breadcrumb";
import Image from "next/image";
import {HiMiniMinus, HiMiniPlus, HiOutlineTrash} from "react-icons/hi2";
import {useEffect, useState, useRef} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {IProductInCart} from "@/app/types/product";
import {IShop} from "@/app/types/shop";


export  default function Cart() {
    const router = useRouter();
    const breadcrumbs = [
        {name: "Shop", href: "/categories" },
        {name: "2", href: "/categories" },
    ]
    const [products, setProducts] = useState<IProductInCart[]>([])
    const [shop, setShop] = useState<IShop[]>([])
    const [reload, setReload] = useState<boolean>(false)
    const inputTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
    const [localActiveItem, setLocalActiveItem] = useState<Record<string, boolean>>(
        products.reduce((acc, p) => {
            acc[p.itemId] = p.activate ?? false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const newTotal = products.reduce((sum, product) => {
            if (localActiveItem[product.itemId]) {
                return sum + product.price * product.quantity;
            }
            return sum;
        }, 0);

        setTotal(newTotal);
    }, [products, localActiveItem]);
    const [localQuantity, setLocalQuantities] = useState<Record<string, string>>(products.reduce((acc,p)=>({...acc, [p.itemId]: p.quantity}),{}))
    // const handleQuantityChange = (itemId: string, value: number) => {
    //     const newQuantity = parseInt(value, 10);
    //     if (!isNaN(newQuantity) && newQuantity > 0) {
    //         // Cập nhật giá trị input ngay lập tức
    //         setLocalQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    //
    //         // Xóa timer cũ nếu có
    //         if (inputTimeoutRef.current[itemId]) {
    //             clearTimeout(inputTimeoutRef.current[itemId]);
    //         }
    //
    //         // Tạo timer mới để gọi API
    //         inputTimeoutRef.current[itemId] = setTimeout(async () => {
    //             try {
    //                 await UpdateQuantity(itemId, newQuantity);
    //                 // Cập nhật state chính với giá trị mới
    //                 setProduct((prev) =>
    //                     prev.map((p) =>
    //                         p.itemId === itemId ? { ...p, quantity: newQuantity } : p
    //                     )
    //                 );
    //             } catch (error) {
    //                 // Nếu API lỗi, revert giá trị input về giá trị cũ
    //                 setLocalQuantities((prev) => ({
    //                     ...prev,
    //                     [itemId]: product.find((p) => p.itemId === itemId).quantity,
    //                 }));
    //             }
    //         }, 500);
    //     }
    useEffect(() => {
        localStorage.removeItem("productInBill");
        console.log("item da duoc ative tai cart: ",localStorage.getItem("productInBill"));
        async function GetCart () {
            const token = Cookies.get("token");
            console.log("Token:", token);
            if (!token) {
                router.push("/login")
            }
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json();

                const newShops: IShop[] = [];
                console.log(data.data);
                for (const p of data.data) {
                    console.log(p.shopId);
                    const ex = newShops.some(s=>s.shopId === p.shopId)
                    console.log(!ex)
                    if (!ex) {
                        const shop: IShop = {
                            shopId: p.shopId,
                            shopName: p.shopName,
                        }
                        newShops.push(shop);
                    }
                }
                console.log(newShops);
                if (newShops.length >= 0) {
                    // setShop((prev) => {
                    //     const updatedShops = [...prev, ...newShops];
                    //     // Loại bỏ trùng lặp nếu cần
                    //     return Array.from(new Map(updatedShops.map((s) => [s.shopId, s])).values());
                    // });
                    setShop((prev) => {

                        const prevIds = new Set(prev.map(s => s.shopId));
                        const newIds = new Set(newShops.map(s => s.shopId));

                        const hasChange =
                            prev.length !== newShops.length ||
                            [...prevIds].some(id => !newIds.has(id)) ||
                            [...newIds].some(id => !prevIds.has(id));

                        if (!hasChange) return prev;

                        return Array.from(new Map(newShops.map((s) => [s.shopId, s])).values());
                    });
                }

                console.log("------------------",shop);
                setProducts(data.data)
            } catch (error) {
                console.error(error)
            }
        }
        GetCart();
    }, [reload]);
    async function RemoveItem (itemId: string) {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login")
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${itemId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            setReload(!reload);
            console.log(data);
        } catch (error) {
            console.error(error)
        }
    }
    async function UpdateQuantity (itemId: string, quantity: number) {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return false;
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${itemId}?quantity=${quantity}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                console.error("Failed to update quantity", response.status);
                return false;
            }
            const data = await response.json();
            setReload(!reload);

            // setShop([]);
            // setProduct([])
            console.log(data);
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }

    function checkActivate () {
        return Object.values(localActiveItem).includes(false);
    }
    return (
        <div className={"w-full flex justify-center flex-col items-center bg-white pt-[20px] pb-[20px]"}>
            {/*<div className={`2xl:w-[1300px] xl:w-full h-[40px] mt-[10px]  items-center flex mb-[20px]`}>*/}
            {/*    <div className="flex items-center w-[250px] h-full  ">*/}
            {/*        <Breadcrumb breadcrumbs={breadcrumbs} />*/}

            {/*    </div>*/}
            {/*</div>*/}
            <div className={"w-[1300px] grid grid-cols-10 gap-5"}>
                <div className="col-span-7">
                    <div className={"w-full flex bg-white"}>
                        <div className={"w-full h-[50px]  bg-stone-200 grid rounded-full grid-cols-25 px-[20px]"}>
                            <div className={"col-span-1 flex pl-[10px] items-center"}>
                                {/*<div onClick={()=> {*/}
                                {/*    if (checkActivate()){*/}
                                {/*        setLocalActiveItem(products.reduce((acc,p)=>({...acc, [p.itemId]: true}),{}))*/}
                                {/*    } else setLocalActiveItem(products.reduce((acc,p)=>({...acc, [p.itemId]: false}),{}))*/}
                                {/*}*/}
                                {/*} className={"h-[16px] w-[16px] border border-stone-200 flex items-center justify-center"}>*/}
                                {/*    <div className={`w-[10px] h-[10px] ${checkActivate()? "bg-white" : "bg-stone-600"}`}>*/}

                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className={"col-span-8  flex items-center"}>
                                <p className={"font-sf text-stone-800 text-[15px]"}>Sản phẩm</p>
                            </div>
                            <div className={"col-span-5 flex items-center justify-center"}>
                                <p className={"font-sf text-stone-800 text-[15px]"}>Đơn giá</p>
                            </div>
                            <div className={"col-span-3 flex items-center justify-center"}>
                                <p className={"font-sf text-stone-800 text-[15px]"}>Số lượng</p>
                            </div>
                            <div className={"col-span-5  flex items-center justify-center"}>
                                <p className={"font-sf text-stone-800 text-[15px]"}>Số tiền</p>
                            </div>
                            <div className={"col-span-3  flex items-center justify-center"}>
                                <p className={"font-sf text-stone-800 text-[15px]"}>Thao tác</p>
                            </div>
                        </div>

                    </div>

                    <div className={"w-full flex flex-col "}>

                        {shop.map((shop) => (
                            <div key={shop.shopId} className={"w-full bg-white border border-stone-200 rounded-[25px] mt-[30px]"}>
                                <div className={"w-full h-[10px]  px-[20px] relative"}>
                                    {/*<div className={"col-span-1 flex pl-[10px] items-center"}>*/}
                                    {/*    <div  className={"h-[16px] w-[16px] border border-stone-200"}>*/}

                                    {/*    </div>*/}
                                    {/*</div>*/}

                                        <p className={" text-[16px] absolute top-[-13px] font-sf text-stone-800 font-[500] uppercase px-[8px] bg-[white]"}>{shop.shopName}</p>


                                </div>
                                <div className={"w-full px-[20px]"}>
                                    {products.map((product) => (
                                        product.shopId === shop.shopId ? (
                                            <div key={product.itemId} className={"w-full  border-stone-200 grid grid-cols-25 py-[5px]"}>
                                                <div className={"col-span-1 flex pl-[10px] items-center"}>
                                                    <div onClick={()=> {
                                                        setLocalActiveItem((prev) => ({...prev,[product.itemId]: !prev[product.itemId]}))
                                                    }} className={"h-[18px] w-[18px] border border-stone-300 flex justify-center items-center rounded-full"}>
                                                        <div className={`h-[12px] w-[12px] rounded-full ${localActiveItem[product.itemId] ? "bg-stone-600" : "bg-white" }`}></div>
                                                    </div>
                                                </div>
                                                <div className={"col-span-8 flex items-center"}>
                                                    <div className={"relative w-[80px] h-[80px] bg-stone-200 rounded-[20px] bg-radial mr-[10px] p-[10px]"}>
                                                        <div className={"w-full h-full relative"}>
                                                            <Image src={product.productImage} alt={"image"} fill={true}/>
                                                        </div>

                                                    </div>
                                                    <p className={"font-sf text-stone-700 font-[500] text-[15px]"}>{product.productName}</p>
                                                </div>
                                                <div className={"col-span-5 flex items-center justify-center"}>
                                                    <p className={"font-sf text-stone-600 text-[15px]"}>{product.price}</p>
                                                </div>
                                                <div className={"col-span-3 flex items-center justify-center"}>
                                                    <div className={"w-[110px] h-[35px] bg-stone-200 rounded-full px-[10px] overflow-hidden flex"}>
                                                        <button onClick={()=> UpdateQuantity(product.itemId, product.quantity-1)} className={"h-[35px] w-[35px] border border-stone-200 flex justify-center items-center"}>
                                                            <HiMiniMinus/>
                                                        </button>
                                                        <input onChange={(e) => {

                                                            const newQuantity = e.target.value;
                                                            // Xoá timer cũ nếu còn
                                                            setLocalQuantities((prev) => ({ ...prev, [product.itemId]: newQuantity }));
                                                            if (inputTimeoutRef.current[product.itemId]) {
                                                                clearTimeout(inputTimeoutRef.current[product.itemId]);
                                                            }

                                                            // Tạo timer mới
                                                            inputTimeoutRef.current[product.itemId] = setTimeout(() => {
                                                                if (newQuantity == "" ) {
                                                                    UpdateQuantity(product.itemId, 0)
                                                                        .then ((ss)=> {
                                                                            if (!ss) {
                                                                                setLocalQuantities((prev) => ({
                                                                                    ...prev,
                                                                                    [product.itemId]: product.quantity.toString(),
                                                                                }));
                                                                            }
                                                                        })
                                                                } else {
                                                                    UpdateQuantity(product.itemId, parseInt(newQuantity,10))
                                                                        .then ((ss)=> {
                                                                            if (!ss) {
                                                                                setLocalQuantities((prev) => ({
                                                                                    ...prev,
                                                                                    [product.itemId]: product.quantity.toString(),
                                                                                }));
                                                                            }
                                                                        })
                                                                }


                                                            }, 1000); // 500ms sau khi ngưng gõ mới gọi

                                                        }} type={"number"} className={" appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none flex text-[16px] text-stone-700 font-sf w-[50px] h-full   items-center  text-center"} value={localQuantity[product.itemId] ?? product.quantity} />
                                                        <button onClick={()=> UpdateQuantity(product.itemId, product.quantity+1)} className={"h-[35px] w-[35px]   flex justify-center items-center"}>

                                                            <HiMiniPlus/>
                                                        </button>
                                                    </div>

                                                </div>
                                                <div className={"col-span-5  flex items-center justify-center"}>
                                                    <p className={"font-sf text-stone-600 text-[15px]"}>{product.price*product.quantity}</p>
                                                </div>
                                                <div className={"col-span-3  flex items-center justify-center"}>
                                                    <button onClick={()=> RemoveItem(product.itemId)} className={"flex justify-center items-center w-[35px] h-[35px] rounded-full bg-stone-800 text-stone-50 text-[16px] hover:bg-stone-700"}>
                                                        <HiOutlineTrash/>
                                                    </button>

                                                </div>
                                            </div>
                                        ) : null
                                    ))}
                                </div>

                            </div>

                        ))}
                    </div>
                </div>
                <div className={"col-span-3 border-stone-200 border sticky top-[80px] p-[30px] pt-[20px] max-h-fit flex items-center flex-col bg-white rounded-[25px]"}>
                    <p className={"font-sf text-stone-800 font-[800] text-[22px]"}>TẠM TÍNH</p>
                    <div className={"border-b border-stone-200 w-full mt-[10px]"}></div>
                    <div className={"flex justify-between items-center mt-[20px] w-full"}>
                        <p className={"font-sf text-stone-600 font-400 text-[16px]"}>Tổng cộng (10 sản phẩm)</p>
                        <p className={"font-sf text-amber-600 font-400 text-[17px]"}>{total}</p>
                    </div>
                    <div className={"flex justify-between items-center mt-[10px] w-full"}>
                        <p className={"font-sf text-stone-600 font-400 text-[16px]"}>Giảm giá sản phẩm</p>
                        <p className={"font-sf text-amber-600 font-400 text-[17px]"}>0</p>
                    </div>
                    <div className={"border-b border-stone-200 w-full mt-[10px]"}></div>
                    <div className={"flex justify-between items-center mt-[10px] w-full"}>
                        <p className={"font-sf text-stone-800 font-[600] text-[16px] uppercase"}>Tổng số tiền</p>
                        <p className={"font-sf text-amber-600 font-[500] text-[18px]"}>{total}</p>
                    </div>
                    <div className={"border-b border-stone-200 w-full mt-[10px] mb-[20px]"}></div>

                        <button onClick={()=> {
                            const updatedProducts = products.map((p) => ({
                                ...p,
                                activate: localActiveItem[p.itemId] ?? false,
                            }));

                            console.log("product de chuyen toi bill:" ,updatedProducts);
                            const productInBill = updatedProducts.filter(p=>p.activate).map((p)=> ({...p}))
                            localStorage.setItem("productInBill", JSON.stringify(productInBill))
                            router.push("/bill")
                        }}
                            className={"flex h-[40px]  w-full col-span-2 justify-center items-center bg-stone-800 rounded-full text-stone-50"}>
                            <p className={"font-sf text-[16px]"}>MUA HÀNG</p>
                        </button>





                </div>

            </div>





        </div>
    )
}
