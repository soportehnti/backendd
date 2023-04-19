import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateReportDTO, ReportDTO, UpdateReportDTO } from '../dtos/report.dto'
import { Report } from '../models/report.model'

@Service()
export class ReportRepository {
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
    }

    public async findById(id: string): Promise<Report> {
        const itemFound = await this.database.report.findUnique({
            where: { id }
        })

        return itemFound as Report
    }

    public async findByName(name: string): Promise<Report> {
        const itemFound = await this.database.report.findFirst({
            where: { name }
        })

        return itemFound as Report
    }

    public async findMany({ where, limit, offset }: any): Promise<Report[]> {
        const items = await this.database.report.findMany({
            where,
            skip: offset,
            take: limit,
        })

        return items
    }

    public async createOne(data: CreateReportDTO): Promise<Report> {
        const itemCreated = await this.database.report.create({ data })

        return itemCreated
    }

    public async updateById(id: string, data: UpdateReportDTO): Promise<Report> {
        const itemUpdated = await this.database.report.update({
            where: { id },
            data
        })

        return itemUpdated
    }

    public async deleteById(id: string): Promise<Report> {
        const itemDeleted = await this.database.report.delete({
            where: { id }
        })

        return itemDeleted
    }

    public async createMany(data: CreateReportDTO[]): Promise<Report[]> {
        const itemsCreated = await this.database.report.createMany({ data })

        return itemsCreated as any
    }

    public async updateManyById(data: UpdateReportDTO[]): Promise<Report[]> {
        const itemsUpdated = await this.database.report.updateMany({ data })

        return itemsUpdated as any
    }

    public async deleteManyById(ids: string[]): Promise<Report[]> {
        const itemsDeleted = await this.database.report.deleteMany()

        return itemsDeleted as any
    }
}
