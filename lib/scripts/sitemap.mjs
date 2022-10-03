import fs from "fs";
import path from "path";
import { globby } from "globby";
import matter from "gray-matter";
import prettier from "prettier";

async function generate() {
  console.log("Generating sitemap");
  const prettierConfig = await prettier.resolveConfig("./.prettierrc");
  const SERIES_DIR = path.join(process.cwd(), "content/series");
  console.log("Getting pages");
  const _pages = await globby([
    "pages/**/*.tsx",
    "content/pages/*.mdx",
    "!content/**/index.mdx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
    "!pages/**/[filename]*.tsx",
  ]);

  const pages = _pages.map((page) =>
    page
      .replace("pages/", "")
      .replace("content/pages/", "")
      .replace("content/", "")
      .replace(".tsx", "")
      .replace(".mdx", "")
      .replace("index", "")
      .replace("home", "")
  );

  const series = fs
    .readdirSync(SERIES_DIR)
    .map((filename) => {
      const source = fs.readFileSync(path.join(SERIES_DIR, filename));
      const { data } = matter(source);
      const route = filename.replace(".mdx", "");
      const isPublished = data.isPublished;
      return { ...data, route, isPublished };
    })
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .filter((serie) => serie.isPublished)
    .map((serie) => {
      return `serie/${serie.route}`;
    });
  const routes = [...pages, ...series];
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
         ${routes
           .map((route) => {
             return `
               <url>
                   <loc>${`https://anibalsantosgomez.com/${route}`}</loc>
               </url>
             `;
           })
           .join("")}
    </urlset>
    `;
  console.log("Writing sitemap");
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync(
    path.join(process.cwd(), "public", "sitemap.xml"),
    formatted
  );
  console.log("Sitemap generated");
  console.log(formatted);
}

generate();
