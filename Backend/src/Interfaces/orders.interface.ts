export interface Order {
    orderId: string;
    cartId: string;
    userId: string;
    totalPrice: number;  
    status: 'Pending' | 'Approved' | 'InTransit' | 'Completed';  
}