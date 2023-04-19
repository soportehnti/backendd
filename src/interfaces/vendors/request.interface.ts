import { Request } from 'express';
import { User } from '../../models/user.model';

export interface IRequest extends Request {
    user?: User;
}

// https://github.com/Tonel/extend-express-request-ts-demo/blob/main/src/types/express/index.d.ts
