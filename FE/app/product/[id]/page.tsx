'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Breadcrumb from "@/app/components/breadcrumb";
import Image from "next/image";
import {HiOutlineStar, HiTag, HiStar, HiReceiptPercent, HiChevronUp, HiChevronDown} from "react-icons/hi2";
export default function ProductInfo () {
    const {id}  = useParams()
    const [quantity, setQuantity] = useState(0)
    const [chooseColor , setChooseColor] = useState("")
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
    useEffect(() => {
        console.log(chooseColor)
    }, [chooseColor]);
    return (
        <div className="w-full flex  flex-col items-center">
            <div className={`w-[1300px] h-[40px] mt-[10px] px-[10px] items-center flex `}>
                <div className="flex items-center w-[250px] h-full  ">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
            </div>
            <div className={`w-[1300px]   grid grid-cols-5 gap-[40px]`}>
                <div className="col-span-3 bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center w-full  border-gray-200 rounded-[5px] overflow-hidden px-[20px] pt-[20px]">
                        <div className={"w-full aspect-[16/10] relative rounded-[4px] overflow-hidden"}>
                            <Image src={"/store/demo.png"} alt={"image"} fill={true} />
                        </div>
                    </div>
                    <div className={"grid grid-cols-5 gap-[15px]"}>
                        {image.map((image, index) => (
                        <div key={index} className={"relative col-span-1 border border-gray-200 aspect-[16/10] mt-[15px] flex items-center justify-center p-[4px]"}>
                            <div className={"h-full w-full relative"}>
                                <Image src={"/store/demo.png"} alt={"image"}  layout={"fill"} />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 shadow-[0px_0px_5px_rgba(0,0,0,0.2)] p-[20px] px-[25px]">
                    <div className={" w-full "}>
                        <p className={"font-sf text-gray-800 text-[22px] font-[600]"}>Laptop Macbook Pro M4 2024</p>
                    </div>
                    <div className={"w-full flex items-center"}>
                        <HiTag className={"text-gray-500"}/>
                        <p className={"font-sf text-[15px] text-gray-600 ml-[5px]"}>Máy tính & Laptop</p>
                    </div>
                    <div className={"h-[25px] w-full flex"}>
                        <div className={"h-[25px] flex items-center pr-[10px]  "}>
                            <div className={"font-sf text-[15px]"}>
                                <p>{products.star}</p>
                            </div>
                            <div className={"flex text-yellow-500 items-center justify-center ml-1 "}>
                                {Array.from({length: Math.round(products.star)}, (_, index) => (
                                    <HiStar className={"mb-[3px] "} key={index} />
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

                    <div className={" w-full flex items-center"}>
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
                    <div className={"w-full max-h-[110px] flex font-sf text-gray-600 text-[15px] overflow-hidden "}>
                        <p className={"line-clamp-4 "}> Lorem ipsum dolor sit amet, consectetur adico laboris niLorem ipsum dolor sit amet, consecteturdunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    </div>
                    <div className={"w-full border-b border-gray-200 mt-[10px] mb-[10px]"}>
                    </div>
                    <div className={" w-full  grid grid-cols-3 "}>
                        <div className={"col-span-1  border-gray-200 "}>
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
                        <div className={"col-span-1  border-gray-200 "}>
                            <p className={"font-sf text-gray-600 text-[14px] font-[500]"}>Số lượng</p>
                            <div className={"w-full mt-[6px] h-[40px] border border-gray-200 flex justify-between rounded-[3px] overflow-hidden items-center pl-[15px]"}>
                                <p className={"font-sf text-gray-800"}>{quantity}</p>
                                <div className={"h-full w-[30px] grid grid-rows-2 gap-[1px]"}>
                                    <div onClick={()=>  {
                                        if (quantity<products.stock)
                                            setQuantity(quantity+1)
                                    }} className={"flex row-span-1 bg-gray-200 justify-center items-center "}>
                                        <HiChevronUp/>
                                    </div>
                                    <div onClick={()=>{
                                        if (quantity > 0 ) setQuantity(quantity-1)
                                    }} className={"flex row-span-1 bg-gray-200 justify-center items-center"}>
                                        <HiChevronDown/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-span-1  border-gray-200 "}>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}