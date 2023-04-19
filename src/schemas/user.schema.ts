import { z } from "zod";
import { User } from "../models/user.model";
const GenericStringContraint = z.string().min(2).max(25).optional();

const password = z
    .string()
    .min(8, "Must be at least 8 characters in length")
    .max(100, "Must be at most 100 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character")
    .optional();

export const UserSchema = z.object({
    id: z.string().cuid().optional(),
    updated_at: z.date().optional(),
    created_at: z.date().optional(),
    created_by: z.string().optional(),
    disabled_by: z.string().optional(),

    first_name: GenericStringContraint,
    last_name: GenericStringContraint,
    username: GenericStringContraint,
    phone_number: z.string().min(6).max(22).optional(),
    email: z.string().email().optional(),
    password,
    type: z.enum(["admin", "agent", "user"]).optional(),
    avatar_url: z.string().url().optional(),
    bio: z.string().optional(),
    is_verified: z.boolean().optional(),
    is_enabled: z.boolean().optional(),

    client_id: z.string().cuid().optional(),
    role_id: z.string().cuid().optional(),
})

export const UserWithoutPasswordDTO = UserSchema.omit({ password: true });
export const PartialUserSchema = UserSchema.partial();

// https://github.com/Aquila169/zod-express-middleware/blob/main/src/index.ts
// https://dev.to/isnan__h/custom-schema-validation-in-typescript-with-zod-5cp5
// https://github.com/Aquila169/zod-express-middleware
// https://github.com/wpcodevo/node_prisma_postgresql/blob/master/src/schemas/user.schema.ts
// https://jeffsegovia.dev/blogs/rest-api-validation-using-zod
// https://isamatov.com/typescript-schema-validation-with-zod/
// https://www.imadatyat.me/guides/schema-validation-with-zod-and-expressjs
// https://blog.tericcabrel.com/validate-request-parameter-nodejs-yup/
// https://www.fun4code.com/zod-schema-validation/
// https://medium.com/@brianridolcedev/the-benefits-of-combining-zod-and-generics-type-in-next-js-application-282bb8c6780b
