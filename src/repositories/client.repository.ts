import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { ClientDTO, CreateClientDTO, UpdateClientDTO } from '../dtos/client.dto'
import { Client } from '../models/client.model'

@Service()
export class ClientRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Client> {
        const itemFound = await this.database.client.findUnique({
            where: { id }
        })

        return itemFound as Client
    }

    public async findTicketsRequested(id: string): Promise<any[]> {
        const itemFound = await this.database.client.findUnique({
            where: { id },
            include: {
                tickets_requested: true
            }
        })
        const ticketsFound = itemFound?.tickets_requested as any[]

        return ticketsFound
    }

    public async findMembers(id: string): Promise<any[]> {
        const itemFound = await this.database.client.findUnique({
            where: { id },
            include: {
                employees: true
            }
        })
        const membersFound = itemFound?.employees as any[]

        return membersFound
    }

    public async findByName(name: string): Promise<Client> {
        const itemFound = await this.database.client.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        })

        return itemFound as Client
    }

    public async findMany({ where, limit, offset }: any): Promise<Client[]> {
        const items = await this.database.client.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateClientDTO): Promise<Client> {
        const itemCreated = await this.database.client.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateClientDTO): Promise<Client> {
        const itemUpdated = await this.database.client.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Client> {
        const itemDeleted = await this.database.client.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateClientDTO[]): Promise<Client[]> {
        const itemsCreated = await this.database.client.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateClientDTO[]): Promise<Client[]> {
        const itemsUpdated = await this.database.client.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Client[]> {
        const itemsDeleted = await this.database.client.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
