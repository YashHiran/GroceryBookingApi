import { Role } from "../utils/Role";

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role; 
}
