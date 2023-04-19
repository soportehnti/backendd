import { createTransport } from 'nodemailer';
import projectConfig from '../../config/index.config';
import { EmailStrategy } from '../../interfaces/email-strategy.interface';

export class MailtrapStrategy implements EmailStrategy {
    private transporter: any;

    constructor() {
        this.transporter = createTransport({
            host: projectConfig.email.mailtrap.host,
            port: projectConfig.email.mailtrap.port as number,
            auth: {
                user: projectConfig.email.mailtrap.user,
                pass: projectConfig.email.mailtrap.password,
            }
        });
    }

    async sendEmail(from: string, to: string, subject: string, content: any): Promise<Boolean> {
        const mailOptions = {
            from,
            to,
            subject,
            text: content.text,
            html: content.html,
        };
        const info = await this.transporter.sendMail(mailOptions);

        return info.messageId ? true : false;
    }
}
