import { Product } from './product';

interface CareItem {
    title: string;
    text: string;
}

export interface Plant extends Product {
    cultivation: string;
    care: [CareItem];
    numberOfSeeds: number;
}
