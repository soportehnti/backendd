import { PrismaClient, User } from '@prisma/client'
import { Service } from 'typedi'
import { CreateUserDTO, SignInDTO, UpdateUserDTO } from '../dtos/auth.dto'

@Service()
export class AuthRepository {
    private readonly _prisma: PrismaClient

    constructor() {
        this._prisma = new PrismaClient()
    }
}
