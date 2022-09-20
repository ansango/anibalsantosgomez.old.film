import { writeFileSync } from "fs";
import RSS from "rss";
import { allBlogs } from "../.contentlayer/generated/index.mjs";

async function generate() {
  const feed = new RSS({
    title: "Anibal Santos",
    site_url: "https://anibalsantosgomez.com",
    feed_url: "https://anibalsantosgomez.com/feed.xml",
  });

  allBlogs.map(
    ({ slug, lang, title, publishedAt: date, summary: description }) => {
      const url =
        lang === "en"
          ? `https://anibalsantosgomez.com/series/${slug}`
          : `https://anibalsantosgomez.com/${lang}/series/${slug}`;
      feed.item({
        title,
        url,
        date,
        description,
      });
    }
  );

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
