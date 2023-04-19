import assert from "assert";
import { Inject, Service } from "typedi";
import { CreateUserDTO, SignInDTO, TokenData, UpdateUserDTO } from "../dtos/auth.dto";
import { ForbiddenException, HttpException } from "../exceptions";
import { sendAccountConfirmedEmail, sendResetPasswordEmail, sendVerificationEmail } from "../mailer/index";
import { User } from "../models/user.model";
import { TokenMachine } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password-hasher";
import { UserService } from "./user.service";

@Service()
export class AuthService {
    protected token: TokenMachine = TokenMachine.getInstance();

    constructor(
        @Inject('user.service') private readonly userService: UserService,
        // @Inject('auth.repository') private readonly authRepository: AuthRepository
    ) { }

    public async signUp(userData: CreateUserDTO): Promise<User> {
        try {
            const userSignned = await this.userService.createOne(userData);

            const { token } = this.token.create(userSignned);
            sendVerificationEmail(userSignned, token);

            return userSignned;
        } catch (error) {
            throw error;
        }
    }

    public async signIn(credentials: SignInDTO): Promise<{ cookie: string; user: User, token: TokenData }> {
        const { email, password } = credentials;
        const user = await this.userService.getOneByEmail(email)
            .catch(error => { throw new ForbiddenException(); });
        const passwordMatch = await comparePassword(password, user.password as string);

        if (!user.is_enabled || !user.is_verified || !passwordMatch) throw new ForbiddenException();

        const tokenData = this.token.create(user);
        const cookie = this.createCookie(tokenData);
        return { cookie, user, token: tokenData };
    }

    public async signOut(userLogged: User): Promise<User> {
        const { id } = userLogged
        const user = await this.userService.getOneById(id);

        return user;
    }

    public async forgotPassword(email: string): Promise<Boolean> {
        try {
            const userFound = await this.userService.getOneByEmail(email)
            const { token } = this.token.create(userFound);
            const isEmailSent = await sendResetPasswordEmail(userFound, token);

            return isEmailSent;
        } catch (error) {
            return true
        }
    }

    public async resetPassword(data: any): Promise<User> {
        const { user, newPassword: newPlainPassword } = data;
        const userPasswordUpdated = this.userService.updatePasswordById(user.id, newPlainPassword);

        return userPasswordUpdated;
    }

    public async confirmAccount(token: any): Promise<any> {
        let decodedToken: any;

        try {
            decodedToken = this.token.verify(token)
        } catch (error) {
            return "Enlace expirado"
        }

        const userConfirmed = await this.userService.updateOneById(decodedToken.id, { is_verified: true });
        sendAccountConfirmedEmail(userConfirmed);

        return userConfirmed && "Cuenta verificada";
    }

    public async resendVerificationEmail(email: string): Promise<any> { }

    public async changePassword(data: any): Promise<any> {
        const { user, newPassword: newPlainPassword } = data;

        const passwordMatch = await comparePassword(newPlainPassword, user.password);
        if (passwordMatch) throw new HttpException(400, "New password must be different from current password");

        const userPasswordUpdated = await this.userService.updatePasswordById(user.id, newPlainPassword);

        return userPasswordUpdated;
    }

    public async changeEmail(data: any): Promise<any> {
        const { user, newEmail } = data;

        if (user.email === newEmail) throw new HttpException(400, "New email must be different from current email");
        const updatedUserEmail = this.userService.updateOneById(user.id, { email: newEmail });

        return updatedUserEmail;
    }

    public async desactivateAccount(id: string): Promise<any> {
        const userDesativated = await this.userService.updateOneById(id, { is_enabled: false, disabled_by: id });
        return userDesativated;
    }

    public async getSessionUser(userLogged: User): Promise<User> {
        const { id } = userLogged;
        const user = await this.userService.getOneById(id);

        return user;
    }

    public async generateSession(): Promise<any> { }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; Path=/; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
