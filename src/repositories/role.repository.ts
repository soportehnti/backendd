import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from '../dtos/role.dto'
import { Role } from '../models/role.model'

@Service()
export class RoleRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Role> {
        const itemFound = await this.database.role.findUnique({
            where: { id }
        })

        return itemFound as Role
    }

    public async findUsersByRoleId(id: string): Promise<any> {
        const itemsFound = await this.database.role.findUnique({
            where: { id },
            include: {
                users: true
            }
        })

        return itemsFound?.users
    }

    public async findByName(name: string): Promise<Role> {
        const itemFound = await this.database.role.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        })

        return itemFound as Role
    }

    public async findMany({ where, limit, offset }: any): Promise<Role[]> {
        const items = await this.database.role.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateRoleDTO): Promise<Role> {
        const itemCreated = await this.database.role.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateRoleDTO): Promise<Role> {
        const itemUpdated = await this.database.role.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Role> {
        const itemDeleted = await this.database.role.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateRoleDTO[]): Promise<Role[]> {
        const itemsCreated = await this.database.role.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateRoleDTO[]): Promise<Role[]> {
        const itemsUpdated = await this.database.role.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Role[]> {
        const itemsDeleted = await this.database.role.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
