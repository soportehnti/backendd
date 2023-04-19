import { PrismaClient } from "@prisma/client";
import { IRead } from "../interfaces/repository/read.interface";
import { IWrite } from "../interfaces/repository/write.interface";

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
    protected database: PrismaClient;
    protected tableName: string;

    constructor(database: PrismaClient) {
        this.database = database;
        // this.tableName = this.constructor.name.replace("Repository", "").toLowerCase();
        this.tableName = this.nameOf(this);
    }

    public nameOf = (varObj: object): string => Object.keys(varObj)[0]

    public async findById(id: string): Promise<T> {
        const itemFound = await this.database.$queryRaw<T>`SELECT * FROM ${this.tableName} WHERE id = ${id}`;
        return itemFound;
    }

    public async findMany(params: any): Promise<T[]> {
        const itemsFound = await this.database.$queryRaw`SELECT * FROM User LIMIT ${params.limit} OFFSET ${params.offset}` as T[];
        return itemsFound;
    }

    public async create(item: T): Promise<boolean> {
        // const itemCreated = await this.database.$queryRaw<T>`INSER INTO ${this.tableName}, ${String(Object.keys(item))} VALUES ${Object.values(item)}`
        const itemCreated = await this.database.$queryRaw<T>`CALL sp_create_${this.tableName}(${item})`;

        return true;
    }

    public async updateById(id: string, item: T): Promise<boolean> {
        const itemUpdated = await this.database.$queryRaw<T>`UPDATE ${this.tableName} SET ${item} WHERE id = ${id}`;
        return true;
    }

    public async deleteById(id: string): Promise<boolean> {
        const itemDeleted = await this.database.$queryRaw<T>`DELETE FROM ${this.tableName} WHERE id = ${id}` as T

        return true;
    }

    public async createMany(items: T[]): Promise<boolean> {
        const itemsCreated = await this.database.$queryRaw<T>`INSERT INTO ${this.tableName} VALUES ${items}`;
        return true;
    }

    public async updateManyById(items: T[]): Promise<boolean> {
        const itemsUpdated = await this.database.$queryRaw<T>`UPDATE ${this.tableName} SET ${items}`;
        return true;
    }

    public async deleteManyById(): Promise<boolean> {
        const itemsDeleted = await this.database.$queryRaw<T>`DELETE FROM ${this.tableName}`;
        return true;
    }
}
