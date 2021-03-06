import { DBType } from 'app/frontend/src/interfaces/common';

export interface Contacts extends DBType {
    title: string;
    latitude: number;
    longitude: number;
}
