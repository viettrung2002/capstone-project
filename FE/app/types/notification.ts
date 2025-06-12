export interface INotification {
    notificationId: string;
    title: string;
    content: string;
    billId: string;
    customerId: string;
    read: boolean;
    createdDate: string;
}