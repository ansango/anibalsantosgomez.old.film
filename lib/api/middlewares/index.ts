import { expressWrapper } from "next-connect";
import cors from "cors";

export const corsMiddleware = expressWrapper(cors());
