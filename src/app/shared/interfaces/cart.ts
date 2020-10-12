interface ProductItem {
    productId: string;
    count: number;
}

export interface Cart {
    userId: string;
    products: [ProductItem];
}
