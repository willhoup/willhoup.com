# willhoup.com

This repo holds the different folders and files that I've used along the years to create http://willhoup.com. I've found it incredibly valuable to iterate on this site and test out new frameworks and code (for better or for worse). Right now the site (which is incredibly simple) is using [next.js](https://nextjs.org/).

### blog

I don't write as much as I used to in school and would like to change that, so I've decided to start a blog: https://willhoup.com/blog. We'll see how much I update it. [I wrote about how I set it up](https://willhoup.com/blog/setting-up-blog/) (slightly tweaked the next default).

### code

I'm trying to do more with [Typescript](https://www.typescriptlang.org/) – still a noob – so I've turned almost everything I can into ts for the site. next made that easy.

### deployments

[I use CircleCI](https://github.com/willhoup/willhoup.com/blob/master/.circleci/config.yml) to build and deploy my static site. Non-master branches deploy to the beta site, and master deploys go to production. I may turn off the beta deployment or tweak the process, but I'm happy with this general setup and find it easy to use.
