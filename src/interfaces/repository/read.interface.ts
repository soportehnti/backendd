export interface IRead<T> {
    findMany(params: string): Promise<T[]>;
    findById(id: string): Promise<T>;
}
