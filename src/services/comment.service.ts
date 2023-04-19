import { Inject, Service } from "typedi";
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from "../dtos/comment.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { CommentRepository } from "../repositories/comment.repository";

@Service()
export class CommentService {

    constructor(@Inject('comment.repository') private readonly commentRepository: CommentRepository) { }

    public async getOneById(id: string): Promise<CommentDTO> {
        const commentFound: CommentDTO = await this.commentRepository.findById(id)
        if (!commentFound) throw new NotFoundException()

        return commentFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<CommentDTO[]> {
        const commentsFound = await this.commentRepository.findMany({ limit, offset }) as CommentDTO[]
        if (!commentsFound) throw new NotFoundException()

        return commentsFound
    }

    public async getcommentCities(id: string): Promise<CommentDTO[]> {
        const commentFound = await this.commentRepository.findMany({
            where: {
                id,
                cities: { $exists: true }
            },
        }) as CommentDTO[]

        if (!commentFound) throw new NotFoundException()

        return commentFound
    }

    public async createOne(data: CreateCommentDTO): Promise<CommentDTO> {
        const commentCreated = await this.commentRepository.createOne(data)

        return commentCreated as CommentDTO
    }

    public async updateOneById(id: string, data: UpdateCommentDTO): Promise<CommentDTO> {
        const commentUpdated = await this.commentRepository.updateById(id, data) as CommentDTO
        if (!commentUpdated) throw new NotFoundException()

        return commentUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateCommentDTO[]): Promise<CommentDTO[]> {
        const commentsUpdated = await this.commentRepository.updateManyById(data) as CommentDTO[]

        return commentsUpdated
    }

    public async deleteOneById(id: string): Promise<CommentDTO> {
        const commentDeleted = await this.commentRepository.deleteById(id) as CommentDTO
        if (!commentDeleted) throw new NotFoundException()

        return commentDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<CommentDTO[]> {
        const commentsDeleted = await this.commentRepository.deleteManyById(ids) as CommentDTO[]

        return commentsDeleted
    }
}
