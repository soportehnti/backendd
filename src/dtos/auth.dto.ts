export { CreateUserDTO, UpdateUserDTO } from "./user.dto";

export interface SignInDTO {
    email: string;
    password: string;
    username?: string;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}
