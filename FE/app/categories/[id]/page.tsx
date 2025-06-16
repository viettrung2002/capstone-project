'use client'
import Breadcrumb from "@/app/components/breadcrumb";
import {useEffect, useState} from "react";
import {
    HiOutlineMagnifyingGlass,
    HiMiniMinus,
    HiChevronDown,
    HiMiniXMark,
    HiOutlineStar,
    HiStar,
    HiMiniArrowRight,
    HiChevronUp,
    HiChevronLeft,
    HiChevronRight, HiMiniEllipsisHorizontal,
} from "react-icons/hi2";
import { BiFilterAlt } from "react-icons/bi";
import Image from "next/image";
import {ProductInCategory} from "@/app/components/product";
import Cookies from "js-cookie";
import {IProduct} from "@/app/types/product";
import {SubCategory} from "@/app/types/ subCategory";
import {useParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {IShop} from "@/app/types/shop";
import {TbChevronLeft, TbChevronRight, TbMinus} from "react-icons/tb";
type SubCategoriesProps = {
    id: number;
    name: string;
};
type Location = {
    id: number;
    name: string;
};
type Brand = {
    id: number;
    name: string;
}
type Official_Store  = {
    id: number;
    name: string;
    avatar: string;
}

export default function Categories() {
    const {id} = useParams();
    const router = useRouter();
    const breadcrumbs = [
        {name: "Category", href: "/categories" },
    ]
    const [products, setProducts] = useState<(IProduct[])>([]);
    const [subCategories, setSubCategories] = useState<(SubCategory[])>([]);
    const [pageIndex, setPageIndex] = useState<number>(0);
    const pageSize = 16;
    const [productCount, setProductCount] = useState<number>(0);
    const [sortBy, setSortBy] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("00000000-0000-0000-0000-000000000000");
    const [rate, setRate] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number | string>("");
    const [maxPrice, setMaxPrice] = useState<number | string>("");
    const [isMall, setIsMall] = useState(false)
    const [officialShop, setOfficialShop] = useState<IShop[]>([]);
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
                        size:pageSize,
                        sortBy: sortBy,
                        keyWord: searchQuery,
                        categoryId: id,
                        subCategoryId: subCategoryId,
                        minPrice: Number(minPrice),
                        maxPrice: Number(maxPrice),
                        rating: rate,
                        shopType: isMall,
                    })
                })
                const data = await response.json();
                setProducts(data.data.items);
                setProductCount(data.data.count);
                console.log(data.data);
            } catch (error) {
                console.log(error)
            }
        }
        GetProduct();
    }, [pageIndex, pageSize, sortBy, searchQuery, subCategoryId,minPrice, maxPrice,rate,isMall]);
    useEffect(() => {
        async function GetCategory() {
            try {
                const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/category/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json();
                setCategoryName(data.data.categoryName);
                setSubCategories(data.data.subCategory);
                console.log("Category",data);
            } catch (err) {
                console.log(err)
            }
        }
        GetCategory();

        async function GetOfficialShop() {
            try {
                const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json();
                console.log("Shop",data);
                setOfficialShop(data.data);

            } catch (err) {
                console.log(err)
            }
        }
        GetOfficialShop()
    }, []);
    const locations : Location[] = [
        { id: 1, name: "Hà Nội" },
        { id: 2, name: "Hồ Chí Minh" },
        { id: 3, name: "Đà Nẵng" },
        { id: 4, name: "Hải Phòng" },
        { id: 5, name: "Cần Thơ" },
        { id: 6, name: "An Giang" },
        { id: 7, name: "Bà Rịa - Vũng Tàu" },
        { id: 8, name: "Bắc Giang" },
        { id: 9, name: "Bắc Kạn" },
        { id: 10, name: "Bạc Liêu" },
        { id: 11, name: "Bắc Ninh" },
        { id: 12, name: "Bến Tre" },
        { id: 13, name: "Bình Định" },
        { id: 14, name: "Bình Dương" },
        { id: 15, name: "Bình Phước" },
        { id: 16, name: "Bình Thuận" },
        { id: 17, name: "Cà Mau" },
        { id: 18, name: "Cao Bằng" },
        { id: 19, name: "Đắk Lắk" },
        { id: 20, name: "Đắk Nông" },
        { id: 21, name: "Điện Biên" },
        { id: 22, name: "Đồng Nai" },
        { id: 23, name: "Đồng Tháp" },
        { id: 24, name: "Gia Lai" },
        { id: 25, name: "Hà Giang" },
        { id: 26, name: "Hà Nam" },
        { id: 27, name: "Hà Tĩnh" },
        { id: 28, name: "Hải Dương" },
        { id: 29, name: "Hậu Giang" },
        { id: 30, name: "Hòa Bình" }
    ];
    const brands: Brand[] = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" },
        { id: 3, name: "Microsoft" },
        { id: 4, name: "Google" },
        { id: 5, name: "Intel" },
        { id: 6, name: "AMD" },
        { id: 7, name: "NVIDIA" },
        { id: 8, name: "Sony" },
        { id: 9, name: "Dell" },
        { id: 10, name: "HP" },
        { id: 11, name: "Lenovo" },
        { id: 12, name: "Asus" },
        { id: 13, name: "Acer" },
        { id: 14, name: "LG" },
        { id: 15, name: "Huawei" },
        { id: 16, name: "Xiaomi" },
        { id: 17, name: "OnePlus" },
        { id: 18, name: "Oppo" },
        { id: 19, name: "Vivo" },
        { id: 20, name: "Realme" },
        { id: 21, name: "Corsair" },
        { id: 22, name: "Razer" },
        { id: 23, name: "Logitech" },
        { id: 24, name: "SteelSeries" },
        { id: 25, name: "Philips" },
        { id: 26, name: "Panasonic" },
        { id: 27, name: "Toshiba" },
        { id: 28, name: "Seagate" },
        { id: 29, name: "Western Digital" },
        { id: 30, name: "Alienware" }
    ];


    const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const [locationFilter, setLocationFilter] = useState<number[]>([]);
    const [brandFilter, setBrandFilter] = useState<number[]>([]);
    const [showfullLocattion, setShowfullLocattion] = useState<number>(9);
    const [showFullBrand, setShowFullBrand] = useState(9);

    useEffect(() => {
        console.log(locationFilter);
    }, [locationFilter]);
    return (
        <div className={`flex items-center justify-center flex-col bg-white z-10 pt-[20px]`}>

            {/*<div className={`w-[1300px] h-[40px] mt-[10px] px-[10px] items-center flex `}>*/}
            {/*    <div className="flex items-center w-[250px] h-full  ">*/}
            {/*        <Breadcrumb breadcrumbs={breadcrumbs} />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*/!*Banner*!/*/}
            {/*<div>*/}
            {/*    Banner*/}
            {/*</div>*/}
            {/*Banner*/}

            {/*Product*/}
            <div className="flex gap-[20px] w-[1300px] ">
                <div className={`w-[calc(23%-15px)] flex flex-col`}>
                    {/*Search*/}
                    <div className="flex w-full p-[20px] px-[25px] pb-[25px] mt-[0px] flex-col border border-stone-200 rounded-[25px]">
                        <p className={`font-sf font-[600] text-[16px] text-stone-900 uppercase`}>Tìm kiếm sản phẩm</p>
                        <p className={"border-b w-full border-stone-300 mt-[5px]"}></p>
                        <div className={`w-full h-[40px] flex mt-[20px] bg-stone-200 items-center justify-between pr-[15px] rounded-[20px] overflow-hidden`}>
                            <input
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={"Tìm kiếm ở đây ..."}
                                className={`h-full w-[calc(100%-45px)] pl-[15px]  pr-[15px] focus:outline-none rounded-l-[4px] text-[15px] font-sf`}
                            />

                            <HiOutlineMagnifyingGlass />
                        </div>

                        <p className={"border-b w-full border-stone-300 mt-[20px] mb-[20px]"}></p>
                        <p onClick={()=>setSubCategoryId("00000000-0000-0000-0000-000000000000")} className={`font-sf font-[600] text-[16px] text-stone-900 uppercase`}>{categoryName}</p>
                        {/*<p className={"border-b w-full border-stone-300 mt-[5px] mb-[5px]"}></p>*/}
                        {
                            subCategories.map((subCategories) => (
                                <p onClick={()=>setSubCategoryId(subCategories.subCategoryId)} className={`font-sf font-[400] text-[15px] mt-[3px] text-stone-800 hover:text-amber-500 select-none`} key={subCategories.subCategoryId}>{subCategories.subCategoryName}</p>
                            ))
                        }
                        <p className={"border-b w-full border-stone-300 mt-[20px] mb-[20px]"}></p>
                        <p onClick={()=>setSubCategoryId("00000000-0000-0000-0000-000000000000")} className={`font-sf font-[600] text-[16px] text-stone-900 uppercase`}>Khoảng giá</p>
                        <div className={"  "}>
                            <div className={"grid grid-cols-7 h-[39px] font-sf mt-[10px]"}>
                                <input
                                    type={"text"}
                                    inputMode={"numeric"}
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className={"col-span-3 rounded-full px-[20px] border text-[15px]"}
                                    placeholder={"Từ"}
                                />
                                <div className={"col-span-1 flex justify-center items-center text-stone-500"}>
                                    <TbMinus/>
                                </div>
                                <input
                                    type={"text"}
                                    inputMode={"numeric"}
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className={"col-span-3 rounded-full px-[20px] border text-[15px]"}
                                    placeholder={"Đến"}
                                />
                            </div>


                        </div>

                        <button className={"w-full h-[39px] flex justify-center items-center text-[15px] bg-amber-600 text-white mt-[15px] rounded-full font-sf"}>
                            Áp Dụng
                        </button>
                        <p className={"border-b w-full border-stone-300 mt-[20px] mb-[20px]"}></p>
                        <p className={`font-sf font-[600] text-[16px] text-stone-900 uppercase`}>Đánh Giá</p>

                        <div className={"w-full grid grid-rows-5 gap-[10px] mt-[10px]"}>
                            <div className={`row-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(5);
                                }} className={"w-[18px] h-[18px] border-[1px] border-stone-300 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 5  ? (
                                        <div className={"w-[14px] h-[14px] bg-stone-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-stone-800 text-[15px] ml-[10px]"}>từ 5 sao</p>
                            </div>
                            <div className={`row-span-1 flex items-center `}>
                                <button onClick={()=> {

                                    setRate(4);
                                }} className={"w-[18px] h-[18px] border-[1px] border-stone-300  flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 4 ? (
                                        <div className={"w-[14px] h-[14px] bg-stone-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-stone-800 text-[15px] ml-[10px]"}>từ 4 sao</p>
                            </div>
                            <div className={`row-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(3);
                                }} className={"w-[18px] h-[18px] border-[1px] border-stone-300 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 3 ? (
                                        <div className={"w-[14px] h-[14px] bg-stone-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-stone-800 text-[15px] ml-[10px]"}>từ 3 sao</p>
                            </div>
                            <div className={`row-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(2);
                                }} className={"w-[18px] h-[18px] border-[1px] border-stone-300 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 2 ? (
                                        <div className={"w-[14px] h-[14px] bg-stone-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-stone-800 text-[15px] ml-[10px]"}>từ 2 sao</p>
                            </div>
                            <div className={`row-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(1);
                                }} className={"w-[18px] h-[18px] border-[1px] border-stone-300 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 1 ? (
                                        <div className={"w-[14px] h-[14px] bg-stone-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-stone-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-stone-800 text-[15px] ml-[10px]"}>từ 1 sao</p>
                            </div>
                        </div>
                        <p className={"border-b w-full border-stone-300 mt-[20px] mb-[20px]"}></p>
                        <p className={`font-sf font-[600] text-[16px] text-stone-900 uppercase`}>Nơi bán</p>
                        <div className={`grid grid-cols-1 gap-[10px] mt-[10px]`}>
                            {locations.slice(0,showfullLocattion).map((location) => (
                                <div className={"flex col-span-1 h-[25px] items-center text-stone-800 text-[15px] font-sf"} key={location.id}>
                                    <div className={`w-[18px] h-[18px] border border-stone-300 rounded-[4px]  flex justify-center items-center `}>
                                        <input type={'checkbox'} value={location.id}
                                               onChange={(e) => {
                                                   setLocationFilter((prev)=>
                                                       prev.includes(Number(e.target.value)) ? prev.filter((num)=> num != Number(e.target.value)) : [...prev, Number(e.target.value) ]
                                                   );
                                               }}
                                               className={"w-[9px] h-[9px] accent-stone-500 appearance-none  rounded-[2px] checked:bg-stone-500  peer-checked:block text-stone-50 "}/>
                                    </div>
                                    <p className={"ml-[7px]"}>{location.name}</p>
                                </div>
                            ))}
                        </div>
                        {/*<p className={`font-sf font-[600] text-[16px] text-stone-900 uppercase`}>shop chính hãng</p>*/}
                        {/*{*/}
                        {/*    officialShop.map((officialStore) => (*/}
                        {/*        <div key={officialStore.shopId} className={" col-span-1 overflow-hidden mt-[20px]  flex bg-white"}>*/}
                        {/*            <div className={"h-[85px] aspect-square bg-stone-200 relative p-[10px] rounded-[20px] "}>*/}
                        {/*                <div className={"relative w-[100%] h-[100%]"}>*/}
                        {/*                    <Image src={"/logo/dell.png"} alt={"logo"} fill={true}></Image>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <div className={"h-full flex flex-col justify-between pr-[12px] py-[5px]"}>*/}
                        {/*                <p className={"ml-[10px]  font-sf font-[600] text-[14px] text-stone-800 mt-[0px]"}>{officialStore.shopName}</p>*/}
                        {/*                <button onClick={()=> router.push(`/shop/${officialStore.shopId}`)} className={" ml-[10px] w-[90px] flex justify-center items-center hover:bg-amber-500 text-stone-50 py-[3px] bg-stone-600 font-sf rounded-full font-[500] text-[13px] "}>Xem thêm</button>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}

                        {/*    ))*/}
                        {/*}*/}
                    </div>

                </div>
                <div className={`w-[calc(77%-15px)] flex col-span-3 flex-col `}>
                    <div className="flex flex-col w-full mb-[20px] rounded-[25px]  bg-stone-200 px-[20px] py-[10px]">
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex items-center"}>
                                <p className={"text-stone-800 font-sf font-[500] text-[15px] mr-[15px]"}>Sắp xếp</p>
                                <button className={"h-[40px] rounded-full px-[20px] text-[15px] font-sf bg-white mr-[7px]"}>
                                    Phổ Biến
                                </button>
                                <button className={"h-[40px] rounded-full px-[20px] text-[15px] font-sf bg-white mr-[7px]"}>
                                    Mới Nhất
                                </button>
                                <button className={"h-[40px] rounded-full px-[20px] text-[15px] font-sf bg-white mr-[7px]"}>
                                    Đánh Giá
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
                                    }} className={"w-[160px] h-[40px] rounded-[4px] relative"}>
                                    <div className="flex flex-row w-full  h-full items-center justify-between px-[15px]  rounded-[20px] bg-white ">
                                        <p className={` text-stone-800 font-sf font-[400] text-[15px] mt-[1px]`}>Giá</p>
                                        <HiChevronDown />
                                    </div>
                                    {isOpen ? (
                                        <ul className={`absolute flex-col bg-stone-50 z-[50] top-[40px] w-full items-center shadow py-[5px] rounded-[4px] font-sf font-[400] text-[15px] overflow-hidden`}>
                                            <li onClick={()=> setSortBy("price_asc")} className={`flex text-stone-700 hover:bg-stone-600 hover:text-cl-button-text select-none text-center h-[30px] items-center  px-[10px]  `}>Giá thấp đến cao</li>
                                            <li onClick={()=> setSortBy("price_desc")} className={`flex text-stone-700 hover:bg-stone-600 hover:text-cl-button-text text-center h-[30px] items-center   px-[10px] select-none`}>Giá cao đến thấp</li>
                                        </ul>
                                    ) : null}

                                </div>
                            </div>
                            {/*<button onClick={()=> setShowModalFilter(true)} className={"w-[100px] h-[40px] rounded-[20px] flex border  border-stone-300 items-center justify-center bg-stone-500 hover:bg-stone-700"}>*/}
                            {/*    <BiFilterAlt className={"text-[20px] mr-[7px]  text-white"} />*/}
                            {/*    <p className={`  font-sf font-[400] text-[15px] mt-[1px]  text-white`}>Tất cả</p>*/}
                            {/*</button>*/}
                            <div className={"flex h-[40px] items-center"}>
                                <button className={"h-full w-[40px] rounded-full bg-white flex justify-center items-center mr-[7px]"}>
                                    <TbChevronLeft/>
                                </button>
                                <p className={"font-sf"}>1/2</p>
                                <button className={"h-full w-[40px] rounded-full bg-white flex justify-center items-center ml-[7px]"}>
                                    <TbChevronRight/>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className={`flex-1 grid grid-cols-4 gap-[20px]`}>
                        {products.map((product) => (<ProductInCategory product={product} key={product.productId} />))}
                    </div>

                    <div className={` h-[40px] flex items-center justify-center mt-[20px] mb-[30px]`}>
                        <button className={"flex w-[35px] h-[35px] border border-stone-300 rounded-full justify-center items-center text-stone-800 mr-[3px]"}>
                            <HiChevronLeft/>
                        </button>
                        {Math.ceil(productCount/pageSize) <= 5 ?
                            Array.from({length: Math.ceil(productCount/pageSize)},(_,i) => i ).map((page) =>
                                <div key={page}>
                                    <button onClick={()=> setPageIndex(page)} className={"flex w-[35px] h-[35px] border ml-[3px] mr-[3px] border-stone-300 rounded-full justify-center items-center text-stone-800 "}>
                                        <p className={"font-sf"}>{page}</p>
                                    </button>
                                </div>) :
                        <div className={"flex"}>
                        {
                            Array.from({length: 5},(_,i) => i + 1).map((page) =>
                                <div key={page}>
                                    <button className={"flex w-[35px] h-[35px] border ml-[3px] mr-[3px] border-stone-300 rounded-full justify-center items-center text-stone-800 "}>
                                        <p className={"font-sf"}>{page}</p>
                                    </button>
                                </div>)
                        }
                        <div className={" flex w-[35px] h-[35px] justify-center items-center text-stone-800"}>
                            <HiMiniEllipsisHorizontal/>
                        </div>
                        </div> }
                        <button className={"flex w-[35px] h-[35px] border border-stone-300 rounded-full justify-center items-center text-stone-800 ml-[3px]"}>
                            <HiChevronRight/>
                        </button>
                    </div>
                </div>
            </div>
            {/*Product*/}
            <div className={`${showModalFilter ? `visible bg-black/20` : `hidden`} flex justify-center items-center fixed w-screen h-screen z-30 flex-col `}>
                <div className={` lg:w-[600px] h-[50px]  w-full flex relative justify-center items-center text-stone-800 bg-stone-50 rounded-t-[8px] border-b border-stone-300`}>
                    <p className={` font-sf font-[500] text-[18px] mt-[0px]`}>Tất cả bộ lọc</p>
                    <HiMiniXMark onClick={()=> setShowModalFilter(false)} className={"absolute right-[15px] text-[23px] "}/>
                </div>
                <div className={`lg:w-[600px] h-8/10  pt-[10px] bg-stone-50  shadow-[0px_0px_20px_rgba(0,0,0,0.2)] overflow-y-auto`}>


                    <div className={`w-full flex flex-col px-[25px]`}>
                        {/*Danh gia*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Đánh giá</h1>
                        <div className={`grid grid-cols-3 gap-[10px] mt-[10px] `}>


                        </div>
                        <div className={"border-b border-stone-300 mt-[20px]"}></div>

                        {/*Khoang Gia*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Giá</h1>
                        <div className={`grid grid-cols-20 gap-x-[15px] gap-y-[10px] mt-[10px]`}>
                            <button onClick={()=>{
                                setMinPrice(0)
                                setMaxPrice(500000)
                            }} className={`h-[40px] col-span-5 flex items-center border hover:bg-stone-500 hover:text-stone-50 border-stone-300 justify-center rounded-full text-stone-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>Dưới 500.000</p>

                            </button>
                            <button onClick={()=>{
                                setMinPrice(500000)
                                setMaxPrice(5000000)
                            }} className={`h-[40px] col-span-7 flex items-center border hover:bg-stone-500 hover:text-stone-50 border-stone-300 justify-center rounded-full text-stone-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>500.000</p>
                                <HiMiniArrowRight className={"mr-1 ml-1"}/>
                                <p className={"font-sf text-[15px] mt-[2px]"}>5.000.000</p>
                            </button>
                            <button onClick={()=>{
                                setMinPrice(5000000)
                                setMaxPrice(10000000)
                            }} className={`h-[40px] col-span-8 flex items-center border hover:bg-stone-500 hover:text-stone-50 border-stone-300 justify-center rounded-full text-stone-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>5.000.000</p>
                                <HiMiniArrowRight className={"mr-1 ml-1"}/>
                                <p className={"font-sf text-[15px] mt-[2px]"}>10.000.000</p>
                            </button>
                            <button onClick={()=>{
                                setMinPrice(10000000);
                                setMaxPrice(10000000000)
                            }} className={`h-[40px] col-span-5 flex items-center border hover:bg-stone-500 hover:text-stone-50 border-stone-300 justify-center rounded-full text-stone-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>Trên 10.000.000</p>

                            </button>
                        </div>
                        <h1 className={` font-sf font-[500] text-[15px]  mt-[20px]`}>Tự chọn khoảng giá</h1>
                        <div className={`w-full h-[40px] grid grid-cols-20 mt-[20px] `}>
                            <div className={"col-span-7 h-full border border-stone-300 flex items-center rounded-[5px]"}>
                                <input
                                    type={'text'}
                                    value={minPrice}

                                    inputMode={'numeric'}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value)) {
                                            setMinPrice(e.target.value ? Number(e.target.value) : "")
                                        }
                                        }
                                    }
                                    onKeyDown={(e) => {
                                        if (!/[0-9.,]|Backspace|Delete|Arrow/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`px-[10px] w-8/10 rounded-[4px] font-sf text-stone-700 focus:outline-none`}
                                    placeholder={"Từ"}
                                />
                                <p className={"font-sf text-[15px] text-stone-500 border-l px-[5px] border-stone-300"}>VND</p>
                            </div>

                            <div className={"col-span-1 flex items-center text-stone-800 text-[14px] justify-center"}>
                                <HiMiniMinus />
                            </div>

                            <div className={"col-span-7 h-full border border-stone-300 flex items-center rounded-[5px]"}>
                                <input
                                    type={'text'}
                                    value={maxPrice}
                                    inputMode={'numeric'}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value)) {
                                            setMaxPrice(e.target.value ? Number(e.target.value) : "")
                                        }
                                    }
                                    }
                                    onKeyDown={(e) => {
                                        if (!/[0-9.,]|Backspace|Delete|Arrow/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`px-[10px] w-8/10 rounded-[4px] font-sf text-stone-700 focus:outline-none`}
                                    placeholder={"Đến"}
                                />
                                <p className={"font-sf text-[15px] text-stone-500 border-l px-[5px] border-stone-300"}>VND</p>
                            </div>


                        </div>
                        <div className={"border-b border-stone-300 mt-[20px]"}></div>
                        {/*----------Loại shop-----------*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Loại shop</h1>
                        <button onClick={()=> setIsMall(!isMall)} className={`${isMall ? "text-stone-50 bg-stone-500" : "text-stone-800 bg-stone-50" } h-[40px] w-[110px] font-sf  border-stone-300 flex justify-center items-center border rounded-full`}>
                            <p>Chính hãng</p>
                        </button>
                        {/*----------Nơi bán------------*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Nơi bán</h1>
                        <div className={`grid grid-cols-3 gap-[15px] mt-[10px]`}>
                            {locations.slice(0,showfullLocattion).map((location) => (
                                <div className={"flex col-span-1 h-[25px] items-center text-stone-800 text-[15px] font-sf"} key={location.id}>
                                    <div className={`w-[15px] h-[15px] border border-stone-300 rounded-[4px] bg-stone-100 flex justify-center items-center `}>
                                        <input type={'checkbox'} value={location.id}
                                               onChange={(e) => {
                                                   setLocationFilter((prev)=>
                                                       prev.includes(Number(e.target.value)) ? prev.filter((num)=> num != Number(e.target.value)) : [...prev, Number(e.target.value) ]
                                                   );
                                               }}
                                               className={"w-[9px] h-[9px] accent-stone-500 appearance-none  rounded-[2px] checked:bg-stone-500  peer-checked:block text-stone-50 "}/>
                                    </div>
                                    <p className={"ml-[7px]"}>{location.name}</p>
                                </div>
                            ))}
                        </div>
                        {showfullLocattion == 9 ?
                            (
                                <button onClick={()=> setShowfullLocattion(locations.length)} className={"text-stone-50 font-sf font-[300] flex justify-center items-center border w-[110px] py-[2px] rounded-full border-stone-300 bg-stone-500 px-[10px]  mt-[10px] hover:bg-stone-700 "}>
                                    <p className={"text-[15px] mr-[5px]"}>Xem thêm</p>
                                    <HiChevronDown />
                                </button>
                            ) :
                                (
                                    <button onClick={()=> setShowfullLocattion(9)} className={"text-stone-50 font-sf font-[300] flex justify-center items-center border w-[110px] py-[2px] rounded-full border-stone-300 bg-stone-500 px-[10px]  mt-[10px] hover:bg-stone-700 "}>
                                        <p className={"text-[15px] mr-[5px]"}>Thu gọn</p>
                                        <HiChevronUp />
                                    </button>
                                )}

                        <div className={"border-b border-stone-300 mt-[20px]"}></div>


                        {/*----------Thương hiệu------------*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Thương hiệu</h1>
                        <div className={`grid grid-cols-3 gap-[15px] mt-[10px]`}>
                            {brands.slice(0,showFullBrand).map((brand) => (
                                <div className={"flex col-span-1 h-[25px] items-center text-stone-800 text-[15px] font-sf"} key={brand.id}>
                                    <div className={`w-[15px] h-[15px] border border-stone-300 rounded-[4px] bg-stone-100 flex justify-center items-center `}>
                                        <input type={'checkbox'} value={brand.id}
                                               onChange={(e) => {
                                                   setBrandFilter((prev)=>
                                                       prev.includes(Number(e.target.value)) ? prev.filter((num)=> num != Number(e.target.value)) : [...prev, Number(e.target.value) ]
                                                   );
                                               }}
                                               className={"w-[9px] h-[9px] accent-stone-500 appearance-none  rounded-[2px] checked:bg-stone-500  peer-checked:block text-stone-50 "}/>
                                    </div>
                                    <p className={"ml-[7px]"}>{brand.name}</p>
                                </div>
                            ))}
                        </div>
                        {showFullBrand == 9 ?
                            (
                                <button onClick={()=> setShowFullBrand(brands.length)} className={"text-stone-50 mb-[20px] font-sf font-[300] flex justify-center items-center border w-[110px] py-[2px] rounded-full border-stone-300 bg-stone-500 px-[10px]  mt-[10px] hover:bg-stone-700 "}>
                                    <p className={"text-[15px] mr-[5px]"}>Xem thêm</p>
                                    <HiChevronDown />
                                </button>
                            ) :
                            (
                                <button onClick={()=> setShowFullBrand(9)} className={"text-stone-50 font-sf mb-[20px] font-[300] flex justify-center items-center border w-[110px] py-[2px] rounded-full border-stone-300 bg-stone-500 px-[10px]  mt-[10px] hover:bg-stone-700 "}>
                                    <p className={"text-[15px] mr-[5px]"}>Thu gọn</p>
                                    <HiChevronUp />
                                </button>
                            )}


                    </div>
                </div>
                <div className={` lg:w-[600px]   w-full flex relative justify-between items-center text-stone-800 bg-stone-50 rounded-b-[8px] border-t border-stone-300 px-[25px] py-[15px]`}>
                    <button className={`font-sf text-[16px] text-stone-800 hover:text-stone-50 bg-stone-50 hover:bg-stone-700 w-[110px] h-[40px] rounded-[5px] border border-stone-300`}>
                        <p>Xoá tất cả</p>
                    </button>
                    <button className={`font-sf text-[16px] text-stone-50 bg-stone-500 hover:bg-stone-700 w-[110px] h-[40px] rounded-[5px] border border-stone-300`}>
                        <p>Xem kết quả</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

