'use client'
import Image from "next/image";

import {ICategory} from "@/app/types/ subCategory";
import {useRouter} from "next/navigation";
export default function FeatureCategories({category}:{category: ICategory}) {

    const router = useRouter();
    return (
        <div onClick={()=> router.push(`categories/${category.categoryId}`)} className={`group relative flex flex-col col-span-1  items-center 2xl:pb-[10px] xl:pb-[25px] justify-between bg-stone-200 rounded-[22px]  select-none `}>
            <div className={`w-full aspect-square flex items-center  rounded-full overflow-hidden  relative justify-center group-hover:p-0 p-[10px] transform-all duration-200 `}>
                <div className={"w-full h-full relative"}>
                    <Image src={category.imageUrl} alt={"image"} fill={true} className={"object-contain"} />
                </div>

            </div>
            <div className={"w-full px-[10px]"}>
                <div className={"w-full flex flex-col justify-center  bg-white py-[10px] opacity-80 rounded-[20px] hover:shadow-md  group 2xl:relative 2xl:bottom-0 xl:absolute xl:bottom-[10px]"}>
                    <p className={`font-sf text-center font-[500] 2xl:text-[17px] xl:text-[15px] text-neutral-700 uppercase select-none group-hover:text-amber-600`}>{category.categoryName}</p>
                </div>
            </div>


        </div>
    )
}