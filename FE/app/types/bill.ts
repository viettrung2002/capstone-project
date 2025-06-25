export interface Bill {
    billId: string;
    orderStatus: string;
    quantity: number;
    shopId: string;
    shopName: string;
    customerId: string;
    note: string;
    totalPrice: number;
    items: ItemInBill[];

}

export interface ItemInBill {
    billId: string;
    productId: string;
    itemId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    image: string;
}

export interface IBillInfo {
    billId: string;
    orderStatus: string;
    quantity: number;
    shopId: string;
    shopName: string;
    customerId: string;
    note: string;
    totalPrice: number;
    createDate: string;
    shippingVoucherId: string;
    shopVoucherId: string;
    voucherId: string;
    items: ItemInBill[];
    paymentType: string;

}