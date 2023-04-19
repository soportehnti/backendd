import { Inject, Service } from "typedi";
import { ClientDTO, CreateClientDTO, UpdateClientDTO } from "../dtos/client.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { ClientRepository } from "../repositories/client.repository";

@Service()
export class ClientService {

    constructor(@Inject('client.repository') private readonly clientRepository: ClientRepository) { }

    public async getOneById(id: string): Promise<ClientDTO> {
        const clientFound: ClientDTO = await this.clientRepository.findById(id)
        if (!clientFound) throw new NotFoundException()

        return clientFound
    }

    public async getTicketsRequested(id: string): Promise<any[]> {
        const ticketsRequested = await this.clientRepository.findTicketsRequested(id) as any[]
        if (!ticketsRequested) throw new NotFoundException()

        return ticketsRequested
    }

    public async getMembers(id: string): Promise<any[]> {
        const members = await this.clientRepository.findMembers(id) as any[]
        if (!members) throw new NotFoundException()

        return members
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<ClientDTO[]> {
        const clientsFound = await this.clientRepository.findMany({ limit, offset }) as ClientDTO[]
        if (!clientsFound) throw new NotFoundException()

        return clientsFound
    }

    public async createOne(data: CreateClientDTO): Promise<ClientDTO> {
        const clientFound = await this.clientRepository.findByName(data.name)
        if (clientFound) throw new HttpException(409, 'Client already exists')

        const clientCreated = await this.clientRepository.createOne(data)

        return clientCreated as ClientDTO
    }

    public async createSeveral(data: CreateClientDTO[]): Promise<ClientDTO[]> {
        const clientsCreated = await this.clientRepository.createMany(data) as ClientDTO[]

        return clientsCreated
    }

    public async updateOneById(id: string, data: UpdateClientDTO): Promise<ClientDTO> {
        const clientUpdated = await this.clientRepository.updateById(id, data) as ClientDTO
        if (!clientUpdated) throw new NotFoundException()

        return clientUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateClientDTO[]): Promise<ClientDTO[]> {
        const clientsUpdated = await this.clientRepository.updateManyById(data) as ClientDTO[]

        return clientsUpdated
    }

    public async deleteOneById(id: string): Promise<ClientDTO> {
        const clientDeleted = await this.clientRepository.deleteById(id) as ClientDTO
        if (!clientDeleted) throw new NotFoundException()

        return clientDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<ClientDTO[]> {
        const clientsDeleted = await this.clientRepository.deleteManyById(ids) as ClientDTO[]

        return clientsDeleted
    }
}
