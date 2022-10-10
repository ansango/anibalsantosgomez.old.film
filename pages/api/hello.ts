import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { corsMiddleware, customErrors } from "../../lib/api";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(corsMiddleware)
  .use(async (req, res, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get(async (req, res) => {
    res.json({ message: "Hello World" });
  });

export default router.handler(customErrors);
