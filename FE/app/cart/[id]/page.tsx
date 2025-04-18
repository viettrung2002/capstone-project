'use client'
import {useParams} from "next/navigation";
import Breadcrumb from "@/app/components/breadcrumb";
import Image from "next/image";
import {HiMiniMinus, HiMiniPlus} from "react-icons/hi2";


type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    shop_id: number;

}
export  default function Cart() {
    const {id} = useParams();
    const breadcrumbs = [
        {name: "Shop", href: "/categories" },
        {name: "2", href: "/categories" },
    ]

    const shops = [
        { id: 1, name: "Apple Official Store" },
        { id: 2, name: "Samsung Electronics" },
        { id: 3, name: "Xiaomi Flagship Store" }
    ];

    const products: Product[] = [
        // Shop 1: Apple (4 products)
        {
            id: 1,
            name: "iPhone 15 Pro 128GB",
            image: "/products/product-1.jpg",
            price: 38900,
            quantity: 10,
            shop_id: 1
        },
        {
            id: 2,
            name: "MacBook Air M2",
            image: "/products/product-2.jpg",
            price: 32900,
            quantity: 5,
            shop_id: 1
        },
        {
            id: 3,
            name: "AirPods Pro (2nd Gen)",
            image: "/products/product-3.jpg",
            price: 8900,
            quantity: 20,
            shop_id: 1
        },
        {
            id: 4,
            name: "Apple Watch Series 9",
            image: "/products/product-4.jpg",
            price: 14900,
            quantity: 8,
            shop_id: 1
        },

        // Shop 2: Samsung (3 products)
        {
            id: 5,
            name: "Galaxy S23 Ultra",
            image: "/products/product-5.jpg",
            price: 41900,
            quantity: 7,
            shop_id: 2
        },
        {
            id: 6,
            name: "Galaxy Tab S9",
            image: "/products/product-6.jpg",
            price: 25900,
            quantity: 4,
            shop_id: 2
        },
        {
            id: 7,
            name: "Galaxy Buds2 Pro",
            image: "/products/product-7.jpg",
            price: 6900,
            quantity: 15,
            shop_id: 2
        },

        // Shop 3: Xiaomi (3 products)
        {
            id: 8,
            name: "Xiaomi 13 Pro",
            image: "/products/product-8.jpg",
            price: 27900,
            quantity: 12,
            shop_id: 3
        },
        {
            id: 9,
            name: "Redmi Note 12 Pro",
            image: "/products/product-2.jpg",
            price: 9900,
            quantity: 25,
            shop_id: 3
        },
        {
            id: 10,
            name: "Xiaomi Pad 6",
            image: "/products/product-1.jpg",
            price: 12900,
            quantity: 6,
            shop_id: 3
        }
    ];


    return (
        <div className={"w-full flex justify-center flex-col items-center bg-gray-50"}>
            <div className={`2xl:w-[1300px] xl:w-full h-[40px] mt-[10px]  items-center flex mb-[20px]`}>
                <div className="flex items-center w-[250px] h-full  ">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
            </div>
            <div className={"w-[1300px] flex bg-white"}>
                <div className={"w-full h-[50px] border border-gray-200 grid grid-cols-25 px-[20px]"}>
                    <div className={"col-span-1 flex pl-[10px] items-center"}>
                        <div className={"h-[16px] w-[16px] border border-gray-200"}>

                        </div>
                    </div>
                    <div className={"col-span-10  flex items-center"}>
                        <p className={"font-sf text-gray-600 text-[15px]"}>Sản phẩm</p>
                    </div>
                    <div className={"col-span-5 flex items-center justify-center"}>
                        <p className={"font-sf text-gray-600 text-[15px]"}>Đơn giá</p>
                    </div>
                    <div className={"col-span-3 flex items-center justify-center"}>
                        <p className={"font-sf text-gray-600 text-[15px]"}>Số lượng</p>
                    </div>
                    <div className={"col-span-3  flex items-center justify-center"}>
                        <p className={"font-sf text-gray-600 text-[15px]"}>Số tiền</p>
                    </div>
                    <div className={"col-span-3  flex items-center justify-center"}>
                        <p className={"font-sf text-gray-600 text-[15px]"}>Thao tác</p>
                    </div>
                </div>

            </div>
            <div className={"w-[1300px] flex flex-col "}>
                {shops.map((shop) => (
                    <div key={shop.id} className={"w-full bg-white border border-gray-200 mt-[20px]"}>
                        <div className={"w-full h-[40px] border-b border-gray-200 grid grid-cols-25 px-[20px]"}>
                            <div className={"col-span-1 flex pl-[10px] items-center"}>
                                <div className={"h-[16px] w-[16px] border border-gray-200"}>

                                </div>
                            </div>
                            <div className={"col-span-10  flex items-center"}>
                                <p className={"col-span-10"}>{shop.name}</p>
                            </div>

                        </div>
                        <div className={"w-full px-[20px]"}>
                            {products.map((product) => (
                                product.shop_id === shop.id ? (
                                    <div key={product.id} className={"w-full border-b border-gray-200 grid grid-cols-25 py-[5px]"}>
                                        <div className={"col-span-1 flex pl-[10px] items-center"}>
                                            <div className={"h-[16px] w-[16px] border border-gray-200"}>

                                            </div>
                                        </div>
                                        <div className={"col-span-10 flex items-center"}>
                                            <div className={"relative w-[65px] h-[65px] border border-gray-200 mr-[10px]"}>
                                                <Image src={product.image} alt={"image"} fill={true}/>
                                            </div>
                                            <p className={"font-sf text-gray-600 text-[15px]"}>{product.name}</p>
                                        </div>
                                        <div className={"col-span-5 flex items-center justify-center"}>
                                            <p className={"font-sf text-gray-600 text-[15px]"}>{product.price}</p>
                                        </div>
                                        <div className={"col-span-3 flex items-center justify-center"}>
                                            <div className={"w-[110px] h-[30px]  flex"}>
                                                <button className={"h-[30px] w-[30px] border border-gray-200 flex justify-center items-center"}>
                                                    <HiMiniPlus/>
                                                </button>
                                                <input type={"number"} className={"w-[50px] h-full "} value={product.quantity} onChange={()=> }/>
                                                <button className={"h-[30px] w-[30px] border border-gray-200 flex justify-center items-center"}>
                                                    <HiMiniMinus/>
                                                </button>
                                            </div>

                                        </div>
                                        <div className={"col-span-3  flex items-center justify-center"}>
                                            <p className={"font-sf text-gray-600 text-[15px]"}>{product.price*product.quantity}</p>
                                        </div>
                                        <div className={"col-span-3  flex items-center justify-center"}>
                                            <p className={"font-sf text-gray-600 text-[15px]"}>Thao tác</p>
                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>

                    </div>

                ))}
            </div>

        </div>
    )
}
