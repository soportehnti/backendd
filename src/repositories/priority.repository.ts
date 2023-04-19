import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreatePriorityDTO, PriorityDTO, UpdatePriorityDTO } from '../dtos/priority.dto'
import { Priority } from '../models/priority.model'

@Service()
export class PriorityRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Priority> {
        const itemFound = await this.database.priority.findUnique({
            where: { id }
        })

        return itemFound as Priority
    }

    public async findByName(name: string): Promise<Priority> {
        const itemFound = await this.database.priority.findFirst({
            where: { name }
        })

        return itemFound as Priority
    }

    public async findMany({ where, limit, offset }: any): Promise<Priority[]> {
        const items = await this.database.priority.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async findPriorityTickets(id: string, { limit, offset }: { limit: number, offset: number }): Promise<any[]> {
        const itemsFound = await this.database.priority.findUnique({
            where: { id },
            include: {
                tickets: {
                    take: limit,
                    skip: offset
                }
            }
        })

        return itemsFound?.tickets as any[]
    }

    public async createOne(data: CreatePriorityDTO): Promise<Priority> {
        const itemCreated = await this.database.priority.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdatePriorityDTO): Promise<Priority> {
        const itemUpdated = await this.database.priority.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Priority> {
        const itemDeleted = await this.database.priority.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreatePriorityDTO[]): Promise<Priority[]> {
        const itemsCreated = await this.database.priority.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdatePriorityDTO[]): Promise<Priority[]> {
        const itemsUpdated = await this.database.priority.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Priority[]> {
        const itemsDeleted = await this.database.priority.deleteMany()

        return itemsDeleted as any
    }
}
