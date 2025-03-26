'use client'
import { LuHouse } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import {useRouter} from "next/navigation";
interface BreadcrumbItem {
    name: string;
    href: string;
}
interface BreadcrumbProps {
    breadcrumbs: BreadcrumbItem[];
}
export default function Breadcrumb({ breadcrumbs }: BreadcrumbProps) {
    const router = useRouter();
    return (
        <div className={`h-[40px] rounded-[5px] border border-gray-200 bg-white`}>
            <div className="flex items-center w-full h-full px-[15px] pt-[2px] ">
                <div onClick={()=>router.push("/")} className="flex items-center text-gray-700 hover:text-blue-500 transition-all duration-300 ">
                    <LuHouse className="mr-[5px]  text-[20px] mb-[2px]" />
                    <p className="font-pop select-none   font-[400] text-[16px]">Home</p>
                </div>
                {breadcrumbs.map((breadcrumb, index) => (
                        <div key={index} className="flex items-center ml-[5px]" >
                            <FaAngleRight className="mr-[5px] text-gray-700 text-[15px]" />
                            <p onClick={()=> router.push(breadcrumb.href)} className={`font-pop hover:text-blue-500 transition-all duration-300 text-gray-700 font-[400] text-[16px] select-none`}>{breadcrumb.name}</p>
                        </div>
                ))}
            </div>
        </div>
    )
}