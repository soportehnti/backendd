import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

const myEnv = config()
expand(myEnv)
// config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const projectConfig = {
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || 5432,
        user: process.env.DATABASE_USER || '',
        password: process.env.DATABASE_PASS || '',
        database: process.env.DATABASE_NAME || 'example',
        dialect: process.env.DATABASE_DIALECT || 'postgres',
    },
    server: {
        env: process.env.NODE_ENV || 'development',
        port: process.env.SERVER_PORT || 3000,
        secret: process.env.SECRET || 'supersecret',
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
            credentials: process.env.CORS_CREDENTIALS || true,
        },
        url: process.env.SERVER_URL || 'http://localhost:3001',
    },
    client: {
        env: process.env.NODE_ENV || 'development',
        port: process.env.CLIENT_PORT || 3001,
        url: process.env.CLIENT_URL || 'http://localhost:3000',
    },
    logger: {
        logFormat: process.env.LOG_FORMAT || 'dev',
        logDir: process.env.LOG_DIR || 'logs',
    },
    email: {
        from: {
            support: {
                name: process.env.EMAIL_FROM_NAME_SUPPORT || 'Support',
                address: process.env.EMAIL_FROM_ADDRESS_SUPPORT || 'example@email.com',
            },
            noReply: {
                name: process.env.EMAIL_FROM_NAME_NO_REPLY || 'No Reply',
                address: process.env.EMAIL_FROM_ADDRESS_NO_REPLY || 'example@email.com',
            },
            contact: {
                name: process.env.EMAIL_FROM_NAME_CONTACT || 'Contact',
                address: process.env.EMAIL_FROM_ADDRESS_CONTACT || 'example@email.com',
            }
        },
        mailtrap: {
            host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
            port: process.env.MAILTRAP_PORT || 2525,
            user: process.env.MAILTRAP_USER || '',
            password: process.env.MAILTRAP_PASS || '',
        }
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    }
}

export default projectConfig
