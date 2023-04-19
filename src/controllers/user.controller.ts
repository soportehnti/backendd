import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../dtos/user.dto"
import { IRequest } from "../interfaces/vendors"
import { UserService } from "../services/user.service"

@Service()
export class UserController {

    constructor(@Inject("user.service") private readonly userService: UserService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const userFound = await this.userService.getOneById(id)

            res.status(200).json(userFound)
        } catch (error) {
            next(error)
        }
    }

    public getTicketsAssigned = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const tickets = await this.userService.getTicketsAssigned(id)

            res.status(200).json(tickets)
        } catch (error) {
            next(error)
        }
    }

    public getTicketsRequested = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const tickets = await this.userService.getTicketsRequested(id)

            res.status(200).json(tickets)
        } catch (error) {
            next(error)
        }
    }

    public getRolesCreated = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const roles = await this.userService.getRolesCreated(id)

            res.status(200).json(roles)
        } catch (error) {
            next(error)
        }
    }

    public getTicketsComments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const tickets = await this.userService.getTicketsComments(id)

            res.status(200).json(tickets)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const limit = Number(req.query.limit) || 10
            const offset = Number(req.query.offset) || 0

            const users = await this.userService.getSeveral({ limit, offset })
            const paginatedResponse = {
                items: users,
                limit,
                offset,
                total: users.length,
            }

            res.status(200).json(paginatedResponse)
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            // if (Array.isArray(userData)) next()
            
            const userLogged = req.user
            const userData: CreateUserDTO = req.body

            userData.created_by = userLogged!.id
            const userCreated = await this.userService.createOne(userData)

            res.status(201).json({
                message: 'Created',
                data: userCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public createOnePartial = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: Partial<UserDTO> = req.body
            const userCreated = await this.userService.createOnePartial(userData)

            res.status(201).json({
                message: 'Created',
                data: userCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usersData: CreateUserDTO[] = req.body
            const usersCreated = await this.userService.createSeveral(usersData)

            res.status(201).json({
                message: 'Created',
                data: usersCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const userData: UpdateUserDTO = req.body
            const userUpdated = await this.userService.updateOneById(id, userData)

            res.status(200).json({
                message: 'Updated',
                data: userUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const usersData: any[] = req.body
            const usersUpdated = await this.userService.updateSeveral(usersData)

            res.status(200).json({
                message: 'Updated',
                data: usersUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const userDeleted = await this.userService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                user: userDeleted
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usersId: string[] = req.body
            const usersDeleted = await this.userService.deleteSeveral(usersId)

            res.status(200).json({
                message: 'Removed',
                data: usersDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
