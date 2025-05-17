export interface Bill {
    billId: string;
    orderStatus: string;
    quantity: number;
    shopId: string;
    shopName: string;
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
}