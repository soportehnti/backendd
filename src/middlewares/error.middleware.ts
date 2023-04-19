import { NextFunction, Request, Response } from "express"
import HttpException from "../exceptions/http.exception"

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500
        const message: string = error.message || "Something went wrong"
        const documentation: string = error.documentation || "https://developer.etclatam.com/support-platform/docs"

        res.status(status).json({
            error: {
                status,
                message,
                // documentation
            }
        })
    } catch (error) {
        next(error)
    }
}

