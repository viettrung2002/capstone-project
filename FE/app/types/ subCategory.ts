export interface SubCategory {
    subCategoryId: string;
    subCategoryName: string;
    categoryId: string;
}

export interface ICategory {
    categoryId: string;
    categoryName: string;
    subCategory: SubCategory[];
}