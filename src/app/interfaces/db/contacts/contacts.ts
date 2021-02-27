import { DBType } from 'src/app/interfaces/common';

export interface Contacts extends DBType {
    title: string;
    latitude: number;
    longitude: number;
}
