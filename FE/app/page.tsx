'use client'
import { HiOutlineBars3, HiArrowLeft, HiArrowRight} from "react-icons/hi2";
import { CiFacebook } from "react-icons/ci";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import FeatureCategories from "@/app/components/FeatureCategory";
import Product from "@/app/components/product";
import {ProductSale, MiniProduct} from "@/app/components/product";
import {useState, useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
type Slide = {
    id: number;
    text: string;
    bgURL: string;
};
type CategoryFeature = {
    id: number;
    category: string[];
    image: string;
}
type Product = {
    id: number;
    category: string;
    name: string;
    image: string;
    star: number;
    price: number;
    discount: number
}
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
    const router = useRouter();
    const categoryFeatures: CategoryFeature[] = [
        {id: 1, category: ['TV Audio', 'Phone', 'Smart Television', 'Audios', 'Headphones'], image: '/features_categories/fetured-item-1.png'},
        {id: 2, category: ['Desktop & Laptop', 'Phone', 'Smart Television', 'Audios', 'Headphones'], image: '/features_categories/fetured-item-2.png'},
        {id: 3, category: ['Cctv Camera', 'Phone', 'Smart Television', 'Audios', 'Headphones'], image: '/features_categories/fetured-item-3.png'},
        {id: 4, category: ['Dslr Camera', 'Phone', 'Smart Television', 'Audios', 'Headphones'], image: '/features_categories/fetured-item-4.png'},
        {id: 5, category: ['Smart Phones', 'Phone', 'Smart Television', 'Audios', 'Headphones'], image: '/features_categories/fetured-item-5.png'},
        {id: 6, category: ['Game Console', 'Phone', 'Smart Television', 'Audios', 'Headphones'], image: '/features_categories/fetured-item-6.png'},
    ]
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
    ];
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
        <div className="Home bg-gray-50  flex flex-col items-center">
            <div className="h-[60px] w-full border-b border-gray-300 flex flex-row items-center justify-center">
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
                        <p className={`font-pop text-cl-text text-[15px] ml-[10px] font-[500] select-none`}>Categories</p>
                        {isOpen?
                            (
                                <ul className={`bg-gray-50 absolute top-[62px] border border-gray-200 w-[200px] pl-[30px] pt-[10px] pb-[10px] text-cl-text z-30`}>
                                    <li onClick={()=> router.push("/categories")} className={`flex items-center w-full h-[35px] font-pop font-[400] text-[15px] hover:text-cl-hover-text `}>Smartphone</li>
                                    <li className={`flex items-center w-full h-[35px] font-pop font-[400] text-[15px] hover:text-cl-hover-text `}>Laptop</li>
                                    <li className={`flex items-center w-full h-[35px] font-pop font-[400] text-[15px] hover:text-cl-hover-text `}>Watch</li>
                                    <li className={`flex items-center w-full h-[35px] font-pop font-[400] text-[15px] hover:text-cl-hover-text `}>Television</li>
                                    <li className={`flex items-center w-full h-[35px] font-pop font-[400] text-[15px] hover:text-cl-hover-text `}>Video games</li>
                                    <li className={`flex items-center w-full h-[35px] font-pop font-[400] text-[15px] hover:text-cl-hover-text `}>Camera</li>
                                    <li className={`flex items-center w-full h-[35px] font-pop font-[400] text-[15px] hover:text-cl-hover-text `}>Headphone</li>

                                </ul>
                            ): null}

                    </div>
                    <div className=" w-[700px] flex flex-row text-cl-text">
                        <p className={`select-none flex items-center h-full font-pop font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Home</p>
                        <p className={`select-none flex items-center h-full font-pop font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Vouchers</p>
                        <p className={`select-none flex items-center h-full font-pop font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Top Products</p>
                        <p className={`select-none flex items-center h-full font-pop font-[500] text-[15px]  hover:text-cl-hover-text ml-[30px]`}>Seller Channel</p>

                    </div>

                    <ul className="ml-auto h-full flex flex-row text-cl-text items-center">
                        <li className={`select-none flex items-center h-full font-pop font-[500] text-[15px]  ml-[30px]`}>Contact us:</li>
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
                                <p className={`font-pop text-gray-500 text-[15px]`}>New line required</p>
                                <p className={`font-pop font-[600] text-cl-text text-[22px]`}>iPhone 12 Pro Max</p>
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
            <div className="2xl:w-[1300px] xl:w-[1280px]  flex items-center justify-center mt-[100px]">
                <div className={`w-[600px] flex flex-col items-center`}>
                    <p className={`font-pop font-[500] text-[30px] text-cl-text`}>Featured Categories</p>
                    <div className={`border-b border-[2px] border-blue-600 w-[50px] mt-[4px]`}></div>
                    <p className={`text-center font-pop font-[400] text-gray-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                </div>

            </div>
            <div className={`grid gap-[20px] grid-cols-3 2xl:w-[1300px] xl:w-[1280px] mt-[30px]`}>
                {categoryFeatures.map((category) => (
                    <FeatureCategories category={category} key={category.id} />
                ))}

            </div>
            {/*Categories*/}
            {/*Flash Sale*/}
            <div className="2xl:w-[1300px] xl:w-[1280px]  flex items-center justify-center mt-[100px]">
                <div className={`w-[600px] flex flex-col items-center`}>
                    <p className={`font-pop font-[500] text-[30px] text-cl-text`}>Flash sale</p>
                    <div className={`border-b border-[2px] border-blue-600 w-[50px] mt-[4px]`}></div>
                    <p className={`text-center font-pop font-[400] text-gray-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                </div>
            </div>

            <div className={` 2xl:w-[1300px] xl:w-[1280px] mt-[30px] relative  `}>
                <div className={`h-[50px] w-full pr-[60px] pl-[60px] mb-[20px]  flex items-center justify-between`}>
                    <div className={`w-[200px] h-[50px] flex shadow rounded-[4px] pl-[25px] bg-white items-center`}>
                        <p className={`font-[500] font-pop text-[14px] text-gray-500`}>End in:</p>
                        <p className={`font-[500] font-pop text-[17px] text-gray-700 ml-[10px]`}>{formatTime(timeLeft)}</p>
                    </div>
                    <button className={`flex items-center text-gray-700 hover:text-blue-600`}>
                        <p className={`font-[400] font-pop text-[16px] `}>See more</p>
                        <HiArrowRight className={`text-[20px] ml-[6px] mb-[1px]`}/>
                    </button>


                </div>


                <div className={`flex h-full w-full justify-center items-center  relative`}>
                    <button onClick={()=> {
                        if (transformSale >= 1)
                            setTransformSale(transformSale - 1)
                    }} className={`absolute left-0 w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200 z-20`}>
                        <HiArrowLeft className={`text-[20px]`} />
                    </button>
                    <button onClick={()=> {
                        if (transformSale >= 0)
                            setTransformSale(transformSale + 1)
                    }} className={`absolute right-0 w-[40px] h-[40px] rounded-full bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-blue-500 hover:text-gray-50 transition-all duration-200 z-20`}>
                        <HiArrowRight className={`text-[20px]`} />
                    </button>
                    <div className={` w-[calc(100%-100px)] relative overflow-hidden `}>
                        <div
                            className={`w-full grid gap-[10px] grid-cols-6 flex py-[10px] px-[5px] relative items-center transition-transform `}
                            style={{ transform: `translateX(-${transformSale * 50}%)` }}>

                            {products.slice(0,6).map((product) => (
                                <ProductSale product={product} key={product.id} />
                            ))}

                        </div>
                    </div>
                </div>



            </div>
            {/*Flash Sale*/}
            {/*Trending*/}
            <div className="2xl:w-[1300px] xl:w-[1280px]  flex items-center justify-center mt-[70px]">
                <div className={`w-[600px] flex flex-col items-center`}>
                    <p className={`font-pop font-[500] text-[30px] text-cl-text`}>Trending products</p>
                    <div className={`border-b border-[2px] border-blue-600 w-[50px] mt-[4px]`}></div>
                    <p className={`text-center font-pop font-[400] text-gray-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                </div>

            </div>
            <div className={`grid gap-[30px] grid-cols-4 2xl:w-[1300px] xl:w-[1280px] mt-[30px]`}>
                {products.map((product) => (
                    <Product product={product} key={product.id} />
                ))}

            </div>
            {/*Trending*/}

            <div className={`2xl:w-[1300px] xl:w-[1280px] h-[380px] bg-white mt-[30px] grid grid-cols-3 gap-[30px] mb-[50px] shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-[5px]`}>
                <div className={`col-span-1 p-[30px] `}>
                    <div>
                        <p className={`font-pop text-[18px] text-gray-800 ml-[6px]`}>Best sellers</p>
                        <div className={`flex`}>
                            <div className={`border-t border-blue-500 w-[110px] `}></div>
                            <div className={`flex-1 border-t border-gray-300`}></div>
                        </div>
                    </div>
                    <div className={` h-[250px] flex flex-col justify-between mt-[20px]`}>
                        {products.slice(0,3).map((product) => (
                            <MiniProduct product={product} key={product.id} />
                        ))}
                    </div>
                </div>
                <div className={`col-span-1 p-[30px]`}>
                    <div>
                        <p className={`font-pop text-[18px] text-gray-800 ml-[6px]`}>New arrivals</p>
                        <div className={`flex`}>
                            <div className={`border-t border-blue-500 w-[120px] `}></div>
                            <div className={`flex-1 border-t border-gray-300`}></div>
                        </div>
                    </div>
                    <div className={` h-[250px] flex flex-col justify-between mt-[20px]`}>
                        {products.slice(0,3).map((product) => (
                            <MiniProduct product={product} key={product.id} />
                        ))}
                    </div>
                </div>
                <div className={`col-span-1 p-[30px]`}>
                    <div>
                        <p className={`font-pop text-[18px] text-gray-800 ml-[6px]`}>Top rated</p>
                        <div className={`flex`}>
                            <div className={`border-t border-blue-500 w-[100px] `}></div>
                            <div className={`flex-1 border-t border-gray-300`}></div>
                        </div>
                    </div>
                    <div className={` h-[250px] flex flex-col justify-between mt-[20px]`}>
                        {products.slice(0,3).map((product) => (
                            <MiniProduct product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </div>

            {/*Mall*/}
            <div className="2xl:w-[1300px] xl:w-[1280px]  flex items-center justify-center mt-[50px]">
                <div className={`w-[600px] flex flex-col items-center`}>
                    <p className={`font-pop font-[500] text-[30px] text-cl-text`}>MALL</p>
                    <div className={`border-b border-[2px] border-blue-600 w-[50px] mt-[4px]`}></div>
                    <p className={`text-center font-pop font-[400] text-gray-500 mt-[20px]`}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
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
