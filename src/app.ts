import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import "reflect-metadata";
import config from './config/index.config';
import { IRoute } from './interfaces/vendors';
import { errorMiddleware } from './middlewares/error.middleware';

class App {
    private app: express.Application
    private port: string | number

    constructor(routes: IRoute[]) {
        this.app = express()
        this.port = config.server.port

        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initializeErrorHandling()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`)
        })
    }

    private initializeMiddlewares() {
        this.app.use(morgan('dev'))
        this.app.use(helmet())
        this.app.use(cors({
            origin: 'http://localhost:3001',
            credentials: true,
            optionsSuccessStatus: 200
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())
        this.app.set('json spaces', 4)
    }

    private initializeRoutes(routes: IRoute[]) {
        this.app.use('/public', express.static('public'))
        this.app.get('/health-check', (req, res) => res.status(200).send('Everything looks fine!'))
        routes.forEach(route => {
            this.app.use('/v1', route.router)
        })
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }
}


export default App
