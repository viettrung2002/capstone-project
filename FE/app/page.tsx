'use client'
import { HiOutlineBars3, HiArrowLeft, HiArrowRight} from "react-icons/hi2";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import FeatureCategories from "@/app/components/feature_category";
import Product from "@/app/components/product";
import {ProductSale} from "@/app/components/product";
import {useState, useEffect, useRef} from "react";
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
        <div className="Home bg-white flex flex-col items-center z-10 relative ">
            <div className={"w-full h-full fixed top-0 z-0"}>
                <Image src={"/banner.png"} alt={"banner"} fill={true} style={{objectFit: "fill"}}/>
            </div>

            <div className="h-screen w-full mt-[15px] flex flex-col justify-center z-20 font-sf pl-[100px] pb-[180px]">
                <p className={"font-[500] text-neutral-700 text-[17px] "}>BuyNow</p>
                <p className={" font-[800] text-[40px]"}>KHÁM PHÁ THẾ GIỚI CÔNG NGHỆ</p>
                <p className={"w-1/3 font-[400] text-neutral-700"}>
                    Trải nghiệm mua sắm sản phẩm công nghệ thông minh, nhanh chóng và đáng tin cậy. Khám phá ngay hàng ngàn lựa chọn chính hãng, cập nhật xu hướng công nghệ một cách dễ dàng và tận hưởng cuộc sống hiện đại hơn mỗi ngày!
                </p>
                <button
                    onClick={() => {
                        const section = document.getElementById("section-to-scroll");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className={"w-[150px] rounded-full py-[8px] bg-neutral-700 mt-[20px] text-neutral-50 hover:bg-amber-600"}>
                    KHÁM PHÁ NGAY
                </button>

            </div>
            {/*Banner*/}


            {/*Categories*/}
            <div id={"section-to-scroll"} className={"w-full z-10 bg-white flex flex-col items-center shadow-[0px_-40px_40px_rgba(0,0,0,0.2)] "}>
                <div className={"w-full z-10 bg-white flex justify-center scroll-m-0 h-screen snap-center"}>
                    <div className="2xl:w-[1300px] xl:w-[1000px]  items-center  justify-center mt-[30px]  ">
                        <div className={` flex flex-col justify-center items-center`}>
                            <p className={`font-sf font-[800] text-[35px] text-neutral-800`}>DANH MỤC SẢN PHẨM</p>
                            <p className={"font-sf font-[500] text-[14px] text-neutral-600 w-[600px] text-center"}>Tất cả sản phẩm công nghệ bạn cần, được phân loại rõ ràng để bạn dễ dàng lựa chọn với hàng ngàn lựa chọn hấp dẫn trong mỗi danh mục.</p>
                            <div className={`border-b border-blue-400 w-[70px] mt-[15px] mb-[15px]`}></div>
                        </div>
                        <div className={`grid grid-cols-4 2xl:gap-[30px] xl:gap-[20px] w-full mt-[10px]`}>
                            {category.map((category) => (
                                <FeatureCategories category={category} key={category.categoryId}/>
                            ))}

                        </div>
                    </div>
                </div>


                {/*Categories*/}
                {flashSaleProducts.length == 0 ? null :
                    <div className={"2xl:w-[1300px] xl:w-[1280px] bg-white pb-[30px] pt-[20px] mt-[30px] flex flex-col "}>

                        <div className={` 2xl:w-[1300px] xl:w-[1280px] relative  `}>
                            <div className={`h-[50px] w-full pr-[60px] pl-[30px] mb-[20px]  flex items-center justify-between`}>
                                <div className={`flex items-center`}>
                                    <p className={`font-sf font-[400] text-[20px] text-cl-text mr-[20px]`}>FLASH SALE</p>
                                    <div className={`w-[180px] h-[40px] flex border border-neutral-200 rounded-[4px] pl-[25px] bg-white items-center`}>
                                        <p className={`font-[500] font-sf text-[14px] text-neutral-500`}>End in:</p>
                                        <p className={`font-[500] font-sf text-[17px] text-neutral-800 ml-[10px]`}>{formatTime(timeLeft)}</p>
                                    </div>
                                </div>

                                <button className={`flex items-center text-neutral-800 hover:text-blue-600`}>
                                    <p className={`font-[400] font-sf text-[16px] `}>Xem tất cả</p>
                                    <HiArrowRight className={`text-[20px] ml-[6px] mb-[1px]`}/>
                                </button>

                            </div>


                            <div className={`flex h-full w-full justify-center items-center  relative`}>
                                <button onClick={()=> {
                                    if (transformSale >= 1)
                                        setTransformSale(transformSale - 1)
                                }} className={`absolute left-[-20px] w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-neutral-50 transition-all duration-200 z-20`}>
                                    <HiArrowLeft className={`text-[20px]`} />
                                </button>
                                <button onClick={()=> {
                                    if (transformSale >= 0)
                                        setTransformSale(transformSale + 1)
                                }} className={`absolute right-[-20px] w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-neutral-50 transition-all duration-200 z-20`}>
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

                <div className={"w-full bg-white flex items-center justify-center"}>
                    <div className="2xl:w-[1300px] xl:w-[1000px] h-screen flex items-center  mt-[30px] flex-col pt-[30px] ">
                        <div className="w-full flex items-center justify-center">
                            <div className={`w-full flex flex-col justify-center items-center`}>
                                <p className={`font-sf font-[800] text-[35px] text-neutral-800`}>SẢN PHẨM ĐƯỢC YÊU THÍCH</p>
                                <p className={"font-sf font-[500] text-[14px] text-neutral-600 w-[600px] text-center"}>Khám phá những sản phẩm công nghệ được yêu thích nhất hiện nay, với doanh số ấn tượng và đánh giá cao từ người dùng.</p>
                                <div className={`border-b  border-blue-400 w-[70px] mt-[15px] mb-[15px]`}></div>
                                {/*<p className={`text-center font-sf font-[400] text-neutral-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>*/}
                            </div>

                        </div>
                        <div className={`grid gap-[20px] grid-cols-5 w-full mt-[10px]`}>
                            {trendingProducts.map((product) => (
                                <Product product={product} key={product.productId} />
                            ))}

                        </div>
                    </div>
                </div>


                {/*Trending*/}

                {/*<div className={`2xl:w-[1300px] xl:w-[1280px] h-[380px] bg-white mt-[30px] grid grid-cols-3 gap-[30px] mb-[50px] shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-[5px]`}>*/}
                {/*    <div className={`col-span-1 p-[30px] `}>*/}
                {/*        <div>*/}
                {/*            <p className={`font-sf font-[600] text-[18px] text-neutral-800 ml-[6px]`}>Best sellers</p>*/}
                {/*            <div className={`flex`}>*/}
                {/*                <div className={`border-t border-blue-500 w-[110px] `}></div>*/}
                {/*                <div className={`flex-1 border-t border-neutral-300`}></div>*/}
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
                {/*            <p className={`font-sf text-[18px] font-[600] text-neutral-800 ml-[6px]`}>New arrivals</p>*/}
                {/*            <div className={`flex`}>*/}
                {/*                <div className={`border-t border-blue-500 w-[120px] `}></div>*/}
                {/*                <div className={`flex-1 border-t border-neutral-300`}></div>*/}
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
                {/*            <p className={`font-sf text-[18px] font-[600] text-neutral-800 ml-[6px]`}>Top rated</p>*/}
                {/*            <div className={`flex`}>*/}
                {/*                <div className={`border-t border-blue-500 w-[100px] `}></div>*/}
                {/*                <div className={`flex-1 border-t border-neutral-300`}></div>*/}
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
                        {/*<p className={`text-center font-sf font-[400] text-neutral-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>*/}
                    </div>
                </div>
                <div className={` 2xl:w-[1300px] xl:w-[1280px] mt-[30px] relative `}>
                    <div className={`flex h-full w-full justify-center items-center  relative`}>
                        <button onClick={()=> {
                            if (transformOfficialShop >= 1)
                                setTransformOfficialShop(transformOfficialShop - 1)
                        }} className={`absolute left-0 w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-neutral-50 transition-all duration-200 z-20`}>
                            <HiArrowLeft className={`text-[20px]`} />
                        </button>
                        <button onClick={()=> {
                            if (transformOfficialShop >= 0)
                                setTransformOfficialShop(transformOfficialShop + 1)
                        }} className={`absolute right-0 w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-neutral-50 transition-all duration-200 z-20`}>
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
                <div className={"h-screen w-full bg-neutral-300 flex items-center justify-center "}>

                    <p className={"text-neutral-800 font-sf font-[600] hover:text-amber-500"}>TRANG CHU</p>
                    <div className={"w-[300px] h-[500px] bg-neutral-600 flex"}>

                    </div>
                </div>
            </div>



            {/*Mall*/}
        </div>
  )
}
