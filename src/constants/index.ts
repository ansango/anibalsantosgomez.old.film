import { kebabParser } from "../lib/";

const generic = ["35mm", "viajes", "retrato", "miscelánea", "fotografía"];

const kodak = [
  "Kodak",
  "Portra 400",
  "Portra 160",
  "Portra 800",
  "Ektar 100",
  "Pro Image 100",
  "Gold 100",
  "Gold 200",
  "Ultramax 400",
  "T-Max 400",
];
const fuji = ["Fujifilm", "Superia 400", "Color 200"];
const cineStill = ["CineStill", "800T"];
const ilford = ["Ilford", "HP5 400", "Delta 3200", "XP2 400"];

export const tags = [...generic, ...kodak, ...fuji, ...cineStill, ...ilford].map((value) =>
  kebabParser(value)
);

export const cameras = [
  "Canon EOS Elan",
  "Canon EOS 50 E",
  "Canon EOS 33",
  "Canon EOS 50D",
  "Canon EOS 6D",
];

export const films = [
  "Digital",
  "Kodak Gold 200",
  "Kodak Portra 400",
  "Kodak Ektar 100",
  "Kodak Pro Image 100",
  "Ilford Delta 3200",
  "Ilford HP5 Plus 400",
  "Ilford XP2 Super 400",
  "Fujifilm Color 200",
  "Fujifilm Superia 400",
];
