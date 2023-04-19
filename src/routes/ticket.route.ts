import { Router } from 'express';
import { validateRequest, validateRequestBody, validateRequestParams } from "zod-express-middleware";
import { TicketController } from '../controllers/ticket.controller';
import { IRoute } from '../interfaces/vendors';
import { isAuthenticated } from "../middlewares/authenticate.middleware";
import { FileRepository } from '../repositories/file.repository';
import { TicketRepository } from '../repositories/ticket.repository';
import { PartialTicketSchema, TicketSchema } from "../schemas/ticket.schema";
import { FileService } from '../services/file.service';
import { TicketService } from '../services/ticket.service';


export class TicketRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/tickets'
    
    private fileRepository: FileRepository = new FileRepository()
    private fileService: FileService = new FileService(this.fileRepository)
    private repository: TicketRepository = new TicketRepository()
    private service: TicketService = new TicketService(this.repository, this.fileService)
    private controller: TicketController = new TicketController(this.service)

    constructor() {
        this.router.use(this.path, isAuthenticated)
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one ticket
        this.router.get(
            this.path + '/:id',
            [
                validateRequestParams(TicketSchema.pick({ id: true })),
                this.controller.getOneById
            ]
        )

        // Route to create one ticket
        this.router.post(
            this.path,
            [
                validateRequestBody(TicketSchema),
                this.controller.createOne
            ]
        )

        // Route to update one ticket
        this.router.patch(
            this.path + '/:id',
            [
                validateRequest({
                    body: PartialTicketSchema,
                    params: TicketSchema.pick({ id: true })
                }),
                this.controller.updateOneById
            ]
        )

        // Route to delete one ticket
        this.router.delete(
            this.path + '/:id',
            this.controller.deleteOneById
        )

        // Route to get several tickets
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route to update several tickets
        // TODO: Implement this route
        this.router.put(
            this.path,
            this.controller.updateSeveral
        ) // No need to implement this routes for now

        // Route to delete several tickets
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )

        // /tickets/{id}/comments/{id}/replies

        // Route to get comments of a ticket
        this.router.get(
            this.path + '/:id/comments',
            [
                validateRequestParams(TicketSchema.pick({ id: true })),
                this.controller.getTicketComments
            ]
        )
    }
}
