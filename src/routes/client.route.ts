import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams, validateRequestQuery } from 'zod-express-middleware'
import { ClientController } from '../controllers/client.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { isAuthorized } from '../middlewares/authorizated.middleware'
import { ClientRepository } from '../repositories/client.repository'
import { ClientSchema, PartialClientSchema } from '../schemas/client.schema'
import { ClientService } from '../services/client.service'

export class ClientRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/clients'

    private repository: ClientRepository = new ClientRepository()
    private service: ClientService = new ClientService(this.repository)
    private controller: ClientController = new ClientController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one client
        this.router.get(
            this.path + '/:id',
            
            [
                validateRequestParams(ClientSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to create one client
        this.router.post(
            this.path,
            isAuthorized(['admin']),
            [
                validateRequestBody(ClientSchema),
                this.controller.createOne,
            ]
        )

        // Route to update one client
        this.router.patch(
            this.path + '/:id',
            isAuthorized(['admin', 'user']),
            [
                validateRequest({
                    body: PartialClientSchema,
                    params: ClientSchema.pick({ id: true })
                }),
                this.controller.updateOneById
            ]
        )

        // Route to delete one client
        this.router.delete(
            this.path + '/:id',
            isAuthorized(['admin']),
            [
                validateRequestParams(ClientSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to get several clients
        this.router.get(
            this.path,
            isAuthorized(['admin', 'agent']),
            this.controller.getSeveral
        )

        // Route to update several clients
        this.router.put(
            this.path,
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete several clients
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

        // Route to get tickets requested by client
        this.router.get(
            this.path + '/:id/tickets-requested',
            [
                validateRequestParams(ClientSchema.pick({ id: true })),
                this.controller.getTicketsRequested
            ]
        )

        this.router.get(
            this.path + '/:id/members',
            [
                validateRequestParams(ClientSchema.pick({ id: true })),
                this.controller.getMembers
            ]
        )
    }
}
