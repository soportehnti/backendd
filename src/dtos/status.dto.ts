import { Status } from "../models/status.model";

export type StatusDTO = Status
export type CreateStatusDTO = Omit<Status, 'id' | 'created_at' | 'updated_at'>
export type UpdateStatusDTO = Partial<CreateStatusDTO>
