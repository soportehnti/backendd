import { Client } from "../models/client.model";

export type ClientDTO = Client
export type CreateClientDTO = Omit<Client, 'id' | 'created_at' | 'updated_at'>
export type UpdateClientDTO = Partial<CreateClientDTO>
