import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { RoleController } from '../controllers/role.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { RoleRepository } from '../repositories/role.repository'
import { PartialRoleSchema, RoleSchema } from '../schemas/role.schema'
import { RoleService } from '../services/role.service'

export class RoleRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/roles'

    private repository: RoleRepository = new RoleRepository()
    private service: RoleService = new RoleService(this.repository)
    private controller: RoleController = new RoleController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get all roles
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(RoleSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to create one role
        this.router.post(
            this.path,
            [
                validateRequestBody(RoleSchema),
                this.controller.createOne
            ]
        )

        // Route to update one role
        this.router.patch(
            this.path + '/:id',
            [
                validateRequest({
                    body: PartialRoleSchema,
                    params: RoleSchema.pick({ id: true })
                }),
                this.controller.updateOneById
            ]
        )

        // Route to delete one role
        this.router.delete(
            this.path + '/:id',
            [
                validateRequestParams(RoleSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to get several roles
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route to update several roles
        this.router.put(
            this.path,
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete several roles
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

        // Route to get users by role
        this.router.get(
            this.path + '/:id/users',
            [
                validateRequestParams(RoleSchema.pick({ id: true })),
                this.controller.getUsersByRole
            ]
        )
    }
}
