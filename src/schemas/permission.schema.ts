import { z } from "zod";
import { Permission } from "../models/permission.model";

export const PermissionSchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string().min(3),
    description: z.string().min(3).optional(),
    read: z.boolean().optional(),
    write: z.boolean().optional(),
    delete: z.boolean().optional(),
    update: z.boolean().optional(),
})

export const PartialPermissionSchema = PermissionSchema.partial();
