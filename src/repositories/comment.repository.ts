import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from '../dtos/comment.dto'
import { Comment } from '../models/comment.model'

@Service()
export class CommentRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Comment> {
        const itemFound = await this.database.comment.findUnique({
            where: { id }
        })

        return itemFound as Comment
    }

    public async findMany({ where, limit, offset }: any): Promise<Comment[]> {
        const items = await this.database.comment.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateCommentDTO): Promise<Comment> {
        const itemCreated = await this.database.comment.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateCommentDTO): Promise<Comment> {
        const itemUpdated = await this.database.comment.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Comment> {
        const itemDeleted = await this.database.comment.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateCommentDTO[]): Promise<Comment[]> {
        const itemsCreated = await this.database.comment.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateCommentDTO[]): Promise<Comment[]> {
        const itemsUpdated = await this.database.comment.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Comment[]> {
        const itemsDeleted = await this.database.comment.deleteMany()

        return itemsDeleted as any
    }
}
