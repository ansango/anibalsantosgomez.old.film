import fs from "fs";
import path from "path";

import fetch from "cross-fetch";
import matter from "gray-matter";
import sharp from "sharp";

export const createFolder = (folderName, options) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, options);
  }
};

export const route = (nameFolder) => path.join(process.cwd(), nameFolder);

export const getSeries = () => {
  const SERIES_DIR = route("src/content/series");
  console.log(SERIES_DIR);
  const series = fs
    .readdirSync(SERIES_DIR)
    .map((file) => {
      const source = fs.readFileSync(path.join(SERIES_DIR, file));
      const filename = file.replace(".mdx", "");
      const { data } = matter(source);

      if (data?.visible === false) return null;
      if (!data?.blocks) return null;

      const replaced = filename.replaceAll("-", " ");
      const title = replaced.charAt(0).toUpperCase() + replaced.slice(1);
      return {
        title,
        description: data?.meta?.description,
        filename,
        cover: data?.cover,
        publishedAt: data?.meta?.publishedAt,
        tags: data?.meta?.tags,
      };
    })
    .sort((a, b) => b?.meta?.publishedAt - a?.meta?.publishedAt);
  return {
    series: series.filter((item) => item !== null),
  };
};

export const getBase64FromUrl = async (url) => {
  const minified = await sharp(url).resize(8).webp({ quality: 50 }).toBuffer();
  const image = `data:image/webp;base64,${Buffer.from(minified).toString("base64")}`;
  return image;
};

export const getImageFromUrl = async (
  { url, width, height, quality } = { url: "", height: 0, width: 0, quality: 0 }
) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  const image = await sharp(Buffer.from(buffer)).resize(width, height).webp({ quality }).toBuffer();
  return image;
};
