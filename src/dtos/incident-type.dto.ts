import { IncidentType } from "../models/incident-type.model"

export type IncidentTypeDTO = IncidentType
export type CreateIncidentTypeDTO = Omit<IncidentType, 'id' | 'created_at' | 'updated_at'>
export type UpdateIncidentTypeDTO = Partial<CreateIncidentTypeDTO>
