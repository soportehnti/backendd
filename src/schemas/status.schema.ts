import { z } from "zod";
import { Status } from "../models/status.model";

export const StatusSchema = z.object({
    id: z.string().cuid().optional(),
    // updated_at: z.date().optional(),
    // created_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string().min(5),
    description: z.string().min(10)
})

export const PartialStatusSchema = StatusSchema.partial();
