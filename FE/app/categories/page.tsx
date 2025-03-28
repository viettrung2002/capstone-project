'use client'
import Breadcrumb from "@/app/components/breadcrumb";
import {useEffect, useState} from "react";
import {HiOutlineMagnifyingGlass, HiMiniMinus, HiChevronDown, HiMiniXMark, HiOutlineStar, HiStar, HiMiniArrowRight } from "react-icons/hi2";
import { BiFilterAlt } from "react-icons/bi";
type SubCategoriesProps = {
    id: number;
    name: string;
};
type Location = {
    id: number;
    name: string;
}
export default function Categories() {
    const breadcrumbs = [
        {name: "Category", href: "/categories" },
    ]
    const subCategories: SubCategoriesProps[] = [
        {
            id: 1,
            name: "Điện thoại thông minh"
        },
        {
            id: 2,
            name: "Máy tính bảng"
        },
        {
            id: 3,
            name: "Pin dự phòng"
        },
        {
            id: 4,
            name: "Bộ xạc điện thoại"
        },
        {
            id: 5,
            name: "Thẻ nhớ"
        }
    ];
    const locations : Location[] = [
        { id: 1, name: "Hà Nội" },
        { id: 2, name: "Hồ Chí Minh" },
        { id: 3, name: "Đà Nẵng" },
        { id: 4, name: "Hải Phòng" },
        { id: 5, name: "Cần Thơ" },
        { id: 6, name: "An Giang" },
        { id: 7, name: "Bà Rịa - Vũng Tàu" },
        { id: 8, name: "Bắc Giang" },
        { id: 9, name: "Bắc Kạn" },
        { id: 10, name: "Bạc Liêu" },
        { id: 11, name: "Bắc Ninh" },
        { id: 12, name: "Bến Tre" },
        { id: 13, name: "Bình Định" },
        { id: 14, name: "Bình Dương" },
        { id: 15, name: "Bình Phước" },
        { id: 16, name: "Bình Thuận" },
        { id: 17, name: "Cà Mau" },
        { id: 18, name: "Cao Bằng" },
        { id: 19, name: "Đắk Lắk" },
        { id: 20, name: "Đắk Nông" },
        { id: 21, name: "Điện Biên" },
        { id: 22, name: "Đồng Nai" },
        { id: 23, name: "Đồng Tháp" },
        { id: 24, name: "Gia Lai" },
        { id: 25, name: "Hà Giang" },
        { id: 26, name: "Hà Nam" },
        { id: 27, name: "Hà Tĩnh" },
        { id: 28, name: "Hải Dương" },
        { id: 29, name: "Hậu Giang" },
        { id: 30, name: "Hòa Bình" }
    ];
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState<number | string>("");
    const [maxPrice, setMaxPrice] = useState<number | string>("");
    const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [rate, setRate] = useState<number>(0);
    const [locationFilter, setLocationFilter] = useState<number[]>([]);
    useEffect(() => {
        console.log(locationFilter);
    }, [locationFilter]);
    return (
        <div className={`w-full h-full flex items-center relative justify-center flex-col bg-gray-50`}>

            <div className={`w-[1300px] h-[40px] mt-[10px] px-[10px] items-center flex `}>
                <div className="flex items-center w-[250px] h-full  ">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
            </div>
            {/*Banner*/}
            <div>
                Banner
            </div>
            {/*Banner*/}

            {/*Mall*/}
            <div>
                Mall
            </div>
            {/*Mall*/}

            {/*Product*/}
            <div className="grid grid-cols-4 gap-[30px] w-[1300px]">
                <div className={`col-span-1 `}>
                    {/*Search*/}
                    <div className="flex w-full p-[20px] px-[25px] pb-[25px] mt-[0px] flex-col rounded-[5px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.2)] ">
                        <p className={`font-sf font-[500] text-[17px] text-gray-800`}>Tìm kiếm sản phẩm</p>
                        <p className={"border-b w-full border-gray-300 mt-[5px]"}></p>
                        <div className={`w-full h-[45px] flex mt-[20px] `}>
                            <input
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={"Tìm kiếm ở đây ..."}
                                className={`h-full w-[calc(100%-45px)] pl-[15px] pr-[15px] border-y border-l border-gray-300 focus:outline-none rounded-l-[4px] text-[15px] font-sf`}
                            />
                            <button className={"h-full w-[45px] flex items-center justify-center text-[20px] bg-blue-500 text-gray-50 hover:bg-gray-700 rounded-r-[4px] "}>
                                <HiOutlineMagnifyingGlass />
                            </button>
                        </div>

                    </div>
                    {/*Search*/}
                    {/*Tat ca danh muc con*/}
                    <div className="flex  w-full p-[20px] px-[25px] mt-[30px] flex-col rounded-[5px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.2)]">
                        <p className={`font-sf font-[500] text-[17px] text-gray-800`}>Điện thoại & Phụ kiện</p>
                        <p className={"border-b w-full border-gray-300 mt-[5px] mb-[5px]"}></p>
                        {
                            subCategories.map((subCategories) => (
                               <p className={`font-sf font-[400] text-[15px] mt-[3px] text-gray-700 hover:text-blue-500 select-none`} key={subCategories.id}>{subCategories.name}</p>
                            ))
                        }
                    </div>
                    {/*Tat ca danh muc con*/}
                    {/*/!*Khoang Gia*!/*/}
                    {/*<div className="flex  w-full  p-[20px] px-[25px] pb-[25px] mt-[30px] flex-col rounded-[5px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.2)]">*/}
                    {/*    <p className={`font-sf font-[500] text-[17px] text-gray-800 select-none `}>Khoảng giá</p>*/}
                    {/*    <p className={"border-b w-full border-gray-300 mt-[5px] mb-[5px]"}></p>*/}
                    {/*    <div className={`w-full h-[40px] flex mt-[20px] items-center justify-between`}>*/}
                    {/*        <input*/}
                    {/*            type={'number'}*/}
                    {/*            value={minPrice ?? ""}*/}
                    {/*            onChange={(e) => setMinPrice(Number(e.target.value) )}*/}
                    {/*            className={`px-[10px] h-full w-5/12 border-gray-300 border rounded-[4px] font-sf text-gray-700 focus:outline-none`}*/}
                    {/*            placeholder={"VNĐ"}*/}
                    {/*        />*/}
                    {/*        <HiMiniMinus/>*/}
                    {/*        <input*/}
                    {/*            type={'number'}*/}
                    {/*            value={maxPrice}*/}
                    {/*            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}*/}
                    {/*            className={`px-[10px] h-full w-5/12 border-gray-300 border rounded-[4px] font-sf text-gray-700 focus:outline-none`}*/}
                    {/*            placeholder={"VNĐ"}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*/!*Khoang Gia*!/*/}
                    {/*Noi ban*/}
                    <div className="flex  w-full h-[200px] border p-[20px] mt-[30px] ">
                        <button onClick={()=> setShowModalFilter(true)}>
                            Show modal
                        </button>
                    </div>
                    {/*Noi ban*/}
                    {/*Thuong hieu*/}
                    <div className="flex  w-full h-[200px] border p-[20px] mt-[30px] ">

                    </div>
                    {/*Thuong hieu*/}
                    {/*Danh gia */}
                    <div className={`flex w-full h-[200px] border p-[20px] mt-[30px]`}>

                    </div>
                    {/*Danh gia */}

                </div>
                <div className={`flex col-span-3 flex-col  `}>
                    <div className="flex flex-col  w-full mb-[30px] px-[20px] pt-[20px] pb-[25px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-[5px]">
                        <h1 className={"font-sf text-[17px] font-[500] text-gray-800"}>Tất cả sản phẩm </h1>
                        <div className={"border-b border-gray-300 mt-[5px]"}></div>
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex items-center mt-[15px]"}>
                                <p className={"text-gray-800 font-sf font-[500] text-[15px] mr-[15px]"}>Sắp xếp</p>
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
                                    }} className={"w-[160px] h-[40px] rounded-[4px] relative"}>
                                    <div className="flex flex-row w-full border  h-full items-center justify-between p-[10px]  rounded-[10px] border-gray-300 ">
                                        <p className={` text-gray-800 font-sf font-[400] text-[15px] mt-[1px]`}>Phổ biến</p>
                                        <HiChevronDown />
                                    </div>
                                    {isOpen ? (
                                        <ul className={`absolute flex-col bg-gray-50 top-[40px] w-full items-center border border-gray-200 py-[5px] shadow rounded-[10px] font-sf font-[400] text-[15px]`}>
                                            <li className={`flex text-gray-700  hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center px-[10px] rounded-t-[4px]`}>Hàng mới</li>
                                            <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center  px-[10px]  `}>Giá thấp đến cao</li>
                                            <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text text-center h-[30px] items-center   px-[10px] select-none`}>Giá cao đến thấp</li>
                                            <li className={`flex text-gray-700 hover:bg-gray-600 hover:text-cl-button-text select-none text-center h-[30px] items-center px-[10px]  rounded-b-[4px]`}>Đánh giá</li>

                                        </ul>
                                    ) : null}

                                </div>
                            </div>
                            <button onClick={()=> setShowModalFilter(true)} className={"w-[100px] h-[40px] rounded-[20px] flex border mt-[15px]  border-gray-300 items-center justify-center bg-blue-500 hover:bg-gray-700"}>
                                <BiFilterAlt className={"text-[20px] mr-[7px]  text-white"} />
                                <p className={`  font-sf font-[400] text-[15px] mt-[1px]  text-white`}>Tất cả</p>
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1  border`}>

                    </div>
                </div>
            </div>
            {/*Product*/}
            <div className={`${showModalFilter ? `visible bg-black/20` : `hidden`} top-0 flex justify-center items-center fixed w-screen h-screen z-50   `}>
                <div className={`lg:w-[600px]  pt-[10px] bg-gray-50 rounded-[5px] shadow-[0px_0px_20px_rgba(0,0,0,0.2)]`}>
                    <div className={`h-[30px]  w-full flex relative justify-center items-center text-gray-800`}>
                        <p className={` font-sf font-[500] text-[18px] mt-[0px]`}>Tất cả bộ lọc</p>
                        <HiMiniXMark onClick={()=> setShowModalFilter(false)} className={"absolute right-[15px] text-[23px] "}/>
                    </div>
                    <div className={"border-b border-gray-300"}></div>
                    <div className={`w-full flex flex-col px-[25px]`}>
                        {/*Danh gia*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Đánh giá</h1>
                        <div className={`grid grid-cols-3 gap-[10px] mt-[10px] `}>
                            <div className={`col-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(5);
                                }} className={"w-[18px] h-[18px] border-[1px] border-gray-300 bg-gray-200 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 5  ? (
                                        <div className={"w-[14px] h-[14px] bg-blue-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-gray-800 text-[15px] ml-[10px]"}>từ 5 sao</p>
                            </div>
                            <div className={`col-span-1 flex items-center `}>
                                <button onClick={()=> {

                                    setRate(4);
                                }} className={"w-[18px] h-[18px] border-[1px] border-gray-300 bg-gray-200 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 4 ? (
                                        <div className={"w-[14px] h-[14px] bg-blue-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-gray-800 text-[15px] ml-[10px]"}>từ 4 sao</p>
                            </div>
                            <div className={`col-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(3);
                                }} className={"w-[18px] h-[18px] border-[1px] border-gray-300 bg-gray-200 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 3 ? (
                                        <div className={"w-[14px] h-[14px] bg-blue-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-gray-800 text-[15px] ml-[10px]"}>từ 3 sao</p>
                            </div>
                            <div className={`col-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(2);
                                }} className={"w-[18px] h-[18px] border-[1px] border-gray-300 bg-gray-200 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 2 ? (
                                        <div className={"w-[14px] h-[14px] bg-blue-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-gray-800 text-[15px] ml-[10px]"}>từ 2 sao</p>
                            </div>
                            <div className={`col-span-1 flex items-center`}>
                                <button onClick={()=> {

                                    setRate(1);
                                }} className={"w-[18px] h-[18px] border-[1px] border-gray-300 bg-gray-200 flex justify-center items-center rounded-[4px] mr-[5px]"}>
                                    {rate == 1 ? (
                                        <div className={"w-[14px] h-[14px] bg-blue-400 rounded-[3px]"}>
                                        </div>
                                    ): null}
                                </button>
                                <HiStar className={"text-yellow-500 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <HiOutlineStar className={" text-gray-400 text-[15px]"}/>
                                <p className={"font-sf font-[400] text-gray-800 text-[15px] ml-[10px]"}>từ 1 sao</p>
                            </div>

                        </div>
                        <div className={"border-b border-gray-300 mt-[20px]"}></div>

                        {/*Khoang Gia*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Giá</h1>
                        <div className={`grid grid-cols-20 gap-x-[15px] gap-y-[10px] mt-[10px]`}>
                            <button onClick={()=>{
                                setMinPrice(0)
                                setMaxPrice(500000)
                            }} className={`h-[40px] col-span-5 flex items-center border hover:bg-blue-500 hover:text-gray-50 border-gray-300 justify-center rounded-full text-gray-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>Dưới 500.000</p>

                            </button>
                            <button onClick={()=>{
                                setMinPrice(500000)
                                setMaxPrice(5000000)
                            }} className={`h-[40px] col-span-7 flex items-center border hover:bg-blue-500 hover:text-gray-50 border-gray-300 justify-center rounded-full text-gray-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>500.000</p>
                                <HiMiniArrowRight className={"mr-1 ml-1"}/>
                                <p className={"font-sf text-[15px] mt-[2px]"}>5.000.000</p>
                            </button>
                            <button onClick={()=>{
                                setMinPrice(5000000)
                                setMaxPrice(10000000)
                            }} className={`h-[40px] col-span-8 flex items-center border hover:bg-blue-500 hover:text-gray-50 border-gray-300 justify-center rounded-full text-gray-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>5.000.000</p>
                                <HiMiniArrowRight className={"mr-1 ml-1"}/>
                                <p className={"font-sf text-[15px] mt-[2px]"}>10.000.000</p>
                            </button>
                            <button onClick={()=>{
                                setMinPrice(10000000);
                                setMaxPrice(10000000000)
                            }} className={`h-[40px] col-span-5 flex items-center border hover:bg-blue-500 hover:text-gray-50 border-gray-300 justify-center rounded-full text-gray-800 `}>
                                <p className={"font-sf text-[15px] mt-[2px] "}>Trên 10.000.000</p>

                            </button>
                        </div>
                        <h1 className={` font-sf font-[500] text-[15px]  mt-[20px]`}>Tự chọn khoảng giá</h1>
                        <div className={`w-full h-[40px] grid grid-cols-20 mt-[20px] `}>
                            <div className={"col-span-7 h-full border border-gray-300 flex items-center rounded-[5px]"}>
                                <input
                                    type={'text'}
                                    value={minPrice}

                                    inputMode={'numeric'}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value)) {
                                            setMinPrice(e.target.value ? Number(e.target.value) : "")
                                        }
                                        }
                                    }
                                    onKeyDown={(e) => {
                                        if (!/[0-9.,]|Backspace|Delete|Arrow/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`px-[10px] w-8/10 rounded-[4px] font-sf text-gray-700 focus:outline-none`}
                                    placeholder={"Từ"}
                                />
                                <p className={"font-sf text-[15px] text-gray-500 border-l px-[5px] border-gray-300"}>VND</p>
                            </div>

                            <div className={"col-span-1 flex items-center text-gray-800 text-[14px] justify-center"}>
                                <HiMiniMinus />
                            </div>

                            <div className={"col-span-7 h-full border border-gray-300 flex items-center rounded-[5px]"}>
                                <input
                                    type={'text'}
                                    value={maxPrice}
                                    inputMode={'numeric'}
                                    onChange={(e) => {
                                        if (e.target.value === '' || /^[0-9.,]+$/.test(e.target.value)) {
                                            setMaxPrice(e.target.value ? Number(e.target.value) : "")
                                        }
                                    }
                                    }
                                    onKeyDown={(e) => {
                                        if (!/[0-9.,]|Backspace|Delete|Arrow/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`px-[10px] w-8/10 rounded-[4px] font-sf text-gray-700 focus:outline-none`}
                                    placeholder={"Đến"}
                                />
                                <p className={"font-sf text-[15px] text-gray-500 border-l px-[5px] border-gray-300"}>VND</p>
                            </div>


                        </div>
                        <div className={"border-b border-gray-300 mt-[20px]"}></div>

                        {/*----------Thuong hieu------------*/}
                        <h1 className={` font-sf font-[500] text-[17px]  mt-[20px]`}>Thương hiệu</h1>
                        <div className={`grid grid-cols-3 gap-[15px] `}>
                            {locations.map((location) => (
                                <div className={"flex col-span-1 h-[25px] items-center text-gray-800 text-[15px] font-sf"} key={location.id}>
                                    <div className={`w-[15px] h-[15px] border border-gray-300 rounded-[4px] bg-gray-100 flex justify-center items-center `}>
                                        <input type={'checkbox'} value={location.id}
                                               onChange={(e) => {
                                                   setLocationFilter((prev)=>
                                                       prev.includes(Number(e.target.value)) ? prev.filter((num)=> num != Number(e.target.value)) : [...prev, Number(e.target.value) ]
                                                   );
                                               }}
                                               className={"w-[9px] h-[9px] accent-blue-500 appearance-none  rounded-[2px] checked:bg-blue-500  peer-checked:block text-gray-50 "}/>
                                    </div>

                                    <p className={"ml-[7px]"}>{location.name}</p>
                                </div>
                            ))}
                        </div>

                        <div className={"border-b border-gray-300 mt-[20px]"}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}