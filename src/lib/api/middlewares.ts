import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import { expressWrapper } from "next-connect";
import { type HandlerOptions } from "next-connect";
import type { RequestHandler } from "next-connect/dist/types/node";

export const corsMiddleware = expressWrapper(cors());

export const customErrors:
  | HandlerOptions<RequestHandler<NextApiRequest, NextApiResponse<unknown>>>
  | undefined = {
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
};
