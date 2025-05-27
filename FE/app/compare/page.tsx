'use client'
import {useEffect, useState} from "react";
import {IProductData} from "@/app/types/product";
import Image from "next/image";
import {HiStar , HiOutlineStar} from "react-icons/hi2";
export default function ComparePage(){
    const [products, setProducts] = useState<IProductData[]>([]);
    useEffect(()=> {


        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const value = localStorage.getItem(key);
                if (value) {
                    const product = JSON.parse(value) as IProductData;

                    setProducts(prevState => [...prevState, product]);
                }
            }
        }

    },[])
    return (
        <div className={"w-full flex flex-col items-center justify-center bg-white font-sf mt-[40px]"}>
            {products.length == 2 &&
                <div className={"w-[1300px] flex flex-col items-center justify-center"}>
                    <div className={"w-[1300px] grid grid-cols-2 gap-[20px] mt-[20px] "}>
                        <div className={"col-span-1 h-[260px] border flex p-[20px] rounded-[30px] border-stone-200 relative items-center justify-center "}>
                            <p className={"uppercase absolute top-[-18px] text-[22px] font-[700] bg-white px-[10px]"}>{products[0].productName}</p>
                            <div className={"flex-1 items-end h-full flex flex-col justify-center px-[20px]"}>
                                <p className={"text-stone-800 font-[500] text-[18px]"}>{products[0].shopName}</p>
                                <p className={"text-amber-600 font-[700] text-[22px] mt-[10px]"}>{products[0].price}</p>
                                <div className={"flex mt-[10px]"}>
                                    <p className={"border-r border-gray-200 mr-[10px] px-[10px]"}>{products[0].like} Lượt Thích</p>
                                    <p>Đã Bán: {products[0].sold}</p>
                                </div>
                                <div className={"flex text-yellow-500 items-center justify-center mr-[5px] text-[18px] mt-[10px]"}>
                                    {Array.from({length: Math.round(products[0].rating)}, (_, index) => (
                                        <HiStar className={"mb-[1px] "} key={index} />
                                    ))}
                                    {(5-Math.round(products[0].rating)) >= 1  ?
                                        (
                                            Array.from({length: 5 - Math.round(products[0].rating)}, (_, index) => (
                                                <HiOutlineStar key={index} />
                                            ))
                                        ) : null }
                                </div>

                            </div>

                            <div className={"h-full aspect-square bg-stone-200 rounded-[25px] relative"}>
                                <Image src={"/products/product-1.jpg"} alt={"image"} fill={true}/>
                            </div>
                        </div>
                        <div className={"col-span-1 h-[260px] border flex p-[20px] rounded-[30px] border-stone-200 relative items-center justify-center "}>
                            <p className={"uppercase absolute top-[-18px] text-[22px] font-[700] bg-white px-[10px]"}>{products[1].productName}</p>
                            <div className={"h-full aspect-square bg-stone-200 rounded-[25px] relative"}>
                                <Image src={"/products/product-1.jpg"} alt={"image"} fill={true}/>
                            </div>
                            <div className={"flex-1 items-start h-full flex flex-col justify-center px-[20px]"}>
                                <p className={"text-stone-800 font-[500] text-[18px]"}>{products[1].shopName}</p>
                                <p className={"text-amber-600 font-[700] text-[22px] mt-[10px]"}>{products[0].price}</p>
                                <div className={"flex mt-[10px]"}>
                                    <p className={"border-r border-gray-200 pr-[10px]"}>Đã Bán: {products[0].sold}</p>
                                    <p className={" mr-[10px] px-[10px]"}>{products[1].like} Lượt Thích</p>
                                </div>
                                <div className={"flex text-yellow-500 items-center justify-center mr-[5px] text-[18px] mt-[10px]"}>
                                    {Array.from({length: Math.round(products[1].rating)}, (_, index) => (
                                        <HiStar className={"mb-[1px] "} key={index} />
                                    ))}
                                    {(5-Math.round(products[0].rating)) >= 1  ?
                                        (
                                            Array.from({length: 5 - Math.round(products[1].rating)}, (_, index) => (
                                                <HiOutlineStar key={index} />
                                            ))
                                        ) : null }
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className={"max-w-fit mt-[20px] rounded-[30px] border border-stone-200 grid grid-cols-5 gap-[20px] pt-[20px] pb-[30px]"}>
                        <div className={"col-span-2"}>
                            {products[0]? Object.entries(products[0].specifications).map(([,value], index) => (
                                <div key={index} className="h-[40px] w-full whitespace-nowrap  pr-[10px] mt-[8px] items-center flex justify-center px-[20px] gap-[20px]">

                                    <div className={" flex justify-end items-end w-full"}>
                                        <p  className={"text-[15px] font-[500] "}>{value}</p>
                                    </div>

                                </div>
                            )) : null}
                        </div>
                        <div className={"col-span-1"}>
                            {products[0]? Object.entries(products[0].specifications).map(([key], index) => (
                                <div key={index} className="h-[40px] w-full whitespace-nowrap bg-stone-100 rounded-full  pr-[10px] mt-[8px] items-center flex justify-center px-[20px] gap-[20px]">

                                    <div className={" flex justify-center items-center"}>
                                        <p  className={"text-[15px] font-[500] "}>{key}</p>
                                    </div>

                                </div>
                            )) : null}
                        </div>
                        <div className={"col-span-2"}>
                            {products[1]? Object.entries(products[1].specifications).map(([,value], index) => (
                                <div key={index} className="h-[40px] w-full whitespace-nowrap  pr-[10px] mt-[8px] items-center flex justify-center px-[20px] gap-[20px]">

                                    <div className={" flex justify-start items-start w-full"}>
                                        <p  className={"text-[15px] font-[500] "}>{value}</p>
                                    </div>

                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>


            }

        </div>
    )
}