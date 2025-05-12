'use client'
import Image from "next/image";
import {useState} from "react";
import {ICategory} from "@/app/types/ subCategory";
import {useRouter} from "next/navigation";
export default function FeatureCategories({category}:{category: ICategory}) {
    const [seeAll, setSeeAll] = useState<boolean>(false);
    const router = useRouter();
    return (
        <div onClick={()=> router.push(`categories/${category.categoryId}`)} className={`relative flex flex-col col-span-1 border border-gray-200  items-center p-[20px] justify-between bg-white `}>
            <div className={` w-4/5 aspect-square flex items-center  rounded-full overflow-hidden mt-[10px]`}>
                <Image src={"/products/product-2.jpg"} alt={"image"} width={200} height={200} className={"object-contain"} />
            </div>
            <div className={"h-[50px] flex  justify-center mt-[20px]"}>
                <p className={`font-sf text-center font-[400] text-[18px] text-gray-800 `}>{category.categoryName}</p>
            </div>

        </div>
    )
}