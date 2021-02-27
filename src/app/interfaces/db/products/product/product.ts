import { DBType } from 'src/app/interfaces/common';

export interface Product extends DBType {
    title: string;
    picture: string;
    description: string;
    inStock: number;
    rates: [number];
    vendorCode: string;
    cost: number;
}
