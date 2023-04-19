import { Inject, Service } from "typedi";
import { CreateReportDTO, ReportDTO, UpdateReportDTO } from "../dtos/report.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { ReportRepository } from "../repositories/report.repository";
import { FileGenerator } from "../utils/file-generator";
import { FileService } from "./file.service";

@Service()
export class ReportService {
    private fileGenerator: FileGenerator = new FileGenerator()

    constructor(
        @Inject('report.repository') private readonly reportRepository: ReportRepository,
        @Inject('file.service') private readonly fileService: FileService
    ) { }

    public async generateReportFile(reportData: any): Promise<any> {
        const templateData = {
            ...reportData,
        }

        const fileCreated = await this.fileGenerator.generateFromTemplate({
            input: {
                template: 'general-report-spanish',
                data: templateData
            },
            output: { format: 'html' }
        })

        return fileCreated
    }

    public async generateOneReportFileById(id: string): Promise<any> {
        const reportFound = await this.getOneById(id)
        const reportFile = await this.generateReportFile(reportFound)

        return await this.generateReportFile(reportFile)
    }

    public async getOneById(id: string): Promise<ReportDTO> {
        const reportFound: ReportDTO = await this.reportRepository.findById(id)
        if (!reportFound) throw new NotFoundException()

        return reportFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<ReportDTO[]> {
        const reportsFound = await this.reportRepository.findMany({ limit, offset }) as ReportDTO[]
        if (!reportsFound) throw new NotFoundException()

        return reportsFound
    }

    public async createOne(data: CreateReportDTO): Promise<ReportDTO> { 
        const reportFound = await this.reportRepository.findByName(data.name)
        if (reportFound) throw new HttpException(409, 'File already exists')
        
        const reportCreated = await this.reportRepository.createOne(data)
        
        const reportFile = await this.generateReportFile(reportCreated)
        const fileCreated = await this.fileService.createOne({
            created_by: reportCreated.created_by,
            name: reportFile.name,
            size: reportFile.size,
            type: reportFile.type,
        })

        await this.reportRepository.updateById(reportCreated.id, { file_url: fileCreated.url })
        reportCreated.file_url = fileCreated.url

        return reportCreated as ReportDTO
    }

    public async createSeveral(data: CreateReportDTO[]): Promise<ReportDTO[]> {
        const reportsCreated = await this.reportRepository.createMany(data) as ReportDTO[]

        return reportsCreated
    }

    public async updateOneById(id: string, data: UpdateReportDTO): Promise<ReportDTO> {
        const reportUpdated = await this.reportRepository.updateById(id, data) as ReportDTO
        if (!reportUpdated) throw new NotFoundException()

        return reportUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateReportDTO[]): Promise<ReportDTO[]> {
        const reportsUpdated = await this.reportRepository.updateManyById(data) as ReportDTO[]

        return reportsUpdated
    }

    public async deleteOneById(id: string): Promise<ReportDTO> {
        const reportDeleted = await this.reportRepository.deleteById(id) as ReportDTO
        if (!reportDeleted) throw new NotFoundException()

        return reportDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<ReportDTO[]> {
        const reportsDeleted = await this.reportRepository.deleteManyById(ids) as ReportDTO[]

        return reportsDeleted
    }
}
