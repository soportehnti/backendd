import { z } from "zod";
import { IncidentType } from "../models/incident-type.model";

export const IncidentTypeSchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().optional(),

    name: z.string(),
    description: z.string().optional(),
})

export const PartialIncidentTypeSchema = IncidentTypeSchema.partial();
