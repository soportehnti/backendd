import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from "../dtos/comment.dto"
import { IRequest } from "../interfaces/vendors"
import { CommentService } from "../services/comment.service"

@Service()
export class CommentController {

    constructor(@Inject("comment.service") private readonly commentService: CommentService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const commentFound = await this.commentService.getOneById(id)

            res.status(200).json(commentFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0

            const commentsFound = await this.commentService.getSeveral({ limit: limitNumber, offset: offsetNumber })
            const paginatedResponse = {
                items: commentsFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: commentsFound.length,
            }

            res.status(200).json(paginatedResponse)
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const commentData: CreateCommentDTO = req.body

            commentData.author_id = userLogged!.id
            const commentCreated = await this.commentService.createOne(commentData)

            res.status(201).json({
                message: 'Created',
                data: commentCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const commentData: UpdateCommentDTO = req.body
            const commentUpdated = await this.commentService.updateOneById(id, commentData)

            res.status(200).json({
                message: 'Updated',
                data: commentUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const commentsId: string[] = ids.split(',')

            const commentsData: UpdateCommentDTO[] = req.body
            const commentsUpdated = await this.commentService.updateSeveral(commentsId, commentsData)

            res.status(200).json({
                message: 'Updated',
                data: commentsUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const commentDeleted = await this.commentService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: commentDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentsId: string[] = req.body
            const commentsDeleted = await this.commentService.deleteSeveral(commentsId)

            res.status(200).json({
                message: 'Removed',
                data: commentsDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
