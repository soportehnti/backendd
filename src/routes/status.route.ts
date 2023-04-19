import { Router } from 'express'
import { StatusController } from '../controllers/status.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { isAuthorized } from '../middlewares/authorizated.middleware'
import { validateResources } from '../middlewares/validate.middleware'
import { StatusRepository } from '../repositories/status.repository'
import { StatusService } from '../services/status.service'


export class StatusRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/statuses'

    private repository: StatusRepository = new StatusRepository()
    private service: StatusService = new StatusService(this.repository)
    private controller: StatusController = new StatusController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one status
        this.router.get(
            this.path + '/:id',
            this.controller.getOneById
        )

        // Route to create one status
        this.router.post(
            this.path,
            isAuthorized(['admin']),
            this.controller.createOne,
        )

        // Route to update one status
        this.router.patch(
            this.path + '/:id',
            this.controller.updateOneById
        )

        // Route to delete one status
        this.router.delete(
            this.path + '/:id',
            isAuthorized(['admin']),
            this.controller.deleteOneById
        )

        // Route to get several statuses
        this.router.get(
            this.path,
            // isAuthorized(['admin']),
            this.controller.getSeveral
        )

        // Route to update several statuses
        this.router.put(
            this.path,
            isAuthorized(['admin']),
            this.controller.updateSeveral
        ) // No need to implement this route for now

        // Route to delete several statuses
        this.router.delete(
            this.path,
            isAuthorized(['admin']),
            this.controller.deleteSeveral
        )

        // Route to get tickets by status id
        this.router.get(
            this.path + '/:id/tickets',
            isAuthorized(['admin']),
            this.controller.getTicketsByStatusId
        )
    }
}
