import { Binary } from '@angular/compiler';
import { Currency } from './currency';

interface CareItem {
    title: string;
    text: string;
}

export interface Plant {
    title: string;
    picture: string;
    description: string;
    cultivation: string;
    care: [CareItem];
    inStock: number;
    rates: [number];
    vendorCode: string;
    numberOfSeeds: number;
    cost: Currency;
}
