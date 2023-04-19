import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateTicketDTO, TicketDTO, UpdateTicketDTO } from "../dtos/ticket.dto"
import { IRequest } from "../interfaces/vendors"
import { TicketService } from "../services/ticket.service"

@Service()
export class TicketController {

    constructor(
        @Inject("ticket.service") private readonly ticketService: TicketService
    ) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const ticketFound = await this.ticketService.getOneById(id)

            res.status(200).json(ticketFound)
        } catch (error) {
            next(error)
        }
    }

    public getTicketComments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const commentsFound = await this.ticketService.getTicketCommentsById(id)

            res.status(200).json(commentsFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const limit = Number(req.query.limit) || 100
            const offset = Number(req.query.offset) || 0
            const enabled = Boolean(req.query.enabled) || true
            const assignedTo = String(req.query.assigned_to)
            const createdBy = String(req.query.created_by)
            
            const ticketsFound = await this.ticketService.getSeveral({ limit, offset, enabled, assignedTo, createdBy, userLogged })

            res.status(200).json({
                items: ticketsFound,
                limit,
                offset,
                total: ticketsFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const ticketData: CreateTicketDTO = req.body

            ticketData.created_by = userLogged!.id
            const ticketCreated = await this.ticketService.createOne(ticketData)

            res.status(201).json({
                message: 'Created',
                data: ticketCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ticketsData: CreateTicketDTO[] = req.body
            const ticketsCreated = await this.ticketService.createSeveral(ticketsData)

            res.status(201).json({
                message: 'Created',
                data: ticketsCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const ticketData: UpdateTicketDTO = req.body
            const ticketUpdated = await this.ticketService.updateOneById(id, ticketData)

            res.status(200).json({
                message: 'Updated',
                data: ticketUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const ticketsId: string[] = ids.split(',')

            const ticketsData: UpdateTicketDTO[] = req.body
            const ticketsUpdated = await this.ticketService.updateSeveral(ticketsId, ticketsData)

            res.status(200).json({
                message: 'Updated',
                data: ticketsUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const ticketDeleted = await this.ticketService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: ticketDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ticketsId: string[] = req.body
            const ticketsDeleted = await this.ticketService.deleteSeveral(ticketsId)

            res.status(200).json({
                message: 'Removed',
                data: ticketsDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
