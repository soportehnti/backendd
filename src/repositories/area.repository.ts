import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { AreaDTO, CreateAreaDTO, UpdateAreaDTO } from '../dtos/area.dto'
import { Area } from '../models/area.model'

@Service()
export class AreaRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Area> {
        const itemFound = await this.database.area.findUnique({
            where: { id }
        })

        return itemFound as Area
    }

    public async findCitiesByArea(id: string): Promise<any> {
        const itemFound = await this.database.area.findUnique({
            where: { id },
            include: {
                cities: true
            }
        })

        return itemFound?.cities
    }

    public async findByName(name: string): Promise<Area> {
        const itemFound = await this.database.area.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        })

        return itemFound as Area
    }

    public async findMany({ where, limit, offset }: any): Promise<Area[]> {
        const items = await this.database.area.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateAreaDTO): Promise<Area> {
        const itemCreated = await this.database.area.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateAreaDTO): Promise<Area> {
        const itemUpdated = await this.database.area.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Area> {
        const itemDeleted = await this.database.area.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateAreaDTO[]): Promise<Area[]> {
        const itemsCreated = await this.database.area.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateAreaDTO[]): Promise<Area[]> {
        const itemsUpdated = await this.database.area.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Area[]> {
        const itemsDeleted = await this.database.area.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
