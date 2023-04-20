import fs from "fs";
import path from "path";

import RSS from "rss";

import { getSeries } from "./lib/index.mjs";

const makeRSS = () => {
  console.log("Generating RSS feed");
  console.log("Getting series");
  const { series } = getSeries();

  const feed = new RSS({
    title: "Anibal Santos",
    site_url: "https://anibalsantosgomez.com",
    feed_url: "https://anibalsantosgomez.com/feed.xml",
  });

  series.map((serie) =>
    feed.item({
      title: serie.title,
      url: `https://anibalsantosgomez.com/serie/${serie.filename}`,
      date: serie.publishedAt,
      description: serie.description,
      author: "Anibal Santos",
      categories: serie.tags,
    })
  );

  fs.writeFileSync(path.join(process.cwd(), "public", "feed.xml"), feed.xml({ indent: true }));

  console.log(feed.xml({ indent: true }));
  console.log("RSS feed generated");
};

makeRSS();
