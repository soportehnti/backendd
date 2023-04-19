import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CityDTO, CreateCityDTO, UpdateCityDTO } from '../dtos/city.dto'
import { City } from '../models/city.model'

@Service()
export class CityRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<City> {
        const itemFound = await this.database.city.findUnique({
            where: { id }
        })

        return itemFound as City
    }

    public async findByName(name: string): Promise<City> {
        const itemFound = await this.database.city.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        })

        return itemFound as City
    }

    public async findClientsByCity(id: string): Promise<any> {
        const itemFound = await this.database.city.findUnique({
            where: { id },
            include: {
                clients: true
            }
        })

        return itemFound?.clients
    }

    public async findMany({ where, limit, offset }: any): Promise<City[]> {
        const items = await this.database.city.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateCityDTO): Promise<City> {
        const itemCreated = await this.database.city.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateCityDTO): Promise<City> {
        const itemUpdated = await this.database.city.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<City> {
        const itemDeleted = await this.database.city.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateCityDTO[]): Promise<City[]> {
        const itemsCreated = await this.database.city.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateCityDTO[]): Promise<City[]> {
        const itemsUpdated = await this.database.city.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<City[]> {
        const itemsDeleted = await this.database.city.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
