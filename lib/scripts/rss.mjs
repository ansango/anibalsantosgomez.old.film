import fs from "fs";
import path from "path";
import matter from "gray-matter";
import RSS from "rss";

async function generate() {
  console.log("Generating RSS feed");
  const SERIES_DIR = path.join(process.cwd(), "content/series");
  console.log("Getting series");
  const series = fs
    .readdirSync(SERIES_DIR)
    .map((file) => {
      const source = fs.readFileSync(path.join(SERIES_DIR, file));
      const { data } = matter(source);
      const filename = file.replace(".mdx", "");
      return { ...data, route: filename };
    })
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .filter((serie) => serie.isPublished);

  const feed = new RSS({
    title: "Anibal Santos",
    site_url: "https://anibalsantosgomez.com",
    feed_url: "https://anibalsantosgomez.com/feed.xml",
  });

  series.map((serie) =>
    feed.item({
      title: serie.title,
      url: `https://anibalsantosgomez.com/serie/${serie.route}`,
      date: serie.publishedAt,
      description: serie.description,
      author: "Anibal Santos",
      categories: serie.tags,
    })
  );

  fs.writeFileSync(
    path.join(process.cwd(), "public", "feed.xml"),
    feed.xml({ indent: true })
  );

  console.log("RSS feed generated");
  console.log(feed.xml({ indent: true }));
}

generate();
