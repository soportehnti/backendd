import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { CreateUserDTO, SignInDTO } from "../dtos/auth.dto"
import { UpdateUserDTO, UserDTO } from "../dtos/user.dto"
import { IRequest } from "../interfaces/vendors"
import { AuthService } from "../services/auth.service"

@Service()
export class AuthController {

    constructor(@Inject("auth.service") private readonly authService: AuthService) { }

    public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userCredentials: SignInDTO = req.body
            const { cookie, token, user } = await this.authService.signIn(userCredentials)
            const userLogged = user as UserDTO

            res.setHeader('Set-Cookie', [cookie]);
            res.status(200).json({ message: "Signed In", token: token.token, user: userLogged })
        } catch (error) {
            next(error)
        }
    }

    public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUserData: CreateUserDTO = req.body
            const userSignned = await this.authService.signUp(newUserData)

            res.status(200).json({ message: "Signed Up", user: userSignned });
        } catch (error) {
            next(error)
        }
    }

    public signOut = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userLogged = req.user as any
            const signOutUserData = await this.authService.signOut(userLogged)

            res.setHeader('Set-Cookie', ['Authorization=; Path=/; Max-age=0']);
            res.status(200).json({ message: "Signed Out", user: signOutUserData });
        } catch (error) {
            next(error)
        }
    }

    public recoverAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email } = req.body
            const emailSent = await this.authService.forgotPassword(email)

            res.status(200).json({ message: "Email Sent" })
        } catch (error) {
            next(error)
        }
    }

    public resetPassword = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userLogged = req.user
            const { new_password: newPassword } = req.body

            await this.authService.resetPassword({ user: userLogged, newPassword })

            res.status(200).json({ message: "Password Changed" })
        } catch (error) {
            next(error)
        }
    }

    public confirmAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = req.query.token as string
            const message = await this.authService.confirmAccount(token)

            res.status(200).json({ message })
        } catch (error) {
            next(error)
        }
    }

    public resendAccountVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email } = req.body
            const user = await this.authService.resendVerificationEmail(email)

            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }

    public changePassword = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userLogged = req.user as any
            const { new_password: newPassword, old_password: oldPassword } = req.body
            await this.authService.changePassword({ user: userLogged, oldPassword, newPassword })

            res.setHeader('Set-Cookie', ['Authorization=; Path=/; Max-age=0']);
            res.status(200).json({ message: "Password Changed" });
        } catch (error) {
            next(error)
        }
    }

    public updateProfile = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userLogged = req.user as any
            const userData: UpdateUserDTO = req.body
            // const userUpdated = await this.authService.updateProfile(userData)

            // res.status(200).json({ message: "Profile Updated", user: userUpdated })
        } catch (error) {
            next(error)
        }
    }

    public changeEmail = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userLogged = req.user as any
            const { new_email: newEmail } = req.body
            console.log(userLogged, newEmail)
            await this.authService.changeEmail({ user: userLogged, newEmail })

            res.status(200).json({ message: "Email Changed" });
        } catch (error) {
            next(error)
        }
    }

    public desactivateAccount = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userLogged = req.user as any
            const userDesactivated = await this.authService.desactivateAccount(userLogged.id)

            res.status(200).json({ message: "Desactivate Account", data: userDesactivated })
        } catch (error) {
            next(error)
        }
    }

    public getSession = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = req.cookies.Authorization
            res.status(200).json({ session_id: token })
        } catch (error) {
            next(error)
        }
    }

    public getSessionUser = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userLogged = req.user as any
            const userFound = await this.authService.getSessionUser(userLogged)

            res.status(200).json(userFound)
        } catch (error) {
            next(error)
        }
    }
}
