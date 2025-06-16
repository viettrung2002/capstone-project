export interface ICustomer {
    accountId?: string;
    avatar?: string;
    email?: string;
    address?: string;
    birthDay?: string;
    customerId?: string;
    customerName?: string;
    gender?: boolean;
    phoneNumber?: string;
    interation?: string;
    account?: IAccount;
}

export interface ICustomerInAdminPage {
    accountId?: string;
    customerId?: string;
    customerName?: string;
    avatar?: string;
    phoneNumber?: string;
    totalSpending?: number;
    completeOrderCount?: number;
}

export interface IAccount {
    accountId: string;
    password: string;
    role: string;
    userName: string;
}