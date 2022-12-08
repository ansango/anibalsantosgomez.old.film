import { cameras } from "./cameras";
import { films } from "./films";
import { tags } from "./tags";

export const defaultMeta = {
  camera: cameras[1],
  film: films[1],
  shot: {
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  },
  tags: [tags[0], tags[6]],
};
