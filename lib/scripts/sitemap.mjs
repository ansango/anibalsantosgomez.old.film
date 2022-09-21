import fs from "fs";
import path from "path";
import { globby } from "globby";
import prettier from "prettier";

async function generate() {
  console.log("Generating sitemap");
  const prettierConfig = await prettier.resolveConfig("./.prettierrc");
  console.log("Getting pages");
  const pages = await globby([
    "pages/**/*.tsx",
    "content/**/*.mdx",
    "!content/**/index.mdx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
    "!pages/**/[filename]*.tsx",
  ]);
  const routes = pages.map((page) =>
    page
      .replace("pages/", "")
      .replace("content/pages/", "")
      .replace("content/", "")
      .replace(".tsx", "")
      .replace(".mdx", "")
      .replace("index", "")
      .replace("home", "")
  );

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
