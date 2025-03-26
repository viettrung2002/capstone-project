'use client'
import Breadcrumb from "@/app/components/breadcrumb";
import {useState} from "react";
import {HiOutlineMagnifyingGlass , HiMiniMinus} from "react-icons/hi2";
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
    const locations : Location = [
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
    const [minPrice, setMinPrice] = useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();
    return (
        <div className={`w-full h-full flex items-center justify-center flex-col bg-gray-50`}>

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
                    <div className="flex w-full p-[20px] px-[25px] pb-[25px] mt-[0px] flex-col rounded-[5px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)] ">
                        <p className={`font-sf font-[500] text-[18px] text-gray-800`}>Tìm kiếm sản phẩm</p>
                        <p className={"border-b w-full border-gray-300 mt-[5px]"}></p>
                        <div className={`w-full h-[45px] flex mt-[20px] `}>
                            <input
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={"Tìm kiếm ở đây ..."}
                                className={`h-full w-[calc(100%-45px)] pl-[15px] pr-[15px] border-y border-l border-gray-300 focus:outline-none rounded-l-[4px] text-[16px] font-sf`}
                            />
                            <button className={"h-full w-[45px] flex items-center justify-center text-[20px] bg-blue-500 text-gray-50 hover:bg-gray-700 rounded-r-[4px] "}>
                                <HiOutlineMagnifyingGlass />
                            </button>
                        </div>

                    </div>
                    {/*Search*/}
                    {/*Tat ca danh muc con*/}
                    <div className="flex  w-full p-[20px] px-[25px] mt-[30px] flex-col rounded-[5px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
                        <p className={`font-sf font-[500] text-[18px] text-gray-800`}>Điện thoại & Phụ kiện</p>
                        <p className={"border-b w-full border-gray-300 mt-[5px] mb-[5px]"}></p>
                        {
                            subCategories.map((subCategories) => (
                               <p className={`font-sf font-[400] text-[17px] mt-[3px] text-gray-700 hover:text-blue-500 select-none`} key={subCategories.id}>{subCategories.name}</p>
                            ))
                        }
                    </div>
                    {/*Tat ca danh muc con*/}
                    {/*Khoang Gia*/}
                    <div className="flex  w-full  p-[20px] px-[25px] pb-[25px] mt-[30px] flex-col rounded-[5px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
                        <p className={`font-sf font-[500] text-[18px] text-gray-800 select-none `}>Khoảng giá</p>
                        <p className={"border-b w-full border-gray-300 mt-[5px] mb-[5px]"}></p>
                        <div className={`w-full h-[40px] flex mt-[20px] items-center justify-between`}>
                            <input
                                type={'number'}
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                                className={`px-[10px] h-full w-5/12 border-gray-300 border rounded-[4px] font-sf text-gray-700 focus:outline-none`}
                                placeholder={"VNĐ"}
                            />
                            <HiMiniMinus/>
                            <input
                                type={'number'}
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                                className={`px-[10px] h-full w-5/12 border-gray-300 border rounded-[4px] font-sf text-gray-700 focus:outline-none`}
                                placeholder={"VNĐ"}
                            />
                        </div>
                    </div>
                    {/*Khoang Gia*/}
                    {/*Noi ban*/}
                    <div className="flex  w-full h-[200px] border p-[20px] mt-[30px] ">

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
                    <div className="flex h-[70px] border w-full mb-[30px] px-[20px]">

                    </div>
                    <div className={`flex-1 border`}>

                    </div>
                </div>
            </div>
            {/*Product*/}
        </div>
    )
}