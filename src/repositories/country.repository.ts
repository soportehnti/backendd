import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateCountryDTO, UpdateCountryDTO } from '../dtos/country.dto'
import { Country } from '../models/country.model'

@Service()
export class CountryRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Country> {
        const itemFound = await this.database.country.findUnique({
            where: { id },
        })

        return itemFound as Country
    }

    public async findByName(name: string): Promise<Country> {
        const itemFound = await this.database.country.findFirst({
            where: { name }
        })

        return itemFound as Country
    }

    public async findCountryStates(id: string): Promise<any> {
        const itemsFound = await this.database.country.findUnique({
            where: { id },
            include: {
                states: true
            }
        })

        return itemsFound?.states
    }

    public async findMany({ where, limit, offset, select }: any): Promise<Country[]> {
        const items = await this.database.country.findMany({
            where,
            skip: offset,
            take: limit,
            select
        })

        return items as any
    }

    public async createMany(data: CreateCountryDTO[]): Promise<Country[]> {
        const itemsCreated = await this.database.country.createMany({ data })

        return itemsCreated as any
    }

    public async createOne(data: CreateCountryDTO): Promise<Country> {
        const itemCreated = await this.database.country.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateCountryDTO): Promise<Country> {
        const itemUpdated = await this.database.country.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Country> {
        const itemDeleted = await this.database.country.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async updateManyById(data: UpdateCountryDTO[]): Promise<Country[]> {
        const itemsUpdated = await this.database.country.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Country[]> {
        const itemsDeleted = await this.database.country.deleteMany()

        return itemsDeleted as any
    }
}
