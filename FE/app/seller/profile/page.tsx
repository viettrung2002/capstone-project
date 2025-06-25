'use client'
import Image from "next/image";
import {HiOutlineUser} from "react-icons/hi2";
import Cookies from "js-cookie";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {IAddress, IDistrict, IProvince, IWard} from "@/app/types/address";
import {TbChevronDown} from "react-icons/tb";
import {IShopInfo} from "@/app/types/shop";
export default function ProfilePage() {

    const [shop, setShop] = useState<IShopInfo>();
    const router = useRouter();
    const [reload, setReload] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [provinces, setProvinces] = useState<IProvince[]>([]);
    const [districts, setDistricts] = useState<IDistrict[]>([]);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [provinceName, setProvinceName] = useState<string>("");
    const [districtName, setDistrictName] = useState<string>("");
    const [wardName, setwardName] = useState<string>("");
    const [wards, setWards] = useState<IWard[]>([]);
    const [openProvince, setOpenProvince] = useState<boolean>(false);
    const [address, setAddress] = useState<IAddress>();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        const GetShop = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    console.log(data);
                    setShop(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetShop();

    }, [reload, router]);
    const updateShop = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(shop)
            });
            if (response.ok){
                const data = await response.json();
                setReload(!reload)
                alert("Cập nhật thành công")
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };


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
        GetProvinces()
    }, []);

    useEffect(() => {
        console.log(shop)
    }, [shop]);
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
    const handleUpload = async () => {
        if (!file) {
            console.log("No file");
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Key 'image' phải khớp với .NET API

        try {
            setUploading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
                method: 'POST',
                body: formData,
                // Không cần headers: Content-Type sẽ tự động là 'multipart/form-data'
            });

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            console.log("URL",data);
            setShop( (prevState) => ({
                ...prevState,
                avatar: data.imageUrl,
            }))
            alert(`Upload thành công! URL: ${data.imageUrl}`);
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Upload thất bại');
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className={` col-span-4 border border-gray-200 bg-white px-[20px] pb-[20px] relative rounded-[4px] shadow`}>
            <div className={"w-full"}>
                <div className={"h-[84px] border-b border-gray-200 flex justify-center flex-col"}>
                    <p className={"font-sf text-gray-800 text-[20px] font-[700] uppercase"}>Hồ sơ của tôi</p>
                    <p className={"font-sf text-gray-600 text-[15px]"}>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
            </div>
            {/*<p className={"font-sf text-gray-800 text-[20px] uppercase absolute top-[-16px] bg-white px-[8px] font-[700]"}>Hồ sơ của tôi</p>*/}
            <div className={"w-full grid grid-cols-3 gap-[30px]"}>
                <div className={"col-span-2 grid grid-cols-7 gap-[20px] mt-[20px]"}>
                    <div className={"col-span-2"}>
                        <div className={"h-[40px] w-full flex items-center justify-end"}>
                            <p className={"font-sf text-gray-600 text-[15px]"}>Tên Đăng Nhập</p>
                        </div>
                        <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                            <p className={"font-sf text-gray-600 text-[15px]"}>Tên</p>
                        </div>
                        <div className={"h-[40px] w-full flex items-center justify-end mt-[15px]"}>
                            <p className={"font-sf text-gray-600 text-[15px]"}>Email</p>
                        </div>

                        <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                            <p className={"font-sf text-gray-600 text-[15px]"}>Địa Chỉ</p>
                        </div>
                        {/*<div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>*/}
                        {/*    <p className={"font-sf text-gray-600 text-[15px]"}>Địa Chỉ</p>*/}
                        {/*</div>*/}
                    </div>
                    <div className={"col-span-5"}>
                        <div className={"h-[40px] w-full rounded-[4px] flex items-center px-[20px] font-sf border"}>
                            {shop?.account?.userName}
                        </div>
                        <div className={"h-[40px] w-full mt-[20px] rounded-[4px]"}>
                            <input onChange={(e)=> setShop( (prevState) => ({
                                ...prevState,
                                shopName: e.target.value,
                            }))} type={"text"} value={shop ? shop.shopName : ""} className={"w-full h-full border border-gray-200 font-sf rounded-[4px] text-gray-800 focus:outline-none px-[20px]"}/>
                        </div>
                        <div className={"h-[40px] w-full mt-[15px] rounded-[4px]"}>
                            <input onChange={(e)=> setShop( (prevState) => ({
                                ...prevState,
                                email: e.target.value,
                            }))} type={"text"} value={shop?.email ? shop.email : ""} className={"w-full h-full border border-gray-200 font-sf rounded-[4px] text-gray-800 focus:outline-none px-[20px]"}/>
                        </div>
                        <div onClick={()=>setOpenProvince(!openProvince)} className={"w-full relative h-[40px] mt-[20px] rounded-[4px] bg-gray-200 flex px-[20px] border z-20 items-center justify-between text-[16px]"}>
                            {provinceName != "" && districtName != "" && wardName != "" ?
                                <p className={"select-none"}>{provinceName != "" && provinceName }, {districtName != "" && districtName }, {wardName != "" && wardName }</p>
                                : <p className={"text-gray-500"}>{shop?.address ? `${shop.address.province.provinceName}, ${shop.address.district.districtName}, ${shop.address.ward.wardName}` : "Chưa có địa chỉ"}</p>}
                            <TbChevronDown className={"text-[20px]"}/>
                        </div>

                        {openProvince && (
                            <div className={" w-[calc(100%+0px)] h-[260px] border flex flex-col rounded-[4px] top-[42px] left-[-0px] overflow-hidden bg-white mt-[10px]  font-sf"}>
                                <div className={" h-[40px] w-full grid grid-cols-3 "}>
                                    <div onClick={()=> {
                                        setActiveTab(0)
                                    }} className={`flex items-center justify-center col-span-1 h-full border-b-[1px] text-[15px] px-[20px] pr-[15px] ${activeTab == 0 ? "border-amber-600" : "border-gray-200"}`}>
                                        <p className={"select-none text-gray-800"}>Tỉnh/TP</p>
                                    </div>
                                    <div onClick={()=> {
                                        if (address?.provinceId)
                                            setActiveTab(1)
                                    }} className={`flex items-center justify-center col-span-1 h-full border-b-[1px] text-[15px] px-[20px] pr-[15px] ${activeTab == 1 ? "border-amber-600" : "border-gray-200"}`}>
                                        <p className={"select-none text-gray-800"}>Quận/Huyện</p>
                                    </div>
                                    <div onClick={()=> {
                                        if (address?.districtId)
                                            setActiveTab(2)
                                    }} className={`flex items-center justify-center col-span-1 h-full border-b-[1px] text-[15px] px-[20px] pr-[15px] ${activeTab == 2 ? "border-amber-600" : "border-gray-200"}`}>
                                        <p className={"select-none text-gray-800"}>Phường/Xã</p>
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
                        {/*<div className={"h-[40px] w-full mt-[20px] rounded-full"}>*/}
                        {/*    <input onChange={(e)=> setShop( (prevState) => ({*/}
                        {/*        ...prevState,*/}
                        {/*        address: e.target.value,*/}
                        {/*    }))} type={"text"} value={shop ? shop.address : ""} className={"w-full h-full border border-gray-200 font-sf rounded-full text-gray-800 focus:outline-none px-[20px]"}/>*/}
                        {/*</div>*/}
                        <button onClick={()=> updateShop()} className={"px-[25px] py-[8px] bg-blue-500 mt-[20px] hover:bg-gray-700 rounded-[4px]"}>
                            <p className={"font-sf text-gray-50 text-[15px]"}>Lưu</p>
                        </button>

                    </div>
                </div>
                <div className={"col-span-1 max-h-fit border-l border-gray-200 mt-[20px] flex items-center flex-col "}>
                    <div className={"border w-[100px] h-[100px] rounded-[4px] overflow-hidden border-gray-200 flex items-center relative justify-center mt-[20px]"}>
                        {previewUrl ? (
                            <Image src={previewUrl} fill={true} alt="Preview"  />
                        ) : shop?.avatar ? <Image src={shop.avatar} fill={true} alt="Preview"  /> :  <HiOutlineUser className={"text-[60px] text-gray-300"} />}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className={"flex "}>
                        <button onClick={() => fileInputRef.current?.click()} className={"px-[15px] py-[8px] bg-gray-200 mt-[20px] rounded-[4px] mr-[5px]"}>
                            <p className={"font-sf text-gray-800 text-[15px] "}>Chọn Ảnh</p>
                        </button>
                        <button onClick={handleUpload}
                                disabled={uploading}
                                className={"px-[15px] py-[8px] bg-blue-500 text-gray-50 text-[15px] mt-[20px] hover:shadow-md rounded-[4px] ml-[5px]"}>
                            <p>{uploading ? 'Đang tải ...' : 'Tải lên'}</p>
                        </button>
                    </div>

                    <p className={"font-sf text-gray-600 text-[14px] mt-[10px]"}>Dung lượng tối đa 1MB</p>
                    <p className={"font-sf text-gray-600 text-[14px]"}>Định dạng: .JPEG, .PNG</p>
                </div>
            </div>

        </div>
    )
}