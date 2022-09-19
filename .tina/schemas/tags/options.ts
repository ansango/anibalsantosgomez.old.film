import { kebabParser } from "../../../utils";

const kodak = [
  "Kodak",
  "Kodak Portra 400",
  "Kodak Portra 160",
  "Kodak Portra 800",
  "Kodak Ektra 100",
  "Kodak Gold 100",
  "Kodak Gold 200",
  "Kodak Ultramax 400",
  "Kodak Pro Image 100",
  "Kodak T-Max 400",
];
const fuji = ["Fujifilm", "Fujifilm Superia 400", "Fujifilm C200"];
const cineStill = ["CineStill", "CineStill 800T"];
const ilford = [
  "Ilford",
  "Ilford HP5 400",
  "Ilford Delta 3200",
  "Ilford XP2 400",
];
export const series = [...kodak, ...fuji, ...cineStill, ...ilford].map(
  (value) => kebabParser(value)
);
