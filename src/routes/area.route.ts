import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { AreaController } from '../controllers/area.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { AreaRepository } from '../repositories/area.repository'
import { AreaSchema, PartialAreaSchema } from '../schemas/area.schema'
import { AreaService } from '../services/area.service'


export class AreaRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/areas'

    private repository: AreaRepository = new AreaRepository()
    private service: AreaService = new AreaService(this.repository)
    private controller: AreaController = new AreaController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one area
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(AreaSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to create one area
        this.router.post(
            this.path,
            [
                validateRequestBody(AreaSchema),
                this.controller.createOne, this.controller.createSeveral
            ]
        )

        // Route to update one area
        this.router.patch(
            this.path + '/:id',
            [
                validateRequest({
                    body: PartialAreaSchema,
                    params: AreaSchema.pick({ id: true })
                }),
                this.controller.updateOneById
            ]
        )

        // Route to delete one area
        this.router.delete(
            this.path + '/:id',
            [
                validateRequestParams(AreaSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to get several areas
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route to update several areas
        this.router.put(
            this.path,
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete several areas
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

        // Route to get cities of an area
        this.router.get(
            this.path + '/:id/cities',
            [
                validateRequestParams(AreaSchema.pick({ id: true })),
                this.controller.getCitiesByArea
            ]
        )
    }
}
