import { DBType } from 'app/frontend/src/interfaces/common';

export interface User extends DBType {
    fullname: string;
    email: string;
    phone ? : number;
    role: string;
    city ? : string;
}
