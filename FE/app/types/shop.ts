import {SubCategory} from "@/app/types/ subCategory";

export interface IShop {
    shopId: string;
    shopName: string;
}

export interface IShopInBill {
    shopId: string;
    shopName: string;
    shippingVoucherId: string;
    voucherId: string;
    totalPrice: number;
    note: string;
}

export interface IShopInShop {
    shopId: string,
    shopName: string,
    avatar: string,
    address: string,
    productCount: number,
    createdDate: string,
    isOfficial: boolean,
    rating: number,
    ratingCount: number,
    follower: number,
    categories: SubCategory[],
}

export interface IShopInAdminPage {
    shopId: string;
    shopName: string;
    avatar: string;
    revenue: number;
    billCount: number;
    productCount: number;
    status: string;
}