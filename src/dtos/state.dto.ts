import { State } from "../models/state.model";

export type StateDTO = State
export type CreateStateDTO = Omit<State, 'id' | 'created_at' | 'updated_at'>
export type UpdateStateDTO = Partial<CreateStateDTO>
