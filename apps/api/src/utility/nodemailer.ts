import { createTransport } from "nodemailer";
import env from "../constant/env";

export const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: env.GOOGLE_CLIENT_EMAIL,
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GOOGLE_CLIENT_REFRESH_TOKEN,
  },
});

export async function sendVerificationEmail(token: string, receiver: string) {
  await transporter.sendMail({
    from: env.GOOGLE_CLIENT_EMAIL,
    subject: "ZapTalk Verification Email",
    to: receiver,
    html: `<div>${token}</div>`,
  });
}
