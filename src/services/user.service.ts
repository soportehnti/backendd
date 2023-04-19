import { Inject, Service } from "typedi";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../dtos/user.dto";
import HttpException from "../exceptions/http.exception";
import NotFoundException from "../exceptions/not-found.exception";
import { UserRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/password-hasher";

@Service()
export class UserService {

    constructor(@Inject('user.repository') private readonly userRepository: UserRepository) {
        // this.insertAdmin()
    }

    public async insertAdmin(): Promise<void> {
        const adminData = {
            email: "admin@admin.com",
            password: "admin1234",
            username: "admin",
            first_name: "Admin",
            last_name: "User",
            type: "admin",
            is_verified: true,
        } as CreateUserDTO

        const adminFound = await this.userRepository.findByEmail(adminData.email)
        if (adminFound) return

        const user = await this.createOne(adminData)
        if (!user) throw new HttpException(500, "Error creating admin user")

        console.log("Admin user created")
    }

    public async getOneById(id: string): Promise<UserDTO> {
        const user = await this.userRepository.findById(id) as UserDTO
        if (!user) throw new NotFoundException()

        return user
    }

    public async getOneByEmail(email: string): Promise<UserDTO> {
        const userFound = await this.userRepository.findByEmail(email) as UserDTO
        if (!userFound) throw new NotFoundException()

        return userFound
    }

    public async getOneByUsername(username: string): Promise<UserDTO> {
        const userFound = await this.userRepository.findByUsername(username) as UserDTO
        if (!userFound) throw new NotFoundException()

        return userFound
    }

    public async getTicketsAssigned(id: string): Promise<any[]> {
        const ticketsFound = await this.userRepository.findTicketsAssigned(id) as any[]
        if (!ticketsFound) throw new NotFoundException()

        return ticketsFound
    }

    public async getTicketsRequested(id: string): Promise<any[]> {
        const ticketsFound = await this.userRepository.findTicketsCreated(id) as any[]
        if (!ticketsFound) throw new NotFoundException()

        return ticketsFound
    }

    public async getRolesCreated(id: string): Promise<any[]> {
        const rolesFound = await this.userRepository.findRolesCreated(id) as any[]
        if (!rolesFound) throw new NotFoundException()

        return rolesFound
    }

    public async getTicketsComments(id: string): Promise<any[]> {
        const ticketsCommentsFound = await this.userRepository.findTicketsComments(id) as any[]
        if (!ticketsCommentsFound) throw new NotFoundException()

        return ticketsCommentsFound
    }

    public async getSeveral({ limit, offset }: { limit: number, offset: number }): Promise<UserDTO[]> {
        const usersFound = await this.userRepository.findMany({
            limit,
            offset
        }) as UserDTO[]

        if (!usersFound) throw new NotFoundException()

        return usersFound
    }

    public async createOne(userData: CreateUserDTO): Promise<UserDTO> {
        const userFound = await this.userRepository.findByEmail(userData.email)
        if (userFound) throw new HttpException(409, 'User already exists')

        const hashedPassword = await hashPassword(userData?.password as string)
        userData.password = hashedPassword
        const userCreated = await this.userRepository.createOne(userData)

        return userCreated as UserDTO
    }

    public async createOnePartial(userData: Partial<CreateUserDTO>): Promise<UserDTO> {
        const userFound = await this.userRepository.findByEmail(userData.email as string)
        if (userFound) throw new HttpException(409, 'User already exists')

        const userCreated = await this.userRepository.createOne(userData as CreateUserDTO)

        return userCreated as UserDTO
    }

    public async createSeveral(usersData: CreateUserDTO[]): Promise<UserDTO[]> {
        const usersCreated = await this.userRepository.createMany(usersData) as UserDTO[]

        return usersCreated
    }

    public async updateOneById(id: string, userData: UpdateUserDTO): Promise<UserDTO> {
        const userUpdated = await this.userRepository.updateById(id, userData) as UserDTO
        if (!userUpdated) throw new NotFoundException()

        return userUpdated
    }

    public async updateSeveral(usersData: UpdateUserDTO[]): Promise<UserDTO[]> {
        const usersUpdated = await this.userRepository.updateMany(usersData) as UserDTO[]

        return usersUpdated
    }

    public async updatePasswordById(id: string, plainPassword: string): Promise<UserDTO> {
        const hashedPassword = await hashPassword(plainPassword)

        const userUpdated = await this.userRepository.updateById(id, { password: hashedPassword }) as UserDTO
        if (!userUpdated) throw new HttpException(409, userUpdated)

        return userUpdated
    }

    public async deleteOneById(id: string): Promise<UserDTO> {
        const userDeleted = await this.userRepository.deleteById(id) as UserDTO
        if (!userDeleted) throw new NotFoundException()

        return userDeleted
    }

    public async deleteSeveral(usersId: string[]): Promise<UserDTO[]> {
        const usersDeleted = await this.userRepository.deleteMany(usersId) as UserDTO[]
        if (!usersDeleted) throw new NotFoundException()

        return usersDeleted
    }
}
