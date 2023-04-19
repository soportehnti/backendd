import projectConfig from "../config/index.config";
import { Ticket } from "../models/ticket.model";
import { sendEmail } from "../utils/send-email";

export const sendVerificationEmail = async ({ email, first_name }: any, token: string): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Verificar tu correo electrónico'
    const text = `Hola, ${first_name}! Por favor verifica tu correo electrónico haciendo click en el siguiente link: ${projectConfig.server.url}/v1/auth/confirm?token=${token}`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Por favor verifica tu correo electrónico haciendo click en el siguiente link:</p>
    <a href="${projectConfig.server.url}/v1/auth/confirm?token=${token}">Verificar tu correo electrónico</a>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendResetPasswordEmail = async ({ email, first_name }: any, token: string): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Cambiar tu contraseña'
    const text = `Hola, ${first_name}! Por favor cambia tu contraseña haciendo click en el siguiente link: ${projectConfig.client.url}/auth/reset-password?token=${token}`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Por favor cambia tu contraseña haciendo click en el siguiente link:</p>
    <a href="${projectConfig.client.url}/auth/reset-password?token=${token}">Cambiar tu contraseña</a>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendChangePasswordEmail = async ({ email, first_name }: any): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Tu contraseña ha sido cambiada'
    const text = `Hola, ${first_name}! Tu contraseña ha sido cambiada.`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Tu contraseña ha sido cambiada.</p>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendEmailHasChangedEmail = async ({ email, first_name }: any): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Tu correo electrónico ha sido cambiado'
    const text = `Hola, ${first_name}! Tu correo electrónico ha sido cambiado.`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Tu correo electrónico ha sido cambiado.</p>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendCompleteRegistrationEmail = async ({ email }: any, token: string): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Completa tu registro'
    const text = `¡Hola! Completa tu registro haciendo click en el siguiente link: ${projectConfig.client.url}/auth/signup?token=${token}`
    const html = `<p>¡Hola!</p>
    <p>Completa tu registro haciendo click en el siguiente link:</p>
    <a href="${projectConfig.client.url}/auth/signup?token=${token}">Completa tu registro</a>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendWelcomeEmail = async ({ email, first_name }: any): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Bienvenido la plataforma de soporte de ETC LATAM!!'
    const text = `Hola, ${first_name}! Bienvenido la plataforma de soporte de ETC LATAM!`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Bienvenido la plataforma de soporte de ETC LATAM!</p>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendAccountConfirmedEmail = async ({ email, first_name }: any): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Tu cuenta ha sido confirmada'
    const text = `Hola, ${first_name}! Tu cuenta ha sido confirmada.`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Tu cuenta ha sido confirmada.</p>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendAccountDesactivatedEmail = async ({ email, first_name }: any): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Tu cuenta ha sido desactivada'
    const text = `Hola, ${first_name}! Tu cuenta ha sido desactivada. Si crees que esto es un error, por favor contacta a soporte.`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Tu cuenta ha sido desactivada.</p>
    <p>Si crees que esto es un error, por favor contacta a soporte.</p>`
    
    return await sendEmail(from, to, subject, { text, html })
}

export const sendNewTicketEmail = async ({ email, first_name }: any, ticket: Ticket): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Nuevo ticket creado'
    const text = `Hola, ${first_name}! Se ha creado un nuevo ticket con el siguiente asunto: ${ticket.subject}`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Se ha creado un nuevo ticket con el siguiente asunto: ${ticket.subject}</p>`

    return await sendEmail(from, to, subject, { text, html })
}

export const sendTicketAssignedEmail = async ({ email, first_name }: any, ticket: Ticket): Promise<Boolean> => {
    const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
    const to = email
    const subject = 'Ticket asignado'
    const text = `Hola, ${first_name}! Se te ha asignado un ticket con el siguiente asunto: ${ticket.subject}`
    const html = `<p>Hola, ${first_name}!</p>
    <p>Se te ha asignado un ticket con el siguiente asunto: ${ticket.subject}</p>`

    return await sendEmail(from, to, subject, { text, html })
}



// TODO: Implement this class
// class Mailer {
//     private static instance: Mailer;
//     protected emailService: any;
//     protected from: object;
//     protected to: string;

//     constructor(emailService?: any, from: string, to: string, subject: string, content: any) {
//         this.from = {
//             noReply: `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
//         }
//         this.to = to
//     }

//     public static getInstance(): Mailer {
//         if (!Mailer.instance) {
//             Mailer.instance = new Mailer(sendEmail);
//         }

//         return Mailer.instance;
//     }

//     public async sendVerificationEmail({ email, first_name }: any, token: string): Promise<Boolean> {
//     const to = email
//         const subject = 'Verificar tu correo electrónico'
//         const text = `Hola, ${first_name}! Por favor verifica tu correo electrónico haciendo click en el siguiente link: ${projectConfig.server.clientUrl}/verify-email?token=${token}`
//         const html = `<p>Hola, ${first_name}!</p>
//         <p>Por favor verifica tu correo electrónico haciendo click en el siguiente link:</p>
//         <a href="${projectConfig.server.clientUrl}/verify-email?token=${token}">Verificar tu correo electrónico</a>`

//         return await this.emailService.sendEmail(this.fromNoReply, to, subject, { text, html })
//     }

//     public async sendResetPasswordEmail({ email, first_name }: any, token: string): Promise<Boolean> {
//     const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
//         const to = email
//         const subject = 'Restablecer tu contraseña'
//         const text = `Hola, ${first_name}! Por favor restablece tu contraseña haciendo click en el siguiente link: ${projectConfig.server.clientUrl}/reset-password?token=${token}`
//         const html = `<p>Hola, ${first_name}!</p>
//         <p>Por favor restablece tu contraseña haciendo click en el siguiente link:</p>
//         <a href="${projectConfig.server.clientUrl}/reset-password?token=${token}">Restablecer tu contraseña</a>`

//         return await sendEmail(from, to, subject, { text, html })
//     }

//     public async sendWelcomeEmail({ email, first_name }: any): Promise<Boolean> {
//      const from = `${projectConfig.email.from.noReply.name} <${projectConfig.email.from.noReply.address}>`
//         const to = email
//         const subject = 'Bienvenido a la plataforma'
//         const text = `Hola, ${first_name}! Bienvenido a la plataforma.`
//         const html = `<p>Hola, ${first_name}!</p>
//         <p>Bienvenido a la plataforma.</p>`

//         return await sendEmail(from, to, subject, { text, html })
//     }
// }


// NOTE: This is son reference links
// https://github.com/cornflourblue/node-mongo-signup-verification-api
// https://github.com/ngduc/node-rem/tree/master/src
// https://github.com/ngduc/node-rem
// https://github.com/tonguetech/express-typescript-seed/tree/master/src/express/services/mailer
// https://github.com/tonguetech/express-typescript-seed/blob/8d5857d7955ba63fd40814b64a3e77439b46769b/src/express/services/mailer/index.ts#L11
// https://github.com/HenryAsk/HenryAsk-BACK/tree/main/src/notifications
// https://github.com/jonah-cod/typescript_nodemailer
