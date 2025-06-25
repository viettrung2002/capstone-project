'use client'

import { TbBrandFacebook, TbBrandInstagram, TbCopyright } from "react-icons/tb";
export default function Footer() {
    return(
        <div className="footer  w-full bg-stone-100 justify-center flex items-center font-sf z-30 ">
            <div className="grid grid-cols-3 w-[1300px]  py-[30px] pt-[35px] px-[30px] rounded-t-[25px]">
                <div className="col-span-1 flex justify-start items-center text-[16px] text-stone-800 ">
                    <TbCopyright className="text-[17px] mb-[1px]"/>
                    <p className="text-[16px]">2025</p>
                    <p className="uppercase font-[600] ml-[7px]">Viet Trung</p>
                </div>
                <div className="col-span-1 flex justify-center items-center"> 
                    <p className="font-[800] font-fre text-[30px] text-amber-600">BuyNow</p>
                </div>
                <div className="col-span-1 flex justify-end items-center text-[22px]">
                    <div className="w-[32px] h-[32px] rounded-full border border-stone-200 flex items-center justify-center text-stone-600 mr-[10px]">
                        <TbBrandInstagram/>
                    </div>
                    <div className="w-[32px] h-[32px] rounded-full border border-stone-200 flex items-center justify-center text-stone-600">
                        <TbBrandFacebook/>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}