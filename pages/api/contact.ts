import type { NextApiRequest, NextApiResponse } from "next";
import { sendMail, CONFIG as MAIL_CONFIG } from "lib/mail";
import { createRouter } from "next-connect";
import { clientHtml, submission } from "lib/mail/templates";
import fetcher from "lib/utils";
import { corsMiddleware, customErrors } from "lib/api";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(corsMiddleware).post(async (req, res) => {
  const {
    contactForm,
    lang = "es",
    token,
  } = req.body as {
    contactForm: { name: string; email: string; message: string };
    lang: string | undefined;
    token: string | undefined;
  };
  if (
    !contactForm ||
    !contactForm.name ||
    !contactForm.email ||
    !contactForm.message ||
    !token
  ) {
    return res.status(400).json({ message: "Invalid request" });
  } else {
    try {
      const reCaptchaRes = await fetcher(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        }
      );
      console.log(reCaptchaRes);
      if (reCaptchaRes?.score > 0.5 && reCaptchaRes.success) {
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
      } else {
        res.status(400).json({
          status: "failure",
          message: "Google ReCaptcha Failure",
        });
      }
    } catch (error) {
      res.status(405).json({
        status: "failure",
        message: "Error submitting the enquiry form",
      });
    }
  }
});

export default router.handler(customErrors);
