import { Inject, Service } from "typedi";
import projectConfig from "../config/index.config";
import { CreateFileDTO, FileDTO, UpdateFileDTO } from "../dtos/file.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { FileRepository } from "../repositories/file.repository";

@Service()
export class FileService {

    constructor(@Inject('file.repository') private readonly fileRepository: FileRepository) { }

    public async getOneById(id: string): Promise<FileDTO> {
        const fileFound: FileDTO = await this.fileRepository.findById(id)
        if (!fileFound) throw new NotFoundException()

        return fileFound
    }

    public async getOneByName(id: string): Promise<FileDTO> {
        const fileFound: FileDTO = await this.fileRepository.findByName(id)
        if (!fileFound) throw new NotFoundException()

        return fileFound
    }

    public async getfileCities(id: string): Promise<FileDTO[]> {
        const citiesFound = await this.fileRepository.findMany({
            where: { id }
        }) as FileDTO[]

        if (!citiesFound) throw new NotFoundException()

        return citiesFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<FileDTO[]> {
        const filesFound = await this.fileRepository.findMany({ limit, offset }) as FileDTO[]
        if (!filesFound) throw new NotFoundException()

        return filesFound
    }

    public async createOne(fileData: CreateFileDTO): Promise<FileDTO> {
        const fileFound = await this.fileRepository.findByName(fileData.name)
        if (fileFound) throw new HttpException(409, 'File already exists')

        const fileDataToCreate = {
            ...fileData,
            url: projectConfig.server.url + '/v1/files/' + fileData.name
        }

        const fileCreated = await this.fileRepository.createOne(fileDataToCreate)

        return fileCreated as FileDTO
    }

    public async updateOneById(id: string, fileData: UpdateFileDTO): Promise<FileDTO> {
        const fileUpdated = await this.fileRepository.updateById(id, fileData) as FileDTO
        if (!fileUpdated) throw new NotFoundException()

        return fileUpdated
    }

    public async deleteOneById(id: string): Promise<FileDTO> {
        const fileDeleted = await this.fileRepository.deleteById(id) as FileDTO
        if (!fileDeleted) throw new NotFoundException()

        return fileDeleted
    }

    public async deleteSeveral(filesId: string[]): Promise<FileDTO[]> {
        const filesDeleted = await this.fileRepository.deleteManyById(filesId) as FileDTO[]

        return filesDeleted
    }
}
