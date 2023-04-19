import { Role } from "../models/role.model";

export type RoleDTO = Role
export type CreateRoleDTO = Omit<Role, 'id' | 'created_at' | 'updated_at'>
export type UpdateRoleDTO = Partial<CreateRoleDTO>
