import { NextFunction, Request, Response } from "express"
import { url } from "inspector"
import { Inject, Service } from "typedi"
import projectConfig from "../config/index.config"
import { CreateFileDTO } from "../dtos/file.dto"
import { IRequest } from "../interfaces/vendors"
import { FileService } from "../services/file.service"

@Service()
export class FileController {

    constructor(@Inject("file.service") private readonly fileService: FileService) { }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 100
            const offsetNumber = Number(offset) || 0
            const filesFound = await this.fileService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: filesFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: filesFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const fileFound = await this.fileService.getOneById(id)

            res.status(200).json(fileFound)
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const file = req.file as any
            const fileData = {
                name: file.filename,
                type: file.mimetype.split('/')[1],
                size: file.size,
                created_by: userLogged!.id,
            } as CreateFileDTO

            const fileCreated = await this.fileService.createOne(fileData)

            res.status(201).json({
                message: 'Created',
                data: fileCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const fileDeleted = await this.fileService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: fileDeleted,
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.body
            const filesDeleted = await this.fileService.deleteSeveral(ids)

            res.status(200).json({
                message: 'Files Removed',
                data: filesDeleted,
            })
        } catch (error) {
            next(error)
        }
    }
}
