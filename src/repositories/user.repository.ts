import { PrismaClient } from '@prisma/client'
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dtos/user.dto'
import { User } from '../models/user.model'
// import { BaseRepository } from '@utils/base-repository'
import { Service } from 'typedi'

@Service()
export class UserRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<User> {
        const itemFound = await this.database.user.findUnique({
            where: { id }
        })

        return itemFound as UserDTO
    }

    public async findTicketsAssigned(id: string): Promise<any[]> {
        const itemsFound = await this.database.user.findUnique({
            where: { id },
            include: {
                tickets_assigned: true
            }
        })

        return itemsFound?.tickets_assigned as any[]
    }

    public async findTicketsCreated(id: string): Promise<any[]> {
        const itemsFound = await this.database.user.findUnique({
            where: { id },
            include: {
                tickets_requested: true
            }
        })

        return itemsFound?.tickets_requested as any[]
    }

    public async findRolesCreated(id: string): Promise<any[]> {
        const itemsFound = await this.database.user.findUnique({
            where: { id },
            include: {
                roles_created: true
            }
        })
        return itemsFound?.roles_created as any[]
    }

    public async findTicketsComments(id: string): Promise<any[]> {
        const itemsFound = await this.database.user.findUnique({
            where: { id },
            include: {
                comments_created: true
            }
        })

        return itemsFound?.comments_created as any[]
    }

    public async findByEmail(email: string): Promise<User> {
        const itemFound = await this.database.user.findFirst({
            where: { email }
        })

        return itemFound as UserDTO
    }

    public async findByUsername(username: string): Promise<User> {
        const itemFound = await this.database.user.findFirst({
            where: { username }
        })

        return itemFound as UserDTO
    }

    public async createOne(data: CreateUserDTO): Promise<User> {
        const itemCreated = await this.database.user.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateUserDTO): Promise<User> {
        const itemUpdated = await this.database.user.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<User> {
        const itemDeleted = await this.database.user.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async findMany(options: { limit: number, offset: number, where?: any }): Promise<User[]> {
        const itemsFound = await this.database.user.findMany({
            where: options.where,
            skip: options.offset,
            take: options.limit,
        })

        return itemsFound
    }

    public async createMany(data: CreateUserDTO[]): Promise<User[]> {
        const itemsCreated = await this.database.user.createMany({ data })

        return itemsCreated as any
    }

    public async updateMany(data: UpdateUserDTO[]): Promise<User[]> {
        const itemsUpdated = await this.database.user.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteMany(ids?: string[]): Promise<User[]> {
        const itemsDeleted = await this.database.user.deleteMany()

        return itemsDeleted as any
    }
}
