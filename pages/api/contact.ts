import { NextApiRequest, NextApiResponse } from "next";
import { sendMail, CONFIG as MAIL_CONFIG } from "../../lib/mail";
import nc from "next-connect";
import { clientHtml, submission } from "../../lib/mail/templates";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { contactForm, lang = "en" } = req.body as {
    contactForm: { name: string; email: string; message: string };
    lang: string | undefined;
  };
  if (
    !contactForm ||
    !contactForm.name ||
    !contactForm.email ||
    !contactForm.message
  ) {
    return res.status(400).json({ message: "Invalid request" });
  } else {
    await sendMail({
      to: MAIL_CONFIG.from,
      from: MAIL_CONFIG.from,
      subject: "New message from anibalsantosgomez.com",
      html: submission({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
      }),
    });
    await sendMail({
      to: contactForm.email,
      from: MAIL_CONFIG.from,
      subject: lang === "es" ? "Mensaje recibido!" : "Message received!",
      html: clientHtml({ lang, name: contactForm.name }),
    });
    return res.status(200).json({ message: "Success" });
  }
});

export default handler;
