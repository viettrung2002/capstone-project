'use client'
import Image from "next/image";
import {HiOutlineUser} from "react-icons/hi2";
import Cookies from "js-cookie";
import {useEffect, useRef, useState} from "react";
import {ICustomer} from "@/app/types/account";
import {useRouter} from "next/navigation";
export default function ProfilePage() {

    const [customer, setCustomer] = useState<ICustomer>();
    const router = useRouter();
    const [reload, setReload] = useState<boolean>(false);
    const [userName, setUerName] = useState("ngviettrung2002");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);


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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

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
    return (
        <div className={` col-span-4 border border-stone-200 bg-white px-[20px] pb-[20px] relative rounded-[25px]`}>
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
    )
}