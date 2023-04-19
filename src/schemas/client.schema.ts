import { z } from "zod";
import { Client } from "../models/client.model";

export const ClientSchema  = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string(),
    address: z.string(),
    email: z.string().email().optional(),
    phone_number: z.string().optional(),
    is_enabled: z.boolean().optional(),
    city_id: z.string().cuid(),
})

export const PartialClientSchema = ClientSchema.partial();
