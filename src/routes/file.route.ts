import express, { Router } from 'express'
import path from 'path'
import upload from '../config/multer.config'
import { FileController } from '../controllers/file.controller'
import { IRoute } from '../interfaces/vendors'
import { isAuthenticated } from "../middlewares/authenticate.middleware"
import { FileRepository } from '../repositories/file.repository'
import { FileService } from '../services/file.service'


export class FileRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/files'

    private repository: FileRepository = new FileRepository()
    private service: FileService = new FileService(this.repository)
    private controller: FileController = new FileController(this.service)

    constructor() {
        // this.router.use(this.path, isAuthenticated)
        this.router.use(this.path, express.static(path.join(__dirname, '../../public/files')))
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to get one file
        this.router.get(
            this.path + '/:id',
            this.controller.getOneById
        )
        
        // Route to get several files
        this.router.get(
            this.path,
            this.controller.getSeveral
        )

        // Route to create one file
        this.router.post(
            this.path,
            isAuthenticated,
            upload.single('file'),
            this.controller.createOne,
        )

        // Route to delete one file
        this.router.delete(
            this.path + '/:id',
            this.controller.deleteOneById
        )

        // Route to delete several files
        this.router.delete(
            this.path,
            this.controller.deleteSeveral
        )
    }
}
