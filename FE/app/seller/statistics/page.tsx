'use client'
import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

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
import {TbChevronRight} from "react-icons/tb";
import Image from "next/image";
import {IShopStatisticData} from "@/app/types/shop";
import AlertMessage from "@/app/components/alert";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export default function Page(){
    const token = Cookies.get("token");
    const router = useRouter();

    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const inputStartDateRef = useRef<HTMLInputElement>(null);
    const inputEndDateRef = useRef<HTMLInputElement>(null);
    const [stattisticData, setStatisticData] = useState<IShopStatisticData>();
    const [openNotification, setOpenNotification] = useState<boolean>(false);

    const GetStatisticDataByDate = async () => {
        if(!token){
            router.push("/login");
            return;
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop/statistic?startDate=${startDate}&endDate=${endDate}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.ok) {
                const data = await response.json();
                setStatisticData(data.data);

            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
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

            const _labels : string[] = []
            const _values : number[] = []
            result.slice().reverse().forEach((item) => {
                const date = new Date(item.startDate);
                const label = `${date.getMonth() + 1}/${date.getFullYear()}`;
                _labels.push(label);
                _values.push(item.value);
            });
            setLabels(_labels);
            setValues(_values);
            console.log("RES",result);
            return result;
        }
        const GetStatisticData = async () => {
            if(!token){
                router.push("/login");
                return;
            }
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/shop/statistic`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    setStatisticData(data.data)
                }

            } catch (error) {
                console.log(error);
            }
        }
        GetStatisticData();
        getLast10Months();
    }, [router, token]);


    useEffect(() => {
        console.log(startDate)
    }, [startDate]);
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
        <div>
            {openNotification && (
                <AlertMessage message="Vui lòng chọn thời gian!" onClose={()=> setOpenNotification(false)}/>
            )}
            <div className={"h-[30px] w-full flex mb-[10px] items-center"}>
                <div className={"h-full relative"}>
                    <input
                        type={"date"}
                        ref={inputStartDateRef}
                        onChange={(e)=> setStartDate(e.target.value)}
                        className={"opacity-0 absolute pointer-events-none h-full"}
                        max={new Date().toISOString().split("T")[0]}
                    />
                    <button onClick={()=> inputStartDateRef.current?.showPicker()} className={"w-[160px] h-full  flex justify-center items-center bg-white shadow mr-[10px] rounded-[4px] text-[14px] font-sf"}>
                        <p>{startDate ? startDate : "Ngày Bắt Đầu"}</p>
                    </button>
                </div>
                <TbChevronRight/>
                <div className={"h-full relative ml-[10px]"}>
                    <input
                        type={"date"}
                        ref={inputEndDateRef}
                        onChange={(e)=> setEndDate(e.target.value)}
                        className={"opacity-0 absolute pointer-events-none h-full"}
                        min={startDate}
                        max={new Date().toISOString().split("T")[0]}
                    />
                    <button onClick={()=> {
                        if (startDate != "")
                            inputEndDateRef.current?.showPicker()
                        else alert("Vui lòng chọn ngày bắt đầu trước")
                    }} className={"w-[160px] h-full  flex justify-center items-center bg-white shadow mr-[10px] rounded-[4px] text-[14px] font-sf"}>
                        <p>{endDate ? endDate : "Ngày Kết Thúc"}</p>
                    </button>
                </div>
                <button onClick={()=>{
                    if (new Date(startDate) < new Date(endDate)) {
                        GetStatisticDataByDate()
                    } else setOpenNotification(true)
                }} className={"px-[20px] h-full ml-[5px] rounded-sm shadow flex justify-center items-center text-white bg-blue-500 text-[15px] font-sf"}>
                    <p>Lọc</p>
                </button>

            </div>
            <div className={"w-full  grid grid-cols-3 gap-[20px] font-sf"}>

                <div className={"col-span-2"}>

                    <div className={"w-full grid grid-cols-3 gap-x-[20px]"}>
                        <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                            <p className={"text-stone-600 text-[14px] mb-[5px]"}>TỔNG DOANH THU</p>
                            <p className={"text-stone-800 text-[24px] font-[700]"}>{stattisticData?.revenue}</p>
                            <p className={"text-stone-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                        </div>
                        <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                            <p className={"text-stone-600 text-[14px] mb-[5px]"}>ĐÃ BÁN</p>
                            <p className={"text-stone-800 text-[24px] font-[700]"}>{stattisticData?.sold}</p>
                            <p className={"text-stone-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                        </div>
                        <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                            <p className={"text-stone-600 text-[14px] mb-[5px]"}>HOÀN THÀNH</p>
                            <p className={"text-stone-800 text-[24px] font-[700]"}>{stattisticData?.completionRate && (stattisticData?.completionRate*100).toFixed(2)}%</p>
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
                        {stattisticData?.products.map((product, index) => (
                            <div key={product.productId} className={"w-full flex items-center h-[60px] mt-[8px] mb-[8px]"}>
                                <p className={"font-[600] w-[10px]  text-[15px] text-stone-600 mr-[10px] "}>{index+1}</p>
                                <div className={"h-[60px] aspect-square bg-stone-200 p-[5px]"}>
                                    <div className={"w-full h-full relative"}>
                                        <Image src={product.image} alt={"i"} fill={true}/>

                                    </div>
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
        </div>

    )
}