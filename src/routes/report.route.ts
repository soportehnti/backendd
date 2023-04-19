import { Router } from 'express'
import { validateRequest, validateRequestBody, validateRequestParams } from 'zod-express-middleware'
import { ReportController } from '../controllers/report.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { isAuthorized } from '../middlewares/authorizated.middleware'
import { FileRepository } from '../repositories/file.repository'
import { ReportRepository } from '../repositories/report.repository'
import { PartialReportSchema, ReportSchema } from '../schemas/report.schema'
import { FileService } from '../services/file.service'
import { ReportService } from '../services/report.service'


export class ReportRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/reports'

    private fileRepository: FileRepository = new FileRepository()
    private fileService: FileService = new FileService(this.fileRepository)
    private repository: ReportRepository = new ReportRepository()
    private service: ReportService = new ReportService(this.repository, this.fileService)
    private controller: ReportController = new ReportController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated, isAuthorized(['admin', 'user'])) 
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one report
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(PartialReportSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to get several reports
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route generate report file
        this.router.get(
            this.path + '/:id/generate',
            [
                validateRequestParams(ReportSchema.pick({ id: true })),
                this.controller.generateOneReportFileById
            ]
        )

        // Route to create one report
        this.router.post(
            this.path,
            [
                validateRequestBody(ReportSchema),
                this.controller.createOne,
            ]
        )

        // Route to update one report
        // TODO: Implement this route
        this.router.patch(
            this.path + '/:id',
            [
                validateRequest({
                    params: PartialReportSchema.pick({ id: true }),
                    body: PartialReportSchema
                }),
                this.controller.updateOneById
            ]
        )

        // Route to delete one report
        this.router.delete(
            this.path + '/:id',
            [
                validateRequestParams(PartialReportSchema.pick({ id: true })),
                this.controller.deleteOneById
            ]
        )

        // Route to delete several reports
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

    }
}
