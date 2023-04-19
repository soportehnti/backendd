import { Inject, Service } from "typedi";
import { CreatePermissionDTO, PermissionDTO, UpdatePermissionDTO } from "../dtos/permission.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { PermissionRepository } from "../repositories/permission.repository";

@Service()
export class PermissionService {

    constructor(@Inject('permission.repository') private readonly permissionRepository: PermissionRepository) { }

    public async getOneById(id: string): Promise<PermissionDTO> {
        const permissionFound: PermissionDTO = await this.permissionRepository.findById(id)
        if (!permissionFound) throw new NotFoundException()

        return permissionFound
    }

    public async getOneByName(id: string): Promise<PermissionDTO> {
        const permissionFound: PermissionDTO = await this.permissionRepository.findByName(id)
        if (!permissionFound) throw new NotFoundException()

        return permissionFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<PermissionDTO[]> {
        const permissionsFound = await this.permissionRepository.findMany({ limit, offset }) as PermissionDTO[]
        if (!permissionsFound) throw new NotFoundException()

        return permissionsFound
    }

    public async createSeveral(countriesData: CreatePermissionDTO[]): Promise<PermissionDTO[]> {
        const permissionCreated = await this.permissionRepository.createMany(countriesData) as PermissionDTO[]

        return permissionCreated
    }

    public async createOne(permissionData: CreatePermissionDTO): Promise<PermissionDTO> {
        const user = await this.permissionRepository.findByName(permissionData.name)
        if (user) throw new HttpException(409, 'permission already exists')

        const permissionCreated = await this.permissionRepository.createOne(permissionData)

        return permissionCreated as PermissionDTO
    }

    public async updateOneById(id: string, permissionData: UpdatePermissionDTO): Promise<PermissionDTO> {
        const permissionUpdated = await this.permissionRepository.updateById(id, permissionData) as PermissionDTO
        if (!permissionUpdated) throw new NotFoundException()

        return permissionUpdated
    }

    public async deleteOneById(id: string): Promise<PermissionDTO> {
        const permissionDeleted = await this.permissionRepository.deleteById(id) as PermissionDTO
        if (!permissionDeleted) throw new NotFoundException()

        return permissionDeleted
    }

    public async updateSeveral(countriesData: UpdatePermissionDTO[]): Promise<PermissionDTO[]> {
        const permissionsUpdated = await this.permissionRepository.updateManyById(countriesData) as PermissionDTO[]

        return permissionsUpdated
    }

    public async deleteSeveral(countriesId: string[]): Promise<PermissionDTO[]> {
        const permissionsDeleted = await this.permissionRepository.deleteManyById(countriesId) as PermissionDTO[]

        return permissionsDeleted
    }
}
