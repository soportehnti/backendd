import { NextFunction, Response } from "express";
import ForbiddenException from "../exceptions/forbidden.exception";
import { IRequest } from "../interfaces/vendors";

export const isAuthorized = (who: Array<'admin' | 'agent' | 'user'>) => (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const userType = (req.user!.type) as 'admin' | 'agent' | 'user'
        if (!who.includes(userType)) throw new ForbiddenException()

        next()
    } catch (error) {
        next(error)
    }
}

// https://javascript.plainenglish.io/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4
// https://github.com/cornflourblue/node-mongo-signup-verification-api/blob/master/package.json
