import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { PermissionController } from '../controllers/permission.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { PermissionRepository } from '../repositories/permission.repository'
import { PartialPermissionSchema, PermissionSchema } from '../schemas/permission.schema'
import { PermissionService } from '../services/permissions.service'

export class PermissionRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/permissions'

    private repository: PermissionRepository = new PermissionRepository()
    private service: PermissionService = new PermissionService(this.repository)
    private controller: PermissionController = new PermissionController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Routes for get one permission by id 
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(PermissionSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Routes for create one permission 
        this.router.post(
            this.path,
            [
                validateRequestBody(PermissionSchema),
                this.controller.createOne,
            ]
        )

        // Routes for update one permission 
        this.router.patch(
            this.path + '/:id',
            [
                validateRequest({
                    body: PartialPermissionSchema,
                    params: PermissionSchema.pick({ id: true }),
                }),
                this.controller.updateOneById
            ]
        )

        // Routes for create one permission 
        this.router.delete(
            this.path + '/:id',
            [
                validateRequestParams(PermissionSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Routes for get several permissions 
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Routes for update several permissions 
        // TODO: Implement this route for update several permissions in the future
        this.router.put(
            this.path,
            this.controller.updateSeveral
        )

        // Routes for delete several permissions 
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )
    }
}
