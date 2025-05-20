'use client'
import { HiOutlineBars3, HiArrowLeft, HiArrowRight} from "react-icons/hi2";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import FeatureCategories from "@/app/components/feature_category";
import Product from "@/app/components/product";
import {ProductSale} from "@/app/components/product";
import {useState, useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {IProduct} from "@/app/types/product";
import {ICategory} from "@/app/types/ subCategory";
import Cookies from "js-cookie";
type Slide = {
    id: number;
    text: string;
    bgURL: string;
};


type OfficialShop = {
    id: number;
    name: string;
    image: string;
}

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transformSale, setTransformSale] = useState(0);
    const [transformOfficialShop, setTransformOfficialShop] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [trendingProducts, setTrendingProducts] = useState<IProduct[]>([]);
    const [flashSaleProducts, setFlashSaleProducts] = useState<IProduct[]>([]);
    const [category, setCategory] = useState<ICategory[]>([]);
    const router = useRouter();
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    const id = Cookies.get("id");
    useEffect(() => {

        if (token != null && role == "Shop") {
            router.push(`/seller/${id}`);
            return
        }
        async function GetProduct() {

            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/search`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        index: 0,
                        size:10,
                        isHome: true,

                    })
                })
                const data = await response.json();
                console.log(data.data);
                setTrendingProducts(data.data.items);

            } catch (error) {
                console.log(error)
            }
        }
        GetProduct();
        async function GetProductFlashSale() {

            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/search`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        index: 0,
                        size:8,
                        isFlashSale: true,
                        isHome: true,
                    })
                })
                const data = await response.json();
                console.log(data.data);
                setFlashSaleProducts(data.data.items);

            } catch (error) {
                console.log(error)
            }
        }
        GetProductFlashSale();

        async function GetCategoryFeature() {

            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/categories`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data = await response.json();
                console.log("Category",data.data);
                setCategory(data.data);

            } catch (error) {
                console.log(error)
            }
        }
        GetCategoryFeature();

    }, []);
    const slides: Slide[] = [
        { id: 1, text: 'Slide 1', bgURL: '/banner/slider-bg1.jpg' },
        { id: 2, text: 'Slide 2', bgURL: '/banner/slider-bg2.jpg' }
    ];
    const officialShops: OfficialShop[] = [
        { id: 1, name: "Apple", image: `/logo/apple.png` },
        { id: 2, name: "Samsung", image: `/logo/samsung.jpg` },
        { id: 3, name: "Sony", image: `/logo/sony.png` },
        { id: 4, name: "Lg", image: `/logo/lg.png` },
        { id: 5, name: "Microsoft", image: `/logo/ms.png` },
        { id: 6, name: "Dell", image: `/logo/dell.png` },
        { id: 7, name: "Hp", image: `/logo/hp.png` },
        { id: 8, name: "Lenovo", image: `/logo/lenovo.png` },
        { id: 9, name: "Asus", image: `/logo/asus.png` },
        { id: 10, name: "Acer", image: `/logo/acer.png` },
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);


    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    return (
        <div className="Home bg-gray-200  flex flex-col items-center">
            <div className="h-[60px] w-full bg-white border-b border-gray-300 flex flex-row items-center justify-center">
                <div className="flex flex-row 2xl:w-[1300px] xl:w-[1280px]  h-full">
                    <div className="flex flex-row w-[200px] h-full border-r border-gray-300 items-center relative"
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
                         }}>
                        <HiOutlineBars3 className="text-[18px] mb-[2px]" />
                        <p className={`font-sf text-cl-text text-[15px] ml-[10px] font-[500] select-none`}>Danh mục</p>
                        {isOpen?
                            (
                                <ul className={`bg-gray-50 absolute top-[62px] border border-gray-200 w-[200px] pl-[30px] pt-[10px] pb-[10px] text-cl-text z-30`}>
                                    <li onClick={()=> router.push("/categories")} className={`flex items-center w-full h-[35px] font-sf font-[400] text-[15px] hover:text-cl-hover-text `}>Smartphone</li>

                                    <li className={`flex items-center w-full h-[35px] font-sf font-[400] text-[15px] hover:text-cl-hover-text `}>Laptop</li>
                                    <li className={`flex items-center w-full h-[35px] font-sf font-[400] text-[15px] hover:text-cl-hover-text `}>Watch</li>
                                    <li className={`flex items-center w-full h-[35px] font-sf font-[400] text-[15px] hover:text-cl-hover-text `}>Television</li>
                                    <li className={`flex items-center w-full h-[35px] font-sf font-[400] text-[15px] hover:text-cl-hover-text `}>Video games</li>
                                    <li className={`flex items-center w-full h-[35px] font-sf font-[400] text-[15px] hover:text-cl-hover-text `}>Camera</li>
                                    <li className={`flex items-center w-full h-[35px] font-sf font-[400] text-[15px] hover:text-cl-hover-text `}>Headphone</li>

                                </ul>
                            ): null}

                    </div>
                    <div className=" w-[700px] flex flex-row text-cl-text">
                        <p className={`select-none flex items-center h-full font-sf font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Trang chủ</p>
                        <p className={`select-none flex items-center h-full font-sf font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Mã giảm giá</p>
                        <p className={`select-none flex items-center h-full font-sf font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Top Products</p>
                        <p onClick={()=> {
                            const role = Cookies.get("role");
                            const id = Cookies.get("id");
                            if (role == "shop") router.push(`/seller/${id}`);
                        }} className={`select-none flex items-center h-full font-sf font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Kênh người bán</p>

                    </div>

                    <ul className="ml-auto h-full flex flex-row text-cl-text items-center">
                        <li className={`select-none flex items-center h-full font-sf font-[500] text-[15px]  ml-[30px]`}>Contact us:</li>
                        <li className={`w-[35px] h-[35px] border border-gray-300 rounded-full flex items-center justify-center hover:bg-cl-button hover:text-cl-button-text transform duration-300 ml-[15px]`}>
                            <FaFacebookF className="text-[20px]" />
                        </li>
                        <li className={`w-[35px] h-[35px] border border-gray-300 rounded-full flex items-center justify-center hover:bg-cl-button hover:text-cl-button-text transform duration-300 ml-[10px]`}>
                            <FaInstagram className="text-[20px]"/>
                        </li>
                    </ul>
                </div>

            </div>
            {/*Banner*/}
            <div className="h-[500px] 2xl:w-[1300px] xl:w-[1280px]  mt-[15px]">
                <div className=" h-full grid grid-cols-3 gap-[20px] ">
                    <div className={`col-span-2 overflow-hidden relative`} >
                        <div
                            className=" h-full w-full flex transition-transform duration-500 "
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {slides.map((slide) => (
                                <div
                                    key={slide.id}
                                    className={`w-full h-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 relative`}
                                >
                                    <Image src={slide.bgURL} alt={"banner"} layout="fill" />
                                    {slide.text}
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={`col-span-1 grid grid-rows-2 gap-[20px]`}>
                        <div className={`flex flex-col col-span-1 relative justify-center `}>
                            <div className={`z-10 ml-[30px]`}>
                                <p className={`font-sf text-gray-500 text-[15px]`}>New line required</p>
                                <p className={`font-sf font-[600] text-cl-text text-[22px]`}>iPhone 12 Pro Max</p>
                                <p className={`font-sf-compact font-[700] text-cl-hover-text text-[22px]`}>$259.99</p>
                            </div>

                            <Image src={"/banner/slider-bnr.jpg"} alt={"banner"} layout={"fill"}  />
                        </div>
                        <div className={`col-span-1 border `}>

                        </div>
                    </div>
                </div>
            </div>
            {/*Banner*/}
            {/*Categories*/}
            <div className="2xl:w-[1300px] xl:w-[1280px]  items-center justify-center mt-[30px]  pt-[20px] p-[30px]">
                <div className={` flex flex-col `}>
                    <p className={`font-sf font-[400] text-[20px] text-cl-text`}>DANH MỤC</p>
                    {/*<div className={`border-b border-[2px] border-blue-600 w-[50px] mt-[4px]`}></div>*/}
                </div>
                <div className={`grid grid-cols-8 gap-[10px] w-full mt-[10px]`}>
                    {category.map((category) => (
                        <FeatureCategories category={category} key={category.categoryId}/>
                    ))}

                </div>
            </div>

            {/*Categories*/}
            {flashSaleProducts.length == 0 ? null :
            <div className={"2xl:w-[1300px] xl:w-[1280px] bg-white pb-[30px] pt-[20px] mt-[30px] flex flex-col "}>

                <div className={` 2xl:w-[1300px] xl:w-[1280px] relative  `}>
                    <div className={`h-[50px] w-full pr-[60px] pl-[30px] mb-[20px]  flex items-center justify-between`}>
                        <div className={`flex items-center`}>
                            <p className={`font-sf font-[400] text-[20px] text-cl-text mr-[20px]`}>FLASH SALE</p>
                            <div className={`w-[180px] h-[40px] flex border border-gray-200 rounded-[4px] pl-[25px] bg-white items-center`}>
                                <p className={`font-[500] font-sf text-[14px] text-gray-500`}>End in:</p>
                                <p className={`font-[500] font-sf text-[17px] text-gray-800 ml-[10px]`}>{formatTime(timeLeft)}</p>
                            </div>
                        </div>

                        <button className={`flex items-center text-gray-800 hover:text-blue-600`}>
                            <p className={`font-[400] font-sf text-[16px] `}>Xem tất cả</p>
                            <HiArrowRight className={`text-[20px] ml-[6px] mb-[1px]`}/>
                        </button>

                    </div>


                    <div className={`flex h-full w-full justify-center items-center  relative`}>
                        <button onClick={()=> {
                            if (transformSale >= 1)
                                setTransformSale(transformSale - 1)
                        }} className={`absolute left-[-20px] w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200 z-20`}>
                            <HiArrowLeft className={`text-[20px]`} />
                        </button>
                        <button onClick={()=> {
                            if (transformSale >= 0)
                                setTransformSale(transformSale + 1)
                        }} className={`absolute right-[-20px] w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200 z-20`}>
                            <HiArrowRight className={`text-[20px]`} />
                        </button>
                        <div className={` w-[calc(100%-60px)] relative overflow-hidden `}>
                            <div
                                className={`w-full grid gap-[10px] grid-cols-6 py-[10px] px-[5px] relative items-center transition-transform `}
                                style={{ transform: `translateX(-${transformSale * 50}%)` }}>

                                {flashSaleProducts.map((product) => (
                                    <ProductSale product={product} key={product.productId} />
                                ))}

                            </div>
                        </div>
                    </div>



                </div>
            </div>}
            {/*Flash Sale*/}

            {/*Flash Sale*/}
            {/*Trending*/}

            <div className="2xl:w-[1300px] xl:w-[1280px]  flex items-center justify-center mt-[30px] flex-col  pb-[30px] pt-[20px] px-[30px]">
                <div className="w-full flex items-center justify-center">
                    <div className={`w-full flex flex-col`}>
                        <p className={`font-sf font-[400] text-[20px] text-cl-text mr-[20px]`}>SẢN PHẨM ĐƯỢC YÊU THÍCH</p>
                        {/*<p className={`text-center font-sf font-[400] text-gray-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>*/}
                    </div>

                </div>
                <div className={`grid gap-[20px] grid-cols-5 w-full mt-[10px]`}>
                    {trendingProducts.map((product) => (
                        <Product product={product} key={product.productId} />
                    ))}

                </div>
            </div>
            
            {/*Trending*/}

            {/*<div className={`2xl:w-[1300px] xl:w-[1280px] h-[380px] bg-white mt-[30px] grid grid-cols-3 gap-[30px] mb-[50px] shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-[5px]`}>*/}
            {/*    <div className={`col-span-1 p-[30px] `}>*/}
            {/*        <div>*/}
            {/*            <p className={`font-sf font-[600] text-[18px] text-gray-800 ml-[6px]`}>Best sellers</p>*/}
            {/*            <div className={`flex`}>*/}
            {/*                <div className={`border-t border-blue-500 w-[110px] `}></div>*/}
            {/*                <div className={`flex-1 border-t border-gray-300`}></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={` h-[250px] flex flex-col justify-between mt-[20px]`}>*/}
            {/*            {products.slice(0,3).map((product) => (*/}
            {/*                <MiniProduct product={product} key={product.id} />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={`col-span-1 p-[30px]`}>*/}
            {/*        <div>*/}
            {/*            <p className={`font-sf text-[18px] font-[600] text-gray-800 ml-[6px]`}>New arrivals</p>*/}
            {/*            <div className={`flex`}>*/}
            {/*                <div className={`border-t border-blue-500 w-[120px] `}></div>*/}
            {/*                <div className={`flex-1 border-t border-gray-300`}></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={` h-[250px] flex flex-col justify-between mt-[20px]`}>*/}
            {/*            {products.slice(0,3).map((product) => (*/}
            {/*                <MiniProduct product={product} key={product.id} />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={`col-span-1 p-[30px]`}>*/}
            {/*        <div>*/}
            {/*            <p className={`font-sf text-[18px] font-[600] text-gray-800 ml-[6px]`}>Top rated</p>*/}
            {/*            <div className={`flex`}>*/}
            {/*                <div className={`border-t border-blue-500 w-[100px] `}></div>*/}
            {/*                <div className={`flex-1 border-t border-gray-300`}></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={` h-[250px] flex flex-col justify-between mt-[20px]`}>*/}
            {/*            {products.slice(0,3).map((product) => (*/}
            {/*                <MiniProduct product={product} key={product.id} />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*Mall*/}
            <div className="2xl:w-[1300px] xl:w-[1280px]  flex items-center justify-center mt-[50px]">
                <div className={`w-[600px] flex flex-col items-center`}>
                    <p className={`font-sf font-[500] text-[30px] text-cl-text`}>Shop chính hãng</p>
                    <div className={`border-b border-[2px] border-blue-600 w-[50px] mt-[4px]`}></div>
                    {/*<p className={`text-center font-sf font-[400] text-gray-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>*/}
                </div>
            </div>
            <div className={` 2xl:w-[1300px] xl:w-[1280px] mt-[30px] relative `}>
                <div className={`flex h-full w-full justify-center items-center  relative`}>
                    <button onClick={()=> {
                        if (transformOfficialShop >= 1)
                            setTransformOfficialShop(transformOfficialShop - 1)
                    }} className={`absolute left-0 w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200 z-20`}>
                        <HiArrowLeft className={`text-[20px]`} />
                    </button>
                    <button onClick={()=> {
                        if (transformOfficialShop >= 0)
                            setTransformOfficialShop(transformOfficialShop + 1)
                    }} className={`absolute right-0 w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200 z-20`}>
                        <HiArrowRight className={`text-[20px]`} />
                    </button>
                    <div className={` w-[calc(100%-100px)] h-[180px] flex relative overflow-hidden`}>
                        <div
                            className={`w-full p-[5px] flex items-center transition-transform  `}
                            style={{ transform: `translateX(-${transformOfficialShop * 50}%)` }}>

                            {officialShops.map((shop) => (
                                <button key ={shop.id} className={`w-[calc((100%-50px)/6)] mr-[10px] h-[100px]  pt-[10px] pb-[10px] pl-[30px] pr-[30px] box-border shadow flex justify-center items-center flex-shrink-0`}>
                                    <div className={`w-full h-full flex justify-center items-center relative`}>
                                        <Image src={shop.image} alt={"image"} layout="fill" objectFit="contain" />
                                    </div>


                                </button>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

            {/*Mall*/}
        </div>
  )
}
