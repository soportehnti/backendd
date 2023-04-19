import { Inject, Service } from "typedi";
import { CreatePriorityDTO, PriorityDTO, UpdatePriorityDTO } from "../dtos/priority.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { PriorityRepository } from "../repositories/priority.repository";

@Service()
export class PriorityService {

    constructor(@Inject('priority.repository') private readonly priorityRepository: PriorityRepository) { }

    public async getOneById(id: string): Promise<PriorityDTO> {
        const priorityFound: PriorityDTO = await this.priorityRepository.findById(id)
        if (!priorityFound) throw new NotFoundException()

        return priorityFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<PriorityDTO[]> {
        const prioritiesFound = await this.priorityRepository.findMany({ limit, offset }) as PriorityDTO[]
        if (!prioritiesFound) throw new NotFoundException()
        

        return prioritiesFound
    }

    public async getPriorityTickets(id: string, { limit, offset }: { limit: number, offset: number }): Promise<PriorityDTO[]> {
        const ticketsFound = await this.priorityRepository.findPriorityTickets(id, { limit, offset }) as PriorityDTO[]
        if (!ticketsFound) throw new NotFoundException()

        return ticketsFound
    }

    public async createOne(data: CreatePriorityDTO): Promise<PriorityDTO> {
        const priorityFound = await this.priorityRepository.findByName(data.name)
        if (priorityFound) throw new HttpException(409, 'Priority already exists')

        const priorityCreated = await this.priorityRepository.createOne(data)

        return priorityCreated as PriorityDTO
    }

    public async createSeveral(data: CreatePriorityDTO[]): Promise<PriorityDTO[]> {
        const prioritiesCreated = await this.priorityRepository.createMany(data) as PriorityDTO[]

        return prioritiesCreated
    }

    public async updateOneById(id: string, data: UpdatePriorityDTO): Promise<PriorityDTO> {
        const priorityUpdated = await this.priorityRepository.updateById(id, data) as PriorityDTO
        if (!priorityUpdated) throw new NotFoundException()

        return priorityUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdatePriorityDTO[]): Promise<PriorityDTO[]> {
        const prioritiesUpdated = await this.priorityRepository.updateManyById(data) as PriorityDTO[]

        return prioritiesUpdated
    }

    public async deleteOneById(id: string): Promise<PriorityDTO> {
        const priorityDeleted = await this.priorityRepository.deleteById(id) as PriorityDTO
        if (!priorityDeleted) throw new NotFoundException()

        return priorityDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<PriorityDTO[]> {
        const prioritiesDeleted = await this.priorityRepository.deleteManyById(ids) as PriorityDTO[]

        return prioritiesDeleted
    }
}
