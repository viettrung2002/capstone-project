'use client'
import {useState} from "react";
import Image from "next/image";
import { HiChevronDown, HiOutlineShoppingCart, HiOutlineMagnifyingGlass, HiOutlineUser, HiOutlineHome } from "react-icons/hi2";
import {useRouter } from "next/navigation";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();

    return (
        <div className="sticky top-0 bg-white w-full z-50">
            <nav className="   w-full h-[70px]  border-gray-300 border-b items-center flex-row flex justify-center  pb-[0px]">
                <div className=" w-[1300px] flex items-center justify-between ">
                    <div className="flex h-full items-center flex-row">
                        <Image src={"/cart.png"} alt={"Logo"} width={40} height={40}></Image>
                        <p className={"font-fre ml-[5px] text-text font-[800] text-[28px]"}>BuyNow</p>
                    </div>
                    {/*Search*/}
                    <div className={`flex flex-row h-[45px] w-[580px] `}>
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
                            }}
                            className="flex flex-col z-50 bg-gray-50 w-[100px] items-center relative font-sf font-regular">
                            <div className="flex flex-row w-full h-full items-center justify-between p-[10px] border rounded-l-[4px] border-gray-300 ">
                                <p className={` text-gray-800 font-pop`}>Click</p>
                                <HiChevronDown />
                            </div>

                            {isOpen ? (
                                <ul className={`absolute flex-col bg-gray-50 top-[45px] w-full items-center border border-gray-200 shadow rounded-[4px]`}>
                                    <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center rounded-t-[4px]`}>H</li>
                                    <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text text-center h-[30px] items-center justify-center `}>H</li>
                                    <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center `}>H</li>
                                    <li className={`flex text-gray-700  hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center justify-center rounded-b-[4px]`}>H</li>
                                </ul>
                            ) : null}
                        </div>
                        <div className={`flex border-t border-b border-gray-300 w-[380px] pl-[20px] items-center pr-[20px]`}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search"
                                className={` flex focus:outline-none h-[25px] items-center w-full font-sf font-regular leading-tight placeholder:font-pop placeholder:font-[300]`}
                            />
                        </div>
                        <button className={`flex justify-center items-center w-[45px] h-[45px] bg-blue-500 rounded-r-[4px] hover:bg-gray-700`}>
                            <HiOutlineMagnifyingGlass className="text-[22px] text-gray-50"/>
                        </button>
                    </div>
                    <div className={`grid grid-cols-9 gap-[10px] h-[45px]`}>
                        <button onClick={()=>router.push("/")} className={`flex col-span-2 rounded-full border border-gray-300 justify-center items-center transition duration-300 text-gray-700 hover:bg-blue-500 hover:text-gray-50`}>

                            <HiOutlineHome className={` text-[20px]`} />

                        </button>
                        <button onClick={()=> router.push("/login")} className={`flex col-span-5 px-[5px] rounded-full border border-gray-300  items-center transition duration-300 text-gray-700 hover:bg-blue-500  group`}>
                            <div className={`w-[35px]  h-[35px] bg-gray-200 group-hover:bg-gray-50 rounded-full flex justify-center items-center hover:text-gray-700`}>
                                <HiOutlineUser className={` text-[20px]`} />
                            </div>
                            <span className={`text-[15px]  font-pop mt-[2px] ml-[7px] group-hover:text-gray-50 `}>Account</span>
                        </button>
                        <button className={`flex col-span-2 w-[45px] h-[45px] rounded-full border border-gray-300 justify-center items-center transition duration-300 text-gray-700 hover:bg-blue-500 hover:text-gray-50`}>

                            <HiOutlineShoppingCart className={` text-[20px]`}/>
                        </button>
                    </div>

                </div>


            </nav>



        </div>



    )
}