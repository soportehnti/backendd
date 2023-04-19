import { Country } from "../models/country.model";

export type CountryDTO = Country
export type CreateCountryDTO = Omit<Country, 'id' | 'created_at' | 'updated_at'>
export type UpdateCountryDTO = Partial<CreateCountryDTO>
