import { Inject, Service } from "typedi";
import { CityDTO, CreateCityDTO, UpdateCityDTO } from "../dtos/city.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { CityRepository } from "../repositories/city.repository";

@Service()
export class CityService {

    constructor(@Inject('city.repository') private readonly cityRepository: CityRepository) { }

    public async getOneById(id: string): Promise<CityDTO> {
        const cityFound: CityDTO = await this.cityRepository.findById(id)
        if (!cityFound) throw new NotFoundException()

        return cityFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<CityDTO[]> {
        const citiesFound = await this.cityRepository.findMany({ limit, offset }) as CityDTO[]
        if (!citiesFound) throw new NotFoundException()

        return citiesFound
    }

    public async getClientsByCity(id: string): Promise<any> {
        const clientsFound = await this.cityRepository.findClientsByCity(id)
        if (!clientsFound) throw new NotFoundException()

        return clientsFound
    }

    public async createOne(data: CreateCityDTO): Promise<CityDTO> {
        const cityFound = await this.cityRepository.findByName(data.name)
        if (cityFound) throw new HttpException(409, 'City already exists')

        const cityCreated = await this.cityRepository.createOne(data)

        return cityCreated as CityDTO
    }

    public async createSeveral(data: CreateCityDTO[]): Promise<CityDTO[]> {
        const citiesCreated = await this.cityRepository.createMany(data) as CityDTO[]

        return citiesCreated
    }

    public async updateOneById(id: string, data: UpdateCityDTO): Promise<CityDTO> {
        const cityUpdated = await this.cityRepository.updateById(id, data) as CityDTO
        if (!cityUpdated) throw new NotFoundException()

        return cityUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateCityDTO[]): Promise<CityDTO[]> {
        const citiesUpdated = await this.cityRepository.updateManyById(data) as CityDTO[]

        return citiesUpdated
    }

    public async deleteOneById(id: string): Promise<CityDTO> {
        const cityDeleted = await this.cityRepository.deleteById(id) as CityDTO
        if (!cityDeleted) throw new NotFoundException()

        return cityDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<CityDTO[]> {
        const citiesDeleted = await this.cityRepository.deleteManyById(ids) as CityDTO[]

        return citiesDeleted
    }
}
