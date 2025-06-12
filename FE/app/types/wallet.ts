export interface IWallet {
    walletId: string;
    userId: string;
    balance: number;
    updateDate: string;
    walletNumber: string;
}

export interface ITransaction {
    transactionId: string;
    walletId: string;
    transactionType: string;
    amount: number;
    balanceAfter: number;
    description: string;
    createDate: string;
}