import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateStatusDTO, StatusDTO, UpdateStatusDTO } from "../dtos/status.dto"
import { IRequest } from "../interfaces/vendors"
import { StatusService } from "../services/status.service"

@Service()
export class StatusController {

    constructor(@Inject("status.service") private readonly statusService: StatusService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const statusFound = await this.statusService.getOneById(id)

            res.status(200).json(statusFound)
        } catch (error) {
            next(error)
        }
    }

    public getTicketsByStatusId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const ticketsFound = await this.statusService.getTicketsByStatusId(id)

            res.status(200).json(ticketsFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0

            const statusesFound = await this.statusService.getSeveral({ limit: limitNumber, offset: offsetNumber })
            const paginatedResponse = {
                items: statusesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: statusesFound.length,
            }

            res.status(200).json(paginatedResponse)
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const statusData: CreateStatusDTO = req.body

            statusData.created_by = userLogged!.id
            const statusCreated = await this.statusService.createOne(statusData)

            res.status(201).json({
                message: 'Created',
                data: statusCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const statusesData: CreateStatusDTO[] = req.body
            const statusesCreated = await this.statusService.createSeveral(statusesData)

            res.status(201).json({
                message: 'Created',
                data: statusesCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const statusData: UpdateStatusDTO = req.body
            const statusUpdated = await this.statusService.updateOneById(id, statusData)

            res.status(200).json({
                message: 'Updated',
                data: statusUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const statusesId: string[] = ids.split(',')

            const statusesData: UpdateStatusDTO[] = req.body
            const statusesUpdated = await this.statusService.updateSeveral(statusesId, statusesData)

            res.status(200).json({
                message: 'Updated',
                data: statusesUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const statusDeleted = await this.statusService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: statusDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const statusesId: string[] = req.body
            const statusesDeleted = await this.statusService.deleteSeveral(statusesId)

            res.status(200).json({
                message: 'Removed',
                data: statusesDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
