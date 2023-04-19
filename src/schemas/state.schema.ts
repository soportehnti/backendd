import { z } from "zod";
import { State } from "../models/state.model";

export const StateSchema = z.object({
    id: z.string().cuid().optional(),
    // updated_at: z.date().optional(),
    // created_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string().min(2).max(80),
    country_id: z.string().cuid(),
    // cities: z.array(z.string().cuid()).optional(),
})

export const PartialStateSchema = StateSchema.partial();
