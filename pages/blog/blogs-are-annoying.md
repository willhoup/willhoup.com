---
title: Setting up a non-boiler plate blog is kind of a nuisance
date: July 5, 2020
---

This is the first blog I actually decided to do. It's hard for me to imagine myself keeping this up, to be honest. Maybe I shouldn't call it a blog? Maybe this is more a collection of where I occasionally write stuff that I don't plan on updating often.

I'll probably still call it a blog.

Regardless, I'm using [next.js](https://nextjs.org/) for development, which has overall been rather smooth. I've enjoyed the framework. It does have its own quirks, and I'm always hesitant to go too deep down the rabbit hole of hyper-specialized Javascript because who knows how long I'll be using this. But I'm very comfortable with React and found it easy to build this site. At the same time, this site is freaking simple so that would be annoying if it was hard.

What was a nuisance was trying to setup a blog that allows for more than just markdown and CSS. For instance, [this post about the Philadelphia Eagles' power rankings](/blog/eagles-power-rankings) requires custom Javascript (not much), and I wanted it to be in React, so it fit in with everything else. Initially, it was easy. I had my folder structure ...

```bash
pages
  blogs
    eagles-power-rankings.js
    foo.md
    [id].js
```

... and this worked fine because next will serve the `.js` files before the `[id].js` so both `/blog/eagles-power-rankings` and `/blog/foo` will exist. It's easy to have custom pages and blog pages. The trick was having custom blog pages that show up automatically in the blog feeds without having to add it to a list.

The Eagles' post is entirely in js, so there's no traditional markdown to parse metadata from and and pass on. I tried exporting a `metadata` object from the file, but I couldn't get that imported everywhere it needed to be. I tried to just have that object and use something like [`gray-matter`](https://www.npmjs.com/package/gray-matter) to scoop it up ... that looked terrible code-wise. I decided to do the old hacky string-slice-and-dice at the top of the file.

```js
// eagles-power-rankings.js
/** start metadata
title: The rise and fall of the Philadelphia Eagles (and hopeful rise again)
date: June 25, 2017
end metadata **/

// getPostBySlug()
const file = fs.readFileSync(`${postsDirectory}/${slug}`, "utf8");
const start = "/** start metadata";
const openBrackets = file.indexOf(start);
const closingBrackets = file.indexOf("end metadata **/");
const m = file
  .slice(openBrackets + start.length, closingBrackets)
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .reduce((memo, line) => {
    const [key, value] = line.split(": ");
    return { ...memo, [key]: value };
  }, {});
```

I could just do an `if/else` in `getPostBySlug()` to scrub the metadata from either markdown or the js comment. But there's no consistency on whether `getPostBySlug(slug:string)` is passed `eagles-power-rankings.js` or `eagles-power-rankings`. That's not too bad, though, right? You just need to check if the slug exists.

```js
if (!slug.includes(".")) {
  if (fs.existsSync(`${postsDirectory}/${slug}.js`)) {
    slug += ".js";
  } else {
    slug += ".md";
  }
}
```

We should be set. Except for static dynamic routing. If next is going to export static pages, it needs to know the static pages. At first, this was how I was getting all posts (ripped straight from the tutorial).

```js
function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) =>
      isBefore(parseDate(post1.date), parseDate(post2.date)) ? 1 : -1
    );
  return posts;
}
```

But `getPostSlugs()` was just reading the `pages/blog` directory and was trying to force
