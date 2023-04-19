import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreatePriorityDTO, PriorityDTO, UpdatePriorityDTO } from "../dtos/priority.dto"
import { IRequest } from "../interfaces/vendors"
import { PriorityService } from "../services/priority.service"

@Service()
export class PriorityController {

    constructor(@Inject("priority.service") private readonly priorityService: PriorityService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const priorityFound = await this.priorityService.getOneById(id)

            res.status(200).json(priorityFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const prioritiesFound = await this.priorityService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: prioritiesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: prioritiesFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public getTicketsByPriorityId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 100
            const offsetNumber = Number(offset) || 0
            const ticketsFound = await this.priorityService.getPriorityTickets(id, { limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: ticketsFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: ticketsFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const priorityData: CreatePriorityDTO = req.body

            priorityData.created_by = userLogged!.id
            const priorityCreated = await this.priorityService.createOne(priorityData)

            res.status(201).json({
                message: 'Created',
                data: priorityCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const prioritiesData: CreatePriorityDTO[] = req.body
            const prioritiesCreated = await this.priorityService.createSeveral(prioritiesData)

            res.status(201).json({
                message: 'Created',
                data: prioritiesCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const priorityData: UpdatePriorityDTO = req.body
            const priorityUpdated = await this.priorityService.updateOneById(id, priorityData)

            res.status(200).json({
                message: 'Updated',
                data: priorityUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const prioritiesId = ids.split(',')
            const prioritiesData: UpdatePriorityDTO[] = req.body
            const prioritiesUpdated = await this.priorityService.updateSeveral(prioritiesId, prioritiesData)

            res.status(200).json({
                message: 'Updated',
                data: prioritiesUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const priorityDeleted = await this.priorityService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: priorityDeleted
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const prioritiesId: string[] = req.body
            const prioritiesDeleted = await this.priorityService.deleteSeveral(prioritiesId)

            res.status(200).json({
                message: 'Removed',
                data: prioritiesDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
