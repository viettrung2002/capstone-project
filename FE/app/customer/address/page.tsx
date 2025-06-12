'use client'
import {TbChevronDown, TbPlus} from "react-icons/tb";
import {useEffect, useState} from "react";
import {IAddress, IAddressResponse, IDistrict, IProvince, IWard} from "@/app/types/address";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
export default function AddressPage( ) {

    const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);
    const [address, setAddress] = useState<IAddress>();
    const [openProvince, setOpenProvince] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState(0);
    const [provinces, setProvinces] = useState<IProvince[]>([]);
    const [districts, setDistricts] = useState<IDistrict[]>([]);
    const [provinceName, setProvinceName] = useState<string>("");
    const [districtName, setDistrictName] = useState<string>("");
    const [wardName, setwardName] = useState<string>("");
    const [wards, setWards] = useState<IWard[]>([]);
    const [addresses, setAddresses] = useState<IAddressResponse[]>([]);
    const router = useRouter();
    useEffect(() => {
        console.log(address);

    }, [address]);
    const GetProvinces = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/provinces`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok){
                const data = await response.json();
                setProvinces(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetDistricts = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/districts/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok){
                const data = await response.json();
                setDistricts(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const GetWards = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/wards/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok){
                const data = await response.json();
                setWards(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const AddAddress = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(address),
            });
            if (response.ok){
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const GetAddreses = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok){
                const data = await response.json();
                setAddresses(data.data);
                console.log("ADDRESS: " ,data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetAddreses()
        GetProvinces();
    }, []);
    return (
        <div className={ `w-full h-full border rounded-[25px] px-[20px] font-sf`}>
            <div className={"w-full"}>
                <div className={"h-[84px] border-b border-stone-200 flex justify-between items-center"}>
                    <div>
                        <p className={"font-sf text-stone-800 text-[20px] font-[700] uppercase"}>Địa Chỉ Của Tôi</p>
                        <p className={"font-sf text-stone-600 text-[15px]"}>Quản lý thông tin địa chỉ để có thể giao hàng chính xác</p>
                    </div>
                    <div onClick={()=>setOpenAddAddress(true)} className={"px-[20px] h-[40px] flex justify-center items-center rounded-full bg-amber-600 text-white"}>
                        <TbPlus className={"text-[20px]"}/>
                        <p className={"text-[15px] ml-[5px] mt-[2px]"}>Thêm Địa Chỉ Mới</p>
                    </div>
                </div>
                <div className={"w-full mt-[20px]"}>
                    {
                        addresses.map((address) => (
                            <div key={address.addressId} className={"w-full rounded-[20px] bg-stone-50 flex justify-between items-center px-[20px] py-[10px] mt-[20px]"}>
                                <div className={"flex-1 flex flex-col"}>
                                    <div className={"flex items-center "}>
                                        <p className={"pr-[10px] border-r  flex justify-center items-center text-[16px] font-[500]"}>{address.name}</p>
                                        <p className={"pl-[10px] flex justify-center items-center text-[15px] mt-[1px] text-stone-700"}>{address.phoneNumber}</p>
                                    </div>
                                    <p className={"text-[15px] text-stone-700"}>{address.streetAddress}</p>
                                    <p className={"text-[15px] text-stone-700"}>{address.ward.wardName}, {address.district.districtName}, {address.province.provinceName}</p>

                                    {
                                        address.isDefault == true &&
                                        <div className={"w-[100px] py-[0px] rounded-full border border-amber-600 text-[14px] text-amber-600 flex justify-center items-center mt-[3px]"}>
                                            Mặc Định
                                        </div>
                                    }

                                </div>
                                <div className={"flex flex-col text-[15px] h-full items-center justify-center"}>
                                    <button>Cập Nhật</button>
                                    <button className={"px-[20px] py-[3px] rounded-full border text-[15px] mt-[10px] bg-stone-200"}>
                                        Thiết Lập Mặc Định
                                    </button>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>







            <div className={`${openAddAddress ? "visible bg-black/20" : "hidden"} w-screen h-screen fixed top-0 z-30 left-0 flex justify-center items-center `}>
                <div className={"w-[550px]  bg-white mb-[40px] rounded-[25px] pb-[20px] max-h-[1000px] transition-all duration-200"}>
                    <div className={"h-[40px] flex justify-center items-center border-b"}>
                        Địa Chỉ Mới
                    </div>
                    <div className={"w-full grid grid-cols-2 h-[40px] gap-[10px] mt-[20px] px-[30px]"}>
                        <div className={"group relative flex items-center rounded-full col-span-1"}>
                            <p className={`group-focus-within:top-[-10px] ${address?.name ? "top-[-10px] left-[16px] text-[13px] px-[8px] z-20 bg-white" : "text-[15px] left-[21px]"} absolute  group-focus-within:left-[16px]  text-stone-700  group-focus-within:text-[13px] group-focus-within:z-20 group-focus-within:bg-white group-focus-within:px-[8px] transition-all duration-200`}>Tên Người Nhận</p>
                            <input
                                type={"text"}
                                value={address?.name ? address.name : ""}
                                className={"col-span-1 w-full h-full border rounded-full border-stone-200 focus:outline-none focus:shadow-outline px-[20px] z-10"}
                                onChange={(e)=> {
                                    setAddress(prevState => ({...prevState, name: e.target.value}));
                                }}
                            />
                        </div>
                        <div className={"group relative flex items-center rounded-full col-span-1"}>
                            <p className={`group-focus-within:top-[-10px] ${address?.name ? "top-[-10px] left-[16px] text-[13px] px-[8px] z-20 bg-white" : "text-[15px] left-[21px]"} absolute  group-focus-within:left-[16px]  text-stone-700  group-focus-within:text-[13px] group-focus-within:z-20 group-focus-within:bg-white group-focus-within:px-[8px] transition-all duration-200`}>Số Điện Thoại</p>
                            <input
                                type={"text"}
                                value={address?.phoneNumber ? address.phoneNumber : ""}
                                inputMode={"numeric"}
                                className={"col-span-1 h-full border rounded-full border-stone-200 focus:outline-none focus:shadow-outline w-full px-[20px] z-10"}
                                onChange={(e)=> {
                                    setAddress(prevState => ({...prevState, phoneNumber: e.target.value}));
                                }}
                            />
                        </div>

                    </div>
                    <div className={"px-[30px]"}>
                        <div onClick={()=>setOpenProvince(!openProvince)} className={"w-full relative h-[40px] mt-[20px] rounded-full flex px-[20px] border z-20 items-center justify-between text-[15px]"}>

                            <p className={"select-none"}>{provinceName != "" ? provinceName : "Tỉnh/Thành Phố"}, {districtName != "" ? districtName : "Quận/Huyện"}, {wardName != "" ? wardName : "Phường/Xã"}</p>
                            <TbChevronDown className={"text-[20px]"}/>


                        </div>
                        {openProvince && (
                            <div className={" w-[calc(100%+0px)] h-[260px] border flex flex-col rounded-[20px] top-[42px] left-[-0px] overflow-hidden bg-white mt-[10px]  "}>
                                <div className={" h-[40px] w-full grid grid-cols-3 "}>
                                    <div onClick={()=> {
                                        setActiveTab(0)
                                    }} className={`flex items-center justify-center col-span-1 h-full border-b-[1px] text-[15px] px-[20px] pr-[15px] ${activeTab == 0 ? "border-amber-600" : "border-stone-200"}`}>
                                        <p className={"select-none text-stone-800"}>Tỉnh/Thành Phố</p>
                                    </div>
                                    <div onClick={()=> {
                                        if (address?.provinceId)
                                            setActiveTab(1)
                                    }} className={`flex items-center justify-center col-span-1 h-full border-b-[1px] text-[15px] px-[20px] pr-[15px] ${activeTab == 1 ? "border-amber-600" : "border-stone-200"}`}>
                                        <p className={"select-none text-stone-800"}>Quận/Huyện</p>
                                    </div>
                                    <div onClick={()=> {
                                        if (address?.districtId)
                                            setActiveTab(2)
                                    }} className={`flex items-center justify-center col-span-1 h-full border-b-[1px] text-[15px] px-[20px] pr-[15px] ${activeTab == 2 ? "border-amber-600" : "border-stone-200"}`}>
                                        <p className={"select-none text-stone-800"}>Phường/Xã</p>
                                    </div>
                                </div>
                                <div className={"flex-1 overflow-y-auto py-[5px]"}>
                                    {
                                        activeTab == 0 ?
                                            provinces.map((province)=> (
                                                <div onClick={()=>{
                                                    setAddress(prevState => ({...prevState, provinceId: province.provinceId}))
                                                    setProvinceName(province.provinceName)
                                                    GetDistricts(province.provinceId)
                                                    setActiveTab(1)
                                                }} key={province.provinceId} className={"h-[30px] flex items-center w-full px-[20px]"}>
                                                    <p className={"select-none"}>{province.provinceName}</p>
                                                </div>
                                            ))
                                            :
                                            activeTab == 1 ?
                                                districts.map((district )=> (
                                                    <div onClick={()=>{
                                                        setAddress(prevState => ({...prevState, districtId: district.districtId}))
                                                        setDistrictName(district.districtName)
                                                        GetWards(district.districtId)
                                                        setActiveTab(2)
                                                    }} key={district.districtId} className={"h-[30px] flex items-center w-full px-[20px]"}>
                                                        <p>{district.districtName}</p>
                                                    </div>
                                                ))
                                                :
                                                wards.map((ward)=> (
                                                    <div onClick={()=>{

                                                        setAddress(prevState => ({...prevState, wardId: ward.wardId}))
                                                        setwardName(ward.wardName)
                                                    }} key={ward.wardId} className={"h-[30px] flex items-center w-full px-[20px]"}>
                                                        <p>{ward.wardName}</p>
                                                    </div>
                                                ))
                                    }
                                </div>

                            </div>
                        )}
                    </div>

                    <div className={"px-[30px]"}>
                        <div className={"group relative flex items-center rounded-full col-span-1 h-[40px] mt-[20px]"}>
                            <p className={`group-focus-within:top-[-10px] ${address?.name ? "top-[-10px] left-[16px] text-[13px] px-[8px] z-20 bg-white" : "text-[15px] left-[21px]"} absolute  group-focus-within:left-[16px]  text-stone-700  group-focus-within:text-[13px] group-focus-within:z-20 group-focus-within:bg-white group-focus-within:px-[8px] transition-all duration-200`}>Địa Chỉ Cụ Thể</p>
                            <input
                                type={"text"}
                                value={address?.streetAddress ? address.streetAddress : ""}
                                inputMode={"numeric"}
                                className={"col-span-1 h-full border rounded-full border-stone-200 focus:outline-none focus:shadow-outline w-full px-[20px] z-10"}
                                onChange={(e)=> {
                                    setAddress(prevState => ({...prevState, streetAddress: e.target.value}));
                                }}
                            />
                        </div>
                    </div>




                    <div className={"h-[30px] w-full flex items-center mt-[10px] text-[15px] text-stone-700 px-[30px]"}>
                        <div className={"w-[18px] h-[18px] rounded-full border border-stone-300 mr-[8px]"}>

                        </div>
                        <p>Đặt Làm Địa Chỉ Mặc Định</p>
                    </div>

                    <div className={"group relative flex items-center rounded-full col-span-1 h-[40px] mt-[10px] justify-end px-[30px]"}>
                        <button onClick={()=>setOpenAddAddress(false)} className={"h-full px-[20px] bg-stone-200 rounded-full text-[15px]"}>
                            Trở Lại
                        </button>
                        <button onClick={()=> AddAddress()} className={"h-full px-[20px] bg-amber-600 rounded-full text-[15px] text-white ml-[10px]"}>
                            Hoàn Thành
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}