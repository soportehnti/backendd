import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreatePermissionDTO, PermissionDTO, UpdatePermissionDTO } from "../dtos/permission.dto"
import { IRequest } from "../interfaces/vendors"
import { PermissionService } from "../services/permissions.service"

@Service()
export class PermissionController {

    constructor(@Inject("permission.service") private readonly permissionService: PermissionService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const country = await this.permissionService.getOneById(id)

            res.status(200).json(country)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const countriesFound = await this.permissionService.getSeveral({ limit: limitNumber, offset: offsetNumber })

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
            const permissionData: CreatePermissionDTO = req.body

            permissionData.created_by = userLogged!.id
            const permissionCreated = await this.permissionService.createOne(permissionData)

            res.status(201).json({
                message: 'Created',
                data: permissionCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countriesData: CreatePermissionDTO[] = req.body
            const countriesCreated = await this.permissionService.createSeveral(countriesData)

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
            const countryData: UpdatePermissionDTO = req.body
            const countryUpdated = await this.permissionService.updateOneById(id, countryData)

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
            const countriesData: UpdatePermissionDTO[] = req.body
            const countriesUpdated = await this.permissionService.updateSeveral(countriesData)

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
            const countryDeleted = await this.permissionService.deleteOneById(id)

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
            const countriesDeleted = await this.permissionService.deleteSeveral(countriesId)

            res.status(200).json({
                message: 'Removed',
                data: countriesDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
