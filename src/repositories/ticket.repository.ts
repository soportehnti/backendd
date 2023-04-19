import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateTicketDTO, TicketDTO, UpdateTicketDTO } from '../dtos/ticket.dto'
import { Ticket } from '../models/ticket.model'

@Service()
export class TicketRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Ticket> {
        const itemFound = await this.database.ticket.findUnique({
            where: { id }
        })

        return itemFound as Ticket
    }

    public async findTicketCommentsById(id: string): Promise<any> {
        const itemFound = await this.database.ticket.findUnique({
            where: { id },
            include: {
                comments: true
            }
        })

        return itemFound?.comments
    }

    public async findBySubject(subject: string): Promise<Ticket> {
        const itemFound = await this.database.ticket.findFirst({
            where: {
                subject: {
                    contains: subject
                }
            }
        })

        return itemFound as Ticket
    }

    public async findMany(options: { where: any, limit: number, offset: number }): Promise<Ticket[]> {
         const items = await this.database.ticket.findMany({
            where: options.where,
            skip: options.offset,
            take: options.limit,
        })

        return items
    }

    public async createOne(data: CreateTicketDTO): Promise<Ticket> {
        const itemCreated = await this.database.ticket.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateTicketDTO): Promise<Ticket> {
        const itemUpdated = await this.database.ticket.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Ticket> {
        const itemDeleted = await this.database.ticket.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateTicketDTO[]): Promise<Ticket[]> {
        const itemsCreated = await this.database.ticket.createMany({ data })
        return itemsCreated as any
    }

    public async updateManyById(data: UpdateTicketDTO[]): Promise<Ticket[]> {
        const itemsUpdated = await this.database.ticket.updateMany({ data })
        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Ticket[]> {
        const itemsDeleted = await this.database.ticket.deleteMany()

        return itemsDeleted as any
    }
}
