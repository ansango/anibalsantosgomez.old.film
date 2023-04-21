import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '12687f1ec9ca2d246a7b3ed99186b2a95b0f9628', queries });
export default client;
  