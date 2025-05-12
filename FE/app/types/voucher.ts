export interface IVoucher {
    voucherId: string;
    voucherName: string;
    startTime: string;
    endTime: string;
    value: number;
    quantity: number;
    minPrice: number;
    maxPrice: number;
    adminId: string;
    shopId: string;
    role: string;

}

export interface IVoucherW {
    voucherWalletId: string;
    customerId: string;
    quantity: number;
    voucherId: string;
    voucher: IVoucher;
}