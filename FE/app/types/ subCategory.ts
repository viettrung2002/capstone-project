export interface SubCategory {
    subCategoryId: string;
    subCategoryName: string;
    categoryId: string;
}

export interface ICategory {
    categoryId: string;
    categoryName: string;
    imageUrl: string;
    subCategory: SubCategory[];
}

export interface ISubCategoryAttribure {
    attributeId: string;
    attributeName: string;
    dataType: string;
    unit: string;
}