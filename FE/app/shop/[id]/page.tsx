'use client'
import {useParams} from "next/navigation";
import {useState} from "react";
import Breadcrumb from "@/app/components/breadcrumb";
import {HiChevronDown, HiStar} from "react-icons/hi2";
import { ProductInShop} from "@/app/components/product";
import { PiListBulletsBold } from "react-icons/pi";

type Product = {
    id: number;
    category: string;
    name: string;
    image: string;
    star: number;
    price: number;
    discount: number;
}
export default function Shop() {
    const {id}  = useParams()
    const breadcrumbs = [
        {name: "Shop", href: "/categories" },
        {name: "2", href: "/categories" },
    ]
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [openCateMore, setOpenCateMore] = useState<boolean>(false)
    const [catActive, setCateActive] = useState<string>("")
    const [selectedFilter, setSelectedFilter] = useState<string>("popular")
    const categories = [
        { id: "1", name: "Điện thoại di động" },
        { id: 2, name: "Máy tính bảng" },
        { id: 3, name: "Laptop" },
        { id: 4, name: "Máy tính để bàn" },
        { id: 5, name: "Smartwatch" },
        { id: 6, name: "Tai nghe" },
        { id: 7, name: "Loa" },
        { id: 8, name: "Thiết bị mạng" },
        { id: 9, name: "Ổ cứng" },
        { id: 10, name: "Thiết bị chơi game" }
    ];
    const products: Product[] = [
        {
            id: 1,
            category: "Watches",
            name: "Xiaomi Mi Band 5",
            image: `/products/product-1.jpg`,
            star: 4.0,
            price: 199.0,
            discount: 0
        },
        {
            id: 2,
            category: "Speaker",
            name: "Big Power Sound Speaker",
            image: `/products/product-2.jpg`,
            star: 5.0,
            price: 275.0,
            discount: 0
        },
        {
            id: 3,
            category: "Camera",
            name: "WiFi Security Camera",
            image: `/products/product-3.jpg`,
            star: 5.0,
            price: 399.0,
            discount: 30
        },
        {
            id: 4,
            category: "Phones",
            name: "iPhone 6x Plus",
            image: `/products/product-4.jpg`,
            star: 5.0,
            price: 400.0,
            discount: 0
        },
        {
            id: 5,
            category: "Headphones",
            name: "Wireless Headphones",
            image: `/products/product-5.jpg`,
            star: 5.0,
            price: 350.0,
            discount:50
        },
        {
            id: 6,
            category: "Speaker",
            name: "Mini Bluetooth Speaker",
            image: `/products/product-6.jpg`,
            star: 4.0,
            price: 70.0,
            discount: 0
        },
        {
            id: 7,
            category: "Headphones",
            name: "PX7 Wireless Headphones",
            image: `/products/product-7.jpg`,
            star: 4.0,
            price: 100.0,
            discount:20
        },
        {
            id: 8,
            category: "Laptop",
            name: "Apple MacBook Air",
            image: `/products/product-8.jpg`,
            star: 5.0,
            price: 899.0,
            discount: 15
        },
        {
            id: 9,
            category: "Watches",
            name: "Xiaomi Mi Band 5",
            image: `/products/product-1.jpg`,
            star: 4.0,
            price: 199.0,
            discount: 0
        },
        {
            id: 10,
            category: "Speaker",
            name: "Big Power Sound Speaker",
            image: `/products/product-2.jpg`,
            star: 5.0,
            price: 275.0,
            discount: 0
        },
        {
            id: 11,
            category: "Camera",
            name: "WiFi Security Camera",
            image: `/products/product-3.jpg`,
            star: 5.0,
            price: 399.0,
            discount: 30
        },
        {
            id: 12,
            category: "Phones",
            name: "iPhone 6x Plus",
            image: `/products/product-4.jpg`,
            star: 5.0,
            price: 400.0,
            discount: 0
        },
        {
            id: 13,
            category: "Headphones",
            name: "Wireless Headphones",
            image: `/products/product-5.jpg`,
            star: 5.0,
            price: 350.0,
            discount:50
        },
        {
            id: 14,
            category: "Speaker",
            name: "Mini Bluetooth Speaker",
            image: `/products/product-6.jpg`,
            star: 4.0,
            price: 70.0,
            discount: 0
        },
        {
            id: 15,
            category: "Headphones",
            name: "PX7 Wireless Headphones",
            image: `/products/product-7.jpg`,
            star: 4.0,
            price: 100.0,
            discount:20
        },
        {
            id: 16,
            category: "Laptop",
            name: "Apple MacBook Air",
            image: `/products/product-8.jpg`,
            star: 5.0,
            price: 899.0,
            discount: 15
        },
        {
            id: 17,
            category: "Watches",
            name: "Xiaomi Mi Band 5",
            image: `/products/product-1.jpg`,
            star: 4.0,
            price: 199.0,
            discount: 0
        },
        {
            id: 18,
            category: "Speaker",
            name: "Big Power Sound Speaker",
            image: `/products/product-2.jpg`,
            star: 5.0,
            price: 275.0,
            discount: 0
        },
        {
            id: 19,
            category: "Camera",
            name: "WiFi Security Camera",
            image: `/products/product-3.jpg`,
            star: 5.0,
            price: 399.0,
            discount: 30
        },
        {
            id: 20,
            category: "Phones",
            name: "iPhone 6x Plus",
            image: `/products/product-4.jpg`,
            star: 5.0,
            price: 400.0,
            discount: 0
        },
        {
            id: 21,
            category: "Headphones",
            name: "Wireless Headphones",
            image: `/products/product-5.jpg`,
            star: 5.0,
            price: 350.0,
            discount:50
        },
        {
            id: 22,
            category: "Speaker",
            name: "Mini Bluetooth Speaker",
            image: `/products/product-6.jpg`,
            star: 4.0,
            price: 70.0,
            discount: 0
        },
        {
            id: 23,
            category: "Headphones",
            name: "PX7 Wireless Headphones",
            image: `/products/product-7.jpg`,
            star: 4.0,
            price: 100.0,
            discount:20
        },
        {
            id: 24,
            category: "Laptop",
            name: "Apple MacBook Air",
            image: `/products/product-8.jpg`,
            star: 5.0,
            price: 899.0,
            discount: 15
        },
    ];
    return (
        <div className="w-full flex  flex-col items-center">
            <div className={`2xl:w-[1300px] xl:w-full h-[40px] mt-[10px]  items-center flex mb-[20px]`}>
                <div className="flex items-center w-[250px] h-full  ">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
            </div>
            <div className={"w-full mb-[20px]"}>
                <div className={"w-full  bg-white flex justify-center "}>
                    <div className={"w-[1300px]  h-full border border-gray-200 flex pt-[30px] px-[30px] flex-col "}>
                        <div className="flex h-[70px] w-full">
                            <div className=" h-full flex items-center">
                                {/*Hinh anh dai dien shop*/}
                                <div className="h-full aspect-square rounded-full bg-gray-200">

                                </div>
                                {/*Ten shop*/}
                                <div className="px-[20px]">
                                    <h1 className={"font-sf font-[500] text-[18px] text-gray-800"}>Apple official store</h1>
                                    <div className="flex items-center">
                                        <HiStar className={"text-yellow-500 leading-5  mr-[5px]"}/>
                                        <p className={"font-sf font-[400] text-[15px] text-gray-700  leading-5"}>4.5/5</p>
                                    </div>

                                </div>
                                <div className="flex px-[20px] border-l border-gray-200">
                                    <button className={'px-[15px] flex  justify-center items-center py-[5px] bg-blue-500 rounded-[10px] text-gray-50  hover:bg-gray-700'}>
                                        <p className={"font-sf text-[15px]"}>Theo dõi</p>
                                    </button>
                                </div>


                            </div>
                            <div className=" h-[70px] border-l border-gray-300 flex px-[30px]">
                                <div className="w-[220px] h-full grid grid-rows-2 gap-[5px]">
                                    <div className={"row-span-1  flex items-center"}>
                                        <p className={"font-sf text-gray-800 text-[15px]"}>Sản phẩm: </p>
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>3400</p>
                                    </div>
                                    <div className={"row-span-1  flex items-center"}>
                                        <p className={"font-sf text-gray-800 text-[15px]"}>Đánh giá: </p>
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>4.8 (12120 đánh giá)</p>
                                    </div>
                                </div>
                                <div className="w-[160px] h-full grid grid-rows-2 gap-[5px]">
                                    <div className={"row-span-1  flex items-center"}>
                                        <p className={"font-sf text-gray-800 text-[15px]"}>Người theo dõi: </p>
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>5300</p>
                                    </div>
                                    <div className={"row-span-1  flex items-center"}>
                                        <p className={"font-sf text-gray-800 text-[15px]"}>Tham gia: </p>
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>1 năm trước</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"h-[35px] w-full mt-[30px] grid grid-cols-6 gap-[15px]"}>
                            <div onClick={()=> setCateActive("")} className={`${catActive == "" ? "border-b border-blue-700" : null} col-span-1 justify-center items-center flex`}>
                                <p className={"font-sf text-gray-800 text-[15px]"}>Tất cả</p>
                            </div>
                            {categories.length == 5 ?
                                categories.slice(0,5).map(category => (

                                    <div key={category.id} className={`${catActive == category.id.toString()? "border-b border-blue-700" : null } col-span-1 justify-center items-center flex`} onClick={()=> setCateActive(category.id.toString())}>
                                        <p className={"font-sf text-gray-800 text-[15px] select-none"}>{category.name}</p>
                                    </div>
                                    )
                                ) : categories.length > 5 ?

                                categories.slice(0,4).map((category) => (
                                    <div key={category.id} className={`${catActive == category.id.toString()? "border-b border-blue-700" : null } col-span-1 justify-center items-center flex`} onClick={()=> setCateActive(category.id.toString())}>
                                        <p className={"font-sf text-gray-800 text-[15px] select-none"}>{category.name}</p>
                                    </div>
                                    )
                                ) :
                                    categories.map((category) => (
                                        <div key={category.id} className={`${catActive == category.id.toString()? "border-b border-blue-700" : null } col-span-1 justify-center items-center flex`} onClick={()=> setCateActive(category.id.toString())}>
                                            <p className={"font-sf text-gray-800 text-[15px] select-none"}>{category.name}</p>
                                        </div>
                                        )
                                    )

                            }
                            {categories.length > 5 ?
                            <div onClick={()=> setOpenCateMore(!openCateMore)} className={"col-span-1 justify-center items-center flex relative"}>
                                <p className={` text-gray-800 font-sf text-[15px] mr-[5px] select-none`}>Thêm</p>
                                <HiChevronDown />
                                {openCateMore ? (
                                    <ul className={`absolute flex-col bg-gray-50 top-[40px] w-full overflow-hidden items-center border border-gray-200 shadow rounded-[4px]`}>

                                        {categories.slice(6,).map((category) => (
                                            <li key={category.id} className={`flex text-gray-800 hover:bg-gray-600 hover:text-cl-button-text font-sf text-[15px] select-none h-[30px] items-center justify-center `}>{category.name}</li>
                                        ))}

                                    </ul>
                                    ) : null }
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>

            {/*San pham*/}
            <div className={"w-[1300px] "}>
                <div className={" w-full"}>
                    <p className={'font-sf text-gray-800 text-[16px] mb-[10px] mt-[20px]'}>SẢN PHẨM MỚI</p>
                    <div className={"grid grid-cols-6 gap-[15px]"}>
                        {products.slice(0,6).map((product) => (
                            <ProductInShop key={product.id} product={product}/>
                        ))}
                    </div>
                </div>
                <div className={" w-full  mb-[30px]"}>
                    <p className={'font-sf text-gray-800 text-[16px] mt-[30px] mb-[10px]'}>SẢN PHẨM BÁN CHẠY</p>
                    <div className={"grid grid-cols-6 gap-[15px]"}>
                        {products.slice(4,10).map((product) => (
                            <ProductInShop key={product.id} product={product}/>
                        ))}
                    </div>
                </div>

                <div className={"w-full grid grid-cols-5 gap-[30px]"}>
                    <div className={"col-span-1 "}>
                        <div className={"flex items-center"}>
                            <PiListBulletsBold className={"leading-0 mr-[5px]"}/>
                            <p className={"text-gray-800 font-sf text-[17px] font-[500] leading-0 "}>Danh mục</p>

                        </div>

                        <div className={"border-b border-gray-200 mt-[10px] mb-[20px]"}></div>
                        {categories.map((category) => (
                            <p onClick={()=>setCateActive(category.id.toString())} key={category.id} className={`${catActive == category.id.toString()  ? "text-blue-500 ml-[3px]":"text-gray-600 hover:text-blue-500 hover:ml-[3px] "} font-sf text-[15px]  select-none transition-all duration-200 leading-[25px]`}>{category.name}</p>
                        ))}
                    </div>
                    <div className={"col-span-4 "}>
                        <div className={"h-[60px] w-full bg-gray-200 flex items-center px-[20px]"}>
                            <p className={"font-sf text-[15px] text-gray-600"} >Sắp xếp theo:</p>
                            <button onClick={()=> setSelectedFilter("popular")} className={`${selectedFilter == "popular" ? "bg-blue-500 text-gray-50" : "bg-white text-gray-800"} ml-[15px]  flex  px-[15px] py-[5px] justify-center  items-center  `}>
                                <p className={"font-sf text-[15px] "}>Phổ biến</p>
                            </button>
                            <button onClick={()=> setSelectedFilter("newest")} className={`${selectedFilter == "newest" ? "bg-blue-500 text-gray-50" : "bg-white text-gray-800"} ml-[15px] flex  px-[15px] py-[5px] justify-center  items-center  `}>
                                <p className={"font-sf text-[15px] "}>Mới nhất</p>
                            </button>
                            <button onClick={()=> setSelectedFilter("best_selling")} className={`${selectedFilter == "best_selling" ? "bg-blue-500 text-gray-50" : "bg-white text-gray-800"} ml-[15px] flex  px-[15px] py-[5px] justify-center  items-center  `}>
                                <p className={"font-sf text-[15px] "}>Bán chạy</p>
                            </button>
                            <div
                                onMouseLeave={() => {
                                    const id = setTimeout(() => {
                                        setIsOpen(false);
                                    }, 200); //

                                    setTimeoutId(id);
                                }}
                                onMouseEnter={() => {
                                    if (timeoutId) {
                                        clearTimeout(timeoutId);
                                    }
                                    setIsOpen(true);
                                }}
                                className="flex flex-col z-50 bg-gray-50 w-[150px] items-center relative font-sf font-regular ml-[20px]">
                                <div className="flex flex-row w-full h-full items-center justify-between p-[5px]  bg-white px-[20px]">
                                    <p className={` text-gray-800 font-sf text-[15px]`}>Giá</p>
                                    <HiChevronDown />
                                </div>

                                {isOpen ? (
                                    <ul className={`absolute w-full flex-col bg-gray-50 top-[35px]  items-center border border-gray-200 `}>
                                        <li className={`flex text-gray-700 font-sf text-[15px] hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center `}>Giá: Thấp đến Cao</li>
                                        <li className={`flex text-gray-700 font-sf text-[15px] hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center `}>Giá: Cao đến Thấp</li>
                                    </ul>
                                ) : null}
                            </div>
                        </div>


                        {/*San pham*/}
                        <div className={"w-full grid grid-cols-5 gap-[15px] mt-[15px]"}>
                            {products.map((product) => (
                                <ProductInShop key={product.id} product={product}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

