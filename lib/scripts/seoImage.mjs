import sharp from "sharp";
import axios from "axios";
import path from "path";
import matter from "gray-matter";
import fs from "fs";

const transformImages = async () => {
  const SERIES_DIR = path.join(process.cwd(), "content/series");
  const series = fs
    .readdirSync(SERIES_DIR)
    .map((file) => {
      const source = fs.readFileSync(path.join(SERIES_DIR, file));
      const filename = file.replace(".mdx", "");
      const { data } = matter(source);
      return { filename, cover: data.cover, isPublished: data.isPublished };
    })
    .filter(({ isPublished }) => isPublished);

  const outputDir = path.join(process.cwd(), "public/static/series");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const serie of series) {
    const cover = serie.cover;
    console.log(`Processing ${cover}`);
    const filename = serie.filename.split("-")[0];
    console.log(`Processing ${filename}`);
    const input = (
      await axios({
        url: cover,
        responseType: "arraybuffer",
      })
    ).data;
    const output = await sharp(input)
      .jpeg({ quality: 80 })
      .resize({ width: 400, height: 400 })
      .toBuffer();
    fs.writeFileSync(path.join(outputDir, `${filename}.jpg`), output);
  }
  console.log("Done");
};
transformImages();
