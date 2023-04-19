import { Permission } from "../models/permission.model";

export type PermissionDTO = Permission
export type CreatePermissionDTO = Omit<Permission, 'id' | 'created_at' | 'updated_at'>
export type UpdatePermissionDTO = Partial<CreatePermissionDTO>
