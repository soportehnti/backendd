import { File } from "../models/file.model";

export type FileDTO =File 
export type CreateFileDTO = Omit<File, 'id' | 'created_at' | 'updated_at' | 'url'>
export type UpdateFileDTO = Partial<CreateFileDTO>
