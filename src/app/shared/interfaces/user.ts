export interface User {
    fullname: string;
    email: string;
    hashedPassword: string;
    role: string;
    city ? : string;
    phone ? : number;
}
