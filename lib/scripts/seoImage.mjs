import sharp from "sharp";
import axios from "axios";
import path from "path";
import matter from "gray-matter";
import fs from "fs";

const transformImages = async () => {
  const SERIES_DIR = path.join(process.cwd(), "content/series");
  const series = fs.readdirSync(SERIES_DIR).map((file) => {
    const source = fs.readFileSync(path.join(SERIES_DIR, file));
    const { data } = matter(source);
    const filename = file.replace(".mdx", "");
    const cover = data.cover;
    return { filename, cover };
  });
  const outputFolder = path.join(process.cwd(), "public/series");

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  for (const serie of series) {
    const cover = serie.cover;
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
    fs.writeFileSync(path.join(outputFolder, `${filename}.jpg`), output);
  }
  console.log("Done");
};
transformImages();
