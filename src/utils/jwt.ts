import * as jsonwebtoken from "jsonwebtoken";
import projectConfig from "../config/index.config";
import { TokenData } from "../dtos/auth.dto";
import { User } from "../models/user.model";

export class TokenMachine {
    private jwt: typeof jsonwebtoken;
    private static instance: TokenMachine;

    constructor(private readonly secret: string = projectConfig.server.secret) {
        this.jwt = jsonwebtoken;
    }

    public static getInstance(): TokenMachine {
        if (!TokenMachine.instance) {
            TokenMachine.instance = new TokenMachine();
        }

        return TokenMachine.instance;
    }

    public create(user: User): TokenData {
        const expiresIn = 60 * 60 * 24; // an hour
        const dataStoredInToken = {
            id: user.id,
        };
        const token = this.jwt.sign(dataStoredInToken, this.secret, { expiresIn });

        return { expiresIn, token };
    }

    public verify(token: string): any {
        const decodedToken = this.jwt.verify(token, this.secret);

        return decodedToken;
    }
}
