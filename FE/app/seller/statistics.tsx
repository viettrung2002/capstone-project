export default function Statistics(){
    return(
        <div className={"w-full  grid grid-cols-3 gap-[20px] font-sf"}>
            <div className={"col-span-2"}>
                <div className={"w-full grid grid-cols-3 gap-x-[20px]"}>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-gray-600 text-[14px] mb-[5px]"}>TỔNG DOANH THU</p>
                        <p className={"text-gray-800 text-[24px] font-[700]"}>4340000223</p>
                        <p className={"text-gray-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                    </div>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-gray-600 text-[14px] mb-[5px]"}>ĐÃ BÁN</p>
                        <p className={"text-gray-800 text-[24px] font-[700]"}>4002</p>
                        <p className={"text-gray-600 text-[12px] mt-[5px]"}>từ trước tới hiện tại</p>
                    </div>
                    <div className={"col-span-1 bg-white rounded-[4px] shadow-md flex flex-col p-[10px]"}>
                        <p className={"text-gray-600 text-[14px] mb-[5px]"}>HOÀN THÀNH</p>
                        <p className={"text-gray-800 text-[24px] font-[700]"}>92%</p>
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