import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateStateDTO, StateDTO, UpdateStateDTO } from '../dtos/state.dto'
import { State } from '../models/state.model'

@Service()
export class StateRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<State> {
        const itemFound = await this.database.state.findUnique({
            where: { id }
        })

        return itemFound as State
    }

    public async findByName(name: string): Promise<State> {
        const itemFound = await this.database.state.findFirst({
            where: { name }
        })

        return itemFound as State
    }

    public async findStateCities(id: string): Promise<any> {
        const itemFound = await this.database.state.findUnique({
            where: { id },
            include: {
                cities: true
            }
        })

        return itemFound?.cities
    }

    public async findMany({ where, limit, offset }: any): Promise<State[]> {
        const items = await this.database.state.findMany({
            where,
            skip: offset,
            take: limit,
            include: {
              cities: true
            }
        })

        return items
    }

    public async createOne(data: CreateStateDTO): Promise<State> {
        const itemCreated = await this.database.state.create({ data })

        return itemCreated
    }

    public async createMany(data: CreateStateDTO[]): Promise<State[]> {
        const itemsCreated = await this.database.state.createMany({ data })

        return itemsCreated as any
    }

    public async updateById(id: string, data: UpdateStateDTO): Promise<State> {
        const itemUpdated = await this.database.state.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<State> {
        const itemDeleted = await this.database.state.delete({
            where: { id }
        })

        return itemDeleted
    }


    public async updateManyById(ids: Array<string>, data: UpdateStateDTO[]): Promise<State[]> {
        const itemsUpdated = await this.database.state.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<State[]> {
        const itemsDeleted = await this.database.state.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
