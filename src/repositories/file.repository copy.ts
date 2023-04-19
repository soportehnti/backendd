import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { Service } from 'typedi'

// Class to navigate in the file system and get the files in the directory
@Service()
export class FileRepository {
    private readonly directory: string
    private readonly database: PrismaClient

    constructor() {
        this.database = new PrismaClient()
        this.directory = path.join(__dirname, '../../public/files')
    }

    public async findById(id: string): Promise<any> {
        return undefined
    }

    // find one file in the directory
    public async findByName(id: string): Promise<any> {
        const itemFound = await this.database.file.findUnique({
            
        })
        // const fileFound = fs.readFileSync(path.join(this.directory, id))

        // return fileFound
    }

    // find all files in the directory
    public async findMany({ limit, offset }: any): Promise<any> {
        const files = fs.readdirSync(this.directory)
        const filesFound = files.slice(offset, limit + offset)

        return filesFound
    }

    // create one file in the directory
    public async createOne(file: any): Promise<any> {
        return undefined
    }

    // update one file in the directory
    public async updateFileName(currentName: string, newName: string): Promise<any> {

        // const fileUpdated = fs.renameSync(path.join(this.directory, currentName), path.join(this.directory, newName))
        // return fileUpdated
    }

    // delete one file in the directory
    public async deleteById(id: string): Promise<any> {
        const fileDeleted = fs.unlinkSync(path.join(this.directory, id))
        return true
    }

    // delete all files in the directory
    public async deleteMany(): Promise<any> {
        const filesDeleted = fs.rmdirSync(this.directory, { recursive: true })

        return true
    }
}
