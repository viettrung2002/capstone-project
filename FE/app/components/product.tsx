import { HiOutlineStar, HiStar, HiOutlineShoppingCart } from "react-icons/hi2";
import Image from "next/image";
import {useState} from "react";
type Product = {
    id: number;
    category: string;
    name: string;
    image: string;
    star: number;
    price: number;
    discount: number;
}
export default function Product({product}: {product: Product}) {

    return (
        <div className={` col-span-1 aspect-[68/100] rounded-[5px] bg-white shadow p-[8px] `}>
            <div

                className={`bg-gray-50 group relative w-full aspect-square rounded-[4px] flex items-center justify-center p-[20px] hover:p-[0px] transition-all duration-200 ease-in-out overflow-hidden`}>
                <Image src={product.image} alt={"product_image"} width={1000} height={1000} className={"object-contain"}/>

                    <button className={`absolute w-[130px] h-[45px] hover:bg-gray-700 bg-blue-500 rounded-[4px] bottom-[30px] flex items-center justify-center transition-all duration-200 translate-y-[75px] opacity-0 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 `}>
                        <HiOutlineShoppingCart className={`text-cl-button-text text-[20px]`}/>
                        <p className={`ml-[5px] text-cl-button-text font-pop  `}>Add to cart</p>
                    </button>

                    {product.discount > 0 ? (
                    <div className={`absolute left-0 top-0 w-[50px] h-[30px] bg-red-500 text-gray-50 rounded-[4px] flex items-center justify-center`}>
                        <p className={`font-pop font-[500] text-[15px]`}>-{product.discount}%</p>
                    </div>) : null}


            </div>
            <div className={`pl-[20px] pt-[10px] flex flex-col justify-between`}>
                <p className={`font-pop text-[15px] text-gray-500 `}>{product.category}</p>
                <p className={`font-pop mt-[5px] text-cl-text text-[19px] font-[500] `}>{product.name}</p>
                <div className={`flex items-center h-[30px] `}>
                    {(product.star >= 1) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.star >= 2) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.star >= 3) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.star >= 4) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.star >= 5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    <p className={`font-pop text-gray-500 ml-[10px] `}>{product.star} Review</p>
                </div>

                {product.discount > 0 ? (
                    <div className={`flex items-center`}>
                        <p className={`font-pop text-cl-hover-text text-[18px] font-[600] `}>${product.price - product.price * product.discount / 100}  </p>
                        <div className={`relative ml-[10px]`}>
                            <p className={`font-pop text-gray-400 text-[16px] font-[400] ml-[0px]`}>${product.price}  </p>
                            <div className={`absolute w-full border-t border-gray-400 top-1/2 border-[1/2px]`}></div>
                        </div>
                    </div>
                ): (
                    <div className={`flex items-end`}>
                        <p className={`font-pop text-cl-hover-text text-[20px] font-[600] `}>${product.price }  </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export function ProductSale({product}: {product: Product}) {
    return(
        <div className={`col-span-1 aspect-[70/100] rounded-[4px] bg-white shadow p-[6px] relative `}>
            <div className={`bg-gray-50 group relative w-full aspect-square rounded-[3px] flex items-center justify-center p-[20px] hover:p-[0px] transition-all duration-200 ease-in-out overflow-hidden`}>
                <Image src={product.image} alt={"product_image"} width={1000} height={1000} className={"object-contain"}/>

                <button className={`absolute w-[40px] h-[40px] hover:bg-gray-700 bg-blue-500 rounded-full bottom-[20px] flex items-center justify-center transition-all duration-200 translate-y-[75px] opacity-0 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 `}>
                    <HiOutlineShoppingCart className={`text-cl-button-text text-[20px]`}/>
                </button>
                {product.discount > 0 ? (
                    <div className={`absolute left-0 top-0 w-[50px] h-[30px] bg-red-500 text-gray-50 rounded-[4px] flex items-center justify-center`}>
                        <p className={`font-pop font-[500] text-[15px]`}>-{product.discount}%</p>
                    </div>) : null}
            </div>
            <div className={` pt-[10px] flex flex-col justify-between items-center `}>
                <p className={`font-pop text-cl-text text-[14px] font-[500] `}>{product.name}</p>
                {product.discount > 0 ? (
                    <div className={`flex-col flex items-center`}>
                        <p className={`font-pop text-cl-hover-text text-[18px] font-[600] `}>${product.price - product.price * product.discount / 100}  </p>
                        <div className={`relative`}>
                            <p className={`font-pop text-gray-400 text-[15px] font-[400] ml-[0px]`}>${product.price}  </p>
                            <div className={`absolute w-full border-t border-gray-400 top-1/2 border-[1/2px]`}></div>
                        </div>
                    </div>
                ): (
                    <div className={`flex items-end`}>
                        <p className={`font-pop text-cl-hover-text text-[18px] font-[600] `}>${product.price }  </p>
                    </div>
                )}
            </div>

        </div>
    )
}

export function MiniProduct({product}: {product: Product}) {
    return(
        <div className={`w-full h-[70px] p-[0px] flex items-center hover:bg-gray-200 rounded-full group ease-in-out transition-colors duration-200 `}>
            <div className={`w-[60px] h-[60px]  rounded-full overflow-hidden ml-[6px]`}>
                <Image src={product.image} alt={"image"} width={1000} height={1000} className={"object-contain"}/>
            </div>
            <div className={`flex-1 h-[60px] flex flex-col justify-between ml-[20px] pt-[5px] pb-[5px] select-none`}>
                <p className={`font-pop text-[15px] group-hover:text-cl-hover-text`}>{product.name}</p>
                <p className={`font-pop text-[15px] text-gray-400`}>{product.price}$</p>
            </div>
        </div>
    )
}
