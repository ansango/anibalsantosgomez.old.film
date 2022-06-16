import sharp from "sharp";
import { globby } from "globby";
import { readFileSync, mkdirSync, existsSync, rmdirSync } from "fs";

const transformImages = async (src, format) => {
  const images = await globby(src);
  for (const image of images) {
    const folder = image.replace("./blog/", "").split("/")[0];
    const outputFolder = `./public/blog/${folder}`;
    const imageName = image.split("/").pop().split(".")[0];
    const output = `${outputFolder}/${imageName}.${format}`;
    const imageBuffer = await readFileSync(image);
    const imageSharp = sharp(imageBuffer)
      .resize({ width: 1152, height: 768 })
      .toFormat("webp")
      .webp({ quality: 80 });

    if (!existsSync(outputFolder)) {
      mkdirSync(outputFolder);
    }

    await imageSharp.toFile(output);
    console.log(`${image} -> ${output}`);
  }
  for (const image of images) {
    const baseFolder = image.split("/").slice(0, -1).join("/");
    if (existsSync(baseFolder)) {
      rmdirSync(baseFolder, { recursive: true });
    }
  }
  console.log("Done");
};

transformImages("./blog/**/images/*.{jpg,jpeg,png,gif}", "webp");
