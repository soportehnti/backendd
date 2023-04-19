import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreatePermissionDTO, PermissionDTO, UpdatePermissionDTO } from '../dtos/permission.dto'

@Service()
export class PermissionRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<PermissionDTO> {
        const itemFound = await this.database.permission.findUnique({
            where: { id },
        })

        return itemFound as PermissionDTO
    }

    public async findByName(name: string): Promise<PermissionDTO> {
        const itemFound = await this.database.permission.findFirst({
            where: { name }
        })

        return itemFound as PermissionDTO
    }

    public async findMany({ where, limit, offset, select }: any): Promise<PermissionDTO[]> {
        const items = await this.database.permission.findMany({
            where,
            skip: offset,
            take: limit,
            select
        })

        return items as any
    }

    public async createMany(data: CreatePermissionDTO[]): Promise<PermissionDTO[]> {
        const itemsCreated = await this.database.permission.createMany({ data })

        return itemsCreated as any
    }

    public async createOne(data: CreatePermissionDTO): Promise<PermissionDTO> {
        const itemCreated = await this.database.permission.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdatePermissionDTO): Promise<PermissionDTO> {
        const itemUpdated = await this.database.permission.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<PermissionDTO> {
        const itemDeleted = await this.database.permission.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async updateManyById(data: UpdatePermissionDTO[]): Promise<PermissionDTO[]> {
        const itemsUpdated = await this.database.permission.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<PermissionDTO[]> {
        const itemsDeleted = await this.database.permission.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })

        return itemsDeleted as any
    }
}
