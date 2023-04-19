import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { CityController } from '../controllers/city.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { isAuthorized } from '../middlewares/authorizated.middleware'
import { validateResources } from '../middlewares/validate.middleware'
import { CityRepository } from '../repositories/city.repository'
import { CitySchema, PartialCitySchema } from '../schemas/city.schema'
import { CityService } from '../services/city.service'


export class CityRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/cities'

    private repository: CityRepository = new CityRepository()
    private service: CityService = new CityService(this.repository)
    private controller: CityController = new CityController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one city
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(CitySchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to create one city
        this.router.post(
            this.path,
            isAuthorized(['admin']),
            [
                validateRequestBody(CitySchema),
                this.controller.createOne,
            ]
        )

        // Route to update one city
        this.router.patch(
            this.path + '/:id',
            isAuthorized(['admin']),
            [
                validateRequest({
                    body: PartialCitySchema,
                    params: CitySchema.pick({ id: true })
                }),
                this.controller.updateOneById
            ]
        )

        // Route to delete one city
        this.router.delete(
            this.path + '/:id',
            isAuthorized(['admin']),
            [
                validateRequestParams(CitySchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to get several cities
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route to update several cities
        this.router.put(
            this.path,
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete several cities
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

        // Route to get clients of a city
        this.router.get(
            this.path + '/:id/clients',
            [
                validateRequestParams(CitySchema.pick({ id: true })),
                this.controller.getClientsByCity
            ]
        )
    }
}
