'use client'
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {IProductData} from "@/app/types/product";
import {Bar} from "react-chartjs-2"
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export default function Page(){
    const token = Cookies.get("token");
    const router = useRouter();
    const [revenue, setRevenue] = useState<number>(0);
    const [sold, setSold] = useState(0);
    const [mostProduct, setMostProduct] = useState<IProductData[]>([]);
    const [complete, setComplete] = useState(0);
    const [dataChart, setDataChart] = useState<Record<string, number>>()
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);
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
                    result.push({
                        startDate: startDate.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0],
                        value: data.data,
                    });
                }
            } catch (err) {
                console.log(err);
            }

        }
         const transformed = result.reduce((acc, item) => {
             const date = new Date(item.startDate);
             const key = `${date.getMonth() + 1}/${date.getFullYear()}`; // ví dụ: "6/2025"
             acc[key] = item.value;
             return acc;
         }, {} as Record<string, number>);
         const _labels : string[] = []
         const _values : number[] = []
         result.slice().reverse().forEach((item) => {
             const date = new Date(item.startDate);
             const label = `${date.getMonth() + 1}/${date.getFullYear()}`;
             _labels.push(label);
             _values.push(item.value);
         });
         setDataChart(transformed);
         setLabels(_labels);
         setValues(_values);
         console.log("RES",result);
         return result;
    }
    useEffect(() => {
        GetData();
        getLast10Months();
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: "Doanh thu theo tháng",
                data: values,
                backgroundColor: "#3b82f6",
            },
        ],
    };
    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y;
                        if (value >= 1000000) {
                            return (value / 1000000).toFixed(1).replace(/\.0$/, '') + " tr";
                        }
                        else if (value >= 1000) {
                            return (value / 1000).toFixed(1).replace(/\.0$/, '') + " nghìn";
                        }
                        return value.toLocaleString("vi-VN") + " VND";
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        if (Number(value) >= 1000000) {
                            return (Number(value) / 1000000).toFixed(1).replace(/\.0$/, '') + " tr";
                        }
                        else if (Number(value) >= 1000) {
                            return (Number(value) / 1000).toFixed(1).replace(/\.0$/, '') + " nghìn";
                        }
                        return Number(value).toLocaleString("vi-VN");
                    },
                },
                title: {
                    display: false,
                    text: "Doanh thu (VND)",
                },
            },
            x: {
                title: {
                    display: false ,
                    text: "Tháng",
                },
            },
        },
    };
    return(
        <div className={"w-full  grid grid-cols-3 gap-[20px] font-sf"}>
            <div className={"col-span-2"}>
                <div className={"w-full grid grid-cols-3 gap-x-[20px]"}>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px]"}>TỔNG DOANH THU</p>
                        <p className={"text-stone-800 text-[24px] font-[700]"}>{revenue}</p>
                        <p className={"text-stone-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                    </div>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px]"}>ĐÃ BÁN</p>
                        <p className={"text-stone-800 text-[24px] font-[700]"}>{sold}</p>
                        <p className={"text-stone-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                    </div>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px]"}>HOÀN THÀNH</p>
                        <p className={"text-stone-800 text-[24px] font-[700]"}>{complete}%</p>
                        <p className={"text-stone-600 text-[12px] mt-[5px]"}>số đơn hàng</p>
                    </div>
                </div>

                <div className={"w-full mt-[20px] bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                    <Bar data={data} options={options} />
                </div>
                {/*<div className={"w-full mt-[20px] bg-white rounded-[4px] shadow-md flex flex-col p-[10px] h-[300px] mb-[20px]"}>*/}

                {/*</div>*/}
            </div>
            <div className={"col-span-1 max-h-fit"}>
                <div className={"w-full bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                    <p className={"font-[600] text-[15px] text-center"}>Sản Phẩm Bán Chạy</p>
                    <div className={"border-b border-stone-300 mt-[5px]"}></div>
                    {mostProduct.map((product, index) => (
                        <div key={product.productId} className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>
                            <p className={"font-[600] w-[10px]  text-[15px] text-stone-600 mr-[10px] "}>{index+1}</p>
                            <div className={"h-[60px] aspect-square bg-stone-200 "}>
                    
                            </div>
                            <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>
                                <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-stone-800"}>{product.productName}</p>
                                <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-stone-900"}>{product.price}</p>
                                <p className={"text-[13px] h-[13px] leading-[13px] text-stone-600"}>Đã bán {product.sold} sản phẩm</p>
                            </div>
                        </div>
                    ))}


                </div>
                {/*<div className={"w-full bg-white rounded-[4px] shadow-md flex flex-col p-[10px] mt-[20px]"}>*/}
                {/*    <p className={"font-[600] text-[15px] text-center"}>Sản Phẩm Ít Người Mua</p>*/}
                {/*    <div className={"border-b border-stone-300 mt-[5px]"}></div>*/}
                {/*    <div className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>*/}
                {/*        <p className={"font-[600] w-[10px]  text-[15px] text-stone-600 mr-[10px] "}>1</p>*/}
                {/*        <div className={"h-[60px] aspect-square bg-stone-200 "}>*/}

                {/*        </div>*/}
                {/*        <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>*/}
                {/*            <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-stone-800"}>IPhone 15 Pro Max</p>*/}
                {/*            <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-stone-900"}>503200000</p>*/}
                {/*            <p className={"text-[13px] h-[13px] leading-[13px] text-stone-600"}>Đã bán 5340 sản phẩm</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>*/}
                {/*        <p className={"font-[600] w-[10px]  text-[15px] text-stone-600 mr-[10px]"}>1</p>*/}
                {/*        <div className={"h-[60px] aspect-square bg-stone-200 "}>*/}

                {/*        </div>*/}
                {/*        <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>*/}
                {/*            <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-stone-800"}>IPhone 15 Pro Max</p>*/}
                {/*            <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-stone-900"}>503200000</p>*/}
                {/*            <p className={"text-[13px] h-[13px] leading-[13px] text-stone-600"}>Đã bán 5340 sản phẩm</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>*/}
                {/*        <p className={"font-[600] w-[10px]  text-[15px] text-stone-600 mr-[10px]"}>1</p>*/}
                {/*        <div className={"h-[60px] aspect-square bg-stone-200 "}>*/}

                {/*        </div>*/}
                {/*        <div className={"w-[calc(100%-80px)] h-full flex flex-col pl-[10px] text-[15px] py-[3px] justify-between"}>*/}
                {/*            <p className={"text-[14px] h-[14px] leading-[14px] font-[500] text-stone-800"}>IPhone 15 Pro Max</p>*/}
                {/*            <p className={"text-[16px] h-[16px] leading-[16px] font-[700] text-stone-900"}>503200000</p>*/}
                {/*            <p className={"text-[13px] h-[13px] leading-[13px] text-stone-600"}>Đã bán 5340 sản phẩm</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}