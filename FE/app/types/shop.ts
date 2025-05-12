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