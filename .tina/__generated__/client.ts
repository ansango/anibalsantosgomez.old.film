import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '30f90959415f0e521515bd8e041e5760ad95e4e8', queries });
export default client;
  