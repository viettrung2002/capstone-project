'use client'
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState, useRef} from "react";

import Image from "next/image";
import {HiOutlineStar, HiTag, HiStar, HiReceiptPercent, HiMiniArrowPath } from "react-icons/hi2";
// import { randomInt } from "crypto";
import {IProductData} from "@/app/types/product";
import Cookies from "js-cookie";
import {IComment} from "@/app/types/comment";
import { TbChevronDown, TbMinus, TbPlus} from "react-icons/tb";

import {IVoucher} from "@/app/types/voucher";
import * as React from "react";

import VndText from "@/app/components/vnd-text";

export default function ProductInfo () {
    const {id}  = useParams()
    const router = useRouter()
    const [quantity, setQuantity] = useState(0)
    const [mainImageUrl, setMainImageUrl] = useState<string>("")
    const [product, setProduct] = useState<IProductData | null>(null)
    const [tab, setTab] = useState("spec")
    const [comment, setComment] = useState<IComment[]>([])
    const [openFilterComment, setOpenFilterComment] = useState<boolean>(false)
    const [star, setStar] = useState(0)
    const [showNotification, setShowNotification] = useState<boolean>(false)
    const [showOutOfInventory, setShowOutOfInventory] = useState<boolean>(false)
    const [shopVouchers, setShopVouchers] = useState<IVoucher[]>([])

    const token = Cookies.get("token");

    async function GetShopVouchers( shopId: string) {
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/shop/${shopId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            if (response.ok) {
                setShopVouchers(data.data)
                console.log("SHOP voucher ",data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function SaveVoucher( voucherId: string) {
        if (!token) {
            router.push("/login");
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/voucher/wallet?voucherId=${voucherId}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            if (response.ok) {
                const data = await response.json();
                alert("Lưu thành công voucher!")
                console.log(data);
            } else alert("Voucher đã có trong ví!")
        } catch (error) {
            console.log(error)
        }
    }
    async function AddToCart( productId: string) {
        if (!token) {
            router.push("/login");
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/cart`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: productId,
                })
            })
            const data = await response.json();
            setShowNotification(true)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function GetProductById () {

            if (!token) {
                router.push("/login");
                return
            }
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/get/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json();
                console.log("PRODUCT",data);
                GetShopVouchers(data.shopId);
                setProduct(data);
            } catch (error) {
                console.error(error)
            }
        }
        GetProductById();



    }, [id, router, token]);

    useEffect(() => {
        async function GetComments () {

            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/comment?pageIndex=1&pageSize=4&productId=${id}&star=${star}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await response.json();
                console.log("comment",data);
                setComment(data.items);
            } catch (error) {
                console.log(error);
            }
        }
        GetComments ();
    }, [star, id]);

    // const breadcrumbs = [
    //     {name: "Category", href: "/categories" },
    //     {name: "2", href: "/categories" },
    // ]
    // const image = [
    //     "/a.png",
    //     "/b.png",
    //     "/c.png",
    //     "/d.png",
    //     "/e.png",
    //
    // ]
    //


    function AddToCompare(product: IProductData) {
        console.log("add to Compare", product);
        let d = 0 ;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key != "productInBill") {
                    d +=1
                }
            }
        if (d >= 2) {
            console.log('DA QUA 2 SAN PHAM');
            return;
        }
        if (localStorage.getItem(product.productId) !== null) {
            console.log('DA CO SAN PHAM NAY TRONG COMPARE');
            return;
        }
        localStorage.setItem(product.productId, JSON.stringify(product));
        window.dispatchEvent(new Event("localStorageChanged"));
        console.log(localStorage.length);
    }
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const scrollTop = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startY.current = e.clientY;
        scrollTop.current = containerRef.current?.scrollTop || 0;
        // Ngăn chọn văn bản
        document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;
        const dy = e.clientY - startY.current;
        containerRef.current.scrollTop = scrollTop.current - dy;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.userSelect = ""; // khôi phục lại chọn văn bản
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => document.removeEventListener("mouseup", handleMouseUp);
    }, []);
    return (
        <div className="w-full flex bg-white flex-col items-center pt-[20px]">
            {/*<div className={`w-[1300px] h-[40px] mt-[10px]  items-center flex mb-[20px]`}>*/}
            {/*    <div className="flex items-center w-[250px] h-full  ">*/}
            {/*        <Breadcrumb breadcrumbs={breadcrumbs} />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {showNotification &&
                <div className={"absolute top-[50px] border border-stone-200 py-[20px] px-[20px] flex flex-col z-50 bg-white rounded-[25px] shadow-md "}>
                    <p>{showOutOfInventory ? "Số lượng tồn kho không đủ" : "Thêm sản phẩm vào giỏ hành thành công"}</p>
                    <div className={"flex mt-[15px] "}>
                        <button onClick={()=> {
                            setShowNotification(false)
                            setShowOutOfInventory(false)
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-amber-600 text-white rounded-full mr-[10px]"}>
                            Ok
                        </button>
                    </div>
                </div>
            }

            <div className={`w-[1300px] h-[490px] flex gap-[40px] mb-[30px]  `}>
                {/*<ConfirmDialog message={"Xác Nhận Tạo bill"} onConfirm={()=>{}} onCancel={()=>{}}/>*/}
                {/*<AlertMessage message={"hehehe"} onClose={()=> {}}/>*/}
                <div className="w-[660px] h-full  bg-white flex gap-[20px]">
                    <div
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        className={`w-[170px] col-span-1 ${
                            product?.extraImages &&  product.extraImages.length > 3 ? "max-h-[520px]" : ""
                        } overflow-hidden relative cursor-grab active:cursor-grabbing`}
                        style={{
                            scrollbarWidth: "none", // Firefox
                            msOverflowStyle: "none", // IE 10+
                        }}
                    >
                        <div
                            className="grid gap-[15px]"
                            style={{
                                overflowY: "scroll",
                                maxHeight: product?.extraImages && product.extraImages.length > 3 ? "520px" : "auto",
                            }}
                        >
                            {product?.extraImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="w-[150px] h-[150px] rounded-[25px] overflow-hidden bg-stone-200 relative mx-auto"
                                    onClick={()=> setMainImageUrl(image.imageUrl)}
                                >
                                    <Image
                                        src={image.imageUrl}
                                        alt={`image-${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Ẩn scrollbar - cả Chrome và Firefox */}
                        <style jsx>{`
                            div::-webkit-scrollbar {
                              display: none;
                            }
                          `}</style>
                    </div>
                    <div className="flex items-center w-[550px] h-full rounded-[25px] overflow-hidden ">
                        <div className={"w-full h-full relative overflow-hidden bg-stone-200"}>
                            <Image src={mainImageUrl != "" ? mainImageUrl : product?.mainImage ? product.mainImage : "/products/product-1.png"} alt={"image"} width={1000} height={1000} className={"w-full h-full object-cover"} />
                        </div>
                    </div>
                </div>
                <div className=" flex-1 flex-col justify-center h-full  ">
                    <div className={" w-full  "}>
                        <p className={"font-sf text-stone-800 text-[40px] font-[900] uppercase"}>{product?.productName}</p>
                    </div>
                    <div className={"w-full flex items-center mt-[5px] h-[30px] "}>
                        <HiTag className={"text-stone-500"}/>
                        <p className={"font-sf text-[15px] text-stone-600 ml-[5px]"}>{product?.categoryName}</p>
                    </div>
                    <div className={"h-[25px] w-full flex mt-[5px] "}>
                        <div className={"h-[25px] flex items-center pr-[10px]"}>
                            {product &&
                                <div className={"flex text-yellow-500 items-center justify-center mr-[5px] text-[16px] "}>
                                    {Array.from({length: Math.round(product.rating)}, (_, index) => (
                                        <HiStar className={"mb-[1px] "} key={index} />
                                    ))}
                                    {(5-Math.round(product.rating)) >= 1  ?
                                        (
                                            Array.from({length: 5 - Math.round(product.rating)}, (_, index) => (
                                                <HiOutlineStar key={index} />
                                            ))
                                        ) : null }
                                </div>
                            }

                            {/*<div className={"font-sf text-[15px]"}>*/}
                            {/*    <p>{product?.rating}</p>*/}
                            {/*</div>*/}

                        </div>
                        <div className={"h-[25px]  border-x flex items-center px-[10px] border-stone-200"}>
                            <p className={"font-sf text-stone-800 text-[15px]"}>{product?.reviewCount} đánh giá</p>
                        </div>
                        <div className={"h-[25px]  flex items-center px-[10px]"}>
                            <p className={"font-sf text-stone-800 text-[15px]"}>{product?.sold} Đã bán</p>
                        </div>
                    </div>

                    <div className={" w-full flex items-center mt-[5px] h-[40px] "}>

                        {product?.price != undefined ?
                            <VndText
                                amount={product?.price - product?.price * product?.discount/100}
                                classNameCurrency={"font-[400] text-[20px] text-amber-600 font-sf"}
                                classNameNumber={"font-[600] text-[25px] text-amber-600 font-sf"}
                            />
                            : null
                        }
                        {product?.discount ? product?.discount > 0 ? (
                            <div className={"relative flex items-center ml-[3px] mr-[5px]"}>
                                <HiReceiptPercent className={"text-blue-500 mr-[10px] text-[13px]"} />

                                <div className={"relative flex"}>
                                    <p className={"text-[12px] font-sf self-start mt-[3px] text-stone-600 mr-[2px] underline"}>đ</p>
                                    <p className={"font-sf font-[600] text-stone-600 text-[18px]"}>{product?.price}</p>
                                    <div className={"absolute w-full top-[13px] border-b border-stone-600 "}></div>
                                </div>
                            </div>
                        ): null : null}
                    </div>
                    <div className={"w-full max-h-[70px] flex font-sf text-stone-600 text-[15px] overflow-hidden mt-[5px] "}>
                        <p className={"line-clamp-3 "}>{product?.description}</p>
                    </div>
                    <div className={"w-full border-b border-stone-200 mt-[10px] mb-[10px] "}>
                    </div>
                    <div className={" w-full flex "}>
                        {/*<div className={"col-span-1  border-stone-200 border-r "}>*/}
                        {/*    <p className={"font-sf text-stone-600 text-[14px] font-[500]"}>Màu sắc</p>*/}
                        {/*    <div className={"flex h-[40px] items-center mt-[6px] "}>*/}
                        {/*        {products.color.map((color, index) => (*/}
                        {/*            <div onClick={()=>setChooseColor(color)} key={index} className={"flex items-center border-[2px] rounded-full justify-center w-[18px] h-[18px] mr-[7px]"} style={{borderColor: color }}>*/}
                        {/*                {color === chooseColor ?*/}
                        {/*                    <div className={"w-[10px] h-[10px] rounded-full"} style={{backgroundColor: color}}>*/}

                        {/*                    </div>*/}
                        {/*                : null }*/}
                        {/*                */}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}

                        {/*</div>*/}
                        <div className={"w-full border-stone-200 "}>
                            <div className={"flex items-center  mt-[5px] mb-[5px] "}>
                                <div className={"w-[150px] h-[40px] bg-stone-200 flex justify-between rounded-full overflow-hidden items-center px-[20px] py-[1px] text-stone-900"}>
                                    <div onClick={()=>  {
                                        if (product)
                                            if (quantity<product.inventory)
                                                setQuantity(quantity+1)
                                    }} className={"flex row-span-1 justify-center items-center "}>
                                        <TbMinus/>
                                    </div>
                                    <p className={"font-sf font-[600]"}>{quantity}</p>
                                    <div onClick={()=>{
                                        if (quantity > 0 ) setQuantity(quantity-1)
                                    }} className={"flex row-span-1  justify-center items-center"}>
                                        <TbPlus/>
                                    </div>

                                </div>
                                <p className={"font-sf text-stone-600 text-[14px] ml-[10px] "}>{product?.inventory} sản phẩm có sẵn</p>
                            </div>

                        </div>
                        <div className={"col-span-1  border-stone-200 "}>

                        </div>
                    </div>
                    <div className={"w-full border-b border-stone-200 mt-[10px] mb-[20px]"}>
                    </div>
                    <div className={"h-[40px] w-full grid grid-cols-11 gap-[20px] "}>
                        <div className="col-span-5  relative flex items-end ">
                            <p className="font-sf text-stone-600 text-[14px] mb-[5px] absolute top-[-6px]">Tạm tính</p>
                            <p className={"text-[14px] self-end mb-[3px] mr-[2px] text-amber-600 font-sf underline"}>đ</p>
                            <p className={" font-sf font-[600] text-amber-600 text-[22px] leading-[24px] "}>{product != undefined ? quantity * (product.price - product.price * product.discount / 100) :  null}</p>
                        </div>
                        
                            <button className={"rounded-full h-[40px] col-span-3 flex justify-center items-center bg-stone-800  font-sf text-[15px] text-white hover:bg-stone-700 hover:shadow-lg"}>
                                <p className={"uppercase text-[15px] border-stone-200 mt-[2px]"}>Mua ngay</p>
                            </button>
                            <button onClick={product? ()=> AddToCompare(product) : () => {} } className={" h-[40px] col-span-3 flex justify-center items-center bg-stone-200 rounded-full"}>
                                <HiMiniArrowPath className={"text-stone-600 mr-[5px]"}/>
                                <p className={"font-sf text-[15px] text-stone-800 mt-[1px] uppercase font-[500]"}>So sánh</p>
                            </button>
                       
                        
                    </div>
                    <div className={"w-full border-b border-stone-200 mt-[20px] mb-[0px]"}>
                    </div>
                    <div className={" w-full  grid grid-cols-10 gap-x-[20px] mt-[20px] "}>
                        <div className="col-span-4  border-stone-200">
                            <button onClick={()=> {
                                if (product) if (product.inventory > 0) AddToCart(product.productId); else {setShowOutOfInventory(true); setShowNotification(true)}
                            }} className={"border h-full w-full col-span-4 flex justify-center items-center bg-stone-800 font-sf font-[500] text-[15px] text-white hover:bg-stone-700 rounded-full hover:shadow-lg"}>
                                <p className={"mt-[1px] uppercase"}>Thêm vào giỏ hàng</p>
                            </button>
                        </div>
                        <div className={"col-span-6  pr-[30px] flex border-l border-stone-200 pl-[20px]"}>
                            <div className={"h-full aspect-square rounded-full bg-stone-300 mr-[15px]"}>
                            </div>
                            <div className={"flex flex-col justify-center"}>
                                <p className={"font-sf text-stone-800 font-[500] text-[15px]"}>{ product != undefined ? product.shopName : null}</p>
                                <button onClick={()=> router.push(`/shop/${product?.shopId}`)} className={"w-[120px] py-[4px] mt-[3px] rounded-full bg-stone-200 text-stone-800  "}>
                                    <p className={"font-sf  font-[600] text-[13px]  uppercase"}>Xem shop</p>
                                </button>
                            </div>
                        </div>
                        <div className={"col-span-3 border-r border-stone-200"}>

                        </div>
                        <div className={"col-span-3 border-r border-stone-200"}>

                        </div>
                    </div>
                </div>
            </div>

            {/*THong tin san pham*/}
            <div className="w-[1300px] gap-x-[30px] grid grid-cols-11 mt-[40px] font-sf ">
                <div className="col-span-11 w-full  grid grid-cols-5 gap-x-[20px] ">
                    <div className=" flex flex-col justify-center items-center col-span-3 rounded-[25px] border border-stone-200 relative pt-[30px] pb-[10px] max-h-fit">
                        <p className="font-sf font-[700] text-[24px] mb-[15px] uppercase bg-white absolute top-[-18px] px-[15px] text-stone-800">Thông tin chi tiết</p>
                        <div className={"h-[40px] w-full flex items-center justify-center"}>
                            <div onClick={()=>setTab("des")} className={`w-[220px] rounded-full h-full flex items-center justify-center mr-[10px] ${tab == "des" ? " bg-amber-600 text-white " : " border border-stone-200 " }`}>
                                <p className={"text-[15px] font-[500] "}>Mô Tả Sản Phẩm</p>
                            </div>
                            <div onClick={()=>setTab("spec")} className={`w-[220px]  rounded-full h-full flex items-center justify-center ml-[10px] ${tab == "spec" ? " bg-amber-600 text-white " : " border border-stone-200 " }`}>
                                <p className={"text-[15px] font-[500] "}>Thông Số Kỹ Thuật</p>
                            </div>
                        </div>

                        {tab == "spec" ? (
                            <div className="flex flex-col w-full px-[30px] py-[20px] pt-[10px]">
                                {product? Object.entries(product.specifications).map(([key,value], index) => (
                                    <div key={index} className="h-[40px] w-full bg-stone-100 rounded-full  pr-[10px] mt-[8px] items-center grid grid-cols-8 px-[20px] gap-[20px]">

                                        <div className={"col-span-3 flex"}>
                                            <p  className={"text-[15px] font-[500] "}>{key}:</p>
                                        </div>
                                        <div className="h-full flex items-center font-sf text-[15px] text-stone-600 col-span-5">
                                            <p>{value == "true" ? "Có" : value == "false" ? "Không" : value}</p>
                                        </div>
                                    </div>
                                )) : null}
                            </div>
                        ) : (
                            <p>{product?.description}</p>
                        )}

                    </div>
                    <div className={"col-span-2 "}>
                        <div className=" rounded-[25px] border border-stone-200 p-[30px] pb-[20px]  relative flex flex-col items-center max-h-fit mb-[30px]">
                            <p className="font-sf font-[700] text-[24px] text-stone-800 uppercase absolute top-[-18px] bg-white px-[15px]">Voucher của shop</p>
                            <div className={"w-full grid grid-cols-1"}>
                                {
                                    shopVouchers.map((shopVoucher, index) => {
                                        const now = new Date();
                                        const endTime = new Date(shopVoucher.endTime);
                                        const endTimeFormatted = `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")} ${endTime.getDate()}/${endTime.getMonth() + 1}/${endTime.getFullYear()}`;
                                        if (endTime > now) return (
                                            <div key={index} className={"col-span-1 rounded-[20px] bg-amber-50 border border-amber-200 h-[100px] overflow-hidden flex justify-between relative"}>

                                                <div className={"flex flex-col justify-center ml-[20px]"}>
                                                    <p className={"text-[14px] uppercase font-[500] h-[16px] line-clamp-1"}>{shopVoucher.voucherName}</p>
                                                    <div className={"flex items-baseline h-[18px]"}>
                                                        <p className={"text-[13px] align-baseline text-gray-600"}>giảm </p>
                                                        <p className={"text-[16px] align-baseline ml-[5px] text-amber-600 font-[700]"}>{shopVoucher.value}</p>
                                                    </div>
                                                    <div className={"flex items-baseline h-[17px]"}>
                                                        <p className={"text-[13px] text-gray-600"}>cho đơn tối thiểu:</p>
                                                        <p className={"text-[15px] ml-[5px] text-gray-900 font-[600]"}>{shopVoucher.minPrice}</p>
                                                    </div>

                                                    <p className={"text-[13px] text-gray-700 mt-[5]"}>Kết thúc: {endTimeFormatted}</p>
                                                </div>
                                                <div className={"w-[100px] border-dashed border-l flex justify-center items-center"}>
                                                    <button onClick={()=> SaveVoucher(shopVoucher.voucherId)} className={"w-[80px] h-[30px] bg-amber-600 text-white font-[15px] rounded-full"}>
                                                        Lưu
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className=" rounded-[25px] border border-stone-200 p-[30px] pb-[10px] relative flex flex-col items-center max-h-fit">
                            <p className="font-sf font-[700] text-[24px] text-stone-800 uppercase absolute top-[-18px] bg-white px-[15px]">Đánh giá sản phẩm</p>

                            <div className={"w-full h-[40px] flex items-center justify-between"}>
                                <div className={"flex items-center"}>
                                    <HiStar className="text-yellow-500 text-[20px] mr-[5px]"/>
                                    <div className="flex items-end">
                                        <p className="font-sf font-[800] text-[22px] leading-[30px]">{product?.rating}</p>
                                    </div>
                                </div>
                                <div className={"flex h-full items-center relative"}>
                                    <div onClick={()=>setOpenFilterComment(!openFilterComment)}
                                         className={`${openFilterComment? " top-0" : "h-full"} flex flex-col items-center absolute w-[125px] rounded-[20px] bg-stone-200 font-sf text-stone-800 font-[500] text-[15px] mr-[10px] left-[-135px] `}>
                                        <button className={"h-[40px] w-full flex items-center justify-between px-[20px] pr-[15px]"}>
                                            <p>{star == 0 ? "Mới Nhất" : star == 1 ? "Từ 1 Sao" : star == 2 ? "Từ 2 Sao" : star == 3 ? "Từ 3 Sao" : star == 4 ? "Từ 4 Sao" : "Từ 5 Sao" }</p>
                                            <TbChevronDown className={"text-[20px]"}/>
                                        </button>
                                        {openFilterComment && star != 0 ? (
                                            <button onClick={()=> {
                                                setStar(0);
                                                setOpenFilterComment(!openFilterComment);
                                            }} className={"h-[40px] w-full flex items-center justify-center px-[20px] pr-[15px]"}>
                                                <p>Mới Nhất</p>
                                            </button>
                                        ): null}
                                        {openFilterComment && (
                                            <button onClick={()=> {
                                                setStar(5);
                                                setOpenFilterComment(!openFilterComment);
                                            }} className={"h-[40px] w-full flex items-center justify-center px-[20px] pr-[15px]"}>
                                                <p>Từ 5 Sao</p>
                                            </button>
                                        )}
                                        {openFilterComment && (
                                            <button onClick={()=> {
                                                setStar(4);
                                                setOpenFilterComment(!openFilterComment);
                                            }} className={"h-[40px] w-full flex items-center justify-center px-[20px] pr-[15px]"}>
                                                <p>Từ 4 Sao</p>
                                            </button>
                                        )}
                                        {openFilterComment && (
                                            <button onClick={()=> {
                                                setStar(3);
                                                setOpenFilterComment(!openFilterComment);
                                            }} className={"h-[40px] w-full flex items-center justify-center px-[20px] pr-[15px]"}>
                                                <p>Từ 3 Sao</p>
                                            </button>
                                        )}
                                        {openFilterComment && (
                                            <button onClick={()=> {
                                                setStar(2);
                                                setOpenFilterComment(!openFilterComment);
                                            }} className={"h-[40px] w-full flex items-center justify-center px-[20px] pr-[15px]"}>
                                                <p>Từ 2 Sao</p>
                                            </button>
                                        )}
                                        {openFilterComment && (
                                            <button onClick={()=> {
                                                setStar(1);
                                                setOpenFilterComment(!openFilterComment);
                                            }} className={"h-[40px] w-full flex items-center justify-center px-[20px] pr-[15px]"}>
                                                <p>Từ 1 Sao</p>
                                            </button>
                                        )}

                                    </div>
                                    {/*<button onClick={()=>setShowPostComment(true)} className={"flex h-full px-[20px] items-center justify-center rounded-[20px] bg-stone-800 font-sf text-white font-[500] text-[15px]"}>*/}
                                    {/*    <p>Viết Bình Luận</p>*/}
                                    {/*</button>*/}
                                </div>

                            </div>


                            <div className={`w-full gap-[20px] mt-[20px]`}>
                                {comment.map((comment) => (
                                    <div key={comment.commentId} className="row-span-1 bg-stone-100 min-h-[100px] rounded-[20px] flex px-[23px] py-[18px] mb-[20px]">
                                        <div className={`flex-1 flex flex-col w-[calc(100%-60px)] `}>
                                            <div className={` flex` }>
                                                {[...Array(5)].map((_, index) => {
                                                    if (index < comment.rating) {
                                                        return <HiStar className={"text-yellow-500 text-[16px]"} key={index}/>
                                                    } else {
                                                        return <HiOutlineStar className={`text-yellow-500 text-[16px]`} key={index}/>
                                                    }
                                                })}
                                            </div>
                                            {/*Ten*/}
                                            <div className={``}>
                                                <p className={`font-sf text-stone-800 font-[600] text-[15px] mt-[4px]`}>{comment.customerName}</p>
                                            </div>
                                            {/*So sao danh gia*/}

                                            <div className={`flex-1 `}>
                                                <p className={`font-sf text-stone-500 text-[15px] font-[400] `}>{`"${comment.content}"`}</p>
                                            </div>
                                            {/*Ngay tao*/}
                                            <div className={`mt-[3px]`}>
                                                <p className={`font-sf text-[12px] font-[600] text-stone-600`}>{new Date(comment.createDate).toLocaleString("vi-VN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}</p>
                                            </div>

                                        </div>


                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    
                    
                </div>
                {/*<div className=" w-[1300px] max-h-fit pt-[25px] pb-[30px] flex flex-col justify-center items-center mt-[20px]">*/}
                {/*    <p className="font-sf font-[900] text-[30px] mb-[10px] text-stone-800 uppercase">Có thể bạn cũng thích</p>*/}
                {/*    <div className={"border-b border-amber-500 w-[150px] mb-[40px]"}></div>*/}
                {/*    <div className="w-full grid grid-cols-5 gap-[20px]">*/}
                {/*        {recomendProducts.slice(0,5).map((product, index) => (*/}
                {/*            <ProductR product={product} key={index}/>*/}
                {/*        ))}*/}
                {/*    </div>*/}

                {/*</div>*/}

            </div>


        </div>
    )
}