import { EmailContext } from '../mailer/email.service';
import { LocalSmtpStrategy } from '../strategies/email/local-smtp.strategy';
import { MailtrapStrategy } from '../strategies/email/mailtrap.strategy';

const emailMailtrapService = new EmailContext(new MailtrapStrategy());
const emailLocalSmtpService = new EmailContext(new LocalSmtpStrategy());

export const sendEmail = async (from: string, to: string, subject: string, content: any): Promise<Boolean> => {
    // emailLocalSmtpService.sendEmail(from, to, subject, content);
    return await emailMailtrapService.sendEmail(from, to, 'ETC Latam: ' + subject, content);
}
