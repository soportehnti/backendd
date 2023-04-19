import { Inject, Service } from "typedi";
import { CreateIncidentTypeDTO, IncidentTypeDTO, UpdateIncidentTypeDTO } from "../dtos/incident-type.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { IncidentTypeRepository } from "../repositories/incident-type.repository";

@Service()
export class IncidentTypeService {

    constructor(@Inject('incidentType.repository') private readonly incidentTypeRepository: IncidentTypeRepository) { }

    public async getOneById(id: string): Promise<IncidentTypeDTO> {
        const incidentTypeFound: IncidentTypeDTO = await this.incidentTypeRepository.findById(id)
        if (!incidentTypeFound) throw new NotFoundException()

        return incidentTypeFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<IncidentTypeDTO[]> {
        const incidentTypesFound = await this.incidentTypeRepository.findMany({ limit, offset }) as IncidentTypeDTO[]
        if (!incidentTypesFound) throw new NotFoundException()

        return incidentTypesFound
    }

    public async getIncidentTypeTickets(id: string, { limit, offset }: { limit: number, offset: number }): Promise<IncidentTypeDTO[]> {
        const ticketsFound = await this.incidentTypeRepository.findIncidentTypeTickets(id, { limit, offset }) as IncidentTypeDTO[]
        if (!ticketsFound) throw new NotFoundException()

        return ticketsFound
    }

    public async createOne(data: CreateIncidentTypeDTO): Promise<IncidentTypeDTO> {
        const incidentTypeFound = await this.incidentTypeRepository.findByName(data.name)
        if (incidentTypeFound) throw new HttpException(409, 'Incident Type already exists')

        const incidentTypeCreated = await this.incidentTypeRepository.createOne(data)

        return incidentTypeCreated as IncidentTypeDTO
    }

    public async createSeveral(data: CreateIncidentTypeDTO[]): Promise<IncidentTypeDTO[]> {
        const incidentTypesCreated = await this.incidentTypeRepository.createMany(data) as IncidentTypeDTO[]

        return incidentTypesCreated
    }

    public async updateOneById(id: string, data: UpdateIncidentTypeDTO): Promise<IncidentTypeDTO> {
        const incidentTypeUpdated = await this.incidentTypeRepository.updateById(id, data) as IncidentTypeDTO
        if (!incidentTypeUpdated) throw new NotFoundException()

        return incidentTypeUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateIncidentTypeDTO[]): Promise<IncidentTypeDTO[]> {
        const incidentTypesUpdated = await this.incidentTypeRepository.updateManyById(data) as IncidentTypeDTO[]

        return incidentTypesUpdated
    }

    public async deleteOneById(id: string): Promise<IncidentTypeDTO> {
        const incidentTypeDeleted = await this.incidentTypeRepository.deleteById(id) as IncidentTypeDTO
        if (!incidentTypeDeleted) throw new NotFoundException()

        return incidentTypeDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<IncidentTypeDTO[]> {
        const incidentTypesDeleted = await this.incidentTypeRepository.deleteManyById(ids) as IncidentTypeDTO[]

        return incidentTypesDeleted
    }
}
