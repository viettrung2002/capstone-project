'use client'

import {
    HiOutlineChevronDown,
    HiOutlineClipboard,
    HiOutlinePencilSquare,
    HiOutlinePercentBadge,
    HiOutlineTicket,
    HiOutlineUser, HiOutlineWallet
} from "react-icons/hi2";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {ICustomer} from "@/app/types/account";
import {HiOutlineSearch} from "react-icons/hi";
import {Bill} from "@/app/types/bill";
export default function CustomerPage() {
    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer>();
    const [isOpenAccountInfo, setIsOpenAccountInfo] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [userName, setUerName] = useState("ngviettrung2002");
    const [gender, setGender] = useState(true);
    const [showDate, setShowDate] = useState(0);
    const [bills, setBills] = useState<Bill[]>([]);

    const [day, setDay] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(0);

    // TAB ĐỔI MẬT KHẨU
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // TAB ĐỔI MẬT KHẨU

    // ĐƠN MUA
    const [orderStatus, setOrderStatus] = useState(0);
    // ĐƠN MUA
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

        const GetBill = async () => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bill?pageIndex=1&pageSize=10`, {
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
    }, []);

    function formatVND(amount: number): string {
        return amount.toLocaleString('vi-VN') ;
    }
    return(
        <div className={`w-full flex items-center justify-center bg-white`}>
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
                            <div onClick={()=>setActiveTab(1)} className={` ${activeTab == 1 ? "text-amber-600" : "text-stone-800"} select-none flex pl-[40px] h-[35px] items-center  font-sf text-[16px] `}>
                                Địa Chỉ
                            </div>
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
                        <div className={"flex h-[35px] pl-[15px] items-center"}>
                            <div className={"w-[25px] text-[20px]"}>
                                <HiOutlinePercentBadge/>
                            </div>
                            <p className={` ${activeTab == 5 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] `}>Kho Voucher </p>
                        </div>
                        <div onClick={()=> setActiveTab(6)} className={"flex h-[35px] pl-[15px] items-center"}>
                            <div className={"w-[25px] text-[20px]"}>
                                <HiOutlineWallet/>
                            </div>
                            <p className={` ${activeTab == 6 ? "text-amber-600" : "text-stone-800"} flex font-sf text-[16px] select-none`}>Ví BuyNow </p>
                        </div>
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
                            </div>
                            <div className={"col-span-5"}>
                                <div className={"h-[40px] w-full rounded-full"}>
                                    <input onChange={(e)=> setUerName(e.target.value)} type={"text"} value={userName} className={"w-full h-full border border-stone-200 font-sf rounded-full text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-full mt-[20px] rounded-full"}>
                                    <input onChange={(e)=> setUerName(e.target.value)} type={"text"} value={userName} className={"w-full h-full border border-stone-200 font-sf rounded-full text-stone-800 focus:outline-none px-[20px]"}/>
                                </div>
                                <div className={"h-[40px] w-full mt-[15px] flex items-center"}>
                                    <p className={"font-sf text-stone-800 text-[16px] mr-[15px]"}>ngviettrung2002@gmail.com</p>
                                    <p className={"font-sf text-amber-600 text-[15px] underline"}>Thay Đổi</p>
                                </div>
                                <div className={"h-[40px] w-full mt-[15px] flex items-center"}>
                                    <p className={"font-sf text-stone-800 text-[16px] mr-[15px]"}>{customer?.phoneNumber ? customer.phoneNumber : "Không có"}</p>
                                    <p className={"font-sf text-amber-600 text-[15px] underline"}>Thay Đổi</p>
                                </div>
                                <div className={"h-[40px] w-full mt-[15px] flex items-center"}>
                                    <div className={"flex items-center"}>
                                        <div onClick={()=> setGender(true)} className={"w-[16px] h-[16px] rounded-full border border-stone-300 flex items-center justify-center mr-[10px]"}>
                                            <div className={`${gender ? "bg-stone-600" : null} w-[10px] h-[10px] rounded-full`} ></div>
                                        </div>
                                        <p className={"font-sf text-stone-800 text-[16px]"}>Nam</p>
                                        <div onClick={()=>setGender(false)} className={"w-[16px] h-[16px] rounded-full border border-stone-300 flex items-center justify-center ml-[20px] mr-[10px]"}>
                                            <div className={`${!gender ? "bg-stone-600" : null} w-[10px] h-[10px] rounded-full`} ></div>
                                        </div>
                                        <p className={"font-sf text-stone-800 text-[16px]"}>Nữ</p>
                                    </div>
                                </div>
                                <div className={"h-[40px] w-full mt-[20px] flex items-center"}>
                                    <div className={"flex h-full w-[100px] bg-stone-200 px-[15px] items-center justify-between relative rounded-full"}>
                                        <p className={"font-sf text-[16px] text-stone-800"}>{day == 0 ? "Ngày" : day}</p>
                                        <HiOutlineChevronDown onClick={()=> setShowDate(showDate == 0 ? 1 : 0)} className={"text-[16px] text-stone-800"}/>
                                        {showDate == 1 ?
                                            <div className={"absolute w-[100px] h-[130px] left-[-1px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto"}>
                                                {Array.from({ length: 30 }).map((_, index) => (
                                                    <div key={index} onClick={()=> setDay(index + 1)} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">
                                                        {index + 1}
                                                    </div>
                                                ))}
                                            </div>
                                            : null}
                                    </div>

                                    <div className={"flex h-full w-[130px]  bg-stone-200 px-[15px] items-center justify-between relative ml-[10px] rounded-full"}>
                                        <p className={"font-sf text-[16px] text-stone-800"}>{month == 0 ? "Tháng" : month}</p>
                                        <HiOutlineChevronDown onClick={()=> setShowDate(showDate == 0 ? 2 : 0)} className={"text-[16px] text-stone-800"}/>
                                        {showDate == 2 ?
                                            <div className={"absolute w-[130px] h-[130px] left-[-1px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto"}>
                                                {Array.from({ length: 12 }).map((_, index) => (
                                                    <div key={index} onClick={()=>setMonth(index+1)} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">
                                                        Tháng {index + 1}
                                                    </div>
                                                ))}
                                            </div>
                                            : null}
                                    </div>
                                    <div className={"flex h-full w-[100px] bg-stone-200 px-[15px] items-center justify-between relative ml-[10px] rounded-full"}>
                                        <p className={"font-sf text-[16px] text-stone-800"}>{year == 0 ? "Năm" : year}</p>
                                        <HiOutlineChevronDown onClick={()=> setShowDate(showDate == 0 ? 3 : 0)} className={"text-[16px] text-stone-800"}/>
                                        {showDate == 3 ?
                                            <div className={"absolute w-[100px] h-[130px] left-[-1px] border border-stone-200 bottom-[-131px] bg-white overflow-y-auto"}>
                                                {Array.from({ length: 80 }).map((_, index) => (
                                                    <div key={index} onClick={()=> setYear(2025-index)} className=" px-[15px] py-[2px] bg-white border-stone-100 border-b font-sf text-[15px]">
                                                        {2025 - index}
                                                    </div>
                                                ))}
                                            </div>
                                            : null}
                                    </div>
                                </div>
                                <button className={"px-[25px] py-[8px] bg-amber-600 mt-[20px] hover:bg-stone-700 rounded-full"}>
                                    <p className={"font-sf text-stone-50 text-[15px]"}>Lưu</p>
                                </button>

                            </div>
                        </div>
                        <div className={"col-span-1 max-h-fit border-l border-stone-200 mt-[20px] flex items-center flex-col "}>
                            <div className={"border w-[100px] h-[100px] rounded-full overflow-hidden border-stone-200 flex items-center justify-center mt-[20px]"}>
                                <HiOutlineUser className={"text-[60px] text-stone-300"} />
                            </div>
                            <button className={"px-[15px] py-[8px] bg-stone-200 mt-[20px] rounded-full"}>
                                <p className={"font-sf text-stone-800 text-[15px] "}>Chọn Ảnh</p>
                            </button>
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

                                <button className={"px-[20px] py-[8px] bg-amber-600 mt-[20px] hover:bg-stone-700 rounded-full"}>
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
                                    <button className={"px-[20px] py-[8px] bg-amber-600 hover:bg-stone-700 rounded-full"}>
                                        <p className={"font-sf text-stone-50 text-[15px]"}>Mua Lại</p>
                                    </button>
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
