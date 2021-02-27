import { DBType } from 'src/app/interfaces/common';

export interface User extends DBType {
    fullname: string;
    email: string;
    phone ? : number;
    role: string;
    city ? : string;
}
