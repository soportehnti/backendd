import { Inject, Service } from "typedi";
import { CreateStatusDTO, StatusDTO, UpdateStatusDTO } from "../dtos/status.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { StatusRepository } from "../repositories/status.repository";

@Service()
export class StatusService {

    constructor(@Inject('status.repository') private readonly statusRepository: StatusRepository) { }

    public async getOneById(id: string): Promise<StatusDTO> {
        const statusFound: StatusDTO = await this.statusRepository.findById(id)
        if (!statusFound) throw new NotFoundException()

        return statusFound
    }

    public async getTicketsByStatusId(id: string): Promise<any> {
        const ticketsFound = await this.statusRepository.getTicketsByStatusId(id)
        if (!ticketsFound) throw new NotFoundException()

        return ticketsFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<StatusDTO[]> {
        const statusesFound = await this.statusRepository.findMany({ limit, offset }) as StatusDTO[]
        if (!statusesFound) throw new NotFoundException()

        return statusesFound
    }

    public async createOne(data: CreateStatusDTO): Promise<StatusDTO> {
        const user = await this.statusRepository.findByName(data.name)
        if (user) throw new HttpException(409, 'Status already exists')

        const statusCreated = await this.statusRepository.createOne(data)

        return statusCreated as StatusDTO
    }

    public async createSeveral(data: CreateStatusDTO[]): Promise<StatusDTO[]> {
        const statusesCreated = await this.statusRepository.createMany(data) as StatusDTO[]

        return statusesCreated
    }

    public async updateOneById(id: string, data: UpdateStatusDTO): Promise<StatusDTO> {
        const statusUpdated = await this.statusRepository.updateById(id, data) as StatusDTO
        if (!statusUpdated) throw new NotFoundException()

        return statusUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateStatusDTO[]): Promise<StatusDTO[]> {
        const statusesUpdated = await this.statusRepository.updateManyById(data) as StatusDTO[]

        return statusesUpdated
    }

    public async deleteOneById(id: string): Promise<StatusDTO> {
        const statusDeleted = await this.statusRepository.deleteById(id) as StatusDTO
        if (!statusDeleted) throw new NotFoundException()

        return statusDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<StatusDTO[]> {
        const statusesDeleted = await this.statusRepository.deleteManyById(ids) as StatusDTO[]

        return statusesDeleted
    }
}
