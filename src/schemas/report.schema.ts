import { z } from "zod";
import { Report } from "../models/report.model";

export const ReportSchema = z.object({
    id: z.string().cuid().optional(),
    // created_at: z.date().optional(),
    // updated_at: z.date().optional(),
    created_by: z.string().cuid().optional(),

    name: z.string(),
    type: z.enum(['general', 'tickets', 'clients', 'users']).optional(),
    date_from: z.string().optional(),
    date_to: z.string().optional(),
    format: z.enum(['pdf', 'html', 'png']).optional(),
    sent_to: z.string().email().optional(),
    file_url: z.string().url().optional(),
    generated_to: z.string().cuid().optional(),
})

export const PartialReportSchema = ReportSchema.partial();
