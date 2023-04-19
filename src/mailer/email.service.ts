import { EmailStrategy } from "../interfaces/email-strategy.interface";

export class EmailContext implements EmailStrategy {
    // The email service object
    public emailStrategy: EmailStrategy;

    constructor(emailStrategy: EmailStrategy) {
        this.emailStrategy = emailStrategy;
    }

    // The method that sets the email service object
    setEmailStrategy(emailStrategy: EmailStrategy): void {
        this.emailStrategy = emailStrategy;
    }

    // The method that sends an email using the current email service object
    public async sendEmail(from: string, to: string, subject: string, content: any): Promise<Boolean> {
        console.info('EmailContext: Sending email using the strategy:', this.emailStrategy.constructor.name);
        return await this.emailStrategy.sendEmail(from, to, subject, content);
    }
}
