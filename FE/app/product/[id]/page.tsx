'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Breadcrumb from "@/app/components/breadcrumb";
import Image from "next/image";
import {HiOutlineStar, HiTag, HiStar, HiReceiptPercent, HiChevronUp, HiChevronDown, HiMiniArrowPath, HiMiniArrowLongRight} from "react-icons/hi2";
import { randomInt } from "crypto";
import {ProductR} from "@/app/components/product";
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
    const [quantity, setQuantity] = useState(0)
    const [chooseColor , setChooseColor] = useState("")
    const ratings = [
        { stars: 5, percentage: 98.4 },
        { stars: 4, percentage: 0.9 },
        { stars: 3, percentage: 0.2 },
        { stars: 2, percentage: 0.1 },
        { stars: 1, percentage: 0.2 },
      ];

    const comments = [
        {
            username: "ngviettrung2002",
            rate: 4,
            create_at: Date.now(),
            content: "Sản phẩm sử dụng rất tốt, giao hàng nhanh"
        },
        {
            username: "hoanganh99",
            rate: 5,
            create_at: new Date("2024-12-15T10:20:00").getTime(),
            content: "Chất lượng tuyệt vời, đóng gói cẩn thận, sẽ ủng hộ tiếp!"
        },
        {
            username: "minhthu_21",
            rate: 3,
            create_at: new Date("2025-02-02T08:45:00").getTime(),
            content: "Giao hàng hơi chậm nhưng sản phẩm ổn, dùng tạm được."
        },
        {
            username: "quanghuyyy",
            rate: 4,
            create_at: new Date("2025-01-10T17:30:00").getTime(),
            content: "Mọi thứ đều ổn, chỉ có điều màu hơi khác so với ảnh."
        },
        {
            username: "trangbaby",
            rate: 5,
            create_at: new Date("2024-11-28T14:15:00").getTime(),
            content: "Mình rất hài lòng, hàng giống mô tả, rất đáng tiền!"
        },
        {
            username: "phuclong",
            rate: 2,
            create_at: new Date("2025-03-12T09:00:00").getTime(),
            content: "Sản phẩm không đúng mô tả, hỗ trợ khách hàng không tốt."
        }
    ];

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
            image: "/products/product-9.jpg",
            star: 4.6,
            price: 3700,
            discount: 15,
        },
        {
            id: 10,
            category: "Laptop",
            name: "Surface Laptop 5",
            image: "/products/product-10.jpg",
            star: 4.2,
            price: 2600,
            discount: 5,
        },
    ]
    const specifications = {
        id: 1,
        name: "iPhone 13 Pro",
        brand: "Apple",
        model: "iPhone 13 Pro",
        releaseDate: "2021-09-24",
        operatingSystem: "iOS 15",
        displaySize: "6.1 inches",
        displayResolution: "2532 x 1170 pixels",
        displayType: "Super Retina XDR OLED",
        rearCameraPrimary: "12 MP",
        rearCameraUltraWide: "12 MP",
        rearCameraTelephoto: "12 MP",
        frontCamera: "12 MP",
        processorBrand: "Apple",
        processorModel: "A15 Bionic",
        processorCores: 6,
        processorSpeed: "3.23 GHz",
        ram: "6 GB",
        storage: "128 GB",
        batteryCapacity: "3095 mAh",
        batteryFastCharging: "20W",
        bluetooth: "5.0",
        wifi: "Wi-Fi 6",
        nfc: true,
        gps: true,
        height: "146.7 mm",
        width: "71.5 mm",
        thickness: "7.65 mm",
        weight: "204 g",
      };
    useEffect(() => {
        console.log(chooseColor)
    }, [chooseColor]);
    return (
        <div className="w-full flex  flex-col items-center">
            <div className={`w-[1300px] h-[40px] mt-[10px]  items-center flex mb-[20px]`}>
                <div className="flex items-center w-[250px] h-full  ">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
            </div>
            <div className={`w-[1300px]  grid grid-cols-5 gap-[50px] mb-[30px] p-[30px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.2)]`}>
                <div className="col-span-3 bg-white ">
                    <div className="flex items-center w-full border  border-gray-200  p-[20px] overflow-hidden ">
                        <div className={"w-full aspect-[16/10] relative rounded-[4px] overflow-hidden"}>
                            <Image src={"/store/demo.png"} alt={"image"} fill={true} />
                        </div>
                    </div>
                    <div className={"grid grid-cols-5 gap-[15px] px-[100px] "}>
                        {image.map((image, index) => (
                        <div key={index} className={"relative col-span-1 border border-gray-200 aspect-[16/10] mt-[15px] flex items-center justify-center p-[4px]"}>
                            <div className={"h-full w-full relative"}>
                                <Image src={"/store/demo.png"} alt={"image"}  layout={"fill"} />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2  flex flex-col justify-center ">
                    <div className={" w-full "}>
                        <p className={"font-sf text-gray-800 text-[22px] font-[600]"}>Laptop Macbook Pro M4 2024</p>
                    </div>
                    <div className={"w-full flex items-center mt-[5px]"}>
                        <HiTag className={"text-gray-500"}/>
                        <p className={"font-sf text-[15px] text-gray-600 ml-[5px]"}>Máy tính & Laptop</p>
                    </div>
                    <div className={"h-[25px] w-full flex mt-[5px]"}>
                        <div className={"h-[25px] flex items-center pr-[10px]  "}>
                            <div className={"font-sf text-[15px]"}>
                                <p>{products.star}</p>
                            </div>
                            <div className={"flex text-yellow-500 items-center justify-center ml-1 text-[14px] "}>
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

                        </div>
                        <div className={"h-[25px]  border-x flex items-center px-[10px] border-gray-200"}>
                            <p className={"font-sf text-gray-800 text-[15px]"}>215 Đánh giá</p>
                        </div>
                        <div className={"h-[25px]  flex items-center px-[10px]"}>
                            <p className={"font-sf text-gray-800 text-[15px]"}>700 Đã bán</p>
                        </div>
                    </div>

                    <div className={" w-full flex items-center mt-[10px]"}>
                        <p className={"text-[14px] self-start mt-[4px] mr-[2px] text-blue-500 font-sf underline"}>đ</p>
                        <p className={"font-sf font-[600] text-blue-500 text-[22px]"}>{products.price - products.price * products.discount / 100}</p>
                        {products.discount > 0 ? (
                            <div className={"relative flex items-center ml-[3px] mr-[5px]"}>
                                <HiReceiptPercent className={"text-blue-500 mr-[10px] text-[13px]"} />

                                <div className={"relative flex"}>
                                    <p className={"text-[12px] font-sf self-start mt-[3px] text-gray-600 mr-[2px] underline"}>đ</p>
                                    <p className={"font-sf font-[600] text-gray-600 text-[18px]"}>{products.price}</p>
                                    <div className={"absolute w-full top-[13px] border-b border-gray-600 "}></div>
                                </div>

                            </div>


                        ): null}
                    </div>
                    <div className={"w-full max-h-[110px] flex font-sf text-gray-600 text-[15px] overflow-hidden mt-[5px]"}>
                        <p className={"line-clamp-4 "}> Lorem ipsum dolor sit amet, consectetur adico laboris niLorem ipsum dolor sit amet, consecteturdunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </div>
                    <div className={"w-full border-b border-gray-200 mt-[20px] mb-[10px]"}>
                    </div>
                    <div className={" w-full  grid grid-cols-3  gap-x-[20px] "}>
                        <div className={"col-span-1  border-gray-200 border-r "}>
                            <p className={"font-sf text-gray-600 text-[14px] font-[500]"}>Màu sắc</p>
                            <div className={"flex h-[40px] items-center mt-[6px] "}>
                                {products.color.map((color, index) => (
                                    <div onClick={()=>setChooseColor(color)} key={index} className={"flex items-center border-[2px] rounded-full justify-center w-[18px] h-[18px] mr-[7px]"} style={{borderColor: color }}>
                                        {color === chooseColor ?
                                            <div className={"w-[10px] h-[10px] rounded-full"} style={{backgroundColor: color}}>

                                            </div>
                                        : null }

                                        {/*<input*/}
                                        {/*    key={index}*/}
                                        {/*    type="radio"*/}
                                        {/*    value={color}*/}
                                        {/*    checked={chooseColor === color}*/}
                                        {/*    onChange={(e) => setChooseColor(e.target.value)}*/}
                                        {/*    className={`appearance-none w-[10px] h-[10px]   rounded-full  `}*/}
                                        {/*    style={{ backgroundColor: chooseColor == color ? color : undefined}}*/}
                                        {/*/>*/}
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className={"col-span-2  border-gray-200 "}>
                            <p className={"font-sf text-gray-600 text-[14px] font-[500]"}>Số lượng</p>
                            <div className={"flex items-center  mt-[6px] mb-[5px]"}>
                                <div className={"w-2/5  h-[40px] border border-gray-200 flex justify-between rounded-[3px] overflow-hidden items-center pl-[15px] pr-[1px] py-[1px]"}>
                                    <p className={"font-sf text-gray-800"}>{quantity}</p>
                                    <div className={"h-full w-[30px] grid grid-rows-2 gap-[1px]"}>
                                        <div onClick={()=>  {
                                            if (quantity<products.stock)
                                                setQuantity(quantity+1)
                                        }} className={"flex row-span-1 bg-gray-100 justify-center items-center "}>
                                            <HiChevronUp/>
                                        </div>
                                        <div onClick={()=>{
                                            if (quantity > 0 ) setQuantity(quantity-1)
                                        }} className={"flex row-span-1 bg-gray-100 justify-center items-center"}>
                                            <HiChevronDown/>
                                        </div>
                                    </div>
                                </div>
                                <p className={"font-sf text-gray-600 text-[14px] ml-[10px] "}>{products.stock} sản phẩm có sẵn</p>
                            </div>

                        </div>
                        <div className={"col-span-1  border-gray-200 "}>

                        </div>
                    </div>
                    <div className={"w-full border-b border-gray-200 mt-[10px] mb-[20px]"}>
                    </div>
                    <div className={"h-[40px] w-full grid grid-cols-11 gap-[20px] "}>
                        <div className="col-span-5  relative flex items-end ">
                            <p className="font-sf text-gray-600 text-[14px] mb-[5px] absolute top-[-6px]">Tạm tính</p>
                            <p className={"text-[14px] self-end mb-[3px] mr-[2px] text-blue-500 font-sf underline"}>đ</p>
                            <p className={" font-sf font-[600] text-blue-500 text-[22px] leading-[24px] "}>{quantity * (products.price - products.price * products.discount / 100) }</p>
                        </div>
                        
                            <button className={"border h-[40px] col-span-3 flex justify-center items-center border-gray-200 text-gray-800 rounded-[5px] font-sf text-[15px]"}>
                                <p className={"mt-[1px]"}>Mua ngay</p>
                            </button>
                            <button className={"border h-[40px] col-span-3 flex justify-center items-center border-gray-200 rounded-[5px]"}>
                                <HiMiniArrowPath className={"text-gray-600 mr-[5px]"}/>
                                <p className={"font-sf text-[15px] text-gray-800 mt-[1px]"}>So sánh</p>
                            </button>
                       
                        
                    </div>
                    <div className={"w-full border-b border-gray-200 mt-[20px] mb-[0px]"}>
                    </div>
                    <div className={" w-full  grid grid-cols-10 gap-x-[20px] mt-[20px] "}>
                        <div className="col-span-4  border-gray-200">
                            <button className={"border h-full w-full col-span-4 flex justify-center items-center bg-blue-500 font-sf font-[400] text-[15px] text-gray-50 hover:bg-gray-700 rounded-[5px]"}>
                                <p className={"mt-[1px]"}>Thêm vào giỏ hàng</p>
                            </button>
                        </div>
                        <div className={"col-span-6  pr-[30px] flex border-l border-gray-200 pl-[20px]"}>
                            <div className={"h-full aspect-square rounded-full bg-gray-300 mr-[15px]"}>
                            </div>
                            <div className={"flex flex-col justify-center"}>
                                <p className={"font-sf text-gray-800 font-[500] text-[15px]"}>Apple Viet Nam offical </p>
                                <button className={"w-[120px] border py-[3px] mt-[3px] rounded-[5px] bg-blue-500 text-gray-50 hover:bg-gray-700 "}>
                                    <p className={"font-sf  font-[400] text-[16px]"}>Xem shop</p>
                                </button>
                            </div>
                        </div>
                        <div className={"col-span-3 border-r border-gray-200"}>

                        </div>
                        <div className={"col-span-3 border-r border-gray-200"}>

                        </div>
                    </div>
                </div>
            </div>

            {/*THong tin san pham*/}
            <div className="w-[1300px]  gap-x-[30px] grid grid-cols-11">
                <div className="col-span-7  border-gray-300  ">
                    <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.2)] p-[30px] pt-[25px]">
                        <p className="font-sf font-[500] text-[17px] ">Mô tả sản phẩm</p>
                        <div className="flex">
                            <div>
                            {Object.entries(specifications).map(([key]) => (
                                <div key={key} className="h-[30px] border-b border-gray-200 flex pr-[10px]">
                                    <div className=" h-[30px] flex items-center font-sf text-[15px] text-gray-600">
                                        <p>{key}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                            <div className="flex-1">
                            {Object.entries(specifications).map(([,value], index) => (
                                <div key={index} className="h-[30px] border-b border-gray-200 flex pr-[10px]">
                                    <div className=" h-[30px] flex items-center font-sf text-[15px] text-gray-600">
                                        <p>{value}</p>
                                    </div>
                                </div>
                            ))}
                            </div>                        
                        </div>
                    </div>
                    <div className="shadow-[0px_0px_5px_rgba(0,0,0,0.2)] p-[30px] mt-[30px]">
                        <p className="font-sf font-[500] text-[17px] text-gray-800">Đánh giá sản phẩm</p>
                        <div className="w-full flex border border-gray-200 mt-[10px] mb-[20px] py-[10px]">
                            <div className="w-1/6 aspect-square  flex items-center justify-center">
                                <div className="flex items-center">
                                    <HiStar className="text-yellow-500 text-[20px]"/>
                                    <div className="flex items-end">
                                        <p className="font-sf font-[600] text-[30px] leading-[30px]">{products.star}</p>
                                        <p className="font-sf text-[15px] text-gray-600 mb-[3px]  leading-[15px] ">/</p>
                                        <p className="font-sf text-[15px] text-gray-600 mb-[1px] leading-[15px] ">5</p>
                                    </div>
                                    
                                    
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="w-3/6 pl-[10px]">
                                {ratings.map((rating, index) => (
                                    <div key={index} className="h-1/5 w-full  flex items-center">
                                        <p className="font-sf text-[15px] w-[10px]">{rating.stars}</p>
                                        <HiStar className="text-yellow-500 text-[14px] ml-[4px]"/>
                                        <div className="h-[7px] w-[130px] bg-gray-200 rounded-full overflow-hidden ml-[10px]">
                                            <div className={`h-full bg-blue-500 `} style={{width: `${rating.percentage}%`}}></div>
                                        </div>
                                        <p className="font-sf text-[14px] font-[600]  w-[50px] ml-[10px]">{rating.percentage}%</p>
                                        <button className=" border border-gray-200 w-[40px] h-6/9 flex justify-center items-center rounded-full hover:bg-blue-500 text-gray-700 hover:text-gray-50 ">
                                            <HiMiniArrowLongRight className="text-[18px]"/>
                                        </button>
                                    </div>

                                ))}
                                
                            </div>
                        </div>
                        <div className={`w-full grid grid-rows-6 gap-[20px]`}>
                            {comments.map((comment, index) => (
                                <div key={index} className="row-span-1 border-b border-gray-200 min-h-[100px] flex pb-[20px]">
                                    <div className={`h-[50px] w-[50px] rounded-full bg-gray-300 mr-[15px]`}>

                                    </div>
                                    <div className={`flex-1 flex flex-col w-[calc(100%-60px)] `}>
                                        {/*Ten*/}
                                        <div className={``}>
                                            <p className={`font-sf text-gray-800 text-[15px]`}>{comment.username}</p>
                                        </div>
                                        {/*So sao danh gia*/}
                                        <div className={` flex` }>
                                            {[...Array(5)].map((_, index) => {
                                                if (index <= comment.rate) {
                                                    return <HiStar className={"text-yellow-500 text-[14px]"} key={index}/>
                                                } else {
                                                    return <HiOutlineStar className={`text-yellow-500 text-[14px]`} key={index}/>
                                                }
                                            })}
                                        </div>
                                        {/*Ngay tao*/}
                                        <div className={`mt-[3px]`}>
                                            <p className={`font-sf text-[11px] text-gray-600`}>{new Date(comment.create_at).toLocaleString("vi-VN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}</p>
                                        </div>
                                        <div className={`flex-1 overflow-scroll `}>
                                            <p className={`font-sf text-gray-800 `}>{comment.content} </p>
                                        </div>
                                    </div>


                                </div>
                            ))}
                        </div>
                        
                    </div>
                    
                    
                </div>
                <div className="col-span-4  border-gray-300 px-[30px] shadow-[0px_0px_5px_rgba(0,0,0,0.2)] pt-[25px]">
                    <p className="font-sf font-[500] text-[17px] mb-[15px]">Có thể bạn cũng thích</p>
                    <div className="w-full grid grid-rows-10 gap-[20px]">
                        {recomendedProducts.map((product, index) => (
                            <ProductR product={product} key={index}/>
                        ))}
                    </div>
                        
                </div>
            </div>
           
            
        </div>
    )
}