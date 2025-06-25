'use client'
import {useState, useEffect} from "react";
import {SubCategory} from "@/app/types/ subCategory";
import {HiChevronDown} from "react-icons/hi2";
import {HiOutlineSearch} from "react-icons/hi";
import {ProductInSeller} from "@/app/components/product";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {IProduct, IProductData} from "@/app/types/product";


export default function Page() {
    const router = useRouter();
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [subCategoryId, setSubCategoryId] = useState<string>("00000000-0000-0000-0000-000000000000");
    const [openCateMore, setOpenCateMore] = useState<boolean>(true);
    const pageIndex = 0
    const pageSize = 1000
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [reload, setReload] = useState<boolean>(true);
    const [openUpdateProduct, setOpenUpdateProduct] = useState<boolean>(false);
    const token = Cookies.get("token");
    const id = Cookies.get("id");
    const [activeTab, setActiveTab] = useState(0)
    const [product, setProduct] = useState<IProductData | null>(null)


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
    }, [pageIndex, pageSize, searchQuery, subCategoryId, reload, id, router, token]);

    async function GetProductById (id: string) {

        try {
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/product/get/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log("product: ",data);
            setProduct(data);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }
        const GetSubCategory  = async () => {
            if (id == null) {
                router.push("/login");
                return;
            }
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
        GetSubCategory();
    }, [id, router, token]);

    const HandleClickEdit = (id: string) => {
        setOpenUpdateProduct(true);
        GetProductById(id)
    }
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
    useEffect(() => {
        console.log(product)
    }, [product]);
    return (
        <div className="h-full">
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
                    <ProductInSeller key={product.productId} product={product} onDelete={DeleteProduct} onClickEdit = {HandleClickEdit}/>
                ))}
            </div>
            {
                openUpdateProduct && (
                    <div className={`w-screen h-screen fixed top-0 right-0 bg-stone-800/20 flex justify-center items-center z-30 font-sf`}>
                        <div className={"w-[800px] h-[1000px] bg-white rounded-[25px] flex flex-col overflow-hidden pb-[20px]"}>
                            <div className={"h-[50px] flex items-center justify-center relative border-b border-stone-200"}>
                                <p>
                                    Chỉnh Sửa Sản Phẩm
                                </p>
                                <button onClick={()=>setOpenUpdateProduct(false)} className={"absolute right-[20px]"}>X</button>
                            </div>
                            <div className={"w-full h-[40px] flex justify-center items-center mt-[20px]"}>
                                <button onClick={()=>setActiveTab(0)} className={`h-full w-[220px] flex items-center justify-center rounded-full mr-[10px] text-[15px] font-[400] ${activeTab == 0 ? "bg-amber-600 text-white" : "bg-stone-200"}`}>
                                    Thông Tin Cơ Bản
                                </button>
                                <button onClick={()=>setActiveTab(1)} className={`h-full w-[220px] flex items-center justify-center rounded-full text-[15px] font-[400] ${activeTab == 1 ? "bg-amber-600 text-white" : "bg-stone-200"}`}>
                                    Thông Số Kĩ Thuật
                                </button>
                            </div>
                            <div className={"flex-1 mt-[20px] overflow-y-auto"}>
                                {product && activeTab == 0?
                                    (
                                        <div className={"w-full mt-[20px]"}>
                                            <div className={"w-full flex flex-col items-center justify-center font-sf"}>
                                                <div className="w-[130px] h-[130px] bg-stone-200 rounded-[25px] p-[10px]">

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
                                                        <div className={"h-[40px] flex items-center justify-center text-gray-800 text-[15px] mt-[20px]"}>
                                                            <p>Mô Tả</p>
                                                        </div>

                                                    </div>
                                                    <div className={"col-span-4 pr-[20px]"}>
                                                        <div className={"h-[40px] w-4/5 border border-gray-200  px-[10px] pr-[5px] flex flex-col items-center justify-between rounded-[8px] relative "}>
                                                            <div className={"flex justify-between w-full items-center h-full "}>
                                                                <p className={"text-[15px]"}>{product.categoryName}</p>
                                                            </div>

                                                        </div>
                                                        <input
                                                            type={"text"}
                                                            value={product.productName}
                                                            onChange={(e)=>
                                                                setProduct(prev => {
                                                                    if (!prev) return null;
                                                                    return {
                                                                        ...prev,
                                                                        productName: e.target.value
                                                                    };
                                                                })
                                                            }
                                                            className={"h-[40px] w-full border border-gray-200 focus:outline-none rounded-[8px] text-[15px] mt-[20px] px-[10px]"}
                                                        />

                                                        <div className={"h-[40px] mt-[20px] flex items-center"}>
                                                            <input
                                                                type={"number"}
                                                                value={product.price}
                                                                onChange={(e)=> setProduct(prev => {
                                                                    if (!prev) return null;
                                                                    return {
                                                                        ...prev,
                                                                        price: Number(e.target.value)
                                                                    };
                                                                })}
                                                                className={"h-[40px] w-2/5 border border-gray-200 focus:outline-none rounded-[8px] text-[15px]  px-[10px]"}
                                                            />
                                                            <p className={"text-[15px] ml-[10px] text-gray-600"}>VND</p>
                                                        </div>
                                                        <textarea
                                                            value={product.description}
                                                            onChange={(e) => setProduct(prev => {
                                                                if (!prev) return null;
                                                                return {
                                                                    ...prev,
                                                                    description: e.target.value
                                                                };
                                                            })}
                                                            className={"h-[120px] w-full border border-gray-200 focus:outline-none rounded-[8px] text-[15px] mt-[20px] px-[10px] py-[10px]"}
                                                        />
                                                        <button className={"w-[170px] h-[40px] rounded-full bg-blue-500 flex justify-center items-center text-white mt-[20px]"} >Cập Nhật Sản Phẩm</button>



                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                    (product && activeTab == 1) ?
                                        (
                                            <div className="flex flex-col flex-1 px-[30px] pt-[10px]">
                                                {product? Object.entries(product.specifications).map(([key,value], index) => (
                                                    <div key={index} className="h-[40px] w-full  rounded-full  pr-[10px] mt-[8px] items-center grid grid-cols-8 px-[20px] gap-[20px]">

                                                        <div className={"col-span-3 flex items-center justify-end"}>
                                                            <p  className={"text-[15px] font-[500] "}>{key}:</p>
                                                        </div>
                                                        <div className="h-full flex items-center font-sf text-[15px] text-stone-600 col-span-5">
                                                            <p>{value == "true" ? "Có" : value == "false" ? "Không" : value}</p>
                                                        </div>
                                                    </div>
                                                )) : null}
                                            </div>
                                        )
                                        : (
                                            <div>loading</div>
                                        )

                                }
                            </div>


                        </div>
                    </div>
                )
            }

        </div>
    )
}