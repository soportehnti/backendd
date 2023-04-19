import { z } from "zod";
import { Area } from "../models/area.model";

export const AreaSchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string(),
    description: z.string().optional(),
})

export const PartialAreaSchema = AreaSchema.partial();
