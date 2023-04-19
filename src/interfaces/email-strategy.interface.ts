export interface EmailStrategy {
    sendEmail(from: string, to: string, subject: string, content: { text: string, html: any }): Promise<Boolean>;
}
