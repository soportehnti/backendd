import { EmailStrategy } from "../../interfaces/email-strategy.interface";

export class SendgridStrategy implements EmailStrategy {
    async sendEmail(from: string, to: string, subject: string, content: { text: string; html: any; }): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}
