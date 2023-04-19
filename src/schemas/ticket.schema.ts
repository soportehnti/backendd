import { z } from "zod";
import { Ticket } from "../models/ticket.model";

export const TicketSchema = z.object({
    id: z.string().cuid().optional(),
    // updated_at: z.date().optional(),
    // created_at: z.date().optional(),
    created_by: z.string().optional(),

    subject: z.string().min(5),
    description: z.string().min(10),
    device: z.string().min(5).max(25).optional(),
    file_url: z.string().optional(),
    solution: z.string().optional(),
    is_enabled: z.boolean().optional(),
    
    client_id: z.string().cuid(),
    priority_id: z.string().cuid().optional(),
    status_id: z.string().cuid().optional(),
    incident_type_id: z.string().cuid().optional(),
    requestor_id: z.string().cuid().optional(),
    assigned_to: z.string().cuid().optional()
})

export const PartialTicketSchema = TicketSchema.partial();
