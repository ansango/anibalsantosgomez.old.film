import nodemailer from "nodemailer";

export async function sendMail({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    port: 587,
    host: process.env.NODEMAILER_HOST,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    secure: false,
    tls: {
      ciphers: "SSLv3",
    },
  });
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Could not send email: ${error.message}`);
  }
}

export const CONFIG = {
  from: "anibalsantosgo@gmail.com",
};
