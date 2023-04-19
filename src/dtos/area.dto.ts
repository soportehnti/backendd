import { Area } from "../models/area.model"

export type AreaDTO = Area
export type CreateAreaDTO = Omit<Area, 'id' | 'created_at' | 'updated_at'>
export type UpdateAreaDTO = Partial<CreateAreaDTO>
