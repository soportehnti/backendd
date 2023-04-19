import { z } from "zod";
import { Priority } from "../models/priority.model";

export const PrioritySchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string(),
    description: z.string().optional(),
})

export const PartialPrioritySchema = PrioritySchema.partial();
