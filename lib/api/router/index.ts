import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, type HandlerOptions } from "next-connect";
import { RequestHandler } from "next-connect/dist/types/node";
export const router = createRouter<NextApiRequest, NextApiResponse>();

export const customErrors:
  | HandlerOptions<RequestHandler<NextApiRequest, NextApiResponse<any>>>
  | undefined = {
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
};
