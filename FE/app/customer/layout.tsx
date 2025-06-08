'use client'

import {
    HiOutlineClipboard,
    HiOutlinePencilSquare,
    HiOutlineUser
} from "react-icons/hi2";
import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {ICustomer} from "@/app/types/account";
import {HiOutlineSearch} from "react-icons/hi";
import {Bill} from "@/app/types/bill";
import Image from "next/image";
export default function CustomerPage() {
    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>();
    const [isOpenAccountInfo, setIsOpenAccountInfo] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [userName, setUerName] = useState("ngviettrung2002");

    const [bills, setBills] = useState<Bill[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [openNotificationCancelBill, setOpenNotificationCancelBill] = useState<boolean>(false);
    const [openNotificationConfirmBill, setOpenNotificationConfirmBill] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(true);
    const [idToCancel, setIdToCancel] = useState<string>("00000000-0000-0000-0000-000000000000");
    // TAB ĐỔI MẬT KHẨU
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // TAB ĐỔI MẬT KHẨU

    // ĐƠN MUA
    const [orderStatus, setOrderStatus] = useState(0);
    // ĐƠN MUA

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };
    const updateCustomer = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(customer)
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
    const ChangePassword = async (oldPass: string, newPass: string, accountId: string) => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/change-password?oldPassword=${oldPass}&newPassword=${newPass}&accountId=${accountId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok){
                const data = await response.json();
                setReload(!reload);
                setPassword("")
                setConfirmPassword("")
                setOldPassword("")
                alert("Đổi mật khẩu thành công")
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleUpload = async () => {
        if (!file) {
            console.log("No file");
            return;
        };

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
            setCustomer( (prevState) => ({
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
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        const GetCustomer = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    setCustomer(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetCustomer();


    }, [reload]);

    useEffect(() => {
        const GetBill = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill?${orderStatus == 1 ? "orderStatus=Pending&" : orderStatus == 2 ? "orderStatus=Confirmed&" : orderStatus == 3 ? "orderStatus=Shipped&" : orderStatus == 4 ? "orderStatus=Completed&": orderStatus == 5 ? "orderStatus=Cancelled&": null }pageIndex=1&pageSize=10`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    console.log("Bill",data.data.items);
                    setBills(data.data.items);
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetBill();
    }, [orderStatus]);
    const CancelBill = async (id: string) => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill/cancel?billId=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function formatVND(amount: number): string {
        return amount.toLocaleString('vi-VN') ;
    }
    const UpdateBill = async (billId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill/update-status?billID=${billId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                alert("Cập nhật thành công")
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(customer);
    }, [customer]);
    return(
        <div className={`w-full flex items-center justify-center bg-white`}>
            {openNotificationCancelBill && (
                <div className={"absolute top-[50px] border border-stone-200 py-[20px] px-[20px] flex flex-col z-50 bg-white rounded-[25px] shadow-md "}>
                    <p>Xác nhận hủy đơn</p>
                    <div className={"flex mt-[15px] "}>
                        <button onClick={()=> {
                            CancelBill(idToCancel)
                            setOpenNotificationCancelBill(false)
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-amber-600 text-white rounded-full mr-[10px]"}>
                            Xác Nhận
                        </button>
                        <button onClick={()=> {
                            setOpenNotificationCancelBill(false)
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-stone-200 rounded-full"}>
                            Thoát
                        </button>
                    </div>
                </div>
            )}
            {openNotificationConfirmBill && (
                <div className={"absolute top-[50px] border border-stone-200 py-[20px] px-[20px] flex flex-col z-50 bg-white rounded-[25px] shadow-md "}>
                    <p>Xác nhận hoàn thành đơn</p>
                    <div className={"flex mt-[15px] "}>
                        <button onClick={()=> {
                            UpdateBill(idToCancel)
                            setOpenNotificationConfirmBill(false)
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-amber-600 text-white rounded-full mr-[10px]"}>
                            Xác Nhận
                        </button>
                        <button onClick={()=> {
                            setOpenNotificationConfirmBill(false)
                        }} className={"px-[20px] py-[6px] flex justify-center items-center font-sf bg-stone-200 rounded-full"}>
                            Thoát
                        </button>
                    </div>
                </div>
            )}
            <div className={`w-[1300px] grid grid-cols-5 gap-[20px] mt-[20px] `}>
                <div className={`col-span-1 max-h-fit rounded-[25px] border border-stone-200`}>
                    <div className={"h-[85px] flex p-[15px] border-b border-stone-200"}>
                        <div className={`h-full aspect-square rounded-full overflow-hidden border border-stone-200 flex items-center justify-center`}>
                            <HiOutlineUser className={`text-[30px] text-stone-300`} />
                        </div>
                        <div className={`flex flex-col px-[15px] justify-between py-[3px]`}>
                            <p className={"font-sf text-[17px] text-stone-800 font-[500]"}>{customer?.customerName}</p>
                            <div className={`flex items-center`}>
                                <HiOutlinePencilSquare className={"text-stone-500 mr-[5px] mb-[1px]"}/>
                                <p className={"font-sf text-[15px] text-stone-400"}>Sửa hồ sơ</p>
                            </div>
                        </div>
                    </div>
                    <div className={"py-[10px] px-[5px]"}>
                        <div className={"flex h-[30px] pl-[15px] items-center"}>
                            <div className={"w-[25px] text-[18px]"}>
                                <HiOutlineUser/>
                            </div>
                            <p onClick={()=>setActiveTab(0)} className={"flex  font-sf text-[16px] text-stone-800"}>Tài Khoản Của Tôi</p>
                        </div>
                        <div className={`${isOpenAccountInfo? "block" : "hidden"} flex flex-col`}>
                            <div onClick={()=>setActiveTab(0)} className={` ${activeTab == 0 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>
                                Hồ Sơ
                            </div>
                            {/*<div onClick={()=>setActiveTab(1)} className={` ${activeTab == 1 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>*/}
                            {/*    Địa Chỉ*/}
                            {/*</div>*/}
                            <div onClick={()=>setActiveTab(2)} className={` ${activeTab == 2 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>
                                Đổi Mật Khẩu
                            </div>
                            <div onClick={()=>setActiveTab(3)} className={` ${activeTab == 3 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center font-sf text-[16px] `}>
                                Đóng Tài Khoản
                            </div>
                        </div>
                        <div onClick={()=>setActiveTab(4)} className={"flex h-[35px] pl-[15px] items-center "}>
                            <div className={"w-[25px] text-[18px]"}>
                                <HiOutlineClipboard/>
                            </div>
                            <p className={` ${activeTab == 4 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] `}>Đơn Mua</p>
                        </div>
                        {/*<div className={"flex h-[35px] pl-[15px] items-center"}>*/}
                        {/*    <div className={"w-[25px] text-[20px]"}>*/}
                        {/*        <HiOutlinePercentBadge/>*/}
                        {/*    </div>*/}
                        {/*    <p className={` ${activeTab == 5 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] `}>Kho Voucher </p>*/}
                        {/*</div>*/}
                        {/*<div onClick={()=> setActiveTab(6)} className={"flex h-[35px] pl-[15px] items-center"}>*/}
                        {/*    <div className={"w-[25px] text-[20px]"}>*/}
                        {/*        <HiOutlineWallet/>*/}
                        {/*    </div>*/}
                        {/*    <p className={` ${activeTab == 6 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] select-none`}>Ví BuyNow </p>*/}
                        {/*</div>*/}
                    </div>




                </div>


                {/*TAB HỒ SƠ*/}
                <div className={`${activeTab == 0 ? "block" : "hidden"} col-span-4 border border-stone-200 bg-white px-[20px] pb-[20px] relative rounded-[25px]`}>
                    <div className={"w-full"}>
                        <div className={"h-[84px] border-b border-stone-200 flex justify-center flex-col"}>
                            <p className={"font-sf text-stone-800 text-[20px] font-[700] uppercase"}>Hồ sơ của tôi</p>
                            <p className={"font-sf text-stone-600 text-[15px]"}>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                        </div>
                    </div>
                    {/*<p className={"font-sf text-stone-800 text-[20px] uppercase absolute top-[-16px] bg-white px-[8px] font-[700]"}>Hồ sơ của tôi</p>*/}
                    <div className={"w-full grid grid-cols-3 gap-[30px]"}>
                        <div className={"col-span-2 grid grid-cols-7 gap-[20px] mt-[20px]"}>
                            <div className={"col-span-2"}>
                                <div className={"h-[40px] w-full flex items-center justify-end"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Tên Đăng Nhập</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Tên</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[15px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Email</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[15px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Số Điện Thoại</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[15px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Giới Tính</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Ngày Sinh</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Địa Chỉ</p>
                                </div>
                            </div>
                            <div className={"col-span-5"}>
                                <div className={"h-[40px] w-full rounded-full"}>
                                    <input onChange={(e)=> setUerName(e.target.value)} type={"text"} value={userName} className={"w-full h-full border border-stone-200 font-sf rounded-full text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-full mt-[20px] rounded-full"}>
                                    <input onChange={(e)=> setCustomer( (prevState) => ({
                                        ...prevState,
                                        customerName: e.target.value,
                                    }))} type={"text"} value={customer ? customer.customerName : ""} className={"w-full h-full border border-stone-200 font-sf rounded-full text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-full mt-[15px] rounded-full"}>
                                    <input onChange={(e)=> setCustomer( (prevState) => ({
                                        ...prevState,
                                        email: e.target.value,
                                    }))} type={"text"} value={customer?.email ? customer.email : ""} className={"w-full h-full border border-stone-200 font-sf rounded-full text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-1/2 mt-[15px] rounded-full"}>
                                    <input onChange={(e)=> setCustomer( (prevState) => ({
                                        ...prevState,
                                        phoneNumber: e.target.value,
                                    }))} type={"text"} value={customer?.phoneNumber ? customer.phoneNumber : ""} className={"w-full h-full border border-stone-200 font-sf rounded-full text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-full mt-[15px] flex items-center"}>
                                    <div className={"flex items-center"}>
                                        <div onClick={()=> setCustomer( (prevState) => ({
                                            ...prevState,
                                            gender: true,
                                        }))} className={"w-[16px] h-[16px] rounded-full border border-stone-300 flex items-center justify-center mr-[10px]"}>
                                            <div className={`${customer?.gender ? "bg-stone-600" : null} w-[10px] h-[10px] rounded-full`} ></div>
                                        </div>
                                        <p className={"font-sf text-stone-800 text-[16px]"}>Nam</p>
                                        <div onClick={()=>setCustomer( (prevState) => ({
                                            ...prevState,
                                            gender: false,
                                        }))} className={"w-[16px] h-[16px] rounded-full border border-stone-300 flex items-center justify-center ml-[20px] mr-[10px]"}>
                                            <div className={`${!customer?.gender ? "bg-stone-600" : null} w-[10px] h-[10px] rounded-full`} ></div>
                                        </div>
                                        <p className={"font-sf text-stone-800 text-[16px]"}>Nữ</p>
                                    </div>
                                </div>
                                <div className={"h-[40px] w-[160px] mt-[20px] flex items-center rounded-full bg-stone-200 justify-center"}>
                                    <input
                                        type={"date"}
                                        value={customer?.birthDay === "0001-01-01T00:00:00"
                                            ? ""
                                            : customer?.birthDay?.slice(0, 10) ?? ""}
                                        onChange={(e) =>
                                            setCustomer((prev) => ({
                                                ...prev!,
                                                birthDay: `${e.target.value}T00:00:00`,
                                            }))
                                        }
                                        className={"font-sf"}
                                    />
                                </div>
                                <div className={"h-[40px] w-full mt-[20px] rounded-full"}>
                                    <input onChange={(e)=> setCustomer( (prevState) => ({
                                        ...prevState,
                                        address: e.target.value,
                                    }))} type={"text"} value={customer ? customer.address : ""} className={"w-full h-full border border-stone-200 font-sf rounded-full text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <button onClick={()=> updateCustomer()} className={"px-[25px] py-[8px] bg-amber-600 mt-[20px] hover:bg-stone-700 rounded-full"}>
                                    <p className={"font-sf text-stone-50 text-[15px]"}>Lưu</p>
                                </button>

                            </div>
                        </div>
                        <div className={"col-span-1 max-h-fit border-l border-stone-200 mt-[20px] flex items-center flex-col "}>
                            <div className={"border w-[100px] h-[100px] rounded-full overflow-hidden border-stone-200 flex items-center relative justify-center mt-[20px]"}>
                                {previewUrl ? (
                                    <Image src={previewUrl} fill={true} alt="Preview"  />
                                ) : customer?.avatar ? <Image src={customer.avatar} fill={true} alt="Preview"  /> :  <HiOutlineUser className={"text-[60px] text-stone-300"} />}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <div className={"flex "}>
                                <button onClick={() => fileInputRef.current?.click()} className={"px-[15px] py-[8px] bg-stone-200 mt-[20px] rounded-full mr-[5px]"}>
                                    <p className={"font-sf text-stone-800 text-[15px] "}>Chọn Ảnh</p>
                                </button>
                                <button onClick={handleUpload}
                                        disabled={uploading}
                                        className={"px-[15px] py-[8px] bg-amber-600 text-gray-50 text-[15px] mt-[20px] hover:shadow-md rounded-full ml-[5px]"}>
                                    <p>{uploading ? 'Đang tải ...' : 'Tải lên'}</p>
                                </button>
                            </div>

                            <p className={"font-sf text-stone-600 text-[14px] mt-[10px]"}>Dung lượng tối đa 1MB</p>
                            <p className={"font-sf text-stone-600 text-[14px]"}>Định dạng: .JPEG, .PNG</p>
                        </div>
                    </div>

                </div>
                {/*TAB HỒ SƠ*/}


                {/*TAB ĐỔI MẬT KHẨU*/}
                <div className={`${activeTab == 2 ? "block" : "hidden"} col-span-4 border border-stone-200 bg-white px-[20px] pb-[20px] rounded-[25px]`}>
                    <div className={"w-full"}>
                        <div className={"h-[84px] border-b border-stone-200 flex justify-center flex-col"}>
                            <p className={"font-sf text-stone-800 text-[20px] uppercase font-[600]"}>Đổi Mật Khẩu</p>
                            <p className={"font-sf text-stone-600 text-[15px]"}>Để bảo mật tài khoản, vui lòng không chia sẻ cho người khác</p>
                        </div>
                    </div>
                    <div className={"w-full grid grid-cols-3 gap-[30px]"}>
                        <div className={"col-span-3 grid grid-cols-7 gap-[20px] mt-[20px]"}>
                            <div className={"col-span-2"}>
                                <div className={"h-[40px] w-full flex items-center justify-end"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Mật Khẩu Cũ</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Mật Khẩu Mới</p>
                                </div>
                                <div className={"h-[40px] w-full flex items-center justify-end mt-[20px]"}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Xác Nhận Mật Khẩu</p>
                                </div>
                            </div>
                            <div className={"col-span-3"}>
                                <div className={"h-[40px] w-full "}>
                                    <input onChange={(e)=> setOldPassword(e.target.value)} type={"text"} value={oldPassword} className={"w-full h-full rounded-full border border-stone-200 font-sf text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-full mt-[20px]"}>
                                    <input onChange={(e)=> setPassword(e.target.value)} type={"text"} value={password} className={"w-full h-full rounded-full border border-stone-200 font-sf text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-full mt-[20px]"}>
                                    <input onChange={(e)=> setConfirmPassword(e.target.value)} type={"text"} value={confirmPassword} className={"w-full rounded-full h-full border border-stone-200 font-sf text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>

                                <button onClick={()=> {
                                    if (password != confirmPassword) {
                                        alert("Mật khẩu không trùng nhau");
                                        return;
                                    }
                                    if (customer?.accountId)
                                        ChangePassword(oldPassword, password, customer.accountId)
                                }} className={"px-[20px] py-[8px] bg-amber-600 mt-[20px] hover:bg-stone-700 rounded-full"}>
                                    <p className={"font-sf text-stone-50 text-[15px]"}>Xác Nhận</p>
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

                {/*TAB ĐỔI MẬT KHẨU*/}

                {/*TAB ĐÓNG TÀI KHOẢN*/}
                <div className={`${activeTab == 3 ? "block" : "hidden"} col-span-4 border border-stone-200 bg-white px-[20px] pb-[20px] rounded-[25px]`}>
                    <div className={"w-full"}>
                        <div className={"h-[84px] border-b border-stone-200 flex justify-center flex-col"}>
                            <p className={"font-sf text-stone-800 text-[20px] uppercase font-[600]"}>Đóng Tài Khoản</p>

                        </div>
                    </div>
                    <div className={"w-full grid grid-cols-3 gap-[30px]"}>
                        <div className={"col-span-3 grid grid-cols-7 gap-[20px] mt-[20px]"}>
                            <div className={"col-span-2"}>
                                <div className={"h-[40px] w-full flex items-center justify-end "}>
                                    <p className={"font-sf text-stone-600 text-[15px]"}>Yêu Cầu Đóng Tài Khoản</p>
                                </div>
                            </div>
                            <div className={"col-span-4 "}>
                                <div className={"h-[40px] w-full flex items-center justify-end "}>
                                    <button className={"px-[20px] py-[8px] bg-amber-600 hover:bg-stone-700 rounded-full"}>
                                        <p className={"font-sf text-stone-50 text-[15px]"}>Xác Nhận</p>
                                    </button>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
                {/*TAB ĐÓNG TÀI KHOẢN*/}

                {/*ĐƠN MUA*/}
                <div className={`${activeTab == 4 ? "block" : "hidden"} col-span-4  pb-[20px]`}>
                    <div className={"w-full h-[50px] bg-white border-t border-x border-stone-200 grid grid-cols-6 rounded-full "}>
                        <div onClick={()=>setOrderStatus(0)} className={`${orderStatus == 0 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} rounded-l-full col-span-1 flex items-center justify-center hover:text-amber-600`}>
                            <p className={` font-sf text-[16px] select-none`}>Tất cả</p>
                        </div>
                        <div onClick={()=>setOrderStatus(1)} className={`${orderStatus == 1 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                            <p className={` font-sf text-[16px] select-none`}>Đang xử lý</p>
                        </div>
                        <div onClick={()=>setOrderStatus(2)} className={`${orderStatus == 2 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                            <p className={` font-sf text-[16px] select-none`}>Đã xác nhận</p>
                        </div>
                        <div onClick={()=>setOrderStatus(3)} className={`${orderStatus == 3 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                            <p className={` font-sf text-[16px] select-none`}>Chờ giao hàng</p>
                        </div>
                        <div onClick={()=>setOrderStatus(4)} className={`${orderStatus == 4 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} col-span-1 flex items-center justify-center hover:text-amber-600`}>
                            <p className={` font-sf text-[16px] select-none`}>Hoàn thành</p>
                        </div>
                        <div onClick={()=>setOrderStatus(5)} className={`${orderStatus == 5 ? "border-b-[2px] border-amber-600 text-amber-600" : "border-b-[2px] border-stone-200 text-stone-800"} rounded-r-full col-span-1 flex items-center justify-center hover:text-amber-600`}>
                            <p className={` font-sf text-[16px] select-none`}>Đã hủy</p>
                        </div>
                    </div>
                    <div className={"w-full h-[40px] bg-stone-200 mt-[10px] flex items-center px-[15px] rounded-full"}>
                        <HiOutlineSearch className={"text-[22px] mr-[10px] text-stone-700"}/>
                        <input
                            type={"text"}
                            className={"flex-1 focus:outline-none pr-[10px] font-sf text-[15px] placeholder:text-stone-400 text-stone-800"}
                            placeholder={"Bạn có thể tìn kiếm theo tên Shop, ID đơn hàng hoặc Tên sản phẩm"}/>
                    </div>
                    {
                        bills.map((bill)=>
                            <div key={bill.billId} className={"w-full bg-white mt-[20px] border border-stone-200 rounded-[25px] relative pt-[10px] pb-[5px]"}>
                                <p className={"font-sf text-stone-800 text-[16px] absolute uppercase px-[8px] bg-white top-[-13px] font-[600] left-[30px] select-none hover:text-amber-600"}>{bill.shopName}</p>
                                {bill.orderStatus == "Pending" && (
                                    <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-yellow-600 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                        <p>Đang Xử Lý</p>
                                    </div>
                                )}
                                {bill.orderStatus == "Confirmed" && (
                                    <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-blue-500 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                        <p>Đã Xác Nhận Đơn</p>
                                    </div>
                                )}
                                {bill.orderStatus == "Shipped" && (
                                    <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-cyan-600 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                        <p>Đang Vận Chuyển</p>
                                    </div>
                                )}
                                {bill.orderStatus == "Completed" && (
                                    <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-green-600 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                        <p>Đã Hoành Thành</p>
                                    </div>
                                )}
                                {bill.orderStatus == "Cancelled" && (
                                    <div className={"absolute h-[25px] px-[30px] flex justify-center items-center font-sf rounded-bl-[25px] bg-red-500 text-white top-[-1px] right-0 rounded-tr-[25px] text-[14px] font-[500]"}>
                                        <p>Đã Hủy </p>
                                    </div>
                                )}

                                <div className={"w-full px-[20px] border-dashed border-stone-200 border-b"}>
                                    {/*<div className={"w-full h-[50px] border-b border-stone-200 flex items-center"}>*/}
                                    {/*    <div className={"flex items-center"}>*/}
                                    {/*        <p className={"font-sf text-stone-800 text-[16px]"}>{bill.shopName}</p>*/}
                                    {/*        <button onClick={()=>router.push(`/shop/${bill.shopId}`)} className={"h-[30px] px-[10px] border text-stone-700 border-stone-200 text-[14px] flex items-center justify-center font-sf ml-[10px]"}>*/}
                                    {/*            <p>Xem shop</p>*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {
                                        bill.items.map((item)=>
                                            <div key={item.itemId} className={"w-full py-[10px] border-stone-200 flex"}>
                                                <div className={"w-[90px] h-[90px] bg-stone-200 rounded-[20px]"}>

                                                </div>
                                                <div className={"h-[90px] flex flex-col items-start py-[3px] pl-[20px] justify-between font-sf"}>
                                                    <p className={"text-[16px] text-stone-800"}>{item.productName}</p>
                                                    <div className={"flex items-center"}>
                                                        {/*<p className={"line-through text-stone-500 text-[14px] mr-[5px]"}>260000</p>*/}
                                                        <p className={" text-amber-600 text-[16px]"}>{item.unitPrice}</p>
                                                    </div>
                                                    <p className={" text-stone-800 text-[15px]"}>{item.quantity} sản phẩm</p>
                                                </div>

                                            </div>
                                        )
                                    }

                                </div>

                                <div className={"w-full px-[20px] flex justify-between py-[10px] text-stone-800 font-sf"}>
                                    <div className={"flex items-center"}>
                                        <p className={"text-[15px] mr-[10px]"}>Thành tiền:</p>
                                        <p className={"text-[22px] text-amber-600"}>{bill.totalPrice}</p>
                                    </div>
                                    <div className={"flex relative"}>

                                        {bill.orderStatus == "Shipped" && (
                                            <button  onClick={()=>{
                                                setOpenNotificationConfirmBill(true);
                                                setIdToCancel(bill.billId)
                                            }} className={"px-[20px] py-[8px] bg-stone-800 hover:bg-stone-700 rounded-full mr-[10px]"}>
                                                <p className={"font-sf text-stone-50 text-[15px]"}>Hoàn Thành</p>
                                            </button>
                                        )}
                                        {bill.orderStatus == "Pending" && (
                                            <button onClick={()=> {
                                                setOpenNotificationCancelBill(true);
                                                setIdToCancel(bill.billId)
                                            }} className={"px-[20px] py-[8px]  bg-stone-800 hover:bg-stone-700 rounded-full mr-[10px]"}>
                                                <p className={"font-sf text-stone-50 text-[15px]"}>Hủy Đơn</p>
                                            </button>
                                        )}
                                        <button className={"px-[20px] py-[8px] bg-amber-600 hover:bg-stone-700 rounded-full"}>
                                            <p className={"font-sf text-stone-50 text-[15px]"}>Mua Lại</p>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/*ĐƠN MUA*/}

                {/*VÍ*/}
                <div className={`${activeTab == 6 ? "block" : "hidden"} col-span-3  pb-[20px]`}>
                    <div className={"w-full h-full border bg-white border-t border-x border-stone-100 p-[20px] flex flex-col justify-between"}>
                        <div className={"h-[40px] w-full"}>
                            <button className={"px-[20px] h-full bg-stone-700 font-sf text-stone-50 text-[15px]"}>
                                Lịch Sử Giao Dịch
                            </button>
                        </div>

                        <div>
                            <div className={"h-[20px] w-full font-sf text-stone-700 text-[15px] flex items-center justify-center"}>
                                Số Dư Ví
                            </div>
                            <div className={"h-[70px] flex w-full font-sf text-blue-600 text-[40px] justify-center items-center"}>
                                <p className={"font-[700]"}>{formatVND(50000000)}</p>
                                <p className={"font-sf text-stone-700 text-[20px]"}>đ</p>
                            </div>
                        </div>


                        <div className={"h-[40px] w-full flex items-center justify-center"}>
                            <button className={"px-[20px] h-full bg-stone-700 font-sf text-stone-50 text-[15px] mr-[10px]"}>
                                Nạp Tiền
                            </button>

                            <button className={"px-[20px] h-full bg-stone-700 font-sf text-stone-50 text-[15px] ml-[10px]"}>
                                Rút Tiền
                            </button>
                        </div>


                    </div>
                </div>
                {/*VÍ*/}
            </div>
        </div>
    )
}
