import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { CountryController } from '../controllers/country.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { CountryRepository } from '../repositories/country.repository'
import { CountrySchema, PartialCountrySchema } from '../schemas/country.schema'
import { CountryService } from '../services/country.service'


export class CountryRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/countries'

    private repository: CountryRepository = new CountryRepository()
    private service: CountryService = new CountryService(this.repository)
    private controller: CountryController = new CountryController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Routes for get one country
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(CountrySchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Routes for create one country
        this.router.post(
            this.path,
            [
                validateRequestBody(CountrySchema),
                this.controller.createOne,
            ]
        )

        // Routes for update one country
        this.router.patch(
            this.path + '/:id',
            [
                validateRequest({
                    body: PartialCountrySchema,
                    params: CountrySchema.pick({ id: true }),
                }),
                this.controller.updateOneById
            ]
        )

        // Routes for create one country
        this.router.delete(
            this.path + '/:id',
            [
                validateRequestParams(CountrySchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Routes for get several countries
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Routes for update several countries
        // TODO: Implement this route for update several countries in the future
        this.router.put(
            this.path,
            this.controller.updateSeveral
        )

        // Routes for delete several countries
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

        // Routes for states
        this.router.get(
            this.path + '/:id/states',
            [
                validateRequestParams(CountrySchema.pick({ id: true })),
                this.controller.getCountryStates
            ]
        )

        // Routes for cities
        this.router.get(
            this.path + '/:id/cities',
            [
                validateRequestParams(CountrySchema.pick({ id: true })),
                this.controller.getCountryCities
            ]
        )
    }
}
