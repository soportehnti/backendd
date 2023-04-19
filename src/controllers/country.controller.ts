import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CountryDTO, CreateCountryDTO, UpdateCountryDTO } from "../dtos/country.dto"
import { IRequest } from "../interfaces/vendors"
import { CountryService } from "../services/country.service"

@Service()
export class CountryController {

    constructor(@Inject("country.service") private readonly countryService: CountryService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const country = await this.countryService.getOneById(id)

            res.status(200).json(country)
        } catch (error) {
            next(error)
        }
    }

    public getCountryStates = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const statesFound = await this.countryService.getCountryStates(id)

            res.status(200).json(statesFound)
        } catch (error) {
            next(error)
        }
    }

    public getCountryCities = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const citiesFound = await this.countryService.getCountryCities(id)

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
            const countriesFound = await this.countryService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: countriesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: countriesFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const countryData: CreateCountryDTO = req.body

            countryData.created_by = userLogged!.id
            const countryCreated = await this.countryService.createOne(countryData)

            res.status(201).json({
                message: 'Created',
                data: countryCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countriesData: CreateCountryDTO[] = req.body
            const countriesCreated = await this.countryService.createSeveral(countriesData)

            res.status(201).json({
                message: 'Created',
                data: countriesCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const countryData: UpdateCountryDTO = req.body
            const countryUpdated = await this.countryService.updateOneById(id, countryData)

            res.status(200).json({
                message: 'Updated',
                data: countryUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const countriesData: UpdateCountryDTO[] = req.body
            const countriesUpdated = await this.countryService.updateSeveral(countriesData)

            res.status(200).json({
                message: 'Updated',
                data: countriesUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const countryDeleted = await this.countryService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: countryDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countriesId: string[] = req.body
            const countriesDeleted = await this.countryService.deleteSeveral(countriesId)

            res.status(200).json({
                message: 'Removed',
                data: countriesDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
