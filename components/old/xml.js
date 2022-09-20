import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";

async function generate() {
  const locales = ["en", "es"];
  const defaultLocale = "en";
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/*.tsx",
    "blog/**/*.mdx",
    "!blog/*.mdx",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
    "!pages/[slug].tsx",
  ]);
  const cleanFiles = pages.map((page) => {
    const c = page
      .replace("pages", "")
      .replace("blog", "/series")
      .replace(".tsx", "")
      .replace(".mdx", "")
      .replace("/en", "")
      .replace("/es", "")
      .replace("/index", "/");
    return c;
  });

  const arrPages = locales.map((locale) => {
    const p = [...new Set(cleanFiles)].map((page) => {
      if (locale === defaultLocale) {
        return `${page}`;
      }
      return `/${locale}${page}`;
    });
    return p;
  });
  const dataPages = [].concat(...arrPages);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${dataPages
          .map((route) => {
            return `
              <url>
                  <loc>${`https://anibalsantosgomez.com${route}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

generate();
