import {SubCategory} from "@/app/types/ subCategory";
import {IProductInStatistic} from "@/app/types/product";
import {IAddressResponse} from "@/app/types/address";
import {IAccount} from "@/app/types/account";

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

export interface IShopStatisticData {
    revenue: number;
    sold: number;
    completionRate: number;
    products: IProductInStatistic[];
}
export interface IShopInfo {
    shopId?: string;
    shopName?: string;
    addressId?: string;
    address?: IAddressResponse;
    email?: string;
    avatar?: string;
    accountId?: string;
    account?: IAccount;
}
