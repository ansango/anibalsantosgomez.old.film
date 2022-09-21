import fs from "fs";
import path from "path";
import matter from "gray-matter";
import RSS from "rss";

async function generate() {
  const SERIES_DIR = path.join(process.cwd(), "content/series");

  const series = fs
    .readdirSync(SERIES_DIR)
    .map((filename) => {
      const source = fs.readFileSync(path.join(SERIES_DIR, filename));
      const { data } = matter(source);
      const route = filename.replace(".mdx", "");
      return { ...data, route };
    })
    .sort((a, b) => b.publishedAt - a.publishedAt);

  // console.log(series);

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
}

generate();
