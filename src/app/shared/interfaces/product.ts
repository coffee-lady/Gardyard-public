export interface Product {
    _id: string;
    title: string;
    picture: string;
    description: string;
    inStock: number;
    rates: [number];
    vendorCode: string;
    cost: number;
}
