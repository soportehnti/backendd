import { Router } from 'express'
import { IncidentTypeController } from '../controllers/incident-type.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { validateResources } from '../middlewares/validate.middleware'
import { IncidentTypeRepository } from '../repositories/incident-type.repository'
import { IncidentTypeService } from '../services/incident-type.service'


export class IncidentTypeRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/incident-types'

    private repository: IncidentTypeRepository = new IncidentTypeRepository()
    private service: IncidentTypeService = new IncidentTypeService(this.repository)
    private controller: IncidentTypeController = new IncidentTypeController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get all incident types
        this.router.get(
            this.path + '/:id',
            this.controller.getOneById
        )

        // Route to get several incident types
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

    this.router.get(
        this.path + '/:id/tickets',
        this.controller.getTicketsByIncidentTypeId
    )
        // Route to create one incident type
        this.router.post(
            this.path,
            this.controller.createOne
            )

        // Route to update one incident type

        this.router.patch(
            this.path + '/:id',
            this.controller.updateOneById
            )
            // Route to update several incident types
            this.router.put(
                this.path,
                this.controller.updateSeveral
            ) // No need to implement this routes for now

        // Route to delete one incident type
        this.router.delete(
            this.path + '/:id',
            this.controller.deleteOneById
        )


        // Route to delete several incident types
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )
    }
}
