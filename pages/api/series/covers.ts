import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import client from "../../../.tina/__generated__/client";
import { corsMiddleware, customErrors } from "../../../lib/api";

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
    const query = await client.queries.seriesLatestsQuery();
    const data = await query.data.serieConnection.edges
      ?.map((edge) => edge?.node)
      .sort((a, b) => {
        return (
          new Date(b?.publishedAt || "").getTime() -
          new Date(a?.publishedAt || "").getTime()
        );
      })
      .map((serie) => serie?.cover);

    res.json(data);
  });

export default router.handler(customErrors);
