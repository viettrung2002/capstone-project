import {HiChevronDown, HiChevronUp} from "react-icons/hi2";
import {useState, useEffect, useRef} from "react";
import {ICategory, ISubCategoryAttribure, SubCategory} from "@/app/types/ subCategory";
import Cookies from "js-cookie";
import {useParams, useRouter} from "next/navigation";
import Image from "next/image";
export default function CreateProduct() {
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
    const [subCategoryAttributes, setSubCategoryAttributes] = useState<ISubCategoryAttribure[]>([]);
    const [productName, setProductName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const router = useRouter();
    const [spec, setSpec] = useState<Record<string, string>>({})
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [urlImage, setUrlImage] = useState("")
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
            setUrlImage(data.imageUrl);
            alert(`Upload thành công! URL: ${data.imageUrl}`);
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Upload thất bại');
        } finally {
            setUploading(false);
        }
    };
    async function GetCategoryFeature() {

        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/categories`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            console.log("Category",data.data);
            setCategories(data.data);

        } catch (error) {
            console.log(error)
        }
    }

    const GetSubCategoryAttribute = async (id : string) => {
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/attribute/${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Attribute",data);
                setSubCategoryAttributes(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const CreateProduct = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login")
            return;
        }
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/recommend`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productName: productName,
                    subCategoryId: selectedSubCategory?.subCategoryId,
                    price: price,
                    mainImage: urlImage,
                    extraImage: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1645585904.11171995.png",
                    specifications: spec,
                })
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Product",data);
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{

       GetCategoryFeature();
    },[])

    useEffect(()=>{
        console.log(JSON.stringify(spec));
    },[spec])
    return (
        <div className={"w-full bg-white border border-gray-200 py-[20px] grid grid-cols-2 font-sf text-gray-800"}>
            <div className={"col-span-1 border-r border-gray-200 flex flex-col"}>
                {/*HINH ANH*/}
                <div className={"w-full flex items-center justify-center font-sf"}>
                    <div className={"w-[120px] h-[120px] bg-gray-200 mr-[15px] relative"}>
                        {previewUrl && (
                            <Image src={previewUrl} fill={true} alt="Preview"  />
                        )}
                    </div>
                    <div className={"flex items-center flex-col justify-center"}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <button onClick={() => fileInputRef.current?.click()} className={"px-[15px] py-[5px] bg-blue-500 text-gray-50 text-[15px] hover:shadow-md mt-[5px]"}>
                            <p>Chọn Ảnh</p>
                        </button>
                        <button onClick={handleUpload}
                                disabled={uploading}
                                className={"px-[15px] py-[5px] bg-blue-500 text-gray-50 text-[15px] hover:shadow-md mt-[5px]"}>
                            <p>{uploading ? 'Đang tải ...' : 'Tải lên'}</p>
                        </button>
                        <p className={"text-gray-600 text-[14px] mt-[10px]"}>Dung lượng tối đa 5 MB</p>
                        <p className={"text-gray-600 text-[14px]"}>Định Dạng: .JPEG, .PNG</p>
                        <p className={"text-gray-600 text-[14px]"}>Tỉ lệ hình ảnh: 1x1</p>
                    </div>
                </div>

                <div className={"w-full grid grid-cols-6 mt-[20px] gap-[20px]"}>
                    <div className={"col-span-2  flex-col flex items-end"}>
                        <div className={"h-[40px] flex items-center justify-center text-gray-800 text-[15px] "}>
                            <p>Danh Mục</p>
                        </div>
                        <div className={"h-[40px] flex items-center justify-center text-gray-800 text-[15px] mt-[20px]"}>
                            <p>Tên Sản Phẩm</p>
                        </div>

                        <div className={"h-[40px] flex items-center justify-center text-gray-800 text-[15px] mt-[20px]"}>
                            <p>Giá tiền</p>
                        </div>

                    </div>
                    <div className={"col-span-4 pr-[20px]"}>
                        <div className={"h-[40px] w-4/5 border border-gray-200  px-[10px] pr-[5px] flex flex-col items-center justify-between rounded-[8px] relative "}>
                            <div className={"flex justify-between w-full items-center h-full "}>
                                <p className={"text-[15px]"}>{selectedSubCategory?.subCategoryName}</p>
                                <button onClick={()=>setOpenCategory(!openCategory)} className={"flex justify-center items-center h-[30px] aspect-square rounded-[5px] bg-gray-200"}>
                                    {!openCategory? <HiChevronDown/> : <HiChevronUp/>}

                                </button>
                            </div>

                            <div className={`${openCategory ? "block" : "hidden"} overflow-hidden w-[calc(100%+2px)] rounded-[8px] absolute top-[40px] border border-gray-200 left-[-1px]`}>
                                <div className={"  h-[200px]  bg-white   overflow-hidden overflow-y-auto "}>
                                    {
                                        categories.map((category)=>
                                            <ul className={"bg-white"} key={category.categoryId}>
                                                <li className={`bg-gray-200 h-[35px] flex items-center text-[15px] text-gray-800 font-[600] px-[10px] sticky top-0 select-none`}>{category.categoryName}</li>
                                                {category.subCategory.map((subCategory) => (
                                                    <li
                                                        key={subCategory.subCategoryId}
                                                        className={"text-[15px] text-gray-700 flex items-center h-[30px] px-[10px] border-b border-gray-200 select-none"}
                                                        onClick={()=> {
                                                            setSelectedSubCategory(subCategory);
                                                            GetSubCategoryAttribute(subCategory.subCategoryId)
                                                        }}
                                                    >
                                                        {subCategory.subCategoryName}
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                        <input
                            type={"text"}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className={"h-[40px] w-full border border-gray-200 focus:outline-none rounded-[8px] text-[15px] mt-[20px] px-[10px]"}
                        />

                        <div className={"h-[40px] mt-[20px] flex items-center"}>
                            <input
                                type={"number"}
                                value={price}
                                onChange={(e)=> setPrice(Number(e.target.value))}
                                className={"h-[40px] w-2/5 border border-gray-200 focus:outline-none rounded-[8px] text-[15px]  px-[10px]"}
                            />
                            <p className={"text-[15px] ml-[10px] text-gray-600"}>VND</p>
                        </div>



                    </div>
                </div>
            </div>
            <div className={"col-span-1 grid grid-cols-8 gap-[20px] px-[20px]"}>
                <div className={"col-span-3 "}>
                    {subCategoryAttributes.map((attribute)=>
                        <div key={attribute.attributeId} className={"h-[40px] mt-[10px] flex justify-end items-center text-[15px]"}>
                            <p>{attribute.attributeName}</p>
                        </div>
                    )}
                </div>
                <div className={"col-span-5 pr-[20px]"}>
                    {subCategoryAttributes.map((attribute)=>
                        <div key={attribute.attributeId} className={"h-[40px] mt-[10px] flex justify-end items-center text-[15px]"}>
                            {
                                attribute.dataType == "Integer" ?
                                    <div className={"w-full h-full flex items-center"}>
                                        <input
                                            type={"text"}
                                            onChange={(e)=>
                                                setSpec(prev => ({
                                                ...prev,
                                                [attribute.attributeName]: e.target.value,
                                            }))}
                                            value={spec[attribute.attributeName] || ""}
                                            className={"w-3/5 h-full border border-gray-200 focus:outline-none rounded-[8px] text-[15px] px-[10px]"}
                                        />
                                        <p className={"text-gray-600 text-[15px] ml-[10px]"}>{attribute.unit}</p>
                                    </div>

                                    : attribute.dataType == "String" ?
                                        <div className={"w-full h-full flex items-center"}>
                                            <input
                                                onChange={(e)=>
                                                    setSpec(prev => ({
                                                        ...prev,
                                                        [attribute.attributeName]: e.target.value,
                                                    }))}
                                                value={spec[attribute.attributeName] || ""}
                                                type={"text"}
                                                className={"flex-1 h-full border border-gray-200 focus:outline-none rounded-[8px] text-[15px] px-[10px]"}
                                            />

                                            {attribute.unit? <p className={"text-gray-600 text-[15px] ml-[10px]"}>{attribute.unit}</p> : null}

                                        </div>
                                        :
                                            <div className={"w-full h-full flex items-center"}>
                                                <div className={" h-full flex items-center px-[10px] "}>
                                                    <div onClick={()=>
                                                        setSpec(prev => ({
                                                        ...prev,
                                                        [attribute.attributeName]: "true",
                                                    }))} className={"h-[18px] w-[18px] rounded-full border border-gray-400 flex items-center justify-center"}>
                                                        <div className={`${spec[attribute.attributeName] == "true" ? "bg-gray-400" : null} h-[12px] w-[12px] rounded-full`}></div>
                                                    </div>
                                                    <p className={"text-[15px] ml-[5px]"}>Có</p>
                                                </div>
                                                <div className={" h-full flex items-center px-[10px] "}>
                                                    <div onClick={()=>
                                                        setSpec(prev => ({
                                                        ...prev,
                                                        [attribute.attributeName]: "false",
                                                    }))} className={"h-[18px] w-[18px] rounded-full border border-gray-400 flex items-center justify-center"}>
                                                        <div className={`h-[12px] w-[12px] rounded-full ${spec[attribute.attributeName] == "false" ? "bg-gray-400" : null}`}></div>
                                                    </div>
                                                    <p className={"text-[15px] ml-[5px]"}>Không</p>
                                                </div>
                                            </div>
                            }
                        </div>
                    )}
                </div>
            </div>

            <button onClick={()=> CreateProduct()}>HEHEHHE</button>
        </div>
    )
}