'use client'
import {useState} from "react";
import {FaFacebook, FaTwitter} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa6";
import Image from "next/image";
export default function Footer() {
    const [email, setEmail] = useState<string>('');
    return(
        <div className="footer bg-gray-800 w-full h-[650px] flex justify-center">
            <div className="flex items-center w-[1400px] h-full flex-col ">
                <div className={`flex w-full h-[130px] border-b border-gray-500 items-center justify-between mb-[20px]`}>
                    <div className={`h-full w-[250px] border-r border-gray-500`}>

                    </div>
                    <div className={`flex flex-col justify-center`}>
                        <p className={`font-pop font-[500] text-gray-50 text-[22px]`}>Subscribe to our Newsletter</p>
                        <p className={`font-pop font-[200] text-gray-50 text-[13px]`}>Get all the latest information, Sales and Offers.</p>
                    </div>
                    <div className={`flex h-[45px] w-[400px] items-center justify-between`}>
                        <input className={`h-full w-[290px] pl-[15px] bg-gray-500 rounded-[5px] text-gray-50 font-pop font-[300] focus:outline-none text-[14px]`} type={"text"} placeholder={"Email address here..."} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className={`text-cl-button-text font-[500] font-pop text-[14px] justify-center items-center h-full w-[100px] rounded-[5px] bg-cl-button`}>
                            <p className={`mt-[0px]`}>Submit</p>
                        </button>
                    </div>
                </div>

                <div className={`grid grid-cols-4 gap-[30px] w-full h-[350px] border-b-gray-500 border-b mb-[0px]`}>
                    <div className={`col-span-1 border-gray-300  p-[20px] flex flex-col`}>
                        <div className={`text-gray-50  font-pop font-[500] text-[18px] `}>BuyNow</div>
                        <div className={`w-[50px] border border-blue-600`}></div>
                        <div className={`flex items-center mt-[20px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300 `}>About BuyNow</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Recruitment</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>BuyNow Terms & Conditions</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Privacy Policy</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Official Store</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Seller Channel</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Flash Sale</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Media Contact</p>
                        </div>
                    </div>
                    <div className={`col-span-1 border-gray-300 p-[20px] flex flex-col`}>
                        <div className={`text-gray-50  font-pop font-[500] text-[18px] `}>Follow us</div>
                        <div className={`w-[50px] border border-blue-600`}></div>
                        <div className={`flex items-center mt-[20px] text-gray-200 hover:text-blue-500 group`}>
                            <FaFacebook className=""/>
                            <p className={` font-[300] font-pop text-[14px] ml-[6px] group-hover:ml-[10px] select-none transition-all duration-300 `}>Facebook</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <FaInstagram className="" />
                            <p className={` font-[300] font-pop text-[14px] ml-[6px] group-hover:ml-[10px] select-none transition-all duration-300`}>Instagram</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <FaTwitter className="text-gray-50" />
                            <p className={`font-[300] font-pop text-[14px] ml-[6px] group-hover:ml-[10px] select-none transition-all duration-300`}>Twitter</p>
                        </div>
                    </div>
                    <div className={`col-span-1 border-gray-300  p-[20px] flex flex-col`}>
                        <div className={`text-gray-50  font-pop font-[500] text-[18px] `}>Shipping Partners</div>
                        <div className={`w-[50px] border border-blue-600`}></div>
                        <div className={`grid grid-cols-3 grid-rows-3 w-6/10 mt-[20px] aspect-[16/10]`}>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/ghtk.png`} alt={"image"}  objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/aha.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/ghn.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/grab.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/jt.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/ninjavan.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/spx.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative  `}>
                                <Image src={`/logo/vnp.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                            <div className={`col-span-1 bg-gray-200 h-[25px] aspect-[16/9] rounded-[5px] relative `}>
                                <Image src={`/logo/vtp.png`} alt={"image"} objectFit={"contain"} layout="fill" />
                            </div>
                        </div>


                    </div>
                    <div className={`col-span-1 border-gray-300  p-[20px] flex flex-col`}>
                        <div className={`text-gray-50  font-pop font-[500] text-[18px] `}>Customer services</div>
                        <div className={`w-[50px] border border-blue-600`}></div>
                        <div className={`flex items-center mt-[20px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300 `}>Buying/Ordering Guide</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Selling Guide</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Orders</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Contact BuyNow</p>
                        </div>
                        <div className={`flex items-center mt-[10px] text-gray-200 hover:text-blue-500 group`}>
                            <p className={` font-[300] font-pop text-[14px] ml-[0px] group-hover:ml-[5px] select-none transition-all duration-300`}>Warranty Policy</p>
                        </div>

                    </div>



                </div>
                <div className={`flex w-full h-[70px] border-b border-gray-500 items-center justify-center `}>
                    <div className={` h-[30px] flex  `}>
                        <div className={`px-[30px] h-[30px]   border-r border-gray-600 flex items-center justify-center`}>
                            <span className={`text-gray-50 font-pop font-[300] text-[15px] hover:text-blue-500 select-none`}>Privacy Policy</span>
                        </div>
                        <div className={`px-[30px] h-[30px]  border-r border-gray-600 flex items-center justify-center`}>
                            <span className={`text-gray-50 font-pop font-[300] text-[15px] hover:text-blue-500 select-none`}>Operating Regulations</span>
                        </div>
                        <div className={`px-[30px] h-[30px]  border-r border-gray-600 flex items-center justify-center`}>
                            <span className={`text-gray-50 font-pop font-[300] text-[15px] hover:text-blue-500 select-none`}>Shipping Policy</span>
                        </div>
                        <div className={`px-[30px] h-[30px] flex items-center justify-center `}>
                            <span className={`text-gray-50 font-pop font-[300] text-[15px] hover:text-blue-500 select-none`}>Return & Refund Policy</span>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center justify-center w-full mt-[20px]`}>
                    <span className={`font-pop text-gray-50 text-[15px] font-[600]`}> Developed by a Trung soi</span>
                </div>
            </div>
        </div>
    )
}