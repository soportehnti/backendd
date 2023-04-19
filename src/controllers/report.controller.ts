import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateReportDTO, ReportDTO, UpdateReportDTO } from "../dtos/report.dto"
import { IRequest } from "../interfaces/vendors"
import { ReportService } from "../services/report.service"

@Service()
export class ReportController {

    constructor(@Inject("report.service") private readonly reportService: ReportService) { }

    public getOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const reportFound = await this.reportService.getOneById(id)

            res.status(200).json(reportFound)
        } catch (error) {
            next(error)
        }
    }

    public generateOneReportFileById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const reportFile = await this.reportService.generateOneReportFileById(id)
            res.status(200).download(reportFile)
        } catch (error) {
            next(error)
        }
    }

    public getSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit, offset } = req.query
            const limitNumber = Number(limit) || 10
            const offsetNumber = Number(offset) || 0
            const reportsFound = await this.reportService.getSeveral({ limit: limitNumber, offset: offsetNumber })

            res.status(200).json({
                items: reportsFound,
                limit: limitNumber,
                offset: offsetNumber,
                total: reportsFound.length,
            })
        } catch (error) {
            next(error)
        }
    }

    public createOne = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const userLogged = req.user
            const reportData: CreateReportDTO = req.body

            reportData.created_by = userLogged!.id
            const reportCreated = await this.reportService.createOne(reportData)

            res.status(201).json({
                message: 'Created',
                data: reportCreated,
            })
        } catch (error) {
            next(error)
        }
    }

    public createSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reportsData: CreateReportDTO[] = req.body
            const reportsCreated = await this.reportService.createSeveral(reportsData)

            res.status(201).json({
                message: 'Created',
                data: reportsCreated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const reportData: UpdateReportDTO = req.body
            const reportUpdated = await this.reportService.updateOneById(id, reportData)

            res.status(200).json({
                message: 'Updated',
                data: reportUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ids } = req.params
            const reportsId: string[] = ids.split(',')

            const reportsData: UpdateReportDTO[] = req.body
            const reportsUpdated = await this.reportService.updateSeveral(reportsId, reportsData)

            res.status(200).json({
                message: 'Updated',
                data: reportsUpdated
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOneById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const reportDeleted = await this.reportService.deleteOneById(id)

            res.status(200).json({
                message: 'Removed',
                data: reportDeleted
            })
        } catch (error) {
            next(error)
        }
    }


    public deleteSeveral = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reportsId: string[] = req.body
            const reportsDeleted = await this.reportService.deleteSeveral(reportsId)

            res.status(200).json({
                message: 'Removed',
                data: reportsDeleted
            })
        } catch (error) {
            next(error)
        }
    }
}
