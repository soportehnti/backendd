import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { IRoute } from '../interfaces/vendors/route.interface'
import { isAuthenticated } from '../middlewares/authenticate.middleware'
import { UserRepository } from '../repositories/user.repository'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'


export class AuthRoute implements IRoute {
    public router: Router = Router()
    public path: string = '/auth'

    private userRepository: UserRepository = new UserRepository()
    private userService: UserService = new UserService(this.userRepository)
    private service: AuthService = new AuthService(this.userService)
    private controller: AuthController = new AuthController(this.service)

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        // Route to sign up
        this.router.post(
            this.path + '/signup',
            this.controller.signUp
        )

        // Route to sign in
        this.router.post(
            this.path + '/signin',
            this.controller.signIn
        )

        // Route to sign out
        this.router.post(
            this.path + '/signout',
            isAuthenticated,
            this.controller.signOut
        )

        // Route to if user forgot password
        this.router.post(
            this.path + '/recover-account',
            this.controller.recoverAccount
        )

        // Route to reset password
        this.router.post(
            this.path + '/reset-password',
            isAuthenticated,
            this.controller.resetPassword
        )

        // Route to verify account
        this.router.get(
            this.path + '/confirm',
            this.controller.confirmAccount
        )

        // Route to resend verification email
        this.router.post(
            this.path + '/resend-verification',
            this.controller.resendAccountVerification
        )

        // Route to get session
        this.router.get(
            this.path + '/session',
            isAuthenticated,
            this.controller.getSession
        )

        // Route to get session user
        this.router.get(
            this.path + '/me',
            isAuthenticated,
            this.controller.getSessionUser
        )

        // Route to update current session user password
        this.router.post(
            this.path + '/me/change-password',
            isAuthenticated,
            this.controller.changePassword
        )

        // Route to update current session user email
        this.router.post(
            this.path + '/me/change-email',
            isAuthenticated,
            this.controller.changeEmail
        )

        // Route to desactivate current session account 
        this.router.post(
            this.path + '/me/desactivate',
            isAuthenticated,
            this.controller.desactivateAccount
        )
    }
}
