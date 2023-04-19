import { z } from "zod";
import { Role } from "../models/role.model";

export const RoleSchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),

    name: z.string(),
    description: z.string().optional(),
    created_by: z.string().cuid().optional(),

    user_permission_id: z.string().cuid().optional(),
    client_permission_id: z.string().cuid().optional(),
    role_permission_id: z.string().cuid().optional(),
    country_permission_id: z.string().cuid().optional(),
    state_permission_id: z.string().cuid().optional(),
    city_permission_id: z.string().cuid().optional(),
    area_permission_id: z.string().cuid().optional(),
    ticket_permission_id: z.string().cuid().optional(),
    status_permission_id: z.string().cuid().optional(),
    priority_permission_id: z.string().cuid().optional(),
    incident_type_permission_id: z.string().cuid().optional(),
    comment_permission_id: z.string().cuid().optional(),
    report_permission_id: z.string().cuid().optional(),
    file_permission_id: z.string().cuid().optional(),
})

export const PartialRoleSchema = RoleSchema.partial();
