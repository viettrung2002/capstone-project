export default function VoucherManagementPage() {
    return (
        <div className={"w-full h-full p-[20px]"}>
            <div className={"w-full h-[40px] rounded-full  grid grid-cols-4 gap-[10px]"}>
                <div className={"col-span-1 h-full flex items-center justify-center rounded-full font-[500] bg-stone-200"}>Đang Hoạt Động</div>
                <div className={"col-span-1 h-full flex items-center justify-center rounded-full font-[500] bg-stone-200"}>Chưa Diễn Ra</div>
                <div className={"col-span-1 h-full flex items-center justify-center rounded-full font-[500] bg-stone-200"}>Đã Hết Hạn</div>
                <div className={"col-span-1 h-full flex items-center justify-center rounded-full font-[500] bg-stone-200"}>Tạo Voucher</div>
            </div>
        </div>
    )
}