import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateStatusDTO, StatusDTO, UpdateStatusDTO } from '../dtos/status.dto'
import { Status } from '../models/status.model'

@Service()
export class StatusRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Status> {
        const itemFound = await this.database.status.findUnique({
            where: { id }
        })

        return itemFound as Status
    }

    public async findByName(name: string): Promise<Status> {
        const itemFound = await this.database.status.findFirst({
            where: { name }
        })

        return itemFound as Status
    }

    public async getTicketsByStatusId(id: string): Promise<any> {
        const ticketsFound = await this.database.status.findUnique({
            where: { id },
            include: {
                tickets: true
            }
        })

        return ticketsFound?.tickets
    }

    public async findMany({ where, limit, offset }: any): Promise<Status[]> {
        const items = await this.database.status.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateStatusDTO): Promise<Status> {
        const itemCreated = await this.database.status.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateStatusDTO): Promise<Status> {
        const itemUpdated = await this.database.status.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Status> {
        const itemDeleted = await this.database.status.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateStatusDTO[]): Promise<Status[]> {
        const itemsCreated = await this.database.status.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateStatusDTO[]): Promise<Status[]> {
        const itemsUpdated = await this.database.status.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Status[]> {
        const itemsDeleted = await this.database.status.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
