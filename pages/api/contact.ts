import { NextApiRequest, NextApiResponse } from "next";
import { sendMail, CONFIG as MAIL_CONFIG } from "lib/mail";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { contactForm } = req.body as {
    contactForm: { name: string; email: string; message: string };
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
      subject: "Contact form submission",
      html: `
        <p>
          Name: ${contactForm.name}
        </p>
        <p>
          Email: ${contactForm.email}
        </p>
        <p>

          Message: ${contactForm.message}
        </p>
      `,
    });
    await sendMail({
      to: contactForm.email,
      from: MAIL_CONFIG.from,
      subject: "Contact form",
      html: `
        <h1>Hola ${contactForm.name}</h1>
        <p>
          Gracias por contactarnos.
          En breve nos comunicaremos con vos.
        </p>
      `,
    });
    return res.status(200).json({ message: "Success" });
  }
});

export default handler;
