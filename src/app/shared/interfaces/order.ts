interface ProductInOrderSchema {
    count: number;
    productId: number;
}

enum States {
    NEW,
    SENT,
    CLOSED
}

export interface Order {
    No: number;
    userId: string;
    date: Date;
    state: States;
    products: [ProductInOrderSchema];
}
