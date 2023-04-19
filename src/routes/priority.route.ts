import { Router } from 'express'
import { PriorityController } from '../controllers/priority.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { PriorityRepository } from '../repositories/priority.repository'
import { PriorityService } from '../services/priority.service'

export class PriorityRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/priorities'

    private repository: PriorityRepository = new PriorityRepository()
    private service: PriorityService = new PriorityService(this.repository)
    private controller: PriorityController = new PriorityController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one priority
        this.router.get(
            this.path + '/:id', this.controller.getOneById
        )

        // Route to create one priority
        this.router.post(
            this.path,
            this.controller.createOne,
            this.controller.createSeveral
        )

        // Route to update one priority
        this.router.patch(
            this.path + '/:id', this.controller.updateOneById
        )

        // Route to delete one priority
        this.router.delete(
            this.path + '/:id', this.controller.deleteOneById
        )

        // Route to get several priorities
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route to update several priorities
        this.router.put(
            this.path,
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete several priorities
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

        this.router.get(
            this.path + '/:id/tickets',
            this.controller.getTicketsByPriorityId
        )
    }
}
