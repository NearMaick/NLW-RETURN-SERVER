import nodemailer from "nodemailer";
import { IMailAdapter, ISendMailData } from "../mail-adapter";

// await transport.sendMail({
//   from: "Feedget Team <hi@feedget.com>",
//   to: "Maick Souza <maick@dev.me>",
//   subject: "New Feedback",
//   html: [
//     `<div style="font-family: sans-serif; font-size: 18px; color: #222">`,
//     `<p>Tipo de Feedback: ${type}</p>`,
//     `<p>Comentário: ${comment}</p>`,
//     `</div>`,
//   ].join("\n"),
// });

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8c8e7eb4d77ea8",
    pass: "82f3ad63cc459f",
  },
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: ISendMailData) {
    await transport.sendMail({
      from: "Feedget Team <hi@feedget.com>",
      to: "Maick Souza <maick@dev.me>",
      subject,
      html: body,
    });
  }
}
