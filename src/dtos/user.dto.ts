import { User } from "../models/user.model";
import { PartialUserSchema, UserSchema } from "../schemas/user.schema";

// export type CreateUserDTO = z.infer<typeof UserSchema>;
// export type UpdateUserDTO = z.infer<typeof PartialUserSchema>;

export type UserDTO = Omit<User, 'password'> & { password: string }
export type CreateUserDTO = Omit<User, 'id' | 'created_at' | 'updated_at'>
export type UpdateUserDTO = Partial<CreateUserDTO>
