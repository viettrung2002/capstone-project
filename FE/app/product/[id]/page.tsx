'use client'
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Breadcrumb from "@/app/components/breadcrumb";
import Image from "next/image";
import {HiOutlineStar, HiTag, HiStar, HiReceiptPercent, HiChevronUp, HiChevronDown, HiMiniArrowPath, HiMiniArrowLongRight} from "react-icons/hi2";
// import { randomInt } from "crypto";
import {ProductR} from "@/app/components/product";
import {IProductData, IProductInCompare} from "@/app/types/product";
import Cookies from "js-cookie";
import {IComment, ICommentReq} from "@/app/types/comment";
import {TbArrowDown, TbChevronDown, TbMinus, TbPlus, TbStar, TbStarFilled} from "react-icons/tb";
type Product = {
    id: number;
    category: string;
    name: string;
    image: string;
    star: number;
    price: number;
    discount: number;
};
export default function ProductInfo () {
    const {id}  = useParams()
    const router = useRouter()
    const [quantity, setQuantity] = useState(0)
    const [chooseColor , setChooseColor] = useState("")
    const [product, setProduct] = useState<IProductData | null>(null)
    const [rating, setRating] = useState<Record<number, number> | null>(null)
    const [comment, setComment] = useState<IComment[]>([])
    const [openFilterComment, setOpenFilterComment] = useState<boolean>(false)
    const [star, setStar] = useState(0)
    const [showPostComment, setShowPostComment] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [newComment, setNewComment] = useState<ICommentReq>({
        content: "",
        rating: 5,
        productId: id ? id.toString() : ""
    })
    const token = Cookies.get("token");
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
                console.log(data);
                setProduct(data);
            } catch (error) {
                console.error(error)
            }
        }
        GetProductById();

        async function GetRating () {
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/comment/star/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await response.json();
                console.log(data);
                setRating(data.data);

            } catch (error) {
                console.log(error)
            }
        }
        GetRating ();
    }, []);

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
    }, [star, reload]);

    const breadcrumbs = [
        {name: "Category", href: "/categories" },
        {name: "2", href: "/categories" },
    ]
    const image = [
        "/a.png",
        "/b.png",
        "/c.png",
        "/d.png",
        "/e.png",

    ]
    const products = {
        id: 1,
        category: "Laptop",
        name: "Macbook Pro M4 51Gb",
        image: `/products/product-1.jpg`,
        star: 4.5,
        price: 4000,
        discount: 10,
        color: ["green", "blue", "red"],
        stock: 10

    }
    const recomendedProducts : Product[] = [
        {
            id: 1,
            category: "Laptop",
            name: "MacBook Pro M4",
            image: "/products/product-1.jpg",
            star: 4.5,
            price: 4000,
            discount: 10,
        },
        {
            id: 2,
            category: "Laptop",
            name: "MacBook Air M2",
            image: "/products/product-2.jpg",
            star: 4.2,
            price: 2500,
            discount: 5,
        },
        {
            id: 3,
            category: "Laptop",
            name: "Dell XPS 15",
            image: "/products/product-3.jpg",
            star: 4.7,
            price: 3300,
            discount: 8,
        },
        {
            id: 4,
            category: "Laptop",
            name: "HP Spectre x360",
            image: "/products/product-4.jpg",
            star: 4.3,
            price: 2900,
            discount: 7,
        },
        {
            id: 5,
            category: "Laptop",
            name: "Asus ROG Zephyrus",
            image: "/products/product-5.jpg",
            star: 4.8,
            price: 3500,
            discount: 12,
        },
        {
            id: 6,
            category: "Laptop",
            name: "Lenovo ThinkPad X1",
            image: "/products/product-6.jpg",
            star: 4.4,
            price: 2700,
            discount: 6,
        },
        {
            id: 7,
            category: "Laptop",
            name: "Acer Swift 5",
            image: "/products/product-7.jpg",
            star: 4.1,
            price: 2100,
            discount: 9,
        },
        {
            id: 8,
            category: "Laptop",
            name: "MSI Prestige 14",
            image: "/products/product-8.jpg",
            star: 4.0,
            price: 2400,
            discount: 10,
        },
        {
            id: 9,
            category: "Laptop",
            name: "Razer Blade 14",
            image: "/products/product-5.jpg",
            star: 4.6,
            price: 3700,
            discount: 15,
        },
        {
            id: 10,
            category: "Laptop",
            name: "Surface Laptop 5",
            image: "/products/product-8.jpg",
            star: 4.2,
            price: 2600,
            discount: 5,
        },
    ]
    async function CreateComment () {
        if (!token) {
            router.push("/login");
            return
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/comment/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newComment),
            })

            if (response.ok) {
                const data = await response.json();
                console.log("comment",data);
                setReload(!reload);
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(chooseColor)
    }, [chooseColor]);

    function AddToCompare(product: IProductData) {
        console.log("add to Compare", product);
        if (localStorage.length >= 2) {
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

    return (
        <div className="w-full flex bg-white flex-col items-center">
            <div className={`w-[1300px] h-[40px] mt-[10px]  items-center flex mb-[20px]`}>
                <div className="flex items-center w-[250px] h-full  ">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
            </div>
            <div className={`w-[1300px] h-[490px] flex gap-[40px] mb-[30px]  `}>
                <div className="w-[660px] h-full  bg-white flex gap-[20px]">
                    <div className={"grid w-[170px] gap-[15px] col-span-1  "}>
                        {image.slice(0,3).map((image, index) => (
                        <div key={index} className={"relative col-span-1  w-[150px] flex items-center justify-center rounded-[25px] overflow-hidden"}>
                            <div className={"h-full w-full relative bg-stone-200"}>
                                <Image src={"/products/product-1.jpg"} alt={"image"}  fill={true} />
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex items-center w-[550px] h-full rounded-[25px] overflow-hidden ">
                        <div className={"w-full h-full relative overflow-hidden bg-stone-200"}>
                            <Image src={"/products/product-1.jpg"} alt={"image"} width={1000} height={1000}  className={"w-full h-full object-cover"} />
                        </div>
                    </div>
                </div>
                <div className=" flex-1 flex-col justify-center h-full  ">
                    <div className={" w-full h-[50px] "}>
                        <p className={"font-sf text-stone-800 text-[40px] font-[900] uppercase"}>{product?.productName}</p>
                    </div>
                    <div className={"w-full flex items-center mt-[5px] h-[30px] "}>
                        <HiTag className={"text-stone-500"}/>
                        <p className={"font-sf text-[15px] text-stone-600 ml-[5px]"}>{product?.categoryName}</p>
                    </div>
                    <div className={"h-[25px] w-full flex mt-[5px] "}>
                        <div className={"h-[25px] flex items-center pr-[10px]  "}>

                            <div className={"flex text-yellow-500 items-center justify-center mr-[5px] text-[16px] "}>
                                {Array.from({length: Math.round(products.star)}, (_, index) => (
                                    <HiStar className={"mb-[1px] "} key={index} />
                                ))}
                                {(5-Math.round(products.star)) >= 1  ?
                                    (
                                        Array.from({length: 5 - Math.round(products.star)}, (_, index) => (
                                            <HiOutlineStar key={index} />
                                        ))
                                    ) : null }
                            </div>
                            <div className={"font-sf text-[15px]"}>
                                <p>{product?.rating}</p>
                            </div>

                        </div>
                        <div className={"h-[25px]  border-x flex items-center px-[10px] border-stone-200"}>
                            <p className={"font-sf text-stone-800 text-[15px]"}>{product?.reviewCount}</p>
                        </div>
                        <div className={"h-[25px]  flex items-center px-[10px]"}>
                            <p className={"font-sf text-stone-800 text-[15px]"}>{product?.sold} Đã bán</p>
                        </div>
                    </div>

                    <div className={" w-full flex items-center mt-[5px] h-[40px] "}>
                        <p className={"text-[14px] self-start mt-[4px] mr-[2px] text-amber-600 font-sf underline"}>đ</p>
                        <p className={"font-sf font-[700] text-amber-600 text-[24px]"}>{product?.price != undefined ? product?.price - product?.price * product?.discount/100 : null}</p>
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
                        <p className={"line-clamp-3 "}> Lorem ipsum dolor sit amet, consectetur adico laboris niLorem ipsum dolor sit amet, consecteturdunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </p>
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
                                        if (quantity<products.stock)
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
                                <p className={"font-sf text-stone-600 text-[14px] ml-[10px] "}>10 sản phẩm có sẵn</p>
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
                            <p className={"text-[14px] self-end mb-[3px] mr-[2px] text-blue-500 font-sf underline"}>đ</p>
                            <p className={" font-sf font-[600] text-blue-500 text-[22px] leading-[24px] "}>{product != undefined ? quantity * (product.price - product.price * product.discount / 100) :  null}</p>
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
                            <button className={"border h-full w-full col-span-4 flex justify-center items-center bg-stone-800 font-sf font-[500] text-[15px] text-white hover:bg-stone-700 rounded-full hover:shadow-lg"}>
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
            <div className="w-[1300px] gap-x-[30px] grid grid-cols-11 mt-[40px] font-sf">
                <div className="col-span-11 w-full  grid grid-cols-5 gap-x-[20px]">
                    <div className=" flex flex-col justify-center items-center col-span-3 rounded-[25px] border border-stone-200 relative pt-[30px] pb-[10px]">
                        <p className="font-sf font-[700] text-[24px] mb-[15px] uppercase bg-white absolute top-[-18px] px-[15px] text-stone-800">Thông tin chi tiết</p>
                        <div className={"h-[40px] w-full flex items-center justify-center"}>
                            <div className={"w-[220px] border border-stone-200 rounded-full h-full flex items-center justify-center mr-[10px]"}>
                                <p className={"text-[15px] font-[500] "}>Mô Tả Sản Phẩm</p>
                            </div>
                            <div className={"w-[220px] border border-stone-200 rounded-full h-full flex items-center justify-center ml-[10px]"}>
                                <p className={"text-[15px] font-[500] "}>Thông Số Kỹ Thuật</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full px-[30px] py-[20px] pt-[10px]">
                            {product? Object.entries(product.specifications).map(([key,value], index) => (
                                <div key={index} className="h-[40px] w-full bg-stone-100 rounded-full  pr-[10px] mt-[8px] items-center grid grid-cols-8 px-[20px] gap-[20px]">

                                    <div className={"col-span-3 flex"}>
                                        <p  className={"text-[15px] font-[500] "}>{key}:</p>
                                    </div>
                                    <div className="h-full flex items-center font-sf text-[15px] text-stone-600 col-span-5">
                                        <p>{value}</p>
                                    </div>
                                </div>
                            )) : null}

                        </div>
                    </div>
                    <div className=" rounded-[25px] border border-stone-200 p-[30px] pb-[10px] col-span-2 relative flex flex-col items-center max-h-fit">
                        <p className="font-sf font-[700] text-[24px] text-stone-800 uppercase absolute top-[-18px] bg-white px-[15px]">Đánh giá sản phẩm</p>

                        <div className={"w-full h-[40px] flex items-center justify-between"}>
                            <div className={"flex items-center"}>
                                <HiStar className="text-yellow-500 text-[20px] mr-[5px]"/>
                                <div className="flex items-end">
                                    <p className="font-sf font-[800] text-[22px] leading-[30px]">{products.star}</p>
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
                                <button onClick={()=>setShowPostComment(true)} className={"flex h-full px-[20px] items-center justify-center rounded-[20px] bg-stone-800 font-sf text-white font-[500] text-[15px]"}>
                                    <p>Viết Bình Luận</p>
                                </button>
                            </div>

                        </div>


                        <div className={`w-full gap-[20px] mt-[20px]`}>
                            {comment.map((comment) => (
                                <div key={comment.commentId} className="row-span-1 bg-stone-100 min-h-[100px] rounded-[20px] flex px-[23px] py-[18px] mb-[20px]">
                                    <div className={`flex-1 flex flex-col w-[calc(100%-60px)] `}>
                                        <div className={` flex` }>
                                            {[...Array(5)].map((_, index) => {
                                                if (index <= comment.rating) {
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
                <div className=" w-[1300px] max-h-fit pt-[25px] pb-[30px] flex flex-col justify-center items-center mt-[20px]">
                    <p className="font-sf font-[900] text-[30px] mb-[10px] text-stone-800 uppercase">Có thể bạn cũng thích</p>
                    <div className={"border-b border-amber-500 w-[150px] mb-[40px]"}></div>
                    <div className="w-full grid grid-cols-5 gap-[20px]">
                        {recomendedProducts.slice(0,5).map((product, index) => (
                            <ProductR product={product} key={index}/>
                        ))}
                    </div>

                </div>

            </div>
            {
                showPostComment ?
                    <div className={`w-full h-screen top-0 fixed  bg-stone-500/20 z-20  flex justify-center items-center font-sf`}>

                        <div className={" w-[500px] bg-white rounded-[25px] shadow pb-[20px]"}>
                            <div className={"w-full h-[50px] justify-center items-center flex border-b border-stone-200"}>
                                <p className={"uppercase text-[22px] text-stone-800 font-[700]"}>đánh giá</p>
                            </div>

                            <div className={"h-[40px] w-full px-[20px] flex items-center  mt-[10px] text-[22px] text-yellow-500"}>
                                {newComment.rating >= 1 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 1}))}/> : <TbStar/> }
                                {newComment.rating >= 2 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 2}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 2}))}/> }
                                {newComment.rating >= 3 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 3}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 3}))}/> }
                                {newComment.rating >= 4 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 4}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 4}))}/> }
                                {newComment.rating >= 5 ? <TbStarFilled onClick={()=> setNewComment((prev) => ({...prev!, rating: 5}))}/> : <TbStar onClick={()=> setNewComment((prev) => ({...prev!, rating: 5}))}/> }
                            </div>

                            <div className={"w-full px-[20px] relative mt-[15px]"}>
                                <p className={"font-[600] ml-[20px] text-stone-700 absolute top-[-12px] px-[6px] bg-white"}>Nội Dung</p>
                                <textarea
                                    value={newComment.content}
                                    onChange={(e) =>
                                        setNewComment((prev) => ({...prev!, content: e.target.value}))
                                    }
                                    className={"w-full h-[200px] border border-stone-200 rounded-[20px] p-[15px] focus:outline-none"}
                                />
                            </div>

                            <div className={"h-10 w-full flex justify-end px-[20px] mt-[10px]"}>
                                <div className={"h-full flex justify-center items-center font-sf px-[20px] rounded-full bg-stone-200 text-[15px] font-[500] text-stone-800"}
                                    onClick={()=> {
                                        setShowPostComment(false);
                                        setNewComment((prev) => ({...prev!, content: "", rating: 5}))
                                    }}>
                                    <p className={"select-none"}>Trở Lại</p>
                                </div>
                                <div onClick={()=>CreateComment()} className={"h-full flex justify-center items-center font-sf px-[20px] rounded-full bg-stone-800 text-[15px] font-[500] text-white ml-[10px]"}>
                                    <p>Gửi</p>
                                </div>
                            </div>

                        </div>
                        <button onClick={()=> setShowPostComment(false)}>X</button>
                    </div>
                    : null
            }

        </div>
    )
}