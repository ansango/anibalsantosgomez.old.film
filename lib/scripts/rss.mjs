import { writeFileSync } from "fs";
import RSS from "rss";
import { client } from "../../.tina/__generated__/client.js";

async function generate() {
  const series = await (
    await client.queries.seriesPublishedQuery()
  ).data.serieConnection.edges.map((data) => {
    return {
      title: data.node.title,
      url: `https://anibalsantosgomez.com/serie/${data.node._sys.filename}`,
      date: data.node.publishedAt,
      description: data.node.description,
    };
  });

  const feed = new RSS({
    title: "Anibal Santos",
    site_url: "https://anibalsantosgomez.com",
    feed_url: "https://anibalsantosgomez.com/feed.xml",
  });

  series.map((serie) => feed.item(serie));

  writeFileSync("../../public/feed.xml", feed.xml({ indent: true }));
}

generate();
