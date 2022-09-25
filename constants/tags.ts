import { kebabParser } from "../lib/utils";

const kodak = [
  "Kodak",
  "Portra 400",
  "Portra 160",
  "Portra 800",
  "Ektar 100",
  "Gold 100",
  "Gold 200",
  "Ultramax 400",
  "Pro Image 100",
  "T-Max 400",
];
const fuji = ["Fujifilm", "Superia 400", "C200"];
const cineStill = ["CineStill", "800T"];
const ilford = ["Ilford", "HP5 400", "Delta 3200", "XP2 400"];
export const tags = [...kodak, ...fuji, ...cineStill, ...ilford].map((value) =>
  kebabParser(value)
);
