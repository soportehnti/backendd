import { z } from "zod";
import { File } from "../models/file.model";

export const FileSchema = z.object({
    id: z.string().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),

    name: z.string().optional(),
    type: z.string().optional(),
    size: z.number().optional(),
    url: z.string().optional(),
    created_by: z.string().optional(),
})

export const PartialFileSchema = FileSchema.partial();
