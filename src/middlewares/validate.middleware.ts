import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { validateRequest } from "zod-express-middleware";


export const validateResources = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch (error) {
        next(error);
    }
};

// https://jeffsegovia.dev/blogs/rest-api-validation-using-zod
// https://dev.to/franciscomendes10866/schema-validation-with-zod-and-expressjs-111p
// https://www.npmjs.com/package/zod-express-middleware
