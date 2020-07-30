---
title: Setting up a non-boilerplate blog
date: July 29, 2020
---

This is the first blog I actually decided to do. It's hard for me to imagine myself keeping this up, to be honest. Maybe I shouldn't call it a blog ...

Anyway, I'm using [`next.js`](https://nextjs.org/) for development, which has been rather smooth overall. I've enjoyed the framework. I cribbed almost everything from the [blog template](https://nextjs.org/learn/basics/create-nextjs-app). It does have its own quirks, and I'm always hesitant to go too deep down the rabbit hole of hyper-specialized Javascript because who knows how long I'll be using this.

But I'm comfortable with React and found it easy to build this site. At the same time, this site is freaking simple so that would be annoying if it was hard.

What was a nuisance was trying to setup a blog that allows for more than just markdown and CSS. For instance, [this post about the Philadelphia Eagles' power rankings](/blog/eagles-power-rankings) requires custom Javascript (not much), and I wanted it to be in React, so it fit in with everything else. Initially, it was easy. I had my folder structure ...

```bash
pages
  blogs
    eagles-power-rankings.tsx
    foo.md
    [id].tsx
```

... and this worked fine because `next` will serve the `.tsx` files before the `[id].tsx` so both `/blog/eagles-power-rankings` and `/blog/foo` will exist. It's easy to have custom pages and regular blog pages. The trick was having custom blog pages.

The Eagles' post is entirely in ts, so there's no traditional markdown to parse metadata from and pass on. I tried exporting a `metadata` object from the file but couldn't import it everywhere it needed to be. I then tried to just rip the object out of the file with something like [`gray-matter`](https://www.npmjs.com/package/gray-matter) ... that looked terrible code-wise. So I ended up with the old hacky string slice-and-dice at the top of the file.

```js
/** start metadata
title: The rise and fall of the Philadelphia Eagles
date: June 25, 2017
end metadata **/
```

_**Note**: I'm assuming you're familiar with how [next statically generates pages](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data) with dynamic routes. Most – if not all – code below is in reference to that process._

I then extract it like so ...

```js
function getPostBySlug(slug) {
  const file = fs.readFileSync(...);
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
}
```

I could just do an `if/else` in `getPostBySlug()` to scrub the metadata from either markdown or the comment. But there's no consistency on whether `getPostBySlug()` is passed `eagles-power-rankings.tsx` or `eagles-power-rankings`. That's not too bad, though, right? Just need to check if the slug exists.

```js
if (!slug.includes(".")) {
  if (fs.existsSync(`${postsDirectory}/${slug}.tsx`)) {
    slug += ".tsx";
  } else {
    slug += ".md";
  }
}
```

We should be set ... except for static dynamic routing. If `next` is going to export static pages, it needs to know the static pages. At first, this was how I was getting all posts (ripped straight from the [tutorial](https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths)).

```js
function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));
  return posts;
}
```

But `getPostSlugs()` was just reading the `pages/blog` directory and passing that along. We want to be able to filter out posts that shouldn't be caught in the `[id].tsx` blog layout component.

```js
function getPostSlugs(returnCustomPosts: boolean): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => {
    if (file.includes(".draft.")) {
      return false;
    } else if (returnCustomPosts) {
      // return eagles-like posts
      return !file.includes("index.tsx") && !file.includes("[id].tsx");
    } else {
      // dont return eagles-like posts
      return !file.includes(".tsx");
    }
  });
}
```

Ah ha, besides some ephemeral `tagName` errors during development, we're mostly there. These pages can live in harmony.

But I keep thinking there's got to be a better way to do this – maybe my googling for solutions wasn't strong enough. Regardless, we'll see how well this goes and if I come back to make it worth it, haha. You can see the code here: https://github.com/willhoup/willhoup.com.
