import Image from "next/image";

type CategoryFeature = {
    id: number;
    category: string[];
    image: string;
};
export default function FeatureCategories({category}:{category: CategoryFeature}) {
    return (
        <div className={`col-span-1 border border-gray-300 h-[250px] flex flex-row items-center pr-[10px] pt-[30px] pb-[30px] pl-[35px] justify-between bg-white`}>
            <ul className={` h-full`}>
                <li className={`font-fre font-[500] text-[22px] text-gray-800`}>{category.category[0]}</li>
                <li className={`font-fre font-[400] text-[17px] text-gray-500 hover:text-cl-hover-text hover:ml-[4px] select-none transition-all duration-200 ease-in-out mt-[10px]`}>{category.category[1]}</li>
                <li className={`font-fre font-[400] text-[17px]  text-gray-500 hover:text-cl-hover-text hover:ml-[4px] select-none transition-all duration-200 ease-in-out`}>{category.category[2]}</li>
                <li className={`font-fre font-[400] text-[17px] text-gray-500 hover:text-cl-hover-text hover:ml-[4px] select-none transition-all duration-200 ease-in-out`}>{category.category[3]}</li>
                <li className={`font-fre font-[400] text-[17px] text-gray-500 hover:text-cl-hover-text hover:ml-[4px] select-none transition-all duration-200 ease-in-out`}>{category.category[4]}</li>
                <li className={`font-fre font-[400] text-[17px] text-gray-500 hover:text-cl-hover-text hover:ml-[4px] select-none transition-all duration-200 ease-in-out`}>See all</li>
            </ul>
            <div className={`h-[200px] w-[200px] flex items-center ml-auto `}>
                <Image src={category.image} alt={"image"} width={200} height={200} className={"object-contain"} />
            </div>

        </div>
    )
}