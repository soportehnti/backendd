import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const isPasswordCorrect = await compare(plainPassword, hashedPassword);
    return isPasswordCorrect;
}
