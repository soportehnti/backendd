import { Priority } from "../models/priority.model";

export type PriorityDTO = Priority
export type CreatePriorityDTO = Omit<Priority, 'id' | 'created_at' | 'updated_at'>
export type UpdatePriorityDTO = Partial<CreatePriorityDTO>
