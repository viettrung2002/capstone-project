export default function Nof({text, onClose}: { text: string, onClose: () => void }) {
    return (
        <div className={"fixed top-[10px] right-[10px]  rounded-[20px] bg-white font-sf flex flex-col items-center  pb-[5px] z-50"}>
            <div className={"h-[30px] border-b px-[20px] flex items-center w-full"}>
                Thông báo
            </div>
            <div className={"px-[20px] py-[10px]"}>
                {text}
            </div>
            <div onClick={onClose} className={"px-[20px] border bg-amber-600 text-white flex items-center justify-center relative h-[30px] w-[100px] rounded-full mr-[10px] z-50"}>
                OK
            </div>
        </div>

    )
}