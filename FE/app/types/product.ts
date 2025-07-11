export interface IProduct {
    productId: string;
    productName: string;
    subCategoryName: string;
    price: number;
    mainImage: string;
    discount: number;
    sold: number;
    rating: number;
    reviewCount: number;
    inventory: number;
}
export interface IProductData {
    productId: string;
    productName: string;
    categoryName: string;
    subCategoryId: string;
    like: number;
    shopId: string;
    shopName: string;
    price: number;
    mainImage: string;
    extraImage: string;
    sold: number;
    createDate: string;
    rating: number;
    discount: number;
    specifications: Record<string, string>;
    isFlashSale: boolean;
    reviewCount: number;
    inventory: number;
    description: string;
    extraImages: IImage[];
}
export interface IImage {
    imageId: string;
    productId: string;
    imageUrl: string;
}
export interface IProductInCart {
    activate: boolean;
    customerId: string;
    itemId: string;
    price: number;
    productId: string;
    productImage: string;
    productName: string;
    quantity: number;
    shippingVoucherId: string;
    shopId: string;
    shopName: string;
    voucherId: string;
}

export interface IProductInBill {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
}

export interface IProductInCompare {
    id: string;
    name?: string;
    picture: string;
}

export interface IProductInStatistic {
    productId: string;
    productName: string;
    price: number;
    sold: number;
    image: string;
}