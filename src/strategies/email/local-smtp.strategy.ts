import { EmailStrategy } from "../../interfaces/email-strategy.interface";

export class LocalSmtpStrategy implements EmailStrategy {
    async sendEmail(from: string, to: string, subject: string, content: any): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}
