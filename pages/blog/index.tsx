import React, { ReactNode } from "react";
import Head from "../../components/Head";
import Link from "next/link";
import { getAllPosts, IMetadata } from "../../lib/getPostData";

interface StaticProps {
  props: { allPosts: IMetadata[] };
}

function Blog(props: StaticProps["props"]) {
  const { allPosts } = props;
  return (
    <div className="container">
      <Head
        og_title="Will Houp's Blog"
        url="http://willhoup.com/blog"
        description="This is my blog I hardly ever update"
      />

      <main>
        <article>
          <section>
            <h1>Writings</h1>
            <p>
              This is my blog I hardly ever update. I'd like to write more, so
              hopefully I'll find the time at some point.
            </p>
          </section>
          <section className="project-list">
            {allPosts.map(
              ({ title, date, slug }, index): ReactNode => {
                return (
                  <section key={`project-${index}`} className="project">
                    <h3>
                      <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                        <a className="project-link">{title}</a>
                      </Link>
                    </h3>
                    {date}
                  </section>
                );
              }
            )}
          </section>
        </article>
      </main>

      <style jsx>{`
        article {
          width: 100%;
        }

        .project-list {
          padding-top: 1em;
          // margin-top: 30px;
        }

        .project {
          margin: 30px 0px;
        }

        h3 {
          font-size: 1.1em;
          line-height: 1.5;
          margin-bottom: 2px;
        }

        h6 {
          color: #666;
          font-size: 0.85em;
          font-family: "IBM Plex Mono", monospace;
          font-weight: 400;
        }

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        img {
          border-radius: 50%;
          max-width: 100px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
        }

        p {
          font-size: 15px;
          line-height: 1.7;
        }

        .container {
          width: 100%;
        }

        main {
          padding: 5rem 0;
          max-width: 550px;
          flex: 1;
          display: flex;
          margin: 0 auto;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps(): Promise<StaticProps> {
  const allPosts = getAllPosts(["title", "date", "slug"], true);

  return {
    props: { allPosts },
  };
}

export default Blog;
