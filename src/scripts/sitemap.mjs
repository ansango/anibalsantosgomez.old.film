import fs from "fs";
import path from "path";

import { globby } from "globby";
import prettier from "prettier";

import { getSeries } from "./lib/index.mjs";

const excludedFiles = [
  "!content/**/index.mdx",
  "!pages/_*.tsx",
  "!pages/api",
  "!pages/404.tsx",
  "!pages/500.tsx",
  "!pages/**/[filename]*.tsx",
];

const makeSitemap = async () => {
  console.log("Generating sitemap");
  const prettierConfig = await prettier.resolveConfig("../../.prettierrc.json");
  const { series } = getSeries();
  console.log("Getting pages");
  const _pages = await globby(["src/content/pages/*.mdx", ...excludedFiles]);

  console.log(_pages);

  const pages = _pages.map((page) =>
    page
      .replace("src/pages/", "")
      .replace("src/content/pages/", "")
      .replace("src/content/", "")
      .replace(".tsx", "")
      .replace(".mdx", "")
      .replace("index", "")
      .replace("home", "")
  );

  const mappedseries = series.map(({ filename }) => {
    return `serie/${filename}`;
  });
  const routes = [...pages, ...mappedseries];
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

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), formatted);

  console.log(formatted);
  console.log("Sitemap generated");
};

makeSitemap();
