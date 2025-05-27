'use client'
import {useState, useEffect} from "react";
import {IProductData} from "@/app/types/product";
import Image from "next/image";
import {TbAB2, TbRefresh, TbTrash, TbX} from "react-icons/tb";
import {useRouter} from "next/navigation";

export default function Compare() {
    const [hasItems, setHasItems] = useState(false);
    const router = useRouter();
    const [products, setProducts] = useState<IProductData[]>([]);
    useEffect(() => {
        function checkLocalStorage() {
            setHasItems(localStorage.length > 0);

            const newProducts: IProductData[] = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    const value = localStorage.getItem(key);
                    if (value) {
                        const product = JSON.parse(value) as IProductData;

                        if (!newProducts.some(p => p.productId === product.productId)) {
                            newProducts.push(product);
                        }
                    }
                }
            }

            setProducts(newProducts);
        }
        window.addEventListener("localStorageChanged", checkLocalStorage);
        checkLocalStorage();
        console.log(products);
        return () => {
            window.removeEventListener("localStorageChanged", checkLocalStorage);
        };

    }, [products.length]);
    return (
        <div className={`${hasItems ? "visible" :"hidden"} h-[50px] w-[300px] bg-neutral-300/60 z-30 fixed bottom-0 flex items-center rounded-full px-[8px] justify-between`}>
            <button className={"h-[35px] flex w-[35px] justify-center items-center font-sf text-white bg-stone-800 hover:bg-stone-600 rounded-full text-[20px]"}>
                <TbTrash/>
            </button>
            <div className={"flex "}>
                {products.map((product, index) => (
                    <div key={index} className={"h-[40px] w-[40px] flex items-center mr-[2px] ml-[2px] group relative transition duration-200"}>
                        <div className={"h-[40px] w-[40px] rounded-full bg-stone-400 hover:scale-150 relative origin-bottom transition duration-200 "}>
                            <Image src={"/products/product-1.jpg"} alt={"image"} fill={true}/>
                            <button onClick={()=> {
                                localStorage.removeItem(product.productId);
                                window.dispatchEvent(new Event("localStorageChanged"));
                            }} className={"w-[12px] h-[12px] rounded-full group-hover:visible invisible absolute bg-stone-700 right-0 flex justify-center items-center hover:bg-amber-600 text-white text-[8px]"}>
                                <TbX/>
                            </button>
                        </div>
                        <div className={"absolute group-hover:visible group-hover:scale-100 invisible px-[20px]  py-[10px]  rounded-[25px] bg-stone-200 top-[-125px] font-sf text-[14px] whitespace-nowrap"}>
                            <p className={"text-[14px] font-[500] text-stone-600"}>Viet Trung Shop</p>
                            <p className={"text-[16px] font-[500] text-stone-800"}>{product.productName}</p>
                            <p className={"text-[15px] font-[500] text-amber-600"}>{product.price}</p>
                        </div>

                    </div>
                ))}
            </div>

            <button onClick={()=> {
                if (products.length == 2 ) router.push("/compare")
            }} className={"h-[35px] w-[35px] flex justify-center items-center font-sf text-white bg-amber-600 hover:bg-amber-500 rounded-full"}>

                <TbRefresh className={"text-[20px]"}/>
            </button>
        </div>
    )
}
