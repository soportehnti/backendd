import { Inject, Service } from "typedi";
import { CreateTicketDTO, TicketDTO, UpdateTicketDTO } from "../dtos/ticket.dto";
import { NotFoundException } from "../exceptions";
import { sendTicketAssignedEmail } from "../mailer/index.ts";
import { TicketRepository } from "../repositories/ticket.repository";
import { FileGenerator } from "../utils/file-generator";
import { FileService } from "./file.service";

@Service()
export class TicketService {
    private fileGenerator: FileGenerator = new FileGenerator()

    constructor(
        @Inject('ticket.repository') private readonly ticketRepository: TicketRepository,
        @Inject('file.service') private readonly fileService: FileService
    ) { }

    public async getOneById(id: string): Promise<TicketDTO> {
        const ticketFound: TicketDTO = await this.ticketRepository.findById(id)
        if (!ticketFound) throw new NotFoundException()

        return ticketFound
    }

    public async generateTicketFile(data: any): Promise<any> {
        const ticketFile = await this.fileGenerator.generateFromTemplate({
            input: {
                template: 'ticket-spanish',
                data: {
                    ...data,
                    name: data.subject,
                    created_at: new Date().toLocaleDateString(),
                }
            },
            output: { format: 'html' }
        })

        return ticketFile
    }

    public async getTicketCommentsById(id: string): Promise<any> {
        const ticketFound = await this.ticketRepository.findTicketCommentsById(id)
        if (!ticketFound) throw new NotFoundException()

        return ticketFound
    }

    public async getSeveral({
        limit,
        offset,
        enabled,
        assignedTo,
        createdBy,
        userLogged
    }: {
        limit: number,
        offset: number,
        enabled?: boolean
        assignedTo?: string,
        createdBy?: string,
        userLogged: any
    }): Promise<TicketDTO[]> {
        const filterByEnabled = enabled !== undefined
        const filterByAssignedTo = assignedTo !== "" && assignedTo !== undefined && assignedTo !== 'null'
        const filterByCreatedBy = createdBy !== "" && createdBy !== undefined && createdBy !== 'null'

        if (filterByAssignedTo && assignedTo === "me") assignedTo = userLogged.id
        if (filterByCreatedBy && createdBy === "me") createdBy = userLogged.id

        // console.log({ filterByEnabled, filterByAssignedTo, filterByCreatedBy })
        // console.log({ enabled, assignedTo, createdBy })

        const ticketsFound = await this.ticketRepository.findMany({
            limit,
            offset,
            where: {
                // ...(filterByEnabled && { is_enabled: enabled }),
                // ...(filterByAssignedTo && { assigned_to: assignedTo }),
                // ...(filterByCreatedBy && { created_by: createdBy }),
            }
        }) as TicketDTO[]
        if (!ticketsFound) throw new NotFoundException()

        return ticketsFound
    }

    public async createOne(data: CreateTicketDTO): Promise<TicketDTO> {
        const ticketCreated = await this.ticketRepository.createOne(data)

        const ticketFile = await this.generateTicketFile(ticketCreated)
        const fileCreated = await this.fileService.createOne({
            created_by: ticketCreated.requestor_id,
            name: ticketFile.name,
            size: ticketFile.size,
            type: ticketFile.type,
        })

        await this.updateOneById(ticketCreated.id, {
            file_url: fileCreated.url
        })

        // temporal solution
        ticketCreated.file_url = fileCreated.url

        return ticketCreated
    }

    public async createSeveral(data: CreateTicketDTO[]): Promise<TicketDTO[]> {
        const ticketsCreated = await this.ticketRepository.createMany(data) as TicketDTO[]

        return ticketsCreated
    }

    public async updateOneById(id: string, data: UpdateTicketDTO): Promise<TicketDTO> {
        // if (data.assigned_to !== null) sendTicketAssignedEmail()
        
        const ticketUpdated = await this.ticketRepository.updateById(id, data) as TicketDTO


        return ticketUpdated
    }

    public async updateSeveral(ids: Array<string>, data: UpdateTicketDTO[]): Promise<TicketDTO[]> {
        const ticketsUpdated = await this.ticketRepository.updateManyById(data) as TicketDTO[]

        return ticketsUpdated
    }

    public async deleteOneById(id: string): Promise<TicketDTO> {
        const ticketDeleted = await this.ticketRepository.deleteById(id) as TicketDTO
        if (!ticketDeleted) throw new NotFoundException()

        return ticketDeleted
    }

    public async deleteSeveral(ids: Array<string>): Promise<TicketDTO[]> {
        const ticketsDeleted = await this.ticketRepository.deleteManyById(ids) as TicketDTO[]

        return ticketsDeleted
    }
}
