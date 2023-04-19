import { z } from "zod";
import { City } from "../models/city.model";

export const CitySchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string(),
    description: z.string().optional(),
    state_id: z.string().cuid().optional(),
    area_id: z.string().cuid().optional(),
})

export const PartialCitySchema = CitySchema.partial();
