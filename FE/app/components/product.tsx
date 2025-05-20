import {HiOutlineStar, HiStar, HiOutlineShoppingCart, HiReceiptPercent, HiMiniArrowPath} from "react-icons/hi2";

import {TbEdit, TbTrash} from "react-icons/tb";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import type {IProduct} from "@/app/types/product";
import Cookies from "js-cookie";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

async function AddToCart( productId: string , router: AppRouterInstance ) {
    const token = Cookies.get("token");
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
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

export default function Product({product}: {product: IProduct}) {
    const router = useRouter();

    return (
        <div  className={` col-span-1 aspect-[68/100] border-gray-200 bg-white border p-[8px]`}>
            <div

                className={`bg-gray-50 group relative w-full aspect-square rounded-[4px] flex items-center justify-center p-[20px] hover:p-[0px] transition-all duration-200 ease-in-out overflow-hidden`}>
                <Image src={"/products/product-1.jpg"} alt={"product_image"} width={1000} height={1000} className={"object-contain"}/>

                    <button onClick={() => AddToCart(product.productId, router )}
                        className={`absolute w-[130px] h-[40px] hover:bg-gray-700 bg-blue-500 rounded-[4px] bottom-[30px] flex items-center justify-center transition-all duration-200 translate-y-[75px] opacity-0 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 `}>
                        <HiOutlineShoppingCart className={`text-cl-button-text text-[20px]`}/>
                        <p className={`ml-[5px] text-cl-button-text font-sf text-[15px] `}>Thêm vào giỏ</p>
                    </button>

                    {product.discount > 0 ? (
                    <div className={`absolute left-0 top-0 w-[50px] h-[30px] bg-red-500 text-gray-50 rounded-[4px] flex items-center justify-center`}>
                        <p className={`font-sf font-[500] text-[15px]`}>-{product.discount}%</p>
                    </div>) : null}
            </div>
            <div onClick={()=>router.push(`/product/${product.productId}`)} className={`pl-[10px] pt-[10px] flex flex-col justify-between`}>
                <p className={`font-sf text-[14px] text-gray-500 `}>{product.subCategoryName}</p>
                <p className={`font-sf text-cl-text text-[16px] font-[600] select-none hover:text-blue-500`}>{product.productName}</p>
                <div className={`flex items-center h-[20px] text-[14px]`}>
                    {(product.rating >= 1) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 2) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 3) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 4) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    <p className={`font-sf text-gray-500 ml-[10px] `}>{product.reviewCount} Review</p>
                </div>

                {product.discount > 0 ? (
                    <div className={`flex items-center`}>
                        <p className={`font-sf text-cl-hover-text text-[16px] font-[700] `}>${product.price - product.price * product.discount / 100}  </p>
                        <div className={`relative ml-[10px]`}>
                            <p className={`font-sf text-gray-400 text-[16px] font-[400] ml-[0px]`}>${product.price}  </p>
                            <div className={`absolute w-full border-t border-gray-400 top-1/2 `}></div>
                        </div>
                    </div>
                ): (
                    <div className={`flex items-end`}>
                        <p className={`font-sf text-cl-hover-text text-[18px] font-[700] `}>${product.price }  </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export function ProductSale({product}: {product: IProduct}) {
    const router = useRouter();
    return(

        <div onClick={()=>router.push(`/product/${product.productId}`)} className={`col-span-1 aspect-[70/100] rounded-[4px] bg-white border border-gray-200 p-[6px] relative `}>
            <div className={`bg-gray-50 group relative w-full aspect-square rounded-[3px] flex items-center justify-center p-[20px] hover:p-[0px] transition-all duration-200 ease-in-out overflow-hidden`}>
                <Image src={"/products/product-1.jpg"} alt={"product_image"} width={1000} height={1000} className={"object-contain"}/>

                <button onClick={() => AddToCart(product.productId, router )} className={`absolute w-[40px] h-[40px] hover:bg-gray-700 bg-blue-500 rounded-full bottom-[20px] flex items-center justify-center transition-all duration-200 translate-y-[75px] opacity-0 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 `}>
                    <HiOutlineShoppingCart className={`text-cl-button-text text-[20px]`}/>
                </button>
                {product.discount > 0 ? (
                    <div className={`absolute left-0 top-0 w-[50px] h-[30px] bg-red-500 text-gray-50 rounded-[4px] flex items-center justify-center`}>
                        <p className={`font-sf font-[500] text-[15px]`}>-{product.discount}%</p>
                    </div>) : null}
            </div>
            <div className={` pt-[10px] flex flex-col justify-between items-center `}>
                <p className={`font-sf text-cl-text text-[15px] font-[600] `}>{product.productName}</p>
                {product.discount > 0 ? (
                    <div className={`flex-col flex items-center`}>
                        <p className={`font-sf text-cl-hover-text text-[18px] font-[600] `}>${product.price - product.price * product.discount / 100}  </p>
                        <div className={`relative`}>
                            <p className={`font-sf text-gray-400 text-[15px] font-[400] ml-[0px]`}>${product.price}  </p>
                            <div className={`absolute w-full border-t border-gray-400 top-1/2 `}></div>
                        </div>
                    </div>
                ): (
                    <div className={`flex items-end`}>
                        <p className={`font-sf text-cl-hover-text text-[18px] font-[600] `}>${product.price }  </p>
                    </div>
                )}
            </div>

        </div>
    )
}

export function MiniProduct({product}: {product: IProduct}) {
    const router = useRouter();
    return(
        <div onClick={()=>router.push(`/product/${product.productId}`)} className={`w-full h-[70px] p-[0px] flex items-center hover:bg-gray-200 rounded-full group ease-in-out transition-colors duration-200 `}>
            <div className={`w-[60px] h-[60px]  rounded-full overflow-hidden ml-[6px]`}>
                <Image src={"/products/product-1.jpg"} alt={"image"} width={1000} height={1000} className={"object-contain"}/>
            </div>
            <div className={`flex-1 h-[60px] flex flex-col justify-between ml-[20px] pt-[5px] pb-[5px] select-none`}>
                <p className={`font-sf text-[15px] text-gray-800 group-hover:text-cl-hover-text`}>{product.productName}</p>
                <p className={`font-sf text-[15px] text-gray-400`}>{product.price}$</p>
            </div>
        </div>
    )
}

export function ProductInCategory({product}: {product: IProduct}) {
    const router = useRouter();
    return (
        <div  className={` col-span-1 aspect-[68/100] border border-gray-200 bg-white pb-[10px]  p-[7px] `}>
            <div

                className={`bg-gray-50 group relative w-full aspect-square rounded-[4px] flex items-center justify-center p-[20px] hover:p-[0px] transition-all duration-200 ease-in-out overflow-hidden`}>
                <Image src={"/products/product-1.jpg"} alt={"product_image"} width={1000} height={1000} className={"object-contain"}/>

                <button onClick={() => AddToCart(product.productId, router )} className={`absolute w-[130px] h-[40px] hover:bg-gray-700 bg-blue-500 rounded-[4px] bottom-[30px] flex items-center justify-center transition-all duration-200 translate-y-[75px] opacity-0 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 `}>
                    <HiOutlineShoppingCart className={`text-cl-button-text text-[20px]`}/>
                    <p className={`ml-[5px] text-cl-button-text font-sf text-[15px] `}>Thêm vào giỏ</p>
                </button>

                {product.discount > 0 ? (
                    <div className={`absolute left-0 top-0 w-[50px] h-[30px] bg-red-500 text-gray-50 rounded-[4px] flex items-center justify-center`}>
                        <p className={`font-sf font-[500] text-[15px]`}>-{product.discount}%</p>
                    </div>) : null}


            </div>
            <div onClick={()=>router.push(`/product/${product.productId}`)} className={`pl-[10px] pt-[10px] flex flex-col justify-between`}>
                <p className={`font-sf text-[14px] text-gray-500 `}>{product.subCategoryName}</p>
                <p className={`font-sf  text-cl-text text-[16px] font-[600] hover:text-blue-500 `}>{product.productName}</p>
                <div className={`flex items-center h-[20px] text-[13px]`}>
                    {(product.rating >= 1) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 2) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 3) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 4) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    <p className={`font-sf text-gray-500 ml-[10px] tex `}>{product.reviewCount} Review</p>
                </div>

                {product.discount > 0 ? (
                    <div className={`flex items-center`}>
                        <p className={`font-sf text-cl-hover-text text-[18px] font-[700] `}>${product.price - product.price * product.discount / 100}  </p>
                        <div className={`relative ml-[10px]`}>
                            <p className={`font-sf text-gray-400 text-[13px] font-[400] ml-[0px]`}>${product.price}  </p>
                            <div className={`absolute w-full border-t border-gray-400 top-1/2 `}></div>
                        </div>
                    </div>
                ): (
                    <div className={`flex items-end`}>
                        <p className={`font-sf text-cl-hover-text text-[18px] font-[700] `}>${product.price }  </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export function ProductR({product}: {product: IProduct}) {
    const router = useRouter();
    return (
        <div onClick={()=>router.push(`/product/${product.productId}`)} className={`row-span-1 border border-gray-200  p-[20px] flex hover:shadow-md`}>
            <div className={`h-full aspect-square  mr-[20px] relative`}>
                <Image src={"/products/product-1.jpg"} alt={"image"} fill={true}/>
            </div>
            <div className={`flex-1 `}>
                <div>
                    <p className={`font-sf mt-[5px] text-cl-text text-[16px] font-[500] `}>{product.productName}</p>
                    <div className={`flex items-center h-[20px] text-[15px] mb-[5px]`}>
                        {(product.rating >= 0.5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                        {(product.rating >= 1.5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                        {(product.rating >= 2.5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                        {(product.rating >= 3.5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                        {(product.rating >= 4.5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                        <p className={`font-sf text-gray-500 ml-[10px] text-[14px] `}>{product.reviewCount} Review</p>
                    </div>

                    {product.discount > 0 ? (
                        <div className={`flex items-center`}>
                            <p className={`font-sf text-cl-hover-text text-[18px] font-[600] `}>${product.price - product.price * product.discount / 100}  </p>
                            <div className={`relative ml-[10px]`}>
                                <p className={`font-sf text-gray-400 text-[16px] font-[400] ml-[0px]`}>${product.price}  </p>
                                <div className={`absolute w-full border-t border-gray-400 top-1/2 `}></div>
                            </div>
                        </div>
                    ): (
                        <div className={`flex items-end`}>
                            <p className={`font-sf text-cl-hover-text text-[20px] font-[600] `}>${product.price }  </p>
                        </div>
                    )}
                </div>
                <div className={`w-full h-[30px] flex mt-2`}>
                    <button className={`h-full aspect-square border border-gray-200 flex justify-center items-center hover:bg-gray-700 text-gray-700 hover:text-gray-50`}>
                        <HiMiniArrowPath className={``}/>
                    </button>
                    <button onClick={() => AddToCart(product.productId, router )} className={`h-full px-[10px] bg-blue-500 hover:bg-gray-700 ml-[10px] `}>
                        <p className={`font-sf text-[14px] text-gray-50`}>Thêm vào giỏ hàng</p>
                    </button>
                </div>

            </div>
        </div>
    )
}

export function ProductInShop({product}: {product: IProduct}) {
    const router = useRouter();
    return (
        <div onClick={()=>router.push(`/product/${product.productId}`)} className={` col-span-1 aspect-[68/100] rounded-[5px] bg-white border border-gray-200 p-[7px] `}>
            <div

                className={`bg-gray-50 group relative w-full aspect-square rounded-[4px] flex items-center justify-center p-[20px] hover:p-[0px] transition-all duration-200 ease-in-out overflow-hidden`}>
                <Image src={"/products/product-1.jpg"} alt={"product_image"} width={1000} height={1000} className={"object-contain"}/>

                <button onClick={() => AddToCart(product.productId, router )} className={`absolute w-[130px] h-[45px] hover:bg-gray-700 bg-blue-500 rounded-[4px] bottom-[30px] flex items-center justify-center transition-all duration-200 translate-y-[75px] opacity-0 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 `}>
                    <HiOutlineShoppingCart className={`text-cl-button-text text-[20px]`}/>
                    <p className={`ml-[5px] text-cl-button-text font-sf  `}>Add to cart</p>
                </button>

                {product.discount > 0 ? (
                    <div className={`absolute left-0 top-0 w-[50px] h-[25px] bg-red-500 text-gray-50 rounded-[4px] flex items-center justify-center`}>
                        <p className={`font-sf font-[500] text-[13px]`}>-{product.discount}%</p>
                    </div>) : null}


            </div>
            <div className={`pl-[10px] pt-[10px] flex flex-col justify-between`}>
                <p className={`font-sf text-[13px] text-gray-500 `}>{product.subCategoryName}</p>
                <p className={`font-sf mt-[3px] text-cl-text text-[15px] font-[600] line-clamp-1`}>{product.productName}</p>
                <div className={`flex items-center h-[20px] text-[12px] `}>
                    {(product.rating >= 1) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 2) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 3) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 4) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    {(product.rating >= 5) ? (<HiStar className={`text-yellow-400`}/>) : <HiOutlineStar className={`text-yellow-400`}/>}
                    <p className={`font-sf text-gray-500 ml-[10px] tex `}>{product.reviewCount} Review</p>
                </div>

                {product.discount > 0 ? (
                    <div className={`flex items-center`}>
                        <p className={`font-sf text-cl-hover-text text-[16px] font-[700] `}>${product.price - product.price * product.discount / 100}  </p>
                        <div className={`relative ml-[10px]`}>
                            <p className={`font-sf text-gray-400 text-[13px] font-[400] ml-[0px]`}>${product.price}  </p>
                            <div className={`absolute w-full border-t border-gray-400 top-1/2 `}></div>
                        </div>
                    </div>
                ): (
                    <div className={`flex items-end`}>
                        <p className={`font-sf text-cl-hover-text text-[16px] font-[700] `}>${product.price }  </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export function ProductInSeller ({product, onDelete}: {product: IProduct; onDelete: (id: string) => void}) {
    return (
        <div className={"col-span-1 h-[125px] bg-white box-content  flex rounded-[8px] shadow-md"}>
            <div className={"h-full aspect-square  p-[10px]"}>
                <div className={"w-full h-full flex items-center bg-gray-200 rounded-[5px] justify-center"}>

                </div>
            </div>
            <div className={"flex w-[calc(100%-125px)] flex-col  flex-1 font-sf  pr-[10px] py-[10px]"}>
                <p className={"h-[25px] w-full text-gray-800 text-[15px] font-[500] whitespace-nowrap overflow-ellipsis overflow-hidden"}>{product.productName}</p>
                <p className={"h-[25px] text-gray-900 font-[700]"}>{product.price}</p>
                <div className={"flex h-[20px]"}>
                    <p className={"text-[13px] text-gray-600 mr-[5px]"}>Còn lại:</p>
                    <p className={"text-[13px] text-gray-700"}>23 sản phẩm</p>
                </div>
                <div className={"h-[32px] w-full flex mt-[3px]"}>
                    <button className={"h-full aspect-square items-center justify-center flex bg-gray-200 text-gray-800 mr-[5px] rounded-full text-[18px]"}>
                        <TbEdit/>
                    </button>
                    <button onClick={()=> onDelete(product.productId)} className={"h-full aspect-square bg-gray-200 rounded-full items-center justify-center flex text-gray-800 text-[18px]"}>
                        <TbTrash/>
                    </button>
                </div>
            </div>

        </div>
    )
}

