import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {IProductData} from "@/app/types/product";

export default function Statistics(){
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    const router = useRouter();
    const [revenue, setRevenue] = useState<number>(0);
    const [sold, setSold] = useState(0);
    const [mostProduct, setMostProduct] = useState<IProductData[]>([]);
    const [complete, setComplete] = useState(0);
    const GetData = async () => {
        if(!token){
            router.push("/login");
            return;
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop/doanh-thu`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.ok) {
                const data = await response.json();
                setRevenue(data.data);
            }
            const response1 = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop/sold`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data1 = await response1.json();
            setSold(data1.data);

            const response2 = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop/complete`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
                const data2 = await response2.json();
                console.log("data complete",data2.data);
                setComplete(Number((data2.data * 100).toFixed(2)));
            const response3 = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop/most-product?sort=true`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data3 = await response3.json();
            console.log(data3);
            setMostProduct(data3.data);
        } catch (error) {
            console.log(error);
        }
    }

     async function getLast10Months() {
        const result = [];
        const now = new Date();

        for (let i = 0; i < 10; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0); // last day of month
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop/doanh-thu?startDate=${startDate.toDateString()}&endDate=${endDate.toDateString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(`DOANH THU ${startDate.toDateString()} den ${endDate.toDateString()}`,data);
                }
            } catch (err) {
                console.log(err);
            }
            result.push({
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
            });
        }

        return result;
    }
    useEffect(() => {
        GetData();
        getLast10Months();
    }, []);
    return(
        <div className={"w-full  grid grid-cols-3 gap-[20px] font-sf"}>
            <div className={"col-span-2"}>
                <div className={"w-full grid grid-cols-3 gap-x-[20px]"}>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-gray-600 text-[14px] mb-[5px]"}>TỔNG DOANH THU</p>
                        <p className={"text-gray-800 text-[24px] font-[700]"}>{revenue}</p>
                        <p className={"text-gray-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                    </div>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-gray-600 text-[14px] mb-[5px]"}>ĐÃ BÁN</p>
                        <p className={"text-gray-800 text-[24px] font-[700]"}>{sold}</p>
                        <p className={"text-gray-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                    </div>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-gray-600 text-[14px] mb-[5px]"}>HOÀN THÀNH</p>
                        <p className={"text-gray-800 text-[24px] font-[700]"}>{complete}%</p>
                        <p className={"text-gray-600 text-[12px] mt-[5px]"}>số đơn hàng</p>
                    </div>
                </div>

                <div className={"w-full mt-[20px] bg-white rounded-[4px] shadow-md flex flex-col p-[10px] h-[300px]"}>

                </div>
                <div className={"w-full mt-[20px] bg-white rounded-[4px] shadow-md flex flex-col p-[10px] h-[300px] mb-[20px]"}>

                </div>
            </div>
            <div className={"col-span-1 max-h-fit"}>
                <div className={"w-full bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                    <p className={"font-[600] text-[15px] text-center"}>Sản Phẩm Bán Chạy</p>
                    <div className={"border-b border-gray-300 mt-[5px]"}></div>
                    {mostProduct.map((product, index) => (
                        <div key={product.productId} className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>
                            <p className={"font-[600] w-[10px]  text-[15px] text-gray-600 mr-[10px] "}>{index+1}</p>
                            <div className={"h-[60px] aspect-square bg-gray-200 "}>

                            </div>
                            <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>
                                <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-gray-800"}>{product.productName}</p>
                                <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-gray-900"}>{product.price}</p>
                                <p className={"text-[13px] h-[13px] leading-[13px] text-gray-600"}>Đã bán {product.sold} sản phẩm</p>
                            </div>
                        </div>
                    ))}


                </div>
                <div className={"w-full bg-white rounded-[4px] shadow-md flex flex-col p-[10px] mt-[20px]"}>
                    <p className={"font-[600] text-[15px] text-center"}>Sản Phẩm Ít Người Mua</p>
                    <div className={"border-b border-gray-300 mt-[5px]"}></div>
                    <div className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>
                        <p className={"font-[600] w-[10px]  text-[15px] text-gray-600 mr-[10px] "}>1</p>
                        <div className={"h-[60px] aspect-square bg-gray-200 "}>

                        </div>
                        <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>
                            <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-gray-800"}>IPhone 15 Pro Max</p>
                            <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-gray-900"}>503200000</p>
                            <p className={"text-[13px] h-[13px] leading-[13px] text-gray-600"}>Đã bán 5340 sản phẩm</p>
                        </div>
                    </div>
                    <div className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>
                        <p className={"font-[600] w-[10px]  text-[15px] text-gray-600 mr-[10px]"}>1</p>
                        <div className={"h-[60px] aspect-square bg-gray-200 "}>

                        </div>
                        <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>
                            <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-gray-800"}>IPhone 15 Pro Max</p>
                            <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-gray-900"}>503200000</p>
                            <p className={"text-[13px] h-[13px] leading-[13px] text-gray-600"}>Đã bán 5340 sản phẩm</p>
                        </div>
                    </div>
                    <div className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>
                        <p className={"font-[600] w-[10px]  text-[15px] text-gray-600 mr-[10px]"}>1</p>
                        <div className={"h-[60px] aspect-square bg-gray-200 "}>

                        </div>
                        <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>
                            <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-gray-800"}>IPhone 15 Pro Max</p>
                            <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-gray-900"}>503200000</p>
                            <p className={"text-[13px] h-[13px] leading-[13px] text-gray-600"}>Đã bán 5340 sản phẩm</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}