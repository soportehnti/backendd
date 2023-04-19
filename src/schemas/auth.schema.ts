import { z } from "zod";
import { User } from "../models/user.model";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
}).required();

export const SignUpSchema = z.object({
    first_name: z.string().min(2).max(25),
    last_name: z.string().min(2).max(25),
    username: z.string().min(2).max(25),
})
