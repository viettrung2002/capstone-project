'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Breadcrumb from "@/app/components/breadcrumb";
import {HiChevronDown, HiStar} from "react-icons/hi2";
import { ProductInShop} from "@/app/components/product";
import { PiListBulletsBold } from "react-icons/pi";
import {SubCategory} from "@/app/types/ subCategory";
import {IShopInShop} from "@/app/types/shop";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {IProduct} from "@/app/types/product";


export default function Shop() {
    const {id}  = useParams()
    const breadcrumbs = [
        {name: "Shop", href: "/categories" },
        {name: "2", href: "/categories" },
    ]
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [openCateMore, setOpenCateMore] = useState<boolean>(false)
    const [catActive, setCateActive] = useState<string>("")
    const [selectedFilter, setSelectedFilter] = useState<string>("popular")
    const [categories, setCategories] = useState<SubCategory[]>([])
    const [shop, setShop] = useState<IShopInShop>()

    const [pageIndex, setPageIndex] = useState<number>(0);
    const pageSize = 16;
    const [sortBy, setSortBy] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("00000000-0000-0000-0000-000000000000");
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/shop/${id}`);

                const data = await response.json();
                console.log(data);
                setShop(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    },[])
    useEffect(() => {
        console.log(id)
        async function GetProduct() {
            const token = Cookies.get("token");
            console.log("Token:", token);
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/search`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        index: pageIndex,
                        shopId: id,
                        size:pageSize,
                        sortBy: sortBy,
                        keyWord: searchQuery,
                        subCategoryId: subCategoryId,
                        // minPrice: Number(minPrice),
                        // maxPrice: Number(maxPrice),
                        // rating: rate,
                        // shopType: isMall,
                    })
                })
                const data = await response.json();
                console.log(data.data.items);
                setProducts(data.data.items);
            } catch (error) {
                console.log(error)
            }
        }
        GetProduct();
    }, [pageIndex, pageSize, sortBy, searchQuery, subCategoryId]);
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
                                    <h1 className={"font-sf font-[500] text-[18px] text-gray-800"}>{shop?.shopName}</h1>
                                    <div className="flex items-center">
                                        <HiStar className={"text-yellow-500 leading-5  mr-[5px]"}/>
                                        <p className={"font-sf font-[400] text-[15px] text-gray-700  leading-5"}>{shop?.rating}/5</p>
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
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>{shop?.productCount}</p>
                                    </div>
                                    <div className={"row-span-1  flex items-center"}>
                                        <p className={"font-sf text-gray-800 text-[15px]"}>Đánh giá: </p>
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>{shop?.rating} ({shop?.ratingCount} đánh giá)</p>
                                    </div>
                                </div>
                                <div className=" h-full grid grid-rows-2 gap-[5px]">
                                    <div className={"row-span-1  flex items-center"}>
                                        <p className={"font-sf text-gray-800 text-[15px]"}>Người theo dõi: </p>
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>{shop?.follower}</p>
                                    </div>
                                    <div className={"row-span-1  flex items-center"}>
                                        <p className={"font-sf text-gray-800 text-[15px]"}>Tham gia: </p>
                                        <p className={"font-sf text-blue-500 text-[15px] ml-[5px]"}>{shop? new Date(shop.createdDate).toLocaleString("vi-VN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        }): null}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"h-[35px] w-full mt-[30px] grid grid-cols-6 gap-[15px]"}>
                            <div onClick={()=> setCateActive("")} className={`${catActive == "" ? "border-b border-blue-700" : null} col-span-1 justify-center items-center flex`}>
                                <p onClick={()=> setSubCategoryId("00000000-0000-0000-0000-000000000000")} className={"font-sf text-gray-800 text-[15px]"}>Tất cả</p>
                            </div>
                            {shop?
                                <div>
                                    {shop.categories.length == 5 ?
                                        shop.categories.slice(0,5).map(category => (

                                                <div key={category.subCategoryId} className={`${catActive == category.subCategoryId.toString()? "border-b border-blue-700" : null } col-span-1 justify-center items-center flex`} onClick={()=> {
                                                    setCateActive(category.subCategoryId.toString())
                                                    setSubCategoryId(category.subCategoryId)
                                                }}>
                                                    <p className={"font-sf text-gray-800 text-[15px] select-none"}>{category.subCategoryName}</p>
                                                </div>
                                            )
                                        ) : shop.categories.length > 5 ?

                                            shop.categories.slice(0,4).map((category) => (
                                                    <div key={category.subCategoryId} className={`${catActive == category.subCategoryId.toString()? "border-b border-blue-700" : null } col-span-1 justify-center items-center flex`} onClick={()=> {
                                                        setCateActive(category.subCategoryId.toString());
                                                        setSubCategoryId(category.subCategoryId)
                                                    }}>
                                                        <p className={"font-sf text-gray-800 text-[15px] select-none"}>{category.subCategoryName}</p>
                                                    </div>
                                                )
                                            ) :
                                            shop.categories.map((category) => (
                                                    <div key={category.subCategoryId} className={`${catActive == category.subCategoryId.toString()? "border-b border-blue-700" : null } col-span-1 justify-center items-center flex`} onClick={()=> {
                                                        setCateActive(category.subCategoryId.toString());
                                                        setSubCategoryId(category.subCategoryId)
                                                    }}>
                                                        <p className={"font-sf text-gray-800 text-[15px] select-none"}>{category.subCategoryName}</p>
                                                    </div>
                                                )
                                            )

                                    }
                                    {shop.categories.length > 5 ?
                                        <div onClick={()=> setOpenCateMore(!openCateMore)} className={"col-span-1 justify-center items-center flex relative"}>
                                            <p className={` text-gray-800 font-sf text-[15px] mr-[5px] select-none`}>Thêm</p>
                                            <HiChevronDown />
                                            {openCateMore ? (
                                                <ul className={`absolute flex-col bg-gray-50 top-[40px] w-full overflow-hidden items-center border border-gray-200 shadow rounded-[4px]`}>

                                                    {categories.slice(6,).map((category) => (
                                                        <li onClick={()=> {
                                                            setSubCategoryId(category.subCategoryId);
                                                        }} key={category.subCategoryId} className={`flex text-gray-800 hover:bg-gray-600 hover:text-cl-button-text font-sf text-[15px] select-none h-[30px] items-center justify-center `}>{category.subCategoryName}</li>
                                                    ))}

                                                </ul>
                                            ) : null }
                                        </div> : null}
                                </div> : null
                            }

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
                            <ProductInShop key={product.productId} product={product}/>
                        ))}
                    </div>
                </div>
                <div className={" w-full  mb-[30px]"}>
                    <p className={'font-sf text-gray-800 text-[16px] mt-[30px] mb-[10px]'}>SẢN PHẨM BÁN CHẠY</p>
                    <div className={"grid grid-cols-6 gap-[15px]"}>
                        {products.slice(4,10).map((product) => (
                            <ProductInShop key={product.productId} product={product}/>
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
                        {shop?.categories.map((category) => (
                            <p onClick={()=>setCateActive(category.subCategoryId.toString())} key={category.subCategoryId} className={`${catActive == category.subCategoryId.toString()  ? "text-blue-500 ml-[3px]":"text-gray-600 hover:text-blue-500 hover:ml-[3px] "} font-sf text-[15px]  select-none transition-all duration-200 leading-[25px]`}>{category.subCategoryName}</p>
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
                                        <li onClick={()=> setSortBy("price_asc")} className={`flex text-gray-700 font-sf text-[15px] hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center `}>Giá: Thấp đến Cao</li>
                                        <li onClick={()=> setSortBy("price_desc")} className={`flex text-gray-700 font-sf text-[15px] hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center `}>Giá: Cao đến Thấp</li>
                                    </ul>
                                ) : null}
                            </div>
                        </div>


                        {/*San pham*/}
                        <div className={"w-full grid grid-cols-5 gap-[15px] mt-[15px]"}>
                            {products.map((product) => (
                                <ProductInShop key={product.productId} product={product}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

