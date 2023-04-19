import { Inject, Service } from "typedi";
import { CreateStateDTO, StateDTO, UpdateStateDTO } from "../dtos/state.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { StateRepository } from "../repositories/state.repository";

@Service()
export class StateService {

    constructor(@Inject('state.repository') private readonly stateRepository: StateRepository) { }

    public async getOneById(id: string): Promise<StateDTO> {
        const stateFound: StateDTO = await this.stateRepository.findById(id)
        if (!stateFound) throw new NotFoundException()

        return stateFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<StateDTO[]> {
        const statesFound = await this.stateRepository.findMany({ limit, offset }) as StateDTO[]
        if (!statesFound) throw new NotFoundException()

        return statesFound
    }

    public async getStateCities(id: string): Promise<any[]> {
        const citiesFound = await this.stateRepository.findStateCities(id)
        if (!citiesFound) throw new NotFoundException()

        return citiesFound
    }

    public async createOne(data: CreateStateDTO): Promise<StateDTO> {
        const stateFound = await this.stateRepository.findByName(data.name)
        if (stateFound) throw new HttpException(409, 'State already exists')

        const stateCreated = await this.stateRepository.createOne(data)

        return stateCreated as StateDTO
    }

    public async createSeveral(data: CreateStateDTO[]): Promise<StateDTO[]> {
        const statesCreated = await this.stateRepository.createMany(data) as StateDTO[]

        return statesCreated
    }

    public async updateOneById(id: string, data: UpdateStateDTO): Promise<StateDTO> {
        const stateUpdated = await this.stateRepository.updateById(id, data) as StateDTO
        if (!stateUpdated) throw new NotFoundException()

        return stateUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateStateDTO[]): Promise<StateDTO[]> {
        const statesUpdated = await this.stateRepository.updateManyById(ids, data) as StateDTO[]

        return statesUpdated
    }

    public async deleteOneById(id: string): Promise<StateDTO> {
        const stateDeleted = await this.stateRepository.deleteById(id) as StateDTO
        if (!stateDeleted) throw new NotFoundException()

        return stateDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<StateDTO[]> {
        const statesDeleted = await this.stateRepository.deleteManyById(ids) as StateDTO[]

        return statesDeleted
    }
}
