import sharp from "sharp";
import axios from "axios";
import path from "path";
import fs from "fs";
import AWS from "aws-sdk";
import dotenv from "dotenv";

const s3Client = ({ credentials, region }) =>
  new AWS.S3({ credentials, region });

const getBucketList = async ({ client, bucketName }) => {
  const result = await client.listObjects({ Bucket: bucketName }).promise();
  return result || {};
};

const transformImages = async () => {
  dotenv.config();
  const region = process.env.NEXT_PUBLIC_S3_REGION;
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
  const credentials = {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  };
  console.log("Creating client ❕");

  const client = s3Client({ credentials, region });

  console.log("Getting bucket list ❕");

  const { Contents = [] } = await getBucketList({ client, bucketName });

  console.log("Creating final url ❕");

  const images = Contents.map(
    ({ Key }) => `https://${bucketName}.s3.${region}.amazonaws.com/${Key}`
  ).filter((image) => image.includes(".webp"));

  console.log("Starting image transformation 👀");

  for (const image of images) {
    const split = image.split("/");
    const filename = split[split.length - 1];

    const directory = path.join(
      process.cwd(),
      `public/static/series/${split[split.length - 2]}`
    );

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    console.log(`Processing 🖼️ ${image} ...`);
    const input = (
      await axios({
        url: image,
        responseType: "arraybuffer",
      })
    ).data;

    const outputLG = await sharp(input)
      .webp({ quality: 100 })
      .resize({ width: 1024, height: 683 })
      .toBuffer();

    const outputMD = await sharp(input)
      .webp({ quality: 100 })
      .resize({ width: 768, height: 512 })
      .toBuffer();

    const outputSM = await sharp(input)
      .webp({ quality: 100 })
      .resize({ width: 640, height: 426 })
      .toBuffer();

    fs.writeFileSync(path.join(directory, `1024px-${filename}`), outputLG);
    fs.writeFileSync(path.join(directory, `768px-${filename}`), outputMD);
    fs.writeFileSync(path.join(directory, `640px-${filename}`), outputSM);
  }

  console.log("Done ✅");
};

transformImages();
