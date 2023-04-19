import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateIncidentTypeDTO, IncidentTypeDTO, UpdateIncidentTypeDTO } from "../dtos/incident-type.dto"
import { IRequest } from "../interfaces/vendors"
import { IncidentTypeService } from "../services/incident-type.service"

@Service()
export class IncidentTypeController {

    constructor(@Inject("incidentType.service") private readonly incidentTypeService: IncidentTypeService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const incidentTypeFound = await this.incidentTypeService.getOneById(id)

            res.status(200).json(incidentTypeFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const incidentTypesFound = await this.incidentTypeService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: incidentTypesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: incidentTypesFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public getTicketsByIncidentTypeId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 100
            const offsetNumber = Number(offset) || 0

            const ticketsFound = await this.incidentTypeService.getIncidentTypeTickets(id, { limit: limitNumber, offset: offsetNumber })

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
            const incidentTypeData: CreateIncidentTypeDTO = req.body

            incidentTypeData.created_by = userLogged!.id
            const incidentTypeCreated = await this.incidentTypeService.createOne(incidentTypeData)

            res.status(201).json({
                message: 'Created',
                data: incidentTypeCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const incidentTypesData: CreateIncidentTypeDTO[] = req.body
            const incidentTypesCreated = await this.incidentTypeService.createSeveral(incidentTypesData)

            res.status(201).json({
                message: 'Created',
                data: incidentTypesCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const incidentTypeData: UpdateIncidentTypeDTO = req.body
            const incidentTypeUpdated = await this.incidentTypeService.updateOneById(id, incidentTypeData)

            res.status(200).json({
                message: 'Updated',
                data: incidentTypeUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const incidentTypesId: string[] = ids.split(',')
            const incidentTypesData: UpdateIncidentTypeDTO[] = req.body
            const incidentTypesUpdated = await this.incidentTypeService.updateSeveral(incidentTypesId, incidentTypesData)

            res.status(200).json({
                message: 'Updated',
                data: incidentTypesUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const incidentTypeDeleted = await this.incidentTypeService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: incidentTypeDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const incidentTypesId: string[] = req.body
            const incidentTypesDeleted = await this.incidentTypeService.deleteSeveral(incidentTypesId)

            res.status(200).json({
                message: 'Removed',
                data: incidentTypesDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
