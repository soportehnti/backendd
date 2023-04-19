import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { UserController } from '../controllers/user.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { isAuthorized } from '../middlewares/authorizated.middleware'
import { UserRepository } from '../repositories/user.repository'
import { PartialUserSchema, UserSchema } from '../schemas/user.schema'
import { UserService } from '../services/user.service'

export class UserRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/users'

    private repository: UserRepository = new UserRepository()
    private service: UserService = new UserService(this.repository)
    private controller: UserController = new UserController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one user
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(UserSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to get several users
        this.router.get(
            this.path,
            isAuthorized(['admin', 'agent']),
            this.controller.getSeveral
        )

        // Route to create one user
        this.router.post(
            this.path,
            isAuthorized(['admin']),
            [
                validateRequestBody(UserSchema),
                this.controller.createOne,
            ],
        )
        this.router.post(
            this.path + '/partial',
            isAuthorized(['admin']),
            [
                validateRequestBody(PartialUserSchema),
                this.controller.createOnePartial
            ]
        )

        // Route to update one user
        this.router.patch(
            this.path + '/:id',
            isAuthorized(['admin']),
            validateRequest({
                params: UserSchema.pick({ id: true }),
                body: PartialUserSchema
            }),
            this.controller.updateOneById
        )

        // Route to update several users
        this.router.put(
            this.path,
            isAuthorized(['admin']),
            validateRequest({
                body: PartialUserSchema
            }),
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete one user
        this.router.delete(
            this.path + '/:id',
            isAuthorized(['admin']),
            [
                validateRequestParams(PartialUserSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to delete several users
        // TODO: Implement validation for this route
        this.router.delete(
            this.path + '/:ids',
            isAuthorized(['admin']),
            validateRequestParams(UserSchema.pick({ id: true })),
            this.controller.deleteSeveral
        )

        // Route to get tickets assigned to user
        // TODO: Implement validation for this route
        this.router.get(
            this.path + '/:id/tickets-assigned',
            isAuthorized(['admin']),
            this.controller.getTicketsAssigned
        )

        // Route to get tickets requested by user
        // TODO: Implement validation for this route
        this.router.get(
            this.path + '/:id/tickets-requested',
            [
                validateRequestParams(UserSchema.pick({ id: true })),
                this.controller.getTicketsRequested
            ]
        )

        // Route to get roles created by user
        this.router.get(
            this.path + '/:id/roles-created',
            [
                validateRequestParams(UserSchema.pick({ id: true })),
                this.controller.getRolesCreated
            ]
        )

        // Route to get tickets comments made by user
        this.router.get(
            this.path + '/:id/comments',
            [
                validateRequestParams(UserSchema.pick({ id: true })),
                this.controller.getTicketsComments
            ]
        )
    }
}
