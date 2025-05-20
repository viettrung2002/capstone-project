import {useState, useEffect} from "react";
import {SubCategory} from "@/app/types/ subCategory";
import {HiChevronDown} from "react-icons/hi2";
import {HiOutlineSearch} from "react-icons/hi";
import {ProductInSeller} from "@/app/components/product";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {IProduct} from "@/app/types/product";

export default function ProductManagement({id} : {id: string }) {
    const router = useRouter();
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [subCategoryId, setSubCategoryId] = useState<string>("00000000-0000-0000-0000-000000000000");
    const [openCateMore, setOpenCateMore] = useState<boolean>(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [reload, setReload] = useState<boolean>(true);
    const token = Cookies.get("token");
    const GetSubCategory  = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop/subcategory/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setSubCategories(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(id)
        async function GetProduct() {

            console.log("Token:", token);
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/search`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        index: pageIndex,
                        shopId: id,
                        size:pageSize,
                        keyWord: searchQuery,
                        subCategoryId: subCategoryId,
                        // minPrice: Number(minPrice),
                        // maxPrice: Number(maxPrice),
                        // rating: rate,
                        // shopType: isMall,
                    })
                })
                const data = await response.json();
                console.log(data.data.items);
                setProducts(data.data.items);
            } catch (error) {
                console.log(error)
            }
        }
        GetProduct();
    }, [pageIndex, pageSize, searchQuery, subCategoryId, reload]);
    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }
        GetSubCategory();
    }, []);

    const DeleteProduct = async (id: string) => {
        console.log("Token:", token);
        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/delete/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            if (response.ok){
                const data = await response.json();
                console.log(data);
                setReload(!reload);
            }



        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>

            <div className={" h-[45px] bg-white border-t border-x border-gray-100 grid grid-cols-5"}>
                <div className={`${subCategoryId == "00000000-0000-0000-0000-000000000000" ? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-200 text-gray-800"} col-span-1 justify-center items-center flex`}>
                    <p onClick={()=> setSubCategoryId("00000000-0000-0000-0000-000000000000")} className={"font-sf text-gray-800 text-[15px]"}>Tất cả</p>
                </div>
                {subCategories?
                    <div className={"col-span-4 grid grid-cols-4"}>
                        {subCategories.length <= 4 ?
                            subCategories.slice(0,4).map(category => (

                                    <div key={category.subCategoryId} className={`${subCategoryId == category.subCategoryId? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-400 text-gray-800" } h-full col-span-1 justify-center items-center flex`} onClick={()=> {
                                        setSubCategoryId(category.subCategoryId)
                                    }}>
                                        <p className={"font-sf  text-[15px] select-none"}>{category.subCategoryName}</p>
                                    </div>
                                )
                            ) : subCategories.length > 4 ?

                                subCategories.slice(0,3).map((category) => (
                                        <div key={category.subCategoryId} className={`${subCategoryId == category.subCategoryId? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-400 text-gray-800" } col-span-1 justify-center items-center flex`} onClick={()=> {

                                            setSubCategoryId(category.subCategoryId)
                                        }}>
                                            <p className={"font-sf  text-[15px] select-none"}>{category.subCategoryName}</p>
                                        </div>
                                    )
                                ) :
                                subCategories.map((category) => (
                                        <div key={category.subCategoryId} className={`${subCategoryId == category.subCategoryId? "border-b-[2px] border-blue-500 text-blue-500" : "border-b-[2px] border-gray-400 text-gray-800" } col-span-1 justify-center items-center flex`} onClick={()=> {
                                            setSubCategoryId(category.subCategoryId)
                                        }}>
                                            <p className={"font-sf  text-[15px] select-none"}>{category.subCategoryName}</p>
                                        </div>
                                    )
                                )

                        }
                        {subCategories.length > 4 ?
                            <div onClick={()=> setOpenCateMore(!openCateMore)} className={"col-span-1 justify-center items-center flex relative"}>
                                <p className={` text-gray-800 font-sf text-[15px] mr-[5px] select-none`}>Thêm</p>
                                <HiChevronDown />
                                {openCateMore ? (
                                    <ul className={`absolute flex-col bg-gray-50 top-[40px] w-full overflow-hidden items-center border border-gray-200 shadow rounded-[4px]`}>

                                        {subCategories.slice(5,).map((category) => (
                                            <li onClick={()=> {
                                                setSubCategoryId(category.subCategoryId);
                                            }} key={category.subCategoryId} className={`flex text-gray-800 hover:bg-gray-600 hover:text-cl-button-text font-sf text-[15px] select-none h-[30px] items-center justify-center `}>{category.subCategoryName}</li>
                                        ))}

                                    </ul>
                                ) : null }
                            </div> : null}
                    </div> : null
                }

            </div>

            <div className={"w-full h-[40px] bg-white mt-[10px] flex items-center px-[10px] rounded-[8px] shadow-md"}>
                <HiOutlineSearch className={"text-[22px] mr-[10px] text-gray-700"}/>
                <input
                    value={searchQuery}
                    onChange={(e)=> setSearchQuery(e.target.value)}
                    type={"text"}
                    className={"flex-1 focus:outline-none pr-[10px] font-sf text-[15px] placeholder:text-gray-400 text-gray-800"}
                    placeholder={"Bạn có thể tìn kiếm theo tên sản phẩm"}/>
            </div>

            <div className={"w-full grid grid-cols-3 gap-[15px]  border-gray-200 mt-[20px]"}>
                {products.map((product) => (
                    <ProductInSeller key={product.productId} product={product} onDelete={DeleteProduct}/>
                ))}
            </div>
        </div>
    )
}