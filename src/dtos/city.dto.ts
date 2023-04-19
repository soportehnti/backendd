import { City } from "../models/city.model";

export type CityDTO = City
export type CreateCityDTO = Omit<City, 'id' | 'created_at' | 'updated_at'>
export type UpdateCityDTO = Partial<CreateCityDTO>
