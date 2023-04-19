import { Inject, Service } from "typedi";
import { CountryDTO, CreateCountryDTO, UpdateCountryDTO } from "../dtos/country.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { CountryRepository } from "../repositories/country.repository";

@Service()
export class CountryService {

    constructor(@Inject("country.repository") private readonly countryRepository: CountryRepository) { }

    public async getOneById(id: string): Promise<CountryDTO> {
        const countryFound: CountryDTO = await this.countryRepository.findById(id)
        if (!countryFound) throw new NotFoundException()

        return countryFound
    }

    public async getOneByName(id: string): Promise<CountryDTO> {
        const countryFound: CountryDTO = await this.countryRepository.findByName(id)
        if (!countryFound) throw new NotFoundException()

        return countryFound
    }

    public async getCountryStates(id: string): Promise<any> {
        const statesFound = await this.countryRepository.findCountryStates(id)

        if (!statesFound) throw new NotFoundException()

        return statesFound
    }

    public async getCountryCities(id: string): Promise<CountryDTO[]> {
        const citiesFound = await this.countryRepository.findMany({
            where: { id }
        }) as CountryDTO[]

        if (!citiesFound) throw new NotFoundException()

        return citiesFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<CountryDTO[]> {
        const countriesFound = await this.countryRepository.findMany({ limit, offset }) as CountryDTO[]
        if (!countriesFound) throw new NotFoundException()

        return countriesFound
    }

    public async createSeveral(countriesData: CreateCountryDTO[]): Promise<CountryDTO[]> {
        const countriesCreated = await this.countryRepository.createMany(countriesData) as CountryDTO[]

        return countriesCreated
    }

    public async createOne(countryData: CreateCountryDTO): Promise<CountryDTO> {
        const countryFound = await this.countryRepository.findByName(countryData.name)
        if (countryFound) throw new HttpException(409, 'Country already exists')

        const countryCreated = await this.countryRepository.createOne(countryData)

        return countryCreated as CountryDTO
    }

    public async updateOneById(id: string, countryData: UpdateCountryDTO): Promise<CountryDTO> {
        const countryUpdated = await this.countryRepository.updateById(id, countryData) as CountryDTO
        if (!countryUpdated) throw new NotFoundException()

        return countryUpdated
    }

    public async deleteOneById(id: string): Promise<CountryDTO> {
        const countryDeleted = await this.countryRepository.deleteById(id) as CountryDTO
        if (!countryDeleted) throw new NotFoundException()

        return countryDeleted
    }

    public async updateSeveral(countriesData: UpdateCountryDTO[]): Promise<CountryDTO[]> {
        const countriesUpdated = await this.countryRepository.updateManyById(countriesData) as CountryDTO[]

        return countriesUpdated
    }

    public async deleteSeveral(countriesId: string[]): Promise<CountryDTO[]> {
        const countriesDeleted = await this.countryRepository.deleteManyById(countriesId) as CountryDTO[]

        return countriesDeleted
    }
}
