import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateFileDTO, FileDTO, UpdateFileDTO } from '../dtos/file.dto'
import { File } from '../models/file.model'

@Service()
export class FileRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<File> {
        const itemFound = await this.database.file.findUnique({
            where: { id }
        })

        return itemFound as File 
    }

    public async findByName(name: string): Promise<File> {
        const itemFound = await this.database.file.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        })

        return itemFound as File 
    }

    public async findMany({ where, limit, offset }: any): Promise<File[]> {
        const items = await this.database.file.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateFileDTO): Promise<File> {
        const itemCreated = await this.database.file.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateFileDTO): Promise<File> {
        const itemUpdated = await this.database.file.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<File> {
        const itemDeleted = await this.database.file.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async deleteManyById(ids: string[]): Promise<File[]> {
        const itemsDeleted = await this.database.file.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
