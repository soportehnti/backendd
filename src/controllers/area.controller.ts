import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { AreaDTO, CreateAreaDTO, UpdateAreaDTO } from "../dtos/area.dto"
import { IRequest } from "../interfaces/vendors"
import { AreaService } from "../services/area.service"

@Service()
export class AreaController {

    constructor(@Inject("area.service") private readonly areaService: AreaService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const areaFound = await this.areaService.getOneById(id)

            res.status(200).json(areaFound)
        } catch (error) {
            next(error)
        }
    }

    public getCitiesByArea = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const citiesFound = await this.areaService.getCitiesByArea(id)

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
            const areasFound = await this.areaService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: areasFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: areasFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const areaData: CreateAreaDTO = req.body

            areaData.created_by = userLogged!.id
            const areaCreated = await this.areaService.createOne(areaData)

            res.status(201).json({
                message: 'Created',
                data: areaCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const areasData: CreateAreaDTO[] = req.body
            const areasCreated = await this.areaService.createSeveral(areasData)

            res.status(201).json({
                message: 'Created',
                data: areasCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const areaData: UpdateAreaDTO = req.body
            const areaUpdated = await this.areaService.updateOneById(id, areaData)

            res.status(200).json({
                message: 'Updated',
                data: areaUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const areasId: string[] = ids.split(',')
            const areasData: UpdateAreaDTO[] = req.body
            const areasUpdated = await this.areaService.updateSeveral(areasId, areasData)

            res.status(200).json({
                message: 'Updated',
                data: areasUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const areaDeleted = await this.areaService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: areaDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const areasId: string[] = req.body
            const areasDeleted = await this.areaService.deleteSeveral(areasId)

            res.status(200).json({
                message: 'Removed',
                data: areasDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
