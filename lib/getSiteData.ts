import fs from "fs";
import path from "path";

const siteDirectory = path.join(process.cwd(), "pages");

export function getAllDomains(): string[] {
  return fs
    .readdirSync(siteDirectory)
    .filter((item) => {
      if (item === "api" || item === "_app.tsx") {
        return false;
      } else if (item === "index.tsx") {
        return "/";
      } else {
        return item;
      }
    })
    .sort((a, b) => (a > b ? 1 : -1));
}
