'use client'
import { FaCircleUser, FaCircleChevronLeft } from "react-icons/fa6";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
// import Breadcrumb from "@/app/components/breadcrumb";
// import Cookies from "js-cookie";
import {TbChevronDown} from "react-icons/tb";
import {IAddress, IDistrict, IProvince, IWard} from "@/app/types/address";
export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [openInfo, setOpenInfo] = useState(false);
    const [provinces, setProvinces] = useState<IProvince[]>([]);
    const [districts, setDistricts] = useState<IDistrict[]>([]);
    const [provinceName, setProvinceName] = useState<string>("");
    const [districtName, setDistrictName] = useState<string>("");
    const [wardName, setwardName] = useState<string>("");
    const [wards, setWards] = useState<IWard[]>([]);
    const [openProvince, setOpenProvince] = useState<boolean>(false);
    const [address, setAddress] = useState<IAddress>();
    const [activeTab, setActiveTab] = useState(0)
    // const breadcrumbs = [
    //     { name: "Register", href: "/register" },
    //
    // ];

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

    useEffect(() => {
        GetProvinces()
    }, []);
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
    const router = useRouter();
    async function handleRegisterCustomer() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/register/customer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    role: role,
                    info: {
                        customerName: name,
                        address: address,
                        phone: phone,
                        email: email,
                    }
                }),
            });
            if (response.ok) {
                const data = response.json();
                console.log(data);
                alert("Tạo tài khoản thành công");
                router.push("/login");

            }
        } catch (error) {
            console.log("Loi", error);
        }
    }
    async function handleRegisterShop() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/register/shop`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    role: role,
                    info: {
                        shopName: name,
                        address: address,
                        email: email,
                    }
                }),
            });
            if (response.ok) {
                const data = response.json();
                console.log(data);
                alert("Tạo tài khoản thành công");
                router.push("/login");
            }
        } catch (error) {
            console.log("Loi", error);
        }
    }
    return (
        <div className={`flex flex-col w-full items-center justify-center  bg-white pt-[40px]`}>
            {/*<div className="w-[1300px] h-[40px]  mt-[10px] px-[10px] items-center flex ">*/}

            {/*    <div className="flex items-center w-[250px] h-full ">*/}
            {/*        <Breadcrumb breadcrumbs={breadcrumbs} />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {openInfo ? (
                <div className={`w-[500px] pb-[40px] rounded-[25px] border border-stone-200 flex flex-col items-center bg-white mb-[40px]`}>

                    <div className={`h-[120px] w-[400px] flex justify-center items-center pt-[20px] text-stone-800 border-b border-stone-200`}>
                        <FaCircleUser className={`text-[40px] `} />
                        <span className={`font-sf font-[800] text-[35px] ml-[10px]`}>ĐĂNG KÍ</span>
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[30px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>{role == "Shop" ? "TÊN SHOP" : "HỌ VÀ TÊN"}</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên của bạn"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px] placeholder-stone-500`}
                        />
                    </div>
                    {
                        role == "Shop" && (
                            <div className={`w-[400px] flex flex-col mt-[20px] font-sf`}>
                                <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>ĐỊA CHỈ</span>
                                <div onClick={()=>setOpenProvince(!openProvince)} className={"w-full relative h-[45px] mt-[20px] rounded-full bg-stone-200 flex px-[20px] border z-20 items-center justify-between text-[16px]"}>
                                    {provinceName != "" && districtName != "" && wardName != "" ?
                                        <p className={"select-none"}>{provinceName != "" && provinceName } {districtName != "" && districtName } {wardName != "" && wardName }</p>
                                    : <p className={"text-stone-500"}>Địa chỉ của bạn</p>}

                                    <TbChevronDown className={"text-[20px]"}/>


                                </div>
                                {openProvince && (
                                    <div className={" w-[calc(100%+0px)] h-[260px] border flex flex-col rounded-[20px] top-[42px] left-[-0px] overflow-hidden bg-white mt-[10px]  "}>
                                        <div className={" h-[40px] w-full grid grid-cols-3 "}>
                                            <div onClick={()=> {
                                                setActiveTab(0)
                                            }} className={`flex items-center justify-center col-span-1 h-full border-b-[1px] text-[15px] px-[20px] pr-[15px] ${activeTab == 0 ? "border-amber-600" : "border-stone-200"}`}>
                                                <p className={"select-none text-stone-800"}>Tỉnh/TP</p>
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
                                        <div className={"flex-1 overflow-y-auto py-[5px] text-[15px]"}>
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

                                {/*<input*/}
                                {/*    value={address}*/}
                                {/*    onChange={(e) => setAddress(e.target.value)}*/}
                                {/*    placeholder="Nhập địa chỉ của bạn "*/}
                                {/*    className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}*/}
                                {/*/>*/}
                            </div>
                        )
                    }

                    {role == "Customer" &&
                        <div className={`w-[400px] flex flex-col mt-[20px]`}>
                            <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>SỐ ĐIỆN THOẠI</span>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Nhập số điện thoại của bạn"
                                className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 border bg-stone-200 rounded-full px-[15px]`}
                            />
                        </div>
                    }
                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>EMAIL</span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn "
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px] placeholder-stone-500`}
                        />
                    </div>
                    <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                        <div onClick={()=> setOpenInfo(false)} className={`col-span-4 flex rounded-full bg-stone-800 justify-center items-center  hover:bg-stone-700 transition-all duration-200`}>
                            <FaCircleChevronLeft className={`text-stone-50 text-[18px] mr-[10px]`} />
                            <span className={`text-stone-50 font-sf text-[15px] font-[400] select-none mt-[2px]`}>Quay Lại</span>

                        </div>
                        <div onClick={()=> {
                            if (role == "Customer") {
                                if (username !== "" && password !== "" && name !== "" && phone !== "" )
                                    handleRegisterCustomer();
                                else alert("Vui lòng nhập đầy đủ thông tin")
                            }
                                else {
                                    if (username !== "" && password !== "" && name !== "" )
                                        handleRegisterShop();
                                    else alert("Vui lòng nhập đầy đủ thông tin")
                            }
                        }} className={`col-span-6 flex rounded-full bg-amber-600 justify-center items-center hover:bg-amber-500 transition-all duration-200`}>
                            <span className={`text-stone-50 font-sf text-[20px] font-[600] select-none`}>ĐĂNG KÍ</span>
                        </div>

                    </div>

                </div>
            ): (
                <div className={`w-[500px] pb-[40px] rounded-[25px] border border-stone-200 flex flex-col items-center bg-white mb-[40px]`}>

                    <div className={`h-[120px] w-[400px] flex justify-center items-center pt-[20px] text-stone-800 border-b border-stone-200`}>
                        <FaCircleUser className={`text-[40px] `} />
                        <span className={`font-sf font-[800] text-[35px] ml-[10px]`}>ĐĂNG KÍ</span>
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[30px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>TÊM ĐĂNG NHẬP</span>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tài khoản của bạn"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}
                        />
                    </div>

                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>MẬT KHẨU</span>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu "
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 bg-stone-200 border rounded-full px-[15px]`}
                        />
                    </div>
                    <div className={`w-[400px] flex flex-col mt-[20px]`}>
                        <span className={`font-sf text-stone-700 font-[500] text-[20px]`}>XÁC NHẬN MẬT KHẨU</span>
                        <input
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                            className={`flex mt-[10px] items-center font-sf w-full focus:outline-none h-[45px] border-stone-200 border bg-stone-200 rounded-full px-[15px]`}
                        />
                    </div>
                    <div className={`w-[400px] flex mt-[20px] font-sf text-stone-800`}>
                        <div className={"flex items-center"}>
                            <button onClick={()=> setRole("Customer")} className={"w-[20px] h-[20px] rounded-full border border-stone-400 flex items-center justify-center mr-[5px]"}>
                                <div className={`w-[12px] h-[12px] rounded-full ${role == "Customer" && " bg-stone-500 "} `}></div>
                            </button>
                            <p>Người Mua</p>
                        </div>
                        <div className={"flex items-center ml-[25px]"}>
                            <button onClick={()=> setRole("Shop")} className={"w-[20px] h-[20px] rounded-full border border-stone-400 flex items-center justify-center mr-[5px]"}>
                                <div className={`w-[12px] h-[12px] rounded-full ${role == "Shop" && " bg-stone-500 "} `}></div>
                            </button>
                            <p>Người Bán</p>
                        </div>


                    </div>
                    <div className={`w-[400px] h-[45px]  mt-[30px] grid grid-cols-10 gap-[10px] rounded-[4px]`}>
                        <div onClick={()=> router.push("/login")} className={`col-span-4 flex rounded-full bg-stone-800 justify-center items-center  hover:bg-stone-700 transition-all duration-200`}>
                            <FaCircleChevronLeft className={`text-stone-50 text-[18px] mr-[10px]`} />
                            <span className={`text-stone-50 font-sf text-[15px] font-[400] select-none mt-[2px]`}>ĐĂNG NHẬP</span>
                        </div>
                        <div onClick={()=>setOpenInfo(true)} className={`col-span-6 flex rounded-full bg-amber-600 justify-center items-center hover:bg-amber-500 transition-all duration-200`}>
                            <span className={`text-stone-50 font-sf text-[20px] font-[600] select-none`}>TIẾP TỤC</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}