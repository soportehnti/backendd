import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateStateDTO, StateDTO, UpdateStateDTO } from "../dtos/state.dto"
import { IRequest } from "../interfaces/vendors"
import { StateService } from "../services/state.service"

@Service()
export class StateController {

    constructor(@Inject("state.service") private readonly stateService: StateService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const state = await this.stateService.getOneById(id)

            res.status(200).json(state)
        } catch (error) {
            next(error)
        }
    }

    public getStateCities = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const citiesFound = await this.stateService.getStateCities(id)

            res.status(200).json(citiesFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const statesFound = await this.stateService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: statesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: statesFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const stateData: CreateStateDTO = req.body
            
            stateData.created_by = userLogged!.id
            const stateCreated = await this.stateService.createOne(stateData)

            res.status(201).json({
                message: 'Created',
                data: stateCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const statesData: CreateStateDTO[] = req.body
            const statesCreated = await this.stateService.createSeveral(statesData)

            res.status(201).json({
                message: 'Created',
                data: statesCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const stateData: UpdateStateDTO = req.body
            const stateUpdated = await this.stateService.updateOneById(id, stateData)

            res.status(200).json({
                message: 'Updated',
                data: stateUpdated,
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const idsArray = ids.split(",")

            const statesData: UpdateStateDTO[] = req.body
            const statesUpdated = await this.stateService.updateSeveral(idsArray, statesData)

            res.status(200).json({
                message: 'Updated',
                data: statesUpdated,
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const stateDeleted = await this.stateService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: stateDeleted,
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const statesId: string[] = req.body
            const statesDeleted = await this.stateService.deleteSeveral(statesId)

            res.status(200).json(statesDeleted)
        } catch (error) {
            next(error)
        }
    }
}
