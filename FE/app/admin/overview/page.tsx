'use client'
import {useState, useEffect, useRef} from "react";
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
import {TbChevronRight} from "react-icons/tb";
import AlertMessage from "@/app/components/alert";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export default function Overview() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminData>()
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const inputStartDateRef = useRef<HTMLInputElement>(null);
    const inputEndDateRef = useRef<HTMLInputElement>(null);
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [isDateValid, setDateValid] = useState<boolean>(false);

    const GetDataByDate = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin?startDate=${startDate}&endDate=${endDate}`, {
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
                setDateValid(true);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
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
        GetData();
        getLast10Months()
    }, [router]);
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
                    <button onClick={()=> inputStartDateRef.current?.showPicker()} className={"h-full w-[140px] flex justify-center items-center bg-stone-200 rounded-full text-[15px] mr-[5px]"}>
                        {startDate != "" ? startDate: "Ngày Bắt Đầu"}
                    </button>
                </div>
                <TbChevronRight/>
                <div className={"h-full relative ml-[5px]"}>
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
                    }} className={"h-full w-[140px] flex justify-center items-center bg-stone-200 rounded-full text-[15px]"}>
                        {endDate != "" ? endDate: "Ngày Kết Thúc"}
                    </button>
                </div>
                <button onClick={()=>{
                    if (new Date(startDate) < new Date(endDate)) {
                        GetDataByDate()
                    } else setOpenNotification(true)
                }} className={"px-[20px] h-full ml-[5px] rounded-full shadow flex justify-center items-center text-white bg-amber-600 text-[15px] font-sf"}>
                    <p>Lọc</p>
                </button>
            </div>
            <div className={"w-full grid grid-cols-4 gap-[20px]"}>
                <div className={"col-span-4 grid grid-cols-3 gap-[10px]"}>
                    <div className={"col-span-1 grid grid-cols-1 gap-[10px]"}>
                        <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số tài khoản shop được tạo</p>
                            <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.shopCount}0</p>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>{isDateValid ? `Từ ${startDate} đến ${endDate}` : "Trên toàn hệ thống"}</p>
                        </div>
                        <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số tài khoản người dùng được tạo</p>
                            <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.customerCount}</p>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>{isDateValid ? `Từ ${startDate} đến ${endDate}` : "Trên toàn hệ thống"}</p>
                        </div>
                    </div>
                    <div className={"col-span-1 grid grid-cols-1 gap-[10px]"}>
                        <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số bill hoàn thành</p>
                            <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.billCount}</p>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>{isDateValid ? `Từ ${startDate} đến ${endDate}` : "Trên toàn hệ thống"}</p>
                        </div>
                        <div className={"col-span-1 bg-stone-200 rounded-[25px] h-[100px] flex flex-col justify-between py-[10px] px-[20px]"}>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Số lượng sản phẩm</p>
                            <p className={"text-amber-600 text-[24px] font-[700] flex items-center"}>{adminData?.productCount}</p>
                            <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>{isDateValid ? `Từ ${startDate} đến ${endDate}` : "Trên toàn hệ thống"}</p>
                        </div>
                    </div>
                    <div className={"col-span-1 bg-stone-200 rounded-[25px] flex flex-col justify-between py-[10px] px-[20px]"}>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>Tổng doanh thu</p>
                        <p className={"text-amber-600 text-[36px] font-[700] flex items-center"}>{adminData?.revenue}</p>
                        <p className={"text-stone-600 text-[14px] mb-[5px] flex items-center"}>{isDateValid ? `Từ ${startDate} đến ${endDate}` : "Trên toàn hệ thống"}</p>
                    </div>
                </div>
                <div className={"col-span-4 bg-stone-100 rounded-[25px] "}>
                    <Bar data={data} options={options} />
                </div>
            </div>

        </div>
    )
}