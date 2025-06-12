import {IProductInBill} from "@/app/types/product";

export interface Payload {
    totalPrice: number;
    voucherId?: string;
    shippingVoucherId?: string;
    shopVoucherId?: string;
    note?: string;
    items: IProductInBill[];
}