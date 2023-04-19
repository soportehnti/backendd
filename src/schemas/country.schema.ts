import { z } from "zod";
import { Country } from "../models/country.model";

export const CountrySchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string(),
    description: z.string().optional(),
    phone_code: z.string().optional(),
    contact_phone_number: z.string().optional(),
    is_enabled: z.boolean().optional(),
})

export const PartialCountrySchema = CountrySchema.partial();
