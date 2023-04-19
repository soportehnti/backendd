import { Inject, Service } from "typedi";
import { AreaDTO, CreateAreaDTO, UpdateAreaDTO } from "../dtos/area.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { AreaRepository } from "../repositories/area.repository";

@Service()
export class AreaService {

    constructor(@Inject('area.repository') private readonly areaRepository: AreaRepository) { }

    public async getOneById(id: string): Promise<AreaDTO> {
        const areaFound: AreaDTO = await this.areaRepository.findById(id)
        if (!areaFound) throw new NotFoundException()

        return areaFound
    }

    public async getCitiesByArea(id: string): Promise<any> {
        const areaFound: AreaDTO = await this.areaRepository.findCitiesByArea(id)
        if (!areaFound) throw new NotFoundException()

        return areaFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<AreaDTO[]> {
        const areasFound = await this.areaRepository.findMany({ limit, offset }) as AreaDTO[]
        if (!areasFound) throw new NotFoundException()

        return areasFound
    }

    public async createOne(data: CreateAreaDTO): Promise<AreaDTO> {
        const areaFound = await this.areaRepository.findByName(data.name)
        if (areaFound) throw new HttpException(409, 'Area already exists')

        const areaCreated = await this.areaRepository.createOne(data)

        return areaCreated as AreaDTO
    }

    public async createSeveral(data: CreateAreaDTO[]): Promise<AreaDTO[]> {
        const areasCreated = await this.areaRepository.createMany(data) as AreaDTO[]

        return areasCreated
    }

    public async updateOneById(id: string, data: UpdateAreaDTO): Promise<AreaDTO> {
        const areaUpdated = await this.areaRepository.updateById(id, data) as AreaDTO
        if (!areaUpdated) throw new NotFoundException()

        return areaUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateAreaDTO[]): Promise<AreaDTO[]> {
        const areasUpdated = await this.areaRepository.updateManyById(data) as AreaDTO[]

        return areasUpdated
    }

    public async deleteOneById(id: string): Promise<AreaDTO> {
        const areaDeleted = await this.areaRepository.deleteById(id) as AreaDTO
        if (!areaDeleted) throw new NotFoundException()

        return areaDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<AreaDTO[]> {
        const areasDeleted = await this.areaRepository.deleteManyById(ids) as AreaDTO[]

        return areasDeleted
    }
}
