import { NextFunction, Response } from "express"
import { UnauthorizedException } from "../exceptions"
import { IRequest } from "../interfaces/vendors"
import { UserRepository } from "../repositories/user.repository"
import { UserService } from "../services/user.service"
import { TokenMachine } from "../utils/jwt"

const tokenMachine = TokenMachine.getInstance()
export const isAuthenticated = async (req: IRequest, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    try {
        const token: string = req.cookies['Authorization']?.split(' ')[0] || req.headers.authorization?.split('Bearer ')[1]
        if (!token) throw new UnauthorizedException("No token provided")

        const validToken = tokenMachine.verify(token) as any
        if (!validToken) throw new UnauthorizedException()

        try {
            const { id: userId } = validToken
            const user = await userService.getOneById(userId)

            req.user = user
        } catch (error) {
            res.setHeader('Set-Cookie', ['Authorization=; Path=/; Max-age=0']);
            throw new UnauthorizedException("Token is not valid or expired")
        }

        next()
    } catch (error) {
        next(error)
    }
}
