import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CityDTO, CreateCityDTO, UpdateCityDTO } from "../dtos/city.dto"
import { IRequest } from "../interfaces/vendors"
import { CityService } from "../services/city.service"

@Service()
export class CityController {

    constructor(@Inject("city.service") private readonly cityService: CityService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const cityFound = await this.cityService.getOneById(id)

            res.status(200).json(cityFound)
        } catch (error) {
            next(error)
        }
    }

    public getClientsByCity = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const clientsFound = await this.cityService.getClientsByCity(id)

            res.status(200).json(clientsFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const citiesFound = await this.cityService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: citiesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: citiesFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const cityData: CreateCityDTO = req.body
            const userLogged = req.user

            cityData.created_by = userLogged!.id
            const cityCreated = await this.cityService.createOne(cityData)

            res.status(201).json({
                message: 'Created',
                data: cityCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const citiesData: CreateCityDTO[] = req.body
            const citiesCreated = await this.cityService.createSeveral(citiesData)

            res.status(201).json({
                message: 'Created',
                data: citiesCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const cityData: UpdateCityDTO = req.body
            const cityUpdated = await this.cityService.updateOneById(id, cityData)

            res.status(200).json({
                message: 'Updated',
                data: cityUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const citiesId: string[] = ids.split(',')
            const citiesData: UpdateCityDTO[] = req.body
            const citiesUpdated = await this.cityService.updateSeveral(citiesId, citiesData)

            res.status(200).json({
                message: 'Updated',
                data: citiesUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const cityDeleted = await this.cityService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: cityDeleted
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const citiesId: string[] = req.body
            const citiesDeleted = await this.cityService.deleteSeveral(citiesId)

            res.status(200).json({
                message: 'Removed',
                data: citiesDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
