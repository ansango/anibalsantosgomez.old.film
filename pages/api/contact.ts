import { NextApiRequest, NextApiResponse } from "next";

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
    return res.status(200).json({ message: "Success" });
  }
});

export default handler;
