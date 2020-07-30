import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parse, isBefore } from "date-fns";

const postsDirectory = path.join(process.cwd(), "pages/blog");

export function getPostSlugs(returnCustomPosts: boolean): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => {
    if (file.includes(".draft.")) {
      return false;
    } else if (returnCustomPosts) {
      return !file.includes("index.tsx") && !file.includes("[id].tsx");
    } else {
      return !file.includes(".tsx");
    }
  });
}

export interface IMetadata {
  slug?: string;
  content?: string;
  date?: string;
  title?: string;
  description?: string;
  note?: string;
  updated_at?: string;
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  if (!slug.includes(".")) {
    if (fs.existsSync(`${postsDirectory}/${slug}.tsx`)) {
      slug += ".tsx";
    } else {
      slug += ".md";
    }
  }

  const file = fs.readFileSync(`${postsDirectory}/${slug}`, "utf8");
  const { name, ext } = path.parse(slug);

  let metadata: IMetadata = {};

  if (fields.includes("slug")) {
    metadata.slug = name;
  }

  if (ext === ".tsx") {
    const start = "/** start metadata";
    const openBrackets = file.indexOf(start);
    const closingBrackets = file.indexOf("end metadata **/");
    const m: IMetadata = file
      .slice(openBrackets + start.length, closingBrackets)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .reduce((memo, line) => {
        const [key, value] = line.split(": ");
        return { ...memo, [key]: value };
      }, {});

    fields.forEach((field) => {
      if (m[field]) metadata[field] = m[field];
    });
  } else {
    const m = matter(file);

    fields.forEach((field) => {
      if (field === "content") {
        metadata.content = m.content;
      }

      if (m.data[field]) {
        metadata[field] = m.data[field];
      }
    });
  }

  return metadata;
}

const parseDate = (date: string) => parse(date, "MMMM dd, yyyy", new Date());

export function getAllPosts(
  fields: string[] = [],
  returnCustomPosts?: boolean
): IMetadata[] {
  const slugs = getPostSlugs(returnCustomPosts);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) =>
      isBefore(parseDate(post1.date), parseDate(post2.date)) ? 1 : -1
    );
  return posts;
}
