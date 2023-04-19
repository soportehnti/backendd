import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from "../dtos/role.dto"
import { IRequest } from "../interfaces/vendors"
import { RoleService } from "../services/role.service"

@Service()
export class RoleController {

    constructor(@Inject("role.service") private readonly roleService: RoleService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const roleFound = await this.roleService.getOneById(id)

            res.status(200).json(roleFound)
        } catch (error) {
            next(error)
        }
    }

    public getUsersByRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const usersFound = await this.roleService.getUsersByRoleId(id)

            res.status(200).json(usersFound)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const rolesFound = await this.roleService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: rolesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: rolesFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const roleData: CreateRoleDTO = req.body

            roleData.created_by = userLogged!.id
            const roleCreated = await this.roleService.createOne(roleData)

            res.status(201).json({
                message: 'Created',
                data: roleCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rolesData: CreateRoleDTO[] = req.body
            const rolesCreated = await this.roleService.createSeveral(rolesData)

            res.status(201).json({
                message: 'Created',
                data: rolesCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const roleData: UpdateRoleDTO = req.body
            const roleUpdated = await this.roleService.updateOneById(id, roleData)

            res.status(200).json({
                message: 'Updated',
                data: roleUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const rolesId: string[] = ids.split(',')
            const rolesData: UpdateRoleDTO[] = req.body
            const rolesUpdated = await this.roleService.updateSeveral(rolesId, rolesData)

            res.status(200).json({
                message: 'Updated',
                data: rolesUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const roleDeleted = await this.roleService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: roleDeleted
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rolesId: string[] = req.body
            const rolesDeleted = await this.roleService.deleteSeveral(rolesId)

            res.status(200).json({
                message: 'Removed',
                data: rolesDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
