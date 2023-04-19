import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { StateController } from '../controllers/state.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { isAuthorized } from '../middlewares/authorizated.middleware'
import { validateResources } from '../middlewares/validate.middleware'
import { StateRepository } from '../repositories/state.repository'
import { PartialStateSchema, StateSchema } from '../schemas/state.schema'
import { StateService } from '../services/state.service'


export class StateRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/states'

    private repository: StateRepository = new StateRepository()
    private service: StateService = new StateService(this.repository)
    private controller: StateController = new StateController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one state
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(StateSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to create one state
        this.router.post(
            this.path,
            isAuthorized(['admin']),
            [
                validateRequestBody(StateSchema),
                this.controller.createOne
            ]
        )

        // Route to update one state
        this.router.patch(
            this.path + '/:id',
            isAuthorized(['admin']),
            [
                validateRequest({
                    body: PartialStateSchema,
                    params: StateSchema.pick({ id: true })
                }),
                this.controller.updateOneById
            ]
        )

        // Route to delete one state
        this.router.delete(
            this.path + '/:id',
            isAuthorized(['admin']),
            [
                validateRequestParams(StateSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to get several states
        this.router.get(
            this.path,
            isAuthorized(['admin']),
            this.controller.getSeveral
        )

        // Route to delete several states
        this.router.delete(
            this.path,
            isAuthorized(['admin']),
            this.controller.deleteSeveral
        )

        // Route to update several states
        this.router.put(
            this.path,
            isAuthorized(['admin']),
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to get all cities of a state
        this.router.get(
            this.path + '/:id/cities',
            isAuthorized(['admin']),
            [
                validateRequestParams(StateSchema.pick({ id: true })),
                this.controller.getStateCities
            ]
        )
    }
}
