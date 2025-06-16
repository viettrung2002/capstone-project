'use client'
import {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {AdminData} from "@/app/types/admin";
import {Bar} from "react-chartjs-2";
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
export default function Overview() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminData>()
    const [dataChart, setDataChart] = useState<Record<string, number>>()
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);
    const GetData = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setAdminData(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }




    async function getLast10Months() {
        const result = [];
        const now = new Date();
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        for (let i = 0; i < 10; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0); // last day of month
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/admin/revenue?startDate=${startDate.toDateString()}&endDate=${endDate.toDateString()}`, {
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
        getLast10Months()
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
    return (
        <div className={"w-full h-full p-[20px]"}>
            <div className={"h-[30px] w-full flex mb-[10px]"}>
                <button className={"h-full w-[140px] flex justify-center items-center bg-stone-200 rounded-full text-[15px] mr-[10px]"}>
                    Ngày Bắt Đầu
                </button>
                <button className={"h-full w-[140px] flex justify-center items-center bg-stone-200 rounded-full text-[15px]"}>
                    Ngày Bắt Đầu
                </button>

            </div>
            <div className={"w-full grid grid-cols-4 gap-[20px]"}>
                <div className={"col-span-4 grid grid-cols-5 gap-[10px]"}>
                    <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Tổng số shop</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.shopCount}0</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số lượng người dùng</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.customerCount}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số bill hoàn thành</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.billCount}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Tổng doanh thu</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.revenue}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                    <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số lượng sản phẩm</p>
                        <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.productCount}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Trên toàn hệ thống</p>
                    </div>
                </div>
                <div className={"col-span-4 bg-stone-100 rounded-[25px] "}>
                    <Bar data={data} options={options} />
                </div>
            </div>

        </div>
    )
}