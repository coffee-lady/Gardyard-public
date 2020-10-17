export interface User {
    _id ? : string;
    fullname: string;
    email: string;
    hashedPassword: string;
    role: string;
    city ? : string;
    phone ? : number;
}
