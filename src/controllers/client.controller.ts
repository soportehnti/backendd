import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { ClientDTO, CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto"
import { IRequest } from "../interfaces/vendors"
import { ClientService } from "../services/client.service"

@Service()
export class ClientController {

    constructor(@Inject("client.service") private readonly clientService: ClientService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const clientFound = await this.clientService.getOneById(id)

            res.status(200).json(clientFound)
        } catch (error) {
            next(error)
        }
    }

    public getTicketsRequested = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const ticketsRequested = await this.clientService.getTicketsRequested(id)

            res.status(200).json(ticketsRequested)
        } catch (error) {
            next(error)
        }
    }

    public getMembers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const members = await this.clientService.getMembers(id)

            res.status(200).json(members)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const clientsFound = await this.clientService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: clientsFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: clientsFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const clientData: CreateClientDTO = req.body

            clientData.created_by = userLogged!.id
            const clientCreated = await this.clientService.createOne(clientData)

            res.status(201).json({
                message: 'Created',
                data: clientCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientsData: CreateClientDTO[] = req.body
            const clientsCreated = await this.clientService.createSeveral(clientsData)

            res.status(201).json({
                message: 'Created',
                data: clientsCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const clientData: UpdateClientDTO = req.body
            const clientUpdated = await this.clientService.updateOneById(id, clientData)

            res.status(200).json({
                message: 'Updated',
                data: clientUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const clientsId: string[] = ids.split(',')

            const clientsData: UpdateClientDTO[] = req.body
            const clientsUpdated = await this.clientService.updateSeveral(clientsId, clientsData)

            res.status(200).json({
                message: 'Updated',
                data: clientsUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const clientDeleted = await this.clientService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: clientDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientsId: string[] = req.body
            const clientsDeleted = await this.clientService.deleteSeveral(clientsId)

            res.status(200).json({
                message: 'Removed',
                data: clientsDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
