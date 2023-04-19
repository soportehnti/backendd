export interface IWrite<T> {
    create(item: T): Promise<boolean>;
    updateById(id: string, item: T): Promise<boolean>;
    deleteById(id: string): Promise<boolean>;
    createMany(items: T[]): Promise<boolean>;
    updateManyById(items: T[]): Promise<boolean>;
    deleteManyById(): Promise<boolean>;
}
