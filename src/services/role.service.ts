import { Inject, Service } from "typedi";
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from "../dtos/role.dto";
import { HttpException, NotFoundException } from "../exceptions";
import { RoleRepository } from "../repositories/role.repository";

@Service()
export class RoleService {

    constructor(@Inject('role.repository') private readonly roleRepository: RoleRepository) { }

    public async getOneById(id: string): Promise<RoleDTO> {
        const roleFound: RoleDTO = await this.roleRepository.findById(id)
        if (!roleFound) throw new NotFoundException()

        return roleFound
    }

    public async getUsersByRoleId(id: string): Promise<any> {
        const usersFound  = await this.roleRepository.findUsersByRoleId(id)
        if (!usersFound) throw new NotFoundException()

        return usersFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<RoleDTO[]> {
        const rolesFound = await this.roleRepository.findMany({ limit, offset }) as RoleDTO[]
        if (!rolesFound) throw new NotFoundException()

        return rolesFound
    }

    public async createOne(data: CreateRoleDTO): Promise<RoleDTO> {
        const roleFound = await this.roleRepository.findByName(data.name)
        if (roleFound) throw new HttpException(409, 'Role already exists')

        const roleCreated = await this.roleRepository.createOne(data)

        return roleCreated as RoleDTO
    }

    public async createSeveral(data: CreateRoleDTO[]): Promise<RoleDTO[]> {
        const rolesCreated = await this.roleRepository.createMany(data) as RoleDTO[]

        return rolesCreated
    }

    public async updateOneById(id: string, data: UpdateRoleDTO): Promise<RoleDTO> {
        const roleUpdated = await this.roleRepository.updateById(id, data) as RoleDTO
        if (!roleUpdated) throw new NotFoundException()

        return roleUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateRoleDTO[]): Promise<RoleDTO[]> {
        const rolesUpdated = await this.roleRepository.updateManyById(data) as RoleDTO[]

        return rolesUpdated
    }

    public async deleteOneById(id: string): Promise<RoleDTO> {
        const roleDeleted = await this.roleRepository.deleteById(id) as RoleDTO
        if (!roleDeleted) throw new NotFoundException()

        return roleDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<RoleDTO[]> {
        const rolesDeleted = await this.roleRepository.deleteManyById(ids) as RoleDTO[]

        return rolesDeleted
    }
}
