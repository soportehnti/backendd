import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateIncidentTypeDTO, IncidentTypeDTO, UpdateIncidentTypeDTO } from '../dtos/incident-type.dto'
import { IncidentType } from '../models/incident-type.model'

@Service()
export class IncidentTypeRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<IncidentType> {
        const itemFound = await this.database.incidentType.findUnique({
            where: { id }
        })

        return itemFound as IncidentType
    }

    public async findByName(name: string): Promise<IncidentType> {
        const itemFound = await this.database.incidentType.findFirst({
            where: { name }
        })

        return itemFound as IncidentType
    }

    public async findMany({ where, limit, offset }: any): Promise<IncidentType[]> {
        const items = await this.database.incidentType.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async findIncidentTypeTickets(id: string, { limit, offset }: { limit: number, offset: number }): Promise<any[]> {
        const itemsFound = await this.database.incidentType.findUnique({
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

    public async createOne(data: CreateIncidentTypeDTO): Promise<IncidentType> {
        const itemCreated = await this.database.incidentType.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateIncidentTypeDTO): Promise<IncidentType> {
        const itemUpdated = await this.database.incidentType.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<IncidentType> {
        const itemDeleted = await this.database.incidentType.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateIncidentTypeDTO[]): Promise<IncidentType[]> {
        const itemsCreated = await this.database.incidentType.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateIncidentTypeDTO[]): Promise<IncidentType[]> {
        const itemsUpdated = await this.database.incidentType.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<IncidentType[]> {
        const itemsDeleted = await this.database.incidentType.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
