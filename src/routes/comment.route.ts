import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { CommentController } from '../controllers/comment.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { isAuthorized } from '../middlewares/authorizated.middleware'
import { CommentRepository } from '../repositories/comment.repository'
import { CommentSchema, PartialCommentSchema } from '../schemas/comment.schema'
import { CommentService } from '../services/comment.service'

export class CommentRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/comments'

    private repository: CommentRepository = new CommentRepository()
    private service: CommentService = new CommentService(this.repository)
    private controller: CommentController = new CommentController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one comment 
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(CommentSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to create one comment 
        this.router.post(
            this.path,
            [
                validateRequestBody(CommentSchema),
                this.controller.createOne
            ]
        )

        // Route to update one comment
        this.router.patch(
            this.path + '/:id',
            [
                validateRequest({
                    params: CommentSchema.pick({ id: true }),
                    body: PartialCommentSchema
                }),
                isAuthorized(['admin']),
                this.controller.updateOneById
            ]
        )

        // Route to delete one comment 
        this.router.delete(
            this.path + '/:id',
            [
                validateRequestParams(CommentSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to get several comments
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route to update several comments
        this.router.put(
            this.path,
            isAuthorized(['admin']),
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete several comments
        this.router.delete(
            this.path,
            isAuthorized(['admin']),
            this.controller.deleteSeveral
        )
    }
}
