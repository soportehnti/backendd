import { Ticket } from "../models/ticket.model";

export type TicketDTO = Ticket
export type CreateTicketDTO = Omit<Ticket, 'id' | 'created_at' | 'updated_at'>
export type UpdateTicketDTO = Partial<CreateTicketDTO>
